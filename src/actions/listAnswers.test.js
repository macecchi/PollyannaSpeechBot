import { fetchAnswers } from '../persist';
import listAnswers from './listAnswers';

jest.mock('../persist');

const chatId = '12345';

describe('List answers', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches and returns the answers saved for that chat', async () => {
    fetchAnswers.mockResolvedValue([
      {
        line: 'luke',
        answer: 'im your father',
      }
    ]);

    const response = await listAnswers(null, chatId);

    expect(response).toEqual({
      text: 'Your saved answers:\n- luke = im your father\nTo forget an answer, type /f followed by the answer shortcut.',
    });
  });
});
