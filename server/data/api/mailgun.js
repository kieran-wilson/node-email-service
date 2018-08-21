const APIUtil = require('./index')
const apiConfig = require('../../config/mailgun')

const api = new APIUtil(apiConfig.HOST)

module.exports = class MailgunAPI {
  getMessagesEndpoint () {
    return `${apiConfig.DOMAIN}/messages`
  }

  /**
   * @param {Object} emailData Formatted data for mailgun
   * @returns {AxiosPromise}
   */
  sendEmail (emailData, config = {}) {
    return api.post(this.getMessagesEndpoint(), emailData, config)
  }
}
