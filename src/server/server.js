require('dotenv').config({path: __dirname + '/.env'});
const app = require('./app');

const port = process.env.PORT || 8080;
app.listen(port);