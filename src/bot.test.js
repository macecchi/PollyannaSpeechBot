import { handler } from './bot';
import { sendMessage } from './telegram';
import actions from './actions';

const mockActionResponse = {
  text: 'bla',
};

const mockActionError = new Error('fail');

jest.mock('./actions', () => ({
  test: () => Promise.resolve(mockActionResponse),
  blank: () => Promise.resolve(null),
  error: () => Promise.reject(mockActionError),
}));

jest.mock('./telegram');

const chatId = '12345';
const eventWithMessage = (text) => ({
  body: {
    message: {
      text,
      chat: {
        id: chatId
      },
    },
  },
});

describe('Bot handler', () => {
  beforeEach(() => {
    sendMessage.mockResolvedValue();
    jest.resetAllMocks();
  });

  describe('when the message is valid', () => {
    it('calls the callback function with the action and no error', async () => {
      const callback = jest.fn();
      const event = eventWithMessage('/test foo bar');

      await handler(event, {}, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(null, { name: 'test', arguments: 'foo bar' });
    });

    it('runs the action with the arguments and the chat id', async () => {
      const mockAction = jest.fn();
      actions['mock'] = mockAction;
      const event = eventWithMessage('/mock bla');

      await handler(event, {}, jest.fn());

      expect(mockAction).toHaveBeenCalledTimes(1);
      expect(mockAction).toHaveBeenCalledWith('bla', chatId);
    });

    it('sends a message with the response from the action and the chat id', async () => {
      const callback = jest.fn();
      const event = eventWithMessage('/test');

      await handler(event, {}, callback);

      expect(sendMessage).toHaveBeenCalledTimes(1);
      expect(sendMessage).toHaveBeenCalledWith(mockActionResponse, chatId);
    });

    it('does not send a message if the action does not have a response', async () => {
      const callback = jest.fn();
      const event = eventWithMessage('/blank');

      await handler(event, {}, callback);

      expect(sendMessage).not.toHaveBeenCalled();
    });
  });

  describe('when the message is not valid', () => {
    it('calls the callback function with error when message does not have an action', async () => {
      const callback = jest.fn();
      const event = eventWithMessage('asdasd');

      await handler(event, {}, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(expect.any(Error), null);
    });

    it('calls the callback function with error when the action is invalid', async () => {
      const callback = jest.fn();
      const event = eventWithMessage('/bla');

      await handler(event, {}, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(expect.any(Error), null);
    });

    it('sends a message with error when action is invalid', async () => {
      const callback = jest.fn();
      const event = eventWithMessage('/bla');

      await handler(event, {}, callback);

      expect(sendMessage).toHaveBeenCalledTimes(1);
      expect(sendMessage).toHaveBeenCalledWith({
        text: 'Sorry, that is not a valid command.'
      }, chatId);
    });
  });

  describe('when the action fails', () => {
    it('sends a message with an error message', async () => {
      const callback = jest.fn();
      const event = eventWithMessage('/error');

      await handler(event, {}, callback);

      expect(sendMessage).toHaveBeenCalledTimes(1);
      expect(sendMessage).toHaveBeenCalledWith({
        text: 'Sorry, there was an error.'
      }, chatId);
    });

    it('calls the callback function with error', async () => {
      const callback = jest.fn();
      const event = eventWithMessage('/error');

      await handler(event, {}, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(mockActionError, { name: 'error' });
    });
  });

  describe('when sending the message fails', () => {
    it('calls the callback function with error', async () => {
      sendMessage.mockRejectedValueOnce(new Error('some error'));
      const callback = jest.fn();
      const event = eventWithMessage('/test');

      await handler(event, {}, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(expect.any(Error), { name: 'test' });
    });
  });
});
