'use strict'

const { forEach, append } = require('ramda')
const SendGridAPI = require('../../../data/api/sendgrid')
const ProviderBaseClass = require('../ProviderBaseClass')
const apiConfig = require('../../../config/sendgrid')
const sendGridAPI = new SendGridAPI()

class SendGrid extends ProviderBaseClass {
  /**
   * @param {Email} email
   */
  formatEmail (email) {
    let data = {
      personalizations: [{
        subject: email.getSubject()
      }],
      from: {
        email: apiConfig.FROM_ADDRESS
      },
      content: [
        {
          type: 'text/plain',
          value: email.getMessage()
        }
      ]
    }
    forEach(function (email) {
      data.personalizations[0].to = append(
        {'email': email},
        data.personalizations[0].to
      )
    }, email.getTo())
    forEach(function (email) {
      data.personalizations[0].bcc = append(
        {'email': email},
        data.personalizations[0].bcc
      )
    }, email.getBCC())
    forEach(function (email) {
      data.personalizations[0].cc = append(
        {'email': email},
        data.personalizations[0].cc
      )
    }, email.getCC())
    return data
  }

  sendEmail (email) {
    return sendGridAPI.sendEmail(this.formatEmail(email))
  }
}
module.exports = new SendGrid()
