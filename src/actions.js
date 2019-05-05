import speak from './actions/speak';
import voices from './actions/voices';
import setVoice from './actions/setVoice';

export default {
  s: speak,
  v: setVoice,
  voices,
};
