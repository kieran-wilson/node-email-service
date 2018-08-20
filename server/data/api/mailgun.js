const APIUtil = require('./index');
const apiConfig = require("../../config/mailgun");
const { forEachObjIndexed, map, ifElse } = require('ramda');
const FormData = require('form-data');

const api = new APIUtil(apiConfig.HOST);
const isArray = function(item) {
  return item.constructor === Array;
}

module.exports = class MailgunAPI {
  getMessagesEndpoint() {
    return `${apiConfig.DOMAIN}/messages`;
  }

  getConfig(headers) {
    return {
      auth: {
        username: apiConfig.USERNAME,
        password: apiConfig.API_KEY
      },
      headers
    }
  }

  formatFormData(emailData) {
    const data = new FormData();
    forEachObjIndexed(
      function(value, key) {
        return ifElse(
          isArray,
          map(function(nestedVal) {
            data.append(key, nestedVal);
          }),
          function() {
            data.append(key, value);
          }
        )(value)
      },
      emailData
    );
    console.log({data, emailData});
    return data;
  }

  /**
   * @param {Object} emailData Formatted data for mailgun
   * @returns {AxiosPromise}
   */
  sendEmail(emailData) {
    const data = this.formatFormData(emailData);
    return api.post(this.getMessagesEndpoint(), data, this.getConfig(data.getHeaders()));
  }
  /**
   * @param {Object} emailData Formatted data for mailgun
   * @returns {AxiosPromise}
   *//*
  sendEmail(emailData) {
    const data = new FormData();
    data.append('from', 'noreply@mg.kieranwilson.me');
    data.append('to', 'hello@kieranwilson.me');
    data.append('subject', 'hello');
    data.append('text', 'text');
    console.log({data});
    return api.post(this.getMessagesEndpoint(), data, this.getConfig(data.getHeaders()));
  }*/
}
