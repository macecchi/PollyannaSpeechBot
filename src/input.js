export const parseAction = (message) => {
  const text = message.trim();
  if (text.length === 0) {
    return null;
  }

  const match = text.match(/^(\/(?<name>\w+))? ?(?<arguments>.*)?/);
  const name = match.groups.name || 'answer';
  return {
    ...match.groups,
    name,
  };
};
