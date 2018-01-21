'use strict';
var { fetchPreferences, savePreferences } = require('./persist');
const PollyClient = require('./polly');
const Polly = new PollyClient();

module.exports = {
  error(error) {
    return Promise.reject(new Error(error));
  },

  s(commandArguments, chatId) {
    return new Promise((resolve, reject) => {
      const text = commandArguments;

      fetchPreferences(chatId).then((preference) => {
        const voice = preference !== undefined ? preference.voice_id.S : 'Cristiano';

        Polly.synthesizeText(text, voice, (err, audioStream) => {
          if (err) {
            console.log(err);
            reject();
            return;
          }

          return resolve({voice: audioStream, caption: text});
        });
      });
    });
  },

  v(commandArguments, chatId) {
    return new Promise((resolve, reject) => {
      const desiredVoice = commandArguments;

      Polly.getAvailableVoices().then((voices) => {
        const voice = voices.find((voiceItem) => {
          return voiceItem.Name.toLowerCase() === desiredVoice.toLowerCase();
        });

        if (voice) {
          savePreferences(chatId, voice.Id).then((preference) => {
            resolve({ message: `Voice updated to ${voice.Name}.` })
          }).catch((err) => reject({
            message: 'Sorry, we were not able to update the voice. Try again later.'
          }))
        } else {
          reject({ message: 'Sorry, the provided voice is not available.' });
        }

      }).catch((err) => reject({
        message: 'Sorry, we were not able to update the voice. Try again later.'
      }))
    });
  },

  voices(commandArguments, chatId) {
    return new Promise((resolve, reject) => {

      Polly.getAvailableVoices().then((voices) => {
        const voicesList = voices.map((voice) => `\n- ${voice.Name} (${voice.LanguageCode})`);

        let messageText = `Available voices: ${voicesList}`
        messageText += `\nTo change the voice, enter /v and the name of the voice.`

        resolve({ message: messageText })
      }).catch((err) => reject({
        message: 'Sorry, we were not able to retrieve the available voices. Try again later.'
      }))
    });
  },

};
