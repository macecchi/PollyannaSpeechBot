import { saveAnswer } from '../persist';
import learn from './learn';

jest.mock('../persist');

const chatId = '12345';
const text = 'Luke = im your father';
const line = 'luke';
const answer = 'im your father';

describe('Learn', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('saves the line in lowercase and answer for that chat', async () => {
    await learn(text, chatId);

    expect(saveAnswer).toHaveBeenCalledTimes(1);
    expect(saveAnswer).toHaveBeenCalledWith(chatId, line, answer);
  });

  it('returns a message saying it was saved successfully', async () => {
    const response = await learn(text, chatId);

    expect(response).toEqual({
      text: 'Lesson learned! Thanks!'
    });
  });

  it('returns an error message when saving the answer fails', async () => {
    saveAnswer.mockRejectedValue(new Error('some error'));
    const response = await learn(text, chatId);

    expect(response).toEqual({
      text: 'Sorry, I was not able to learn that. Try again later.'
    });
  });

  it('returns an error message when the text is in an invalid format', async () => {
    const response = await learn('wrong/format', chatId);

    expect(response).toEqual({
      text: 'Oops! Please teach me using the format: <line> = <answer>'
    });
  });
});
