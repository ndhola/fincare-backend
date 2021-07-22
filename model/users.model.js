/**
 * Author: Falgun Manishbhai Makadia
 * Banner Id: B00874635
 */
const UsersSchema = require('../mongo-models/users')

class UserModel {
  /**
   * Description: Database Call to - check if User is already Registered or not
   * @param {*} email
   */
  static async IfUserAlreadyRegistered(email) {
    try {
      const userAlreadyExists = await new UsersSchema().users.findOne({
        email,
      })

      if (userAlreadyExists) {
        return true
      }
      return false
    } catch (error) {
      console.error('Error in model IfUserAlreadyRegistered!', error)
      return true
    }
  }

  /**
   * Description: Database Call to - get User ID by Email
   * @param {*} email
   */
  static async getUserId(email) {
    try {
      const user = await new UsersSchema().users
        .findOne({
          email,
        })
        .select('-password')
        .select('-otp')

      if (user) {
        return user
      }
      return null
    } catch (error) {
      console.error('Error in model getUserId!', error)
      return null
    }
  }

  /**
   * Description: Database Call to - Register a new User
   * @param {*} name
   * @param {*} email
   * @param {*} password
   */
  static async registerUser(name, email, password) {
    try {
      const user = await new UsersSchema().users.create({
        name,
        email,
        password,
        otp: null,
      })

      return user
    } catch (error) {
      console.error('Error in model registerUser', error)
      return null
    }
  }

  /**
   * Description: Database Call to - Login user
   * @param {*} email
   * @param {*} password
   * @returns
   */
  static async loginUser(email, password) {
    try {
      const user = await new UsersSchema().users.findOne({
        email,
        password,
      })

      if (user) {
        return user
      }
      return null
    } catch (error) {
      console.error('Error in model loginUser', error)
      return null
    }
  }

  /**
   * Description: Database Call to - Save OTP to Database
   * @param {*} email
   * @param {*} otp
   * @returns
   */
  static async saveOtpToDb(email, otp) {
    try {
      const query = { email }
      const update = {
        $set: { otp },
      }
      const options = { returnNewDocument: true }

      const user = await new UsersSchema().users.findOneAndUpdate(
        query,
        update,
        options
      )
      if (user) {
        return true
      }
      return false
    } catch (error) {
      console.error('Error in model saveOtpToDb', error)
      return false
    }
  }

  /**
   * Description: Database Call to - Verify OTP entered by User
   * @param {*} email
   * @param {*} otp
   * @returns
   */
  static async verifyOtp(email, otp) {
    try {
      const user = await new UsersSchema().users.findOne({ email })

      if (user && user.otp === otp) {
        return true
      }
      return false
    } catch (error) {
      console.error('Error in model verifyOtp', error)
      return false
    }
  }

  /**
   * Description: Database Call to - Update user Password
   * @param {*} email
   * @param {*} newPassword
   * @returns
   */
  static async updatePassword(email, newPassword) {
    try {
      const query = { email }
      const update = {
        $set: { password: newPassword },
      }
      const options = { returnNewDocument: true }

      const user = await new UsersSchema().users.findOneAndUpdate(
        query,
        update,
        options
      )
      if (user) {
        return true
      }
      return false
    } catch (error) {
      console.error('Error in model updatePassword', error)
      return false
    }
  }
}
module.exports = UserModel
