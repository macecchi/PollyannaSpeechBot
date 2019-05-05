import { availableVoices } from '../polly';
import voices from './voices';

jest.mock('../polly');

describe('List voices', () => {
  it('returns a formatted list of voices from polly', async () => {
    availableVoices.mockResolvedValueOnce([
      {
        Id: '123',
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
