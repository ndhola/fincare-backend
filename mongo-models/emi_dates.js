/*
 * Author: Devraj Singh
 */

class EmiDates {
    constructor() {
        try {
            this.__emidates = new global.Mongoose.Schema({
                user_id: {type: String},
                user_email: {type: String},
                emi_id: {type: String},
                emi_name: {type: String},
                emi_amount: {type: Number},
                emi_due_day: {type: Number},
                is_active: {type: Boolean}
            }, {
                versionKey: false
            });
            this.emidates = global.Mongoose.model('emidates', this.__emidates);
        } catch (error) {
            this.emidates = global.Mongoose.model('emidates');
        }
    }
}

module.exports = EmiDates;