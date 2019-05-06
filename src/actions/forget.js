import { forgetAnswer } from '../persist';

export default async (line, chatId) => {
  await forgetAnswer(chatId, line.trim().toLowerCase());

  return {
    text: 'Ok! I\'ll forget that.',
  };
};
