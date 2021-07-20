const UsersSchema = require('../mongo-models/users')

class UserModel {
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

  static async getUserId(email) {
    try {
      const user = await new UsersSchema().users.findOne({
        email,
      })

      if (user) {
        return user
      }
      return null
    } catch (error) {
      console.error('Error in model getUserId!', error)
      return null
    }
  }

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
