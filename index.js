let Config = require('./config.json')
let PollyClient = require('./polly');
let TelegramBot = require('node-telegram-bot-api');

let Bot = new TelegramBot(Config.telegramBotToken, { polling: true });
let Polly = new PollyClient();

let voiceForChat = {};

Bot.on('message', (msg) => {
  if (msg.entities) return;

  let chatId = msg.chat.id;
  Bot.sendMessage(chatId, 'To convert to speech use /s text. To check the available voices, use /voices.');
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
  let requestedVoice = match[1];

  let voices = Polly.availableVoices || [];
  for (let voice of voices) {
    if (voice.Name.toLowerCase() == requestedVoice.toLowerCase()) {
      voiceForChat[chatId] = voice.Id;
      Bot.sendMessage(chatId, `Done! You are now using ${voice.Name}.`);
      console.log(`Chat ${chatId} changed voice to ${voice.Name}`);
      return;
    }
  }

  Bot.sendMessage(chatId, 'Unsupported voice. Type /voices to get the list of available voices.');
  console.log(`Chat ${chatId} tried to change voice to "${requestedVoice}" (invalid)`);  
});


Bot.onText(/\/voices/, (msg, match) => {
  let chatId = msg.chat.id;

  console.log(`Chat ${chatId} requested the list of voices`);

  let voices = Polly.availableVoices;
  if (Array.isArray(voices)) {
    let responseText = 'Available voices:\n';
    for (let voice of voices) {
      responseText += `- ${voice.Name} (${voice.LanguageCode})\n`;
    }

    responseText += `\nTo change the voice, enter /v and the name of the voice.`;
    Bot.sendMessage(chatId, responseText);
  } else {
    console.log(`Voices unavailable.`);
  }
});