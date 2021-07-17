class OptReports {
    constructor() {
        try {
            this.__optreports = new global.Mongoose.Schema({
                user_id: {type: String},
                user_email: {type: String},
                is_opted: {type: Boolean}
            }, {
                versionKey: false
            });
            this.optreports = global.Mongoose.model('optreports', this.__optreports);
        } catch (error) {
            this.optreports = global.Mongoose.model('optreports');
        }
    }
}

module.exports = OptReports;