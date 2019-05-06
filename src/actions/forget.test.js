import { forgetAnswer } from '../persist';
import forget from './forget';

jest.mock('../persist');

const chatId = '12345';
const line = 'line ';

describe('Forget answer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('calls the forget function for that chat and line in lowercase and trimmed', async () => {
    await forget(line, chatId);

    expect(forgetAnswer).toHaveBeenCalledTimes(1);
    expect(forgetAnswer).toHaveBeenCalledWith(chatId, 'line');
  });

  it('returns a message when successful', async () => {
    const response = await forget(line, chatId);

    expect(response).toEqual({
      text: 'Ok! I\'ll forget that.',
    });
  });
});
