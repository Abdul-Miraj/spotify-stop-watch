const mongoose = require('mongoose');

const spotifyUserSchema = mongoose.Schema({
	_id: String,
	access_token: String,
	refresh_token: String
});

module.exports = mongoose.model('SpotifyUser', spotifyUserSchema);