'use strict'

const { pathOr, all, __, toLower } = require('ramda')
const defaultNull = object => pathOr(null, __, object)
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const validEmail = function (value) { return emailRegex.test(toLower(value)) }

class Email {
  constructor (email) {
    const defaultToNull = defaultNull(email)
    this.to = defaultToNull(['to'])
    this.subject = defaultToNull(['subject'])
    this.message = defaultToNull(['message'])
    this.bcc = defaultToNull(['bcc'])
    this.cc = defaultToNull(['cc'])
  }

  isValid () {
    console.log(this)
    //  First just make sure we have the required values
    if (!this.to || !this.subject || !this.message) {
      return false
    }
    if (!all(validEmail, this.to)) { // are all the to's valid
      return false
    }
    if (this.cc && !all(validEmail, this.cc)) { // are all the cc's valid
      return false
    }
    if (this.bcc && !all(validEmail, this.bcc)) { // are all the bcc's valid
      return false
    }
    return true
  }

  setTo (to) {
    this.to = to
  }
  setSubject (subject) {
    this.subject = subject
  }
  setMessage (message) {
    this.message = message
  }
  setBCC (bcc) {
    this.bcc = bcc
  }
  setCC (cc) {
    this.cc = cc
  }

  getTo () {
    return this.to
  }
  getSubject () {
    return this.subject
  }
  getMessage () {
    return this.message
  }
  getBCC () {
    return this.bcc
  }
  getCC () {
    return this.cc
  }
}
module.exports = Email
