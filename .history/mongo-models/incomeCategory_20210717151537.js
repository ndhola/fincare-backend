const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class IncomeCategory {
  constructor() {
    try {
      this.__incomeCategory = new global.Mongoose.Schema(
        {
          name: { type: String },
          userId: { type: Schema.Types.ObjectId, default: undefined },
        },
        {
          versionKey: false,
        }
      );
      this.incomeCategory = global.Mongoose.model(
        "incomecategory",
        this.__incomeCategory
      );
    } catch (error) {
      this.incomeCategory = global.Mongoose.model("incomecategory");
    }
  }
}

module.exports = IncomeCategory;
