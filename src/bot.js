import actions from './actions';
import { parseAction } from './helpers';
import { sendMessage } from './telegram';

export const handler = async (event, context, callback) => {
  const { message } = event.body;
  const chatId = message.chat.id;
  const action = parseAction(message.text);

  try {
    if (!action || !actions[action.name]) {
      const errorMessage = 'Sorry, that is not a valid command.';
      sendMessage({ text: errorMessage }, chatId);
      callback(new Error('Invalid command'), null);
      return;
    }

    const response = await actions[action.name](action.arguments, chatId);
    await sendMessage(response, chatId);
  } catch (error) {
    const errorMessage = 'Sorry, there was an error.';
    sendMessage({ text: errorMessage }, chatId);
    callback(error, action);
    return;
  }

  callback(null, action);
};
