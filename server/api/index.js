const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const spotifyAuth = require('./routes/login');
const usersRoutes = require('./routes/users');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECTION);

// Prevents CORS errors
router.use((req, res, next) => {
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

router.use('/login', spotifyAuth);
router.use('/users', usersRoutes);

router.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

router.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = router;