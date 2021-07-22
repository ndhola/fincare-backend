/**
 * Author: Falgun Manishbhai Makadia
 * Banner Id: B00874635
 */
const Exception = require('../lib/exceptions')
const UserModel = require('../model/users.model')
const { sendOtpToEmail, generateOtp } = require('../lib/EmailUtils')
const generateToken = require('../lib/generateToken')

class UsersController {
  /**
   * Description: Register User Controller - Business Logic for Register User
   */
  static async registerUser(req, res) {
    try {
      const { name, email, password } = req.body

      let invalidParams = []

      if (!name) {
        invalidParams.push('Name')
      }
      if (!email) {
        invalidParams.push('Email')
      }
      if (!password) {
        invalidParams.push('Password')
      }
      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            'MissingParameter',
            'Parameters missing: ' + invalidParams.join(', ')
          )
        )
      }

      const userAlreadyRegistered = await UserModel.IfUserAlreadyRegistered(
        email
      )
      if (userAlreadyRegistered) {
        return res.sendResponse({
          success: false,
          message: 'User Registration with this Email already exists!',
        })
      }

      const registerUserResult = await UserModel.registerUser(
        name,
        email,
        password
      )

      if (registerUserResult) {
        return res.sendResponse({
          success: true,
          message: 'User Register Success!',
          data: registerUserResult,
        })
      } else {
        return res.sendError(new Exception('GeneralError'))
      }
    } catch (error) {
      console.error('Error in registerUser', error)
      return res.sendError(new Exception('GeneralError'))
    }
  }

  /**
   * Description: Login with Password Controller - Business Logic for Login user with Password
   */
  static async loginUserWithPassword(req, res) {
    try {
      const { email, password } = req.body

      let invalidParams = []

      if (!email) {
        invalidParams.push('Email')
      }
      if (!password) {
        invalidParams.push('Password')
      }
      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            'MissingParameter',
            'Parameters missing: ' + invalidParams.join(', ')
          )
        )
      }

      const loginUserResult = await UserModel.loginUser(email, password)

      if (loginUserResult) {
        const user = await UserModel.getUserId(email)

        return res.sendResponse({
          success: true,
          message: 'User Login Success!',
          data: loginUserResult,
          token: generateToken(user),
        })
      } else {
        return res.sendResponse({
          success: false,
          message: 'Invalid Credentials!',
        })
      }
    } catch (error) {
      console.error('Error in loginUser', error)
      return res.sendError(new Exception('GeneralError'))
    }
  }

  /**
   * Description: Login with OTP Controller - Business Logic for Login user with OTP
   */
  static async loginUserWithOtp(req, res) {
    try {
      const { email } = req.body

      let invalidParams = []

      if (!email) {
        invalidParams.push('Email')
      }

      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            'MissingParameter',
            'Parameters missing: ' + invalidParams.join(', ')
          )
        )
      }

      const otp = generateOtp()

      const userAlreadyRegistered = await UserModel.IfUserAlreadyRegistered(
        email
      )
      if (userAlreadyRegistered) {
        sendOtpToEmail(email, otp, 'FinCare Login', 'Login to FinCare account')
      } else {
        return res.sendResponse({
          success: false,
          message: 'User Registration with this Email do not exist',
        })
      }
      await UserModel.saveOtpToDb(email, otp)
      return res.sendResponse({
        success: true,
        message: `Login OTP Email is sent successfully to ${email}!`,
        data: {
          email,
          otp,
        },
      })
    } catch (error) {
      console.error('Error in loginUserWithOtp', error)
      return res.sendError(
        new Exception('GeneralError', 'OTP Email for Login could not be sent!')
      )
    }
  }

  /**
   * Description: Verify OTP Controller - Business Logic for Verifying OTP entered by User
   */
  static async verifyOtp(req, res) {
    try {
      const { email, otp } = req.body

      let invalidParams = []

      if (!email) {
        invalidParams.push('Email')
      }

      if (!otp) {
        invalidParams.push('OTP')
      }

      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            'MissingParameter',
            'Parameters missing: ' + invalidParams.join(', ')
          )
        )
      }

      const optVerificationStatus = await UserModel.verifyOtp(email, otp)

      if (optVerificationStatus) {
        const user = await UserModel.getUserId(email)
        return res.sendResponse({
          success: true,
          message: 'OTP Verification Successful!',
          token: generateToken(user),
        })
      } else {
        return res.sendResponse({
          success: false,
          message: 'OTP Verification Failed!',
        })
      }
    } catch (error) {
      console.error('Error in verifyOtp', error)
      return res.sendError(
        new Exception('GeneralError', 'OTP cound not be verified!')
      )
    }
  }

  /**
   * Description: Send OTP for Forgot Password Controller - Business Login for sending OTP for Forgot Password
   */
  static async forgotPasswrdSendOtp(req, res) {
    try {
      const { email } = req.body

      let invalidParams = []

      if (!email) {
        invalidParams.push('Email')
      }

      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            'MissingParameter',
            'Parameters missing: ' + invalidParams.join(', ')
          )
        )
      }

      const otp = generateOtp()

      const userAlreadyRegistered = await UserModel.IfUserAlreadyRegistered(
        email
      )
      if (userAlreadyRegistered) {
        sendOtpToEmail(email, otp, 'FinCare Password Reset', 'Password Reset')
      } else {
        return res.sendResponse({
          success: false,
          message: 'User Registration with this Email do not exist',
        })
      }

      await UserModel.saveOtpToDb(email, otp)

      return res.sendResponse({
        success: true,
        message: `OTP for Password Reset is sent successfully to ${email}!`,
        data: {
          email,
          otp,
        },
      })
    } catch (error) {
      console.error('Error in forgotPasswrdSendOtp', error)
      return res.sendError(
        new Exception(
          'GeneralError',
          'OTP Email for Forgot Password could not be sent!'
        )
      )
    }
  }

  /**
   * Description: Forgot Password Reset Controller - Business Login for Resetting new Password after successful OTP verification
   */
  static async forgotPasswrdReset(req, res) {
    try {
      const { email, newPassword } = req.body

      let invalidParams = []

      if (!email) {
        invalidParams.push('Email')
      }

      if (!newPassword) {
        invalidParams.push('NewPassword')
      }

      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            'MissingParameter',
            'Parameters missing: ' + invalidParams.join(', ')
          )
        )
      }

      const passwordResetStatus = await UserModel.updatePassword(
        email,
        newPassword
      )

      if (passwordResetStatus) {
        return res.sendResponse({
          success: true,
          message: 'Password Reset Successful!',
        })
      } else {
        return res.sendResponse({
          success: false,
          message: 'Password Reset Failed!',
        })
      }
    } catch (error) {
      console.error('Error in forgotPasswrdReset', error)
      return res.sendError(
        new Exception('GeneralError', 'Password Reset Failed!')
      )
    }
  }
}

module.exports = UsersController
