'use strict';
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));

const TelegramBot = require('node-telegram-bot-api');
const helper = require('./helper');
const commands = require('./commands');

let Bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

function sendMessageToTelegram(chatId, data) {
  if (data.message) {
    return Bot.sendMessage(chatId, data.message);
  }

  if (data.voice) {
    const messageOptions = {
      caption: data.caption,
    };
    const fileOptions = { 
      filename: data.caption,
      contentType: 'audio/mpeg',
    };
    return Bot.sendVoice(chatId, data.voice, messageOptions, fileOptions);
  }
}

function processCommands(message) {
  if (message) {
    const commandArguments = helper.parseCommand(message.trim());
    if (commandArguments === null) {
      return commands.warn('Invalid Command');
    }

    const commandKeys = Object.keys(commandArguments);
    if (commandKeys.length === 0 && !commands[commandKeys[0]]) {
      return commands.warn('Invalid Command');
    }

    const command = commandKeys[0];
    return commands[command](commandArguments[command]);
  }

  return commands.error('Event not specified');
}

exports.handler = (event, context, callback) => {
  let message;
  if (event.body.message && event.body.message.text) {
    message = event.body.message.text;
  }

  console.log(`Received command: '${message}'`);
  const command = processCommands(message);

  let chatId;
  if (event.body.message && event.body.message.chat && event.body.message.chat.id) {
    chatId = event.body.message.chat.id;
  }

  if (chatId) {
    command.then((response) => {
      const processTelegram = sendMessageToTelegram(chatId, response);
      processTelegram.then(() => {
        callback(null, { 'status': 'ok' });
      }).catch((error) => {
        console.error('Failed to send command response to Telegram', error);
        callback(error, { 'status': 'Failed to send command response to Telegram' });
      });
    }).catch((error) => {
      console.error('Failed to process command', error);
      const processTelegram = sendMessageToTelegram(chatId, error);
      processTelegram.then(() => {
        callback(null, { 'status': 'failed to process command' });
      }).catch((error) => {
        console.error('Failed to send error response to Telegram', error);
        callback(error, { 'status': 'Failed to send error response to Telegram' });
      });
    });
  }

  return command;
};