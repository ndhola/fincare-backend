const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/');
const response = require('./middlewares/response');
const PORT = 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json(), response);
app.use(routes);

app.listen(PORT, () => console.log(`Port listening at: ${PORT}`));
process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.info('Server Restarting...');
});