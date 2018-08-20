'use strict';

module.exports.checkKey = (event, context, callback) => {
	const data = JSON.parse(event.body);
	if (data.key !== process.env.EMAIL_KEY) {
		console.error('Validation Failed');
		callback(null, {
			statusCode: 400,
			headers: {'Content-Type': 'text/plain'},
			body: 'Invalid Key',
		});
		return;
	}

	// create a response
	const response = {
		statusCode: 200,
    body: JSON.stringify('Success'),
	};
	callback(null, response);
};