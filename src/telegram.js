import TelegramBot from 'node-telegram-bot-api';

const Bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

export const sendMessage = async (message, chatId) => {
  const { voice, caption } = message;
  if (voice) {
    return Bot.sendVoice(chatId, voice, { caption });
  }

  return Bot.sendMessage(chatId, message.message);
};
