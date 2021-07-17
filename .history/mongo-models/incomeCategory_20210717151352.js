const mongoose = require('mongoose')
const Schema = mongoose.Schema;

class ExpenseCategory {
    constructor() {
        try {
            this.__expenseCategory = new global.Mongoose.Schema({
                name: {type: String},
                userId: { type: Schema.Types.ObjectId ,default:undefined }
            }, {
                versionKey: false
            });
            this.expenseCategory = global.Mongoose.model('expensecategory', this.__expenseCategory);
        } catch (error) {
            this.expenseCategory = global.Mongoose.model('expensecategory');
        }
    }
}

module.exports = ExpenseCategory;
