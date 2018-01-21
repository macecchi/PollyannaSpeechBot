'use strict';

module.exports = {
  parseCommand(message) {
    const tokens = message.split(' ');
    if (!tokens[0].match(/^\//)) {
      return null;
    }
    const command = [];
    const cmd = tokens.shift();
    const match = cmd.match(/\/(\w*)/);
    if (match.length > 0) {
      command[match[1]] = tokens;
    }
    return command;
  },
  getMessage(message) {
    let m = '';
    if (message) {
      m = message.toString().trim();
    } else {
      m = '';
    }
    return (m.length > 0 ? m : 'N/A');
  },
};
