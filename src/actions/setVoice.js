import { availableVoices } from '../polly';
import { savePreferences } from '../persist';

const findVoice = (voices, voiceName) => voices.find(v => v.Name.toLowerCase() === voiceName.toLowerCase());

export default async (voiceName, chatId) => {
  const voices = await availableVoices();
  const voice = findVoice(voices, voiceName);

  if (!voice) {
    return {
      text: 'Sorry, the selected voice is not available.',
    };
  }

  await savePreferences(chatId, voice.Id);

  return {
    text: `Voice updated to ${voice.Name} (${voice.LanguageCode}).`,
   };
};
