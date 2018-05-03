// Dependencies
const express = require('express');
const router = express.Router();

const request = require('request');

const playlistRoutes = require('./playlists');

// Routes
router.use('/:user_id/playlists', playlistRoutes);

module.exports = router;