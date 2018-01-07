const index = require('./index');

let context = {
	succeed: () => {
		console.log('Succeeded');
	},
	fail: () => {
		console.log('Failed');
	}
};

let event = {
	body: {
		message: {
			text: '/s teste',
			chat: {
				id: 68305226
			},
		},
	},
};

index.handler(event, context);