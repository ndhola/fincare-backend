const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/');
const response = require('./middlewares/response');
let cors = require('cors');
global.CONFIG = require('./config/index');
const Mongo = require('./lib/mongo-connection');
new Mongo();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, identity, authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
    }
    next();
});
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json(), response);
app.use('/api/',routes);

app.listen(PORT, () => console.log(`Port listening at: ${PORT}`));
process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.info('Server Restarting...');
});