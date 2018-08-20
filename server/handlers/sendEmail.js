'use strict';

const Email = require('../data/Email');
const mailgun = require('../data/providers/Mailgun');

module.exports.sendEmail = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  const email = new Email(data);
  try {
    const result = await mailgun.sendEmail(email);
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify('Success'),
    };
    callback(null, response);
  } catch (error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify(error.toString()),
    };
    callback(null, response);
  }
};