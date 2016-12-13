let AWS = require('aws-sdk');

class PollyClient {
	constructor() {
		AWS.config.loadFromPath('./config.json');
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
}

module.exports = PollyClient;