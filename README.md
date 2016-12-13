# Pollyanna

A Telegram Text-to-Speech bot using [Amazon Polly](https://aws.amazon.com/polly/).

Available as a demo on Telegram as [@PollyannaBot](https://telegram.me/PollyannaBot).

### Commands

- Convert text to speech and send it as an audio: `/s text`
- Change the voice: `/v Amy`
- List available voices: `/voices`


## Configuration

1. Install the required packages

	```
	npm install
	```

2. Copy `config.json.example` to `config.json` and enter your credentials from AWS Polly and Telegram
	- *Get your AWS access key and secret using [IAM](https://aws.amazon.com/pt/iam/)*
	- *Send a message to [@BotFather](https://telegram.me/BotFather) to create a Telegram bot and get the token*

3. Start the bot
	
	```
	npm start
	```
	
## Inspiration

This bot was inspired by the original [@SpeechBot](https://telegram.me/SpeechBot) from [lasermarty/SpeechBot](https://github.com/lasermarty/SpeechBot), which sadly does not work anymore.
