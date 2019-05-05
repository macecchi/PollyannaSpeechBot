import { synthesizeText } from '../polly';
import { fetchPreferences } from '../persist';
import speak from './speak';

jest.mock('../polly');
jest.mock('../persist');

const chatId = '1234';
const text = 'foo bar';
const mockVoice = 'foo bar voice';

describe('Speak', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns the synthesized text from polly along with the text', async () => {
    synthesizeText.mockResolvedValueOnce(mockVoice);
    fetchPreferences.mockResolvedValueOnce(null);

    const response = await speak(text, chatId);

    expect(synthesizeText).toHaveBeenCalledTimes(1);
    expect(synthesizeText).toHaveBeenCalledWith(text, null);
    expect(response).toEqual({
      voice: mockVoice,
      text,
    })
  });

  it('retrieves the saved voice from preferences to use with polly', async () => {
    fetchPreferences.mockResolvedValueOnce('Emma');

    await speak(text, chatId);

    expect(fetchPreferences).toHaveBeenCalledTimes(1);
    expect(fetchPreferences).toHaveBeenCalledWith(chatId);
    expect(synthesizeText).toHaveBeenCalledWith(text, 'Emma');
  });
});
