import { synthesizeText, availableVoices } from './polly';

const speak = async (text) => {
  const voice = await synthesizeText(text);
  return {
    voice,
    text,
  }
};

const voices = async () => {
  const voiceList = await availableVoices();
  const renderedVoices = voiceList.map((voice) => `\n- ${voice.Name} (${voice.LanguageCode})`);
  const text = `Available voices: ${renderedVoices}\nTo change the voice, enter /v followed by the name of the voice.`;
  return { text };
};

export default {
  s: speak,
  voices,
};
