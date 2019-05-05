import TelegramBot from 'node-telegram-bot-api';

const Bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

export const sendMessage = async (message, chatId) => {
  const { text, voice } = message;
  if (voice) {
    return Bot.sendVoice(chatId, voice, { caption: text });
  }

  return Bot.sendMessage(chatId, text);
};
