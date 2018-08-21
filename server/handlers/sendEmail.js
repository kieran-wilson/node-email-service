'use strict'

const Email = require('../data/Email')
const EmailService = require('../data/EmailService')
const mailgun = require('../data/providers/Mailgun')
const sendgrid = require('../data/providers/SendGrid')
const keyHandler = require('../utils/keyHandler')

EmailService.addProvider(mailgun)
EmailService.addProvider(sendgrid)

module.exports.sendEmail = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const validKey = keyHandler(data.key)
  if (validKey !== true) {
    console.error('Validation Failed')
    callback(null, validKey)
    return
  }

  const email = new Email(data)
  EmailService.sendEmail(email)
    .then(function () {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify('Success')
      }
      callback(null, response)
    })
    .catch(function (error) {
      const response = {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(error.toString())
      }
      callback(null, response)
    })
}
