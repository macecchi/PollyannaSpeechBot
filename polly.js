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

  updateAvailableVoices() {
    let _this = this;
    this.polly.describeVoices({}, (err, data) => {
      if (err || data == null) {
        console.error('Polly: unable to update the list of available voices.', err);
        return;
      }

      _this.availableVoices = data.Voices;
      console.log(`Polly: updated the list of available voices. Total ${_this.availableVoices.length} voices available.`);
    });
  }
}

module.exports = PollyClient;