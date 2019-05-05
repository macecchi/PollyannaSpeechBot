import actions from './actions';
import { parseAction } from './helpers';
import { sendMessage } from './telegram';

export const handler = async (event, context, callback) => {
  const { message } = event.body;
  const chatId = message.chat.id;
  const action = parseAction(message.text);

  if (!action || !actions[action.name]) {
    callback(new Error('Invalid command'), null);
    return;
  }

  try {
    const response = await actions[action.name](action.arguments);
    await sendMessage(response, chatId);
  } catch (error) {
    await sendMessage({
      text: 'Sorry, there was an error.'
    }, chatId);
    callback(error, action);
    return;
  }

  callback(null, action);
};
