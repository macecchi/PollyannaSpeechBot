import actions from './actions';
import { parseAction } from './helpers';
import { sendMessage } from './telegram';

export const handler = async (event, context, callback) => {
  const { message } = event.body;
  const action = parseAction(message.text);

  if (!action || !actions[action.name]) {
    callback(new Error('Invalid command'), null);
    return;
  }

  try {
    const response = await actions[action.name](action.arguments);
    await sendMessage(response);
  } catch (error) {
    await sendMessage({
      message: 'Sorry, there was an error.'
    });
    callback(error, action);
    return;
  }

  callback(null, action);
};
