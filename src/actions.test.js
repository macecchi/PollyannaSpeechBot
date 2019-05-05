import actions from './actions';
import speak from './actions/speak';
import voices from './actions/voices';
import setVoice from './actions/setVoice';
import answer from './actions/answer';
import learn from './actions/learn';

describe('Commands', () => {
  it('has a speak action', () => {
    expect(actions['s']).toEqual(speak);
  });

  it('has a voices action', () => {
    expect(actions['voices']).toEqual(voices);
  });

  it('has a set voice action', () => {
    expect(actions['v']).toEqual(setVoice);
  });

  it('has an answer action', () => {
    expect(actions['answer']).toEqual(answer);
  });

  it('has a learn action', () => {
    expect(actions['learn']).toEqual(learn);
  });
});
