// Dependencies
const express = require('express');
const router = express.Router({
	mergeParams: true
});

const SpotifyApi = require('../api/spotify-api');
const ErrorHandler = require('../utils/error-handling');

// DB
const SpotifyUser = require('../models/SpotifyUsers');

router.post('/', (req, res) => {

	const spotifyId = req.params.user_id;
	const playlistId = req.params.playlist_id;

	const stopWatchData = {
		total_duration: req.body.duration,
		tracks: req.body.tracks
	};

	// make a copy of the track array
	let allTracksCopy = stopWatchData.tracks.slice(0);
	let stopWatchArray = [];
	let currentDuration = 0;
	let randTrack = null;

	while (true) {
		let randNum = Math.floor(Math.random() * allTracksCopy.length)
		randTrack = allTracksCopy[randNum].track;
		if (randTrack.duration_ms + currentDuration <= stopWatchData.total_duration) {
			stopWatchArray.push("spotify:track:" + randTrack.id);
			currentDuration += randTrack.duration_ms;
			allTracksCopy.splice(randNum, 1);
		} else {

			while (true) {
				randTrack = allTracksCopy.pop(0);
				if (randTrack.duration_ms + currentDuration <= stopWatchData.total_duration) {
					stopWatchArray.push("spotify:track:" + randTrack._id);
					currentDuration += randTrack.duration_ms;
					allTracksCopy.splice(randNum, 1);
				} else {
					break;
				}
			}

			break;
		}
	}

	const tracksBody = {
		uris: stopWatchArray
	};

	SpotifyUser.findById(spotifyId, (err, spotifyUserData) => {
		if (err) {
			ErrorHandler.ErrorHandler(spotifyUserData._id, spotifyUserData.refresh_token).then((result) => {
				res.send(result);
			}).catch((error) => {
				res.send(error);
			});
		} else {
			SpotifyApi.AddTracksToPlaylist(spotifyUserData, playlistId, tracksBody).then((result) => {
				res.send(result);
			}).catch((error) => {
				res.send(error);
			});
		
		}
	});

});


router.get('/', (req, res) => {

	const spotifyId = req.params.user_id;
	const playlistId = req.params.playlist_id;

	SpotifyUser.findById(spotifyId, (err, spotifyUserData) => {
		if (err) {
			ErrorHandler.ErrorHandler(spotifyUserData._id, spotifyUserData.refresh_token).then((result) => {
				res.send(result);
			}).catch((error) => {
				res.send(error);
			});
		} else {
			SpotifyApi.GetAllTracks(spotifyUserData, playlistId).then((result) => {
				res.send(result);
			}).catch((error) => {
				res.send(error);
			});

		}
	});

});



module.exports = router;