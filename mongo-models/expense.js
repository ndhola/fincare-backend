/**
 * Author: Kirtan Revinbhai Dudhatra
 * Banner Id: B00863410
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

class Expense {
    constructor() {
        try {
            this.__expense = new global.Mongoose.Schema({
                title: {type: String},
                amount: {type: Number},
                dateOfExpense: {type: Number},
                paymentMethod: {type: String},
                categoryId: { type: Schema.Types.ObjectId ,default:undefined },
                userId: { type: Schema.Types.ObjectId ,default:undefined }
            }, {
                versionKey: false
            });
            this.expense = global.Mongoose.model('expense', this.__expense);
        } catch (error) {
            this.expense = global.Mongoose.model('expense');
        }
    }
}

module.exports = Expense;
