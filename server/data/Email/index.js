'use strict';

const { pathOr, __ } = require('ramda');
const defaultNull = object => pathOr(null, __, object);

module.exports = class Email {
  constructor (email) {
    const defaultToNull = defaultNull(email);
    this.to = defaultToNull(['to']);
    this.subject = defaultToNull(['subject']);
    this.message = defaultToNull(['message']);
    this.bcc = defaultToNull(['bcc']);
    this.cc = defaultToNull(['cc']);
  }

  setTo(to) {
    this.to = to;
  }
  setSubject(subject) {
    this.subject = subject;
  }
  setMessage(message) {
    this.message = message;
  }
  setBCC(bcc) {
    this.bcc = bcc;
  }
  setCC(cc) {
    this.cc  = cc;
  }

  getTo() {
    return this.to;
  }
  getSubject() {
    return this.subject;
  }
  getMessage() {
    return this.message;
  }
  getBCC() {
    return this.bcc;
  }
  getCC() {
    return this.cc;
  }
}
