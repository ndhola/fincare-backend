const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class Income {
  constructor() {
    try {
      this.__Income = new global.Mongoose.Schema(
        {
          title: { type: String },
          amount: { type: Number },
          dateOfIncome: { type: Number },
          paymentMethod: { type: String },
          categoryId: { type: Schema.Types.ObjectId, default: undefined },
          userId: { type: Schema.Types.ObjectId, default: undefined },
        },
        {
          versionKey: false,
        }
      );
      this.Income = global.Mongoose.model("Income", this.__Income);
    } catch (error) {
      this.Income = global.Mongoose.model("Income");
    }
  }
}

module.exports = Income;
