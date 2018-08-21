module.exports = {
  HOST: 'https://api.sendgrid.com',
  SEND_ROUTE: '/v3/mail/send',
  API_KEY: process.env.SENDGRID_KEY,
  FROM_ADDRESS: 'noreply@mg.kieranwilson.me'
}
