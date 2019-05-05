import { synthesizeText } from '../polly';

export default async (text) => {
  const voice = await synthesizeText(text);
  return {
    voice,
    text,
  }
};
