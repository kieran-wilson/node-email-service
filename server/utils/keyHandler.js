module.exports = function keyHandler (key) {
  if (key !== process.env.EMAIL_KEY) {
    return {
      statusCode: 400,
      headers: {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'},
      body: 'Invalid Key'
    }
  }
  return true
}
