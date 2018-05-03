// Dependencies
const express = require('express');
const router = express.Router();
const request = require('request');
const SpotifyLogin = require('../auth/spotify-auth');

// Routes
router.get('/', (req, res) => {
	SpotifyLogin.LogInSpotify(res);
});

router.get('/callback', (req, res) => {
	SpotifyLogin.RetrieveTokens(req,res);
});

router.get('/display_db', (req, res) => {
	SpotifyUser.find({}, (err, data) => {
		res.send(data);
	});
});

module.exports = router;