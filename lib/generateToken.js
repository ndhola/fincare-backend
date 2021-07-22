/**
 * Author: Falgun Manishbhai Makadia
 * Banner Id: B00874635
 */
const jwt = require('jsonwebtoken')

/**
 * Description: Function to Generate Json Web Token
 * @param {*} user
 * @returns JWT Token
 */
const generateToken = (user) => {
  return jwt.sign({ user }, 'fincare4you', { expiresIn: '30d' })
}

module.exports = generateToken
