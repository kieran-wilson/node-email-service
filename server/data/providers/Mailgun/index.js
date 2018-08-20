'use strict'

const { reject } = require('ramda');
const { nilOrEmpty } = require('../../../utils/ramdaUtils');
const MailgunAPI = require('../../../data/api/mailgun');
const ProviderBaseClass = require('../ProviderBaseClass');

const mailgunAPI = new MailgunAPI()

class Mailgun extends ProviderBaseClass {
  /**
   * @param {Email} email
   */
  formatEmail(email) {
    return reject(
      nilOrEmpty,
      {
        from: email.getTo(),
        to: email.getTo(),
        subject: email.getSubject(),
        message: email.getMessage(),
        bcc: email.getBCC(),
        cc: email.getCC()
      });
  }

  async sendEmail (email) {
    await mailgunAPI.sendEmail(this.formatEmail(email));
  }
}
module.exports = new Mailgun();
