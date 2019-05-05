import { availableVoices } from '../polly';
import { savePreferences } from '../persist';
import setVoice from './setVoice';

jest.mock('../polly');
jest.mock('../persist');

const chatId = '12345';

describe('Set voice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    availableVoices.mockResolvedValue([
      {
        Id: '123',
        Name: 'Cristiano',
        LanguageCode: 'pt-BR',
      }
    ]);
  });

  it('retrieves the available voices from polly', async () => {
    await setVoice('cristiano', chatId);

    expect(availableVoices).toHaveBeenCalledTimes(1);
  });

  it('saves the selected voice id in the preferences', async () => {
    await setVoice('cristiano', chatId);

    expect(savePreferences).toHaveBeenCalledTimes(1);
    expect(savePreferences).toHaveBeenCalledWith(chatId, '123');
  });

  it('returns a success message', async () => {
    const response = await setVoice('cristiano', chatId);

    expect(response).toEqual({
      text: 'Voice updated to Cristiano (pt-BR).',
    });
  });

  it('does not save the selected voice if it doesnt exist', async () => {
    await setVoice('asdasdasd', chatId);

    expect(savePreferences).not.toHaveBeenCalled();
  });

  it('returns an error message when the voice doesnt exist', async () => {
    const response = await setVoice('asdasdasd', chatId);

    expect(response).toEqual({
      text: 'Sorry, the selected voice is not available.',
    });
  });
});
