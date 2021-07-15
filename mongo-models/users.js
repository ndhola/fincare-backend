class Users {
    constructor() {
        try {
            this.__users = new global.Mongoose.Schema({
                name: {type: String},
                email: {type: String}
            }, {
                versionKey: false
            });
            this.users = global.Mongoose.model('users', this.__users);
        } catch (error) {
            this.users = global.Mongoose.model('users');
        }
    }
}

module.exports = Users;
