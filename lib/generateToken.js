const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  return jwt.sign({ user }, 'fincare4you', { expiresIn: '30d' })
}

module.exports = generateToken
