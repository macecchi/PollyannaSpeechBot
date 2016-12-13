let AWS = require('aws-sdk');

class PollyClient {
	constructor() {
		AWS.config.loadFromPath('./config.json');
		this.polly = new AWS.Polly();
    this.updateAvailableVoices();
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
        console.err('Polly: unable to update the list of available voices.');
        return;
      }

      _this.availableVoices = data.Voices;
      console.log('Polly: updated the list of available voices.', _this.availableVoices);
    });
  }
}

module.exports = PollyClient;