import { synthesizeText } from '../polly';
import { fetchPreferences, fetchAnswer } from '../persist';
import answer from './answer';

jest.mock('../polly');
jest.mock('../persist');

const chatId = '1234';
const text = 'foo bar';
const answerText = 'this is the answer';
const mockVoice = 'foo bar voice';

describe('Answer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('retrieves the answer for that message and chat', async () => {
    fetchAnswer.mockResolvedValueOnce(answerText);

    await answer(text, chatId);

    expect(fetchAnswer).toHaveBeenCalledTimes(1);
    expect(fetchAnswer).toHaveBeenCalledWith(chatId, text);
  });

  it('returns the synthesized answer from polly along with the text', async () => {
    fetchAnswer.mockResolvedValueOnce(answerText);
    synthesizeText.mockResolvedValueOnce(mockVoice);
    fetchPreferences.mockResolvedValueOnce(null);

    const response = await answer(text, chatId);

    expect(synthesizeText).toHaveBeenCalledTimes(1);
    expect(synthesizeText).toHaveBeenCalledWith(answerText, null);
    expect(response).toEqual({
      voice: mockVoice,
      text: answerText,
    })
  });

  it('retrieves the saved voice from preferences to use with polly', async () => {
    fetchAnswer.mockResolvedValueOnce(answerText);
    fetchPreferences.mockResolvedValueOnce('Emma');

    await answer(text, chatId);

    expect(fetchPreferences).toHaveBeenCalledTimes(1);
    expect(fetchPreferences).toHaveBeenCalledWith(chatId);
    expect(synthesizeText).toHaveBeenCalledWith(expect.any(String), 'Emma');
  });

  it('does not call synthesize when answer is null', async () => {
    fetchAnswer.mockResolvedValueOnce(null);

    await answer(text, chatId);

    expect(synthesizeText).not.toHaveBeenCalled();
  });

  it('returns null when answer is null', async () => {
    fetchAnswer.mockResolvedValueOnce(null);

    const response = await answer(text, chatId);

    expect(response).toBeNull();
  });
});
