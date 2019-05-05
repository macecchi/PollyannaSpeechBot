import actions from './actions';
import { synthesizeText, availableVoices } from './polly';

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

    it('returns the synthesized text from polly as an audio', async () => {
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

  describe('List voices', () => {
    it('has a voices action', () => {
      expect(actions['voices']).toBeDefined();
      expect(actions['voices']).toBeInstanceOf(Function);
    });

    it('returns a formatted list of voices from polly', async () => {
      const voices = actions['voices'];
      availableVoices.mockResolvedValueOnce([
        {
          Id: 'Cristiano',
          Name: 'Cristiano',
          LanguageCode: 'pt-BR',
        }
      ]);

      const response = await voices();

      expect(availableVoices).toHaveBeenCalledTimes(1);
      expect(response).toEqual({
        text: 'Available voices: \n- Cristiano (pt-BR)\nTo change the voice, enter /v followed by the name of the voice.'
      })
    });
  });
});
