/**
 * Author: Falgun Manishbhai Makadia
 * Banner Id: B00874635
 */
const Exception = require('../lib/exceptions')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UsersSchema = require('../mongo-models/users')

/**
 * Description: Protect middleware to verify JWT and prevent unauthorized access to specific routes
 */
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, 'fincare4you')
      console.log(decoded)
      req.user = await new UsersSchema().users
        .findById(decoded.user._id)
        .select('-password')
        .select('-otp')

      next()
    } catch (error) {
      console.error(error)
      return res.sendError(new Exception('TokenError'))
    }
  }

  if (!token) {
    return res.sendError(
      new Exception('TokenError', 'Not Authorized, No Token!')
    )
  }
})

module.exports = protect
