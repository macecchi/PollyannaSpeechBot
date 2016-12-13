let Config = require('./config.json')
let PollyClient = require('./polly');
let TelegramBot = require('node-telegram-bot-api');

let Bot = new TelegramBot(Config.telegramBotToken, { polling: true });
let Polly = new PollyClient();

let availableVoices;
let voiceForChat = {};

Bot.on('message', (msg) => {
  if (msg.entities) return;

  let chatId = msg.chat.id;
  Bot.sendMessage(chatId, 'To convert to speech use /s text. To change the voice, use /v voice.');
});


// Matches "/s [whatever]"
Bot.onText(/\/s (.+)/, (msg, match) => {
  let chatId = msg.chat.id;
  let voice = voiceForChat[chatId] || 'Vitoria';
  let text = match[1];

  console.log(`Chat ${chatId} requested using ${voice}: "${text}"`);

  let responseParams = {
    caption: text
  }

  Polly.synthesizeText(text, voice, (err, audioStream) => {
    if (err) {
      console.log(err);
      return;
    }

    Bot.sendVoice(chatId, audioStream, responseParams);
  });

});


Bot.onText(/\/v (.+)/, (msg, match) => {
  let chatId = msg.chat.id;
  let voice = match[1];
  if (voice != 'Vitoria' && voice != 'Ricardo') {
    return Bot.sendMessage(chatId, 'Unsupported voice. Supported voices:\nVitoria\nRicardo');
  }

  voiceForChat[chatId] = voice;
  Bot.sendMessage(chatId, 'Done!');
  console.log(`Chat ${chatId} changed voice to "${voice}"`);
});