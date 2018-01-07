'use strict';
const PollyClient = require('./polly');
const Polly = new PollyClient();

module.exports = {
  error(error) {
    return Promise.reject(new Error(error));
  },

  s(commandArguments) {
    return new Promise((resolve, reject) => {
      const text = commandArguments[0];
      const voiceName = 'Cristiano';

      Polly.synthesizeText(text, voiceName, (err, audioStream) => {
        if (err) {
          console.log(err);
          reject();
          return;
        }

        return resolve({voice: audioStream, caption: text});
      });
    });
  },

};