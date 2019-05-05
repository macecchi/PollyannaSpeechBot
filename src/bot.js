import actions from './actions';
import { parseAction } from './input';
import { sendMessage } from './telegram';

export const handler = async (event, context, callback) => {
  console.log('event:', JSON.stringify(event));
  const { message } = event.body;
  const chatId = message.chat.id;
  const action = parseAction(message.text);
  console.log('action:', action);

  try {
    if (!action || !actions[action.name]) {
      const errorMessage = 'Sorry, that is not a valid command.';
      sendMessage({ text: errorMessage }, chatId);
      callback(new Error('Invalid command'), null);
      return;
    }

    const response = await actions[action.name](action.arguments, chatId);
    if (response) {
      await sendMessage(response, chatId);
    }
  } catch (error) {
    const errorMessage = 'Sorry, there was an error.';
    sendMessage({ text: errorMessage }, chatId);
    callback(error, action);
    return;
  }

  callback(null, action);
};
