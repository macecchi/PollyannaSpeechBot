import { handler } from './bot';

const eventWithMessage = (text) => ({
  body: {
    message: {
      text,
      chat: {
        id: 68305226
      },
    },
  },
});

if (process.argv.length <= 2) {
  console.error(`Call this script passing the message as an argument.\nExample:\n\t${process.argv.join(' ')} "/s test"`);
  process.exit(1);
}

const text = process.argv[2];
const event = eventWithMessage(text);

handler(event, {}, (error, response) => {
  if (error) {
    console.error('Failed.\n', error, response);
    return;
  }

  console.log('Succeeded.\n', response);
});