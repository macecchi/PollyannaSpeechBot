import speak from './actions/speak';
import voices from './actions/voices';
import setVoice from './actions/setVoice';
import answer from './actions/answer';

export default {
  s: speak,
  v: setVoice,
  voices,
  answer,
};
