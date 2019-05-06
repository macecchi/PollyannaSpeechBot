import { fetchAnswers } from '../persist';

export default async (_, chatId) => {
  const answers = await fetchAnswers(chatId);
  const renderedAnswers = answers.map(answer => `\n- ${answer.line} = ${answer.answer}`);

  return {
    text: `Your saved answers:${renderedAnswers}\nTo forget an answer, type /f followed by the answer shortcut.`,
  };
};
