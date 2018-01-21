let AWS = require('aws-sdk');

class PollyClient {
  constructor() {
    AWS.config.region = 'us-east-1';
    this.polly = new AWS.Polly();
  }

  synthesizeText(text, voice, callback) {
    let params = {
      Text: text,
      VoiceId: voice,
      OutputFormat: 'mp3'
    };

    this.polly.synthesizeSpeech(params, (err, data) => {
      if (err || data == null) {
        callback(err, null);
        return;
      }

      callback(null, data.AudioStream);
    });
  }

  getAvailableVoices() {
    return new Promise((resolve, reject) => {
      this.polly.describeVoices({}, (err, data) => {
        if (err || data == null) {
          console.error('Polly: unable to update the list of available voices.', err);
          reject(err);
        }
        resolve(data.Voices);
      });
    })

  }
}

module.exports = PollyClient;
