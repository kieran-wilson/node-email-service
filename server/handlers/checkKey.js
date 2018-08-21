'use strict'
const keyHandler = require('../utils/keyHandler')

module.exports.checkKey = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const validKey = keyHandler(data.key)
  if (validKey !== true) {
    console.error('Validation Failed')
    callback(null, validKey)
    return
  }

  // create a response
  const response = {
    statusCode: 200,
    body: JSON.stringify('Success')
  }
  callback(null, response)
}
