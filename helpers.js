export const parseAction = (message) => {
  const match = message.trim().match(/^\/(?<name>\w+)( (?<arguments>.*))?/);
  if (!match) {
    return null;
  }

  return {
    ...match.groups,
  };
};
