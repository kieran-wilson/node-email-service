module.exports = {
  HOST: 'https://api.mailgun.net/v3',
  DOMAIN: process.env.MAILGUN_DOMAIN,
  USERNAME: 'api',
  API_KEY: process.env.MAILGUN_API_KEY,
  FROM_ADDRESS: 'noreply@mg.kieranwilson.me'
}
