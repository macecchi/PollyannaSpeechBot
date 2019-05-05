import { availableVoices } from '../polly';

export default async () => {
  const voiceList = await availableVoices();
  const renderedVoices = voiceList.map((voice) => `\n- ${voice.Name} (${voice.LanguageCode})`);

  return {
    text: `Available voices: ${renderedVoices}\nTo change the voice, enter /v followed by the name of the voice.`,
   };
};
