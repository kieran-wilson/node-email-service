'use strict'

const { reject, forEachObjIndexed, map, ifElse } = require('ramda')
const { nilOrEmpty } = require('../../../utils/ramdaUtils')
const MailgunAPI = require('../../../data/api/mailgun')
const ProviderBaseClass = require('../ProviderBaseClass')
const apiConfig = require('../../../config/mailgun')
const FormData = require('form-data')

const mailgunAPI = new MailgunAPI()
const isArray = function (item) {
  return item.constructor === Array
}

class Mailgun extends ProviderBaseClass {
  /**
   * Gets the values from the email class in a key value pair and strip null or empty values
   * @param {Email} email
   * @returns {object}
   */
  formatEmail (email) {
    return reject(
      nilOrEmpty,
      {
        from: apiConfig.FROM_ADDRESS,
        to: email.getTo(),
        subject: email.getSubject(),
        text: email.getMessage(),
        bcc: email.getBCC(),
        cc: email.getCC()
      })
  }

  /**
   * @param {Object} headers
   * @returns {{auth: {username: string, password: string}, headers: Object}}
   */
  getConfig (headers) {
    return {
      auth: {
        username: apiConfig.USERNAME,
        password: apiConfig.API_KEY
      },
      headers
    }
  }

  /**
   * This is essentially because FormData is really annoying and hard to work with
   * If its a value we add it multiple times with the same key and each value
   * If its a base value then just add it directly
   *
   * @param {Object} emailData
   * @returns {FormData}
   */
  formatFormData (emailData) {
    const data = new FormData()
    forEachObjIndexed(
      function (value, key) {
        return ifElse(
          isArray,
          map(function (nestedVal) {
            data.append(key, nestedVal)
          }),
          function () {
            data.append(key, value)
          }
        )(value)
      },
      emailData
    )
    return data
  }

  /**
   * Take the email object, extract what we want, turn it into form data, the post it
   *
   * @param {Email} email
   * @returns {AxiosPromise}
   */
  sendEmail (email) {
    const emailData = this.formatFormData(this.formatEmail(email))
    return mailgunAPI.sendEmail(emailData, this.getConfig(emailData.getHeaders()))
  }
}
module.exports = new Mailgun()
