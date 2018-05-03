const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const spotifyAuth = require('./api/routes/login');
const usersRoutes = require('./api/routes/users');

app.use(express.static(__dirname +'./../../build/'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, + './../../public/index.html'));
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:' + process.env.MONGO_PW + '@ds139675.mlab.com:39675/spotify-stop-watch', {
	useMongoClient: true
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Prevents CORS errors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}

	return next();
});

app.use('/login', spotifyAuth);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;