const APIUtil = require('./index')
const apiConfig = require('../../config/sendgrid')

const api = new APIUtil(apiConfig.HOST)

module.exports = class SendGridApi {
  getConfig () {
    return {
      headers: {Authorization: `Bearer ${apiConfig.API_KEY}`}
    }
  }

  /**
   * @param {Object} emailData Formatted data for mailgun
   * @returns {AxiosPromise}
   */
  sendEmail (emailData) {
    return api.post(apiConfig.SEND_ROUTE, emailData, this.getConfig())
  }
}
