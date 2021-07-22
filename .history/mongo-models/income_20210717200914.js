const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class Income {
  constructor() {
    try {
      this.__income = new global.Mongoose.Schema(
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
      this.Income = global.Mongoose.model("income", this.__income);
    } catch (error) {
      this.Income = global.Mongoose.model("income");
    }
  }
}

module.exports = Income;
