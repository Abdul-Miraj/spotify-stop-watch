// Dependencies
const express = require('express');
const router = express.Router({
	mergeParams: true
});

const SpotifyApi = require('../api/spotify-api');

const tracksRoutes = require('./tracks');

// DB
const SpotifyUser = require('../models/SpotifyUsers');

router.use("/:playlist_id/tracks", tracksRoutes);

router.post('/', (req, res) => {
	const spotifyId = req.params.user_id;

	SpotifyUser.findById(spotifyId, (err, spotifyUserData) => {
		if (err) {
			res.send(err);
		} else {

			const playlistBody = {
				name: "Spotify Stop Watch",
				description: "spotifystopwatch",
			};

			SpotifyApi.CreatePlaylist(spotifyUserData, playlistBody).then((result) => {
				res.send(result);
			}).catch((error) => {
				res.send(error);
			});
			
		}
	});
});

router.get('/', (req, res) => {

	const spotifyId = req.params.user_id;

	SpotifyUser.findById(spotifyId, (err, spotifyUserData) => {
		if (err) {
			res.send(err);
		} else {

			SpotifyApi.GetUserPlaylists(spotifyUserData).then((result) => {
				res.send(result);
			}).catch((error) => {
				res.send(error);
			});

		}
	});


});

module.exports = router;