import { synthesizeText } from './polly';

const speak = async (text) => {
  const voice = await synthesizeText(text);
  return {
    voice,
    text,
  }
};

export default {
  s: speak,
};
