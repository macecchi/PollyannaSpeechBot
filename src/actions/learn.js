import { saveAnswer } from '../persist';

const parseLearnInput = (text) => {
  const [ line, answer ] = text.split('=');
  return { line, answer };
};

export default async (text, chatId) => {
  const { line, answer } = parseLearnInput(text);
  if (!answer) {
    return {
      text: 'Oops! Please teach me using the format: <line> = <answer>',
    };
  }

  try {
    await saveAnswer(chatId, line.trim().toLowerCase(), answer.trim());
  } catch (error) {
    // console.error('Error saving answer.', error);
    return {
      text: 'Sorry, I was not able to learn that. Try again later.',
    };
  }

  return {
    text: 'Lesson learned! Thanks!',
  };
};
