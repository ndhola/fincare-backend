/**
 * Author: Falgun Manishbhai Makadia
 * Banner Id: B00874635
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

class Users {
  constructor() {
    try {
      this.__users = new global.Mongoose.Schema(
        {
          name: { type: String },
          email: { type: String },
          password: { type: String },
          userId: { type: Schema.Types.ObjectId, default: undefined },
          otp: { type: String, default: undefined },
        },
        {
          versionKey: false,
        }
      )
      this.users = global.Mongoose.model('users', this.__users)
    } catch (error) {
      this.users = global.Mongoose.model('users')
    }
  }
}

module.exports = Users
