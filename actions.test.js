import actions from './actions';

describe('Commands', () => {
  it('has a speech action', () => {
    expect(actions['s']).toBeDefined();
    expect(actions['s']).toBeInstanceOf(Function);
  });
});
