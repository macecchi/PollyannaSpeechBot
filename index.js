var AWS = require('aws-sdk');
var TelegramBot = require('node-telegram-bot-api');
var uuid = require('node-uuid');

AWS.config.loadFromPath('./config.json');

var bot = new TelegramBot(process.env.MERIW_BOT_TELEGRAM_TOKEN, {polling: true});
let Polly = new AWS.Polly();

var voiceForChat = {};

bot.on('message', (msg) => {
  if (msg.entities) return;

  var chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To convert to speech use /s text. To change the voice, use /v voice.');
});


// Matches "/s [whatever]"
bot.onText(/\/s (.+)/, (msg, match) => {
  var chatId = msg.chat.id;
  var voice = voiceForChat[chatId] || 'Vitoria';
  var text = match[1];

  console.log(`Chat ${chatId} requested "${text}"`);

  let params = {
    Text: text,
    VoiceId: voice,
    OutputFormat: 'mp3'
  };

  let responseParams = {
    caption: text
  }

  Polly.synthesizeSpeech(params, (err, data) => {
    if (err || data == null) {
      console.log(err);
      return;
    }

    bot.sendVoice(chatId, data.AudioStream, responseParams);

    console.log(`Chat ${chatId} received voice for "${text}" with ${voice}`);
  });

});


bot.onText(/\/v (.+)/, (msg, match) => {
  var chatId = msg.chat.id;
  let voice = match[1];
  if (voice != 'Vitoria' && voice != 'Ricardo') {
    return bot.sendMessage(chatId, 'Unsupported voice. Supported voices:\nVitoria\nRicardo');
  }

  voiceForChat[chatId] = voice;
  bot.sendMessage(chatId, 'Done!');
  console.log(`Chat ${chatId} changed voice to "${voice}"`);
});