import { parseAction } from './input';

describe('Helpers', () => {
  it('returns the action name from message with only the action', () => {
    const action = parseAction('/s');
    expect(action.name).toEqual('s');
  });

  it('returns the action name from message with action and arguments', () => {
    const action = parseAction('/s something');
    expect(action.name).toEqual('s');
  });

  it('returns the action argument', () => {
    const action = parseAction('/s something');
    expect(action.arguments).toEqual('something');
  });

  it('returns the action arguments when there are more than one', () => {
    const action = parseAction('/s foo bar');
    expect(action.arguments).toEqual('foo bar');
  });

  it('returns an undefined argument when there are no arguments', () => {
    const action = parseAction('/s');
    expect(action.arguments).toBeUndefined();
  });

  it('returns null when message is empty', () => {
    const action = parseAction('');
    expect(action).toBeNull();
  });

  it('returns the action "answer" when message does not have an action', () => {
    const action = parseAction('foo bar');
    expect(action.name).toEqual('answer');
    expect(action.arguments).toEqual('foo bar');
  });

  it('ignores spaces around message', () => {
    const action = parseAction(' /s foo bar ');
    expect(action.name).toEqual('s');
    expect(action.arguments).toEqual('foo bar');
  });
});
