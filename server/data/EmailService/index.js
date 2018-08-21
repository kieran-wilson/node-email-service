'use strict'

const { indexOf, append, without } = require('ramda')
let providers = []

class EmailService {
  //  Providers will be used to iterate over to send emails
  get providers () {
    return providers
  }
  set providers (newProviders) {
    providers = newProviders
  }

  /**
   * @param {Email} email
   */
  async sendEmail (email) {
    if (email.isValid()) {
      for (let i = 0, len = this.providers.length; i < len; i++) {
        try {
          await this.providers[i].sendEmail(email)
          return true
        } catch (e) {
          console.error(`[${i}] Provider failed: ${JSON.stringify(this.providers[i])}`)
        }
      }
      throw new Error('Email was not sent, all providers failed')
    } else {
      throw new Error('Email could not be sent, it is invalid: ' + JSON.stringify(email))
    }
  }

  addProvider (provider) {
    if (indexOf(provider, this.providers) === -1) {
      this.providers = append(provider, this.providers)
    } else {
      console.error('Provider has already been added to email service', { providers: this.providers })
    }
  }

  removeProvider (provider) {
    this.providers = without([provider], this.providers)
  }
}

module.exports = new EmailService()
