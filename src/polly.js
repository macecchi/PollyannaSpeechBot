import AWS from 'aws-sdk';

const polly = new AWS.Polly({
  region: 'us-east-1',
});

export const synthesizeText = async (text, voice) => {
  const params = {
    Text: text,
    VoiceId: voice || 'Justin',
    OutputFormat: 'mp3',
  };

  const data = await polly.synthesizeSpeech(params).promise();
  return data.AudioStream;
};

export const availableVoices = async () => {
  const data = await polly.describeVoices({}).promise();
  return data.Voices;
};
