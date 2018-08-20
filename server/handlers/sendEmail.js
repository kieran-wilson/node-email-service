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
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log({data: error.response.data});
      console.log({status: error.response.status});
      console.log({headers: error.response.headers});
      console.log({request: error.request});
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log({config: error.config});
    const response = {
      statusCode: 400,
      body: JSON.stringify(error.toString()),
    };
    callback(null, response);
  }
};