import TelegramBot from 'node-telegram-bot-api';
import { sendMessage } from './telegram';

jest.mock('node-telegram-bot-api');

const chatId = '12345';
const text = 'foo bar';

describe('Telegram client', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates the telegram client with the environment token', () => {
    expect(TelegramBot).toHaveBeenCalledWith('token');
  });

  it('calls send message method when message field is present', () => {
    const message = {
      message: text
    };

    sendMessage(message, chatId);

    expect(TelegramBot.prototype.sendMessage).toHaveBeenCalledTimes(1);
    expect(TelegramBot.prototype.sendMessage).toHaveBeenCalledWith(chatId, text);
    expect(TelegramBot.prototype.sendVoice).not.toHaveBeenCalled();
  });

  it('calls send voice method when voice field is present', () => {
    const message = {
      voice: 'foo bar audio',
      caption: 'foo bar',
    };

    sendMessage(message, chatId);

    expect(TelegramBot.prototype.sendVoice).toHaveBeenCalledTimes(1);
    expect(TelegramBot.prototype.sendVoice).toHaveBeenCalledWith(chatId, message.voice, { caption: message.caption });
    expect(TelegramBot.prototype.sendMessage).not.toHaveBeenCalled();
  });
});
