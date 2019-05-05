# Pollyanna
[![CircleCI](https://circleci.com/gh/macecchi/PollyannaSpeechBot.svg?style=svg)](https://circleci.com/gh/macecchi/PollyannaSpeechBot)

A Telegram Text-to-Speech bot using [Amazon Polly](https://aws.amazon.com/polly/), built to run on top of [AWS Lambda](https://aws.amazon.com/lambda/).

Available on Telegram as [@PollyannaBot](https://telegram.me/PollyannaBot).

### Commands

- Convert text to speech and send it as an audio: `/s Read this`
- Change the voice: `/v Amy`
- List available voices: `/voices`

### Testing locally

You can invoke the bot from a shell using the `start` command. Edit the file `start.js` with your Telegram chat ID and run the command:

```bash
yarn start "/s test"
```

## Inspiration

This bot was inspired by the original [@SpeechBot](https://telegram.me/SpeechBot) from [lasermarty/SpeechBot](https://github.com/lasermarty/SpeechBot), which sadly does not work anymore.
