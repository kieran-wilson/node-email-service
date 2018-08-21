const { either, isNil, isEmpty } = require('ramda')

module.exports.nilOrEmpty = either(isNil, isEmpty)
