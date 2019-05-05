import AWS from 'aws-sdk';

const polly = new AWS.Polly({
  region: 'us-east-1',
});

export const synthesizeText = async (text, voice, callback) => {
  const params = {
    Text: text,
    VoiceId: voice || 'Justin',
    OutputFormat: 'mp3',
  };

  const data = await polly.synthesizeSpeech(params).promise();
  return data.AudioStream;
};

