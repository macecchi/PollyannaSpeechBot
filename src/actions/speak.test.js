import { synthesizeText } from '../polly';
import speak from './speak';

jest.mock('../polly');

describe('Speak', () => {
  it('returns the synthesized text from polly along with the text', async () => {
    const text = 'foo bar';
    const mockVoice = 'foo bar voice';
    synthesizeText.mockResolvedValueOnce(mockVoice);

    const response = await speak(text);

    expect(synthesizeText).toHaveBeenCalledTimes(1);
    expect(synthesizeText).toHaveBeenCalledWith(text);
    expect(response).toEqual({
      voice: mockVoice,
      text,
    })
  });
});
