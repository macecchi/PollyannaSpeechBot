import actions from './actions';
import { synthesizeText } from './polly';

jest.mock('./polly');

describe('Commands', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Speak', () => {
    it('has a speak action', () => {
      expect(actions['s']).toBeDefined();
      expect(actions['s']).toBeInstanceOf(Function);
    });

    it('returns the synthesized text as an audio', async () => {
      const speak = actions['s'];
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
});
