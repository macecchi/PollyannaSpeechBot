import { synthesizeText } from '../polly';
import { fetchPreferences } from '../persist';

export default async (text, chatId) => {
  const preferredVoice = await fetchPreferences(chatId);
  const voice = await synthesizeText(text, preferredVoice);
  return {
    voice,
    text,
  }
};
