const index = require('./index');

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

index.handler(event, {}, (error, response) => {
  if (error) {
    console.error('Failed');
    return;
  }

  console.log('Succeeded.\n', response);
});