import { handler } from './bot';

const event = {
  body: {
    message: {
      text: '/s teste',
      chat: {
        id: 68305226
      },
    },
  },
};

handler(event, {}, (error, response) => {
  if (error) {
    console.error('Failed.\n', error, response);
    return;
  }

  console.log('Succeeded.\n', response);
});