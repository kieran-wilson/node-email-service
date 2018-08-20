const APIUtil = require('./index');
const apiConfig = require("../../config/mailgun");
const querystring = require('querystring');
const { forEachObjIndexed } = require('ramda');
const FormData = require('form-data');

const api = new APIUtil(apiConfig.HOST);

module.exports = class MailgunAPI {
  getMessagesEndpoint() {
    return `${apiConfig.DOMAIN}/messages`;
  }

  getConfig() {
    return {
      auth: {
        username: apiConfig.USERNAME,
        password: apiConfig.API_KEY
      },
      headers: {'Content-Type': 'multipart/form-data' }
    }
  }

  /**
   * @param {Object} emailData Formatted data for mailgun
   * @returns {AxiosPromise}
   */
  sendEmail(emailData) {
    const data = new FormData();
    forEachObjIndexed(function(value, key) { data.append(key, value); }, emailData);
    return api.post(this.getMessagesEndpoint(), data, this.getConfig());
  }
}
