const mongoose = require('mongoose');

class Mongo {
    constructor() {
        //Set up default mongoose connection
        var mongoDB = `mongodb+srv://${global.CONFIG.get('mongo.user')}:${global.CONFIG.get('mongo.pass')}@${global.CONFIG.get('mongo.host')}/${global.CONFIG.get('mongo.databaseName')}`;
        console.log("mongoDB",mongoDB);
        const options = {
            useNewUrlParser: true,
            useFindAndModify: false
        };

        mongoose
            .connect(
                mongoDB,
                options
            )
            .then(
                () => {
                    console.info(`Connected to Mongo Database`);
                    global.Mongoose = mongoose;
                    global.Mongoose.Promise = global.Promise;
                    mongoose.set('debug', global.CONFIG.get('mongo.debug'));

                },
                err => {
                    console.error(`Failed connecting to Mongo Database: ${err}`);
                }
            );
    }
}

module.exports = Mongo;
