import { handler } from './bot';
import { sendMessage } from './telegram';

const mockActionResponse = {
  message: 'bla'
};

const mockActionError = new Error('fail');

jest.mock('./actions', () => ({
  test: () => Promise.resolve(mockActionResponse),
  error: () => Promise.reject(mockActionError),
}));

jest.mock('./telegram');

const eventWithMessage = (text) => ({
  body: {
    message: {
      text,
      chat: {
        id: 1234
      },
    },
  },
});

describe('Bot', () => {
  beforeEach(() => {
    sendMessage.mockResolvedValue();
    jest.resetAllMocks();
  });

  it('calls the callback function with action and no error when receiving a valid message event', async () => {
    const callback = jest.fn();
    const event = eventWithMessage('/test foo bar');

    await handler(event, {}, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, { name: 'test', arguments: 'foo bar' });
  });

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

  it('calls the telegram client with the response from the action execution', async () => {
    const callback = jest.fn();
    const event = eventWithMessage('/test');

    await handler(event, {}, callback);

    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(mockActionResponse);
  });

  it('calls the callback function with error when sendMessage fails', async () => {
    sendMessage.mockRejectedValueOnce(new Error('some error'));
    const callback = jest.fn();
    const event = eventWithMessage('/test');

    await handler(event, {}, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.any(Error), { name: 'test' });
  });

  it('calls the telegram client with error when action execution fails', async () => {
    const callback = jest.fn();
    const event = eventWithMessage('/error');

    await handler(event, {}, callback);

    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith({
      message: 'Sorry, there was an error.'
    });
  });

  it('calls the callback function with error when action execution fails', async () => {
    const callback = jest.fn();
    const event = eventWithMessage('/error');

    await handler(event, {}, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(mockActionError, { name: 'error' });
  });
});
