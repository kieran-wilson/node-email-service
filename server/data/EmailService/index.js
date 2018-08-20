'use strict';

const { indexOf, append, without } = require('ramda');

class EmailService {
  //  Providers will be used to iterate over to send emails
  providers = [];

  addProvider(provider) {
    if (indexOf(provider, this.providers) === -1) {
      this.providers = append(provider, this.providers);
    } else {
      console.error("Provider has already been added to email service", { providers: this.providers });
    }
  }

  removeProvider(provider) {
    this.providers = without([provider], this.providers);
  }

}

module.exports = new EmailService();
