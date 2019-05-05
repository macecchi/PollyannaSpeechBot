import { synthesizeText } from '../polly';
import { fetchAnswer, fetchPreferences } from '../persist';

export default async (text, chatId) => {
  const answerPromise = fetchAnswer(chatId, text);
  const preferredVoicePromise = fetchPreferences(chatId);
  const [ answer, preferredVoice ] = await Promise.all([answerPromise, preferredVoicePromise]);

  console.log(`answer for chat ${chatId} and line '${text}': '${answer}'`);
  if (!answer) return null;

  const voice = await synthesizeText(answer, preferredVoice);
  return {
    voice,
    text: answer,
  }
};
