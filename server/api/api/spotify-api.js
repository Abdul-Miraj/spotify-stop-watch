const request = require('request');
const qs = require('querystring');

const eh = require('../utils/error-handling');

// Helper Functions
function spotifyGetTracks(allTracks, limit, offset, total, next, tokens) {
    if ((limit + offset) >= total) {
        return new Promise((resolve, reject) => {
            resolve(allTracks);
        });
    } else {
        const options = {
            url: next,
            headers: {
                'Authorization': 'Bearer ' + tokens.access_token
            },
            json: true,
        };

        return new Promise((resolve, reject) => {
            request.get(options, (error, response, body) => {
                if (error) {
                    //TODO:
                    return new Promise((resolve, reject) => {
                        reject(error);
                    });
                } else {
                    allTracks = allTracks.concat(body.items);
                    offset += body.offset;
                    spotifyGetTracks(allTracks, limit, offset, total, body.next, tokens).then((result) => {
                        resolve(result);
                    });
                }

            });
        });
    }
}

// Spotify API Calls
function CreatePlaylist(tokens, bodyObject) {
    const API_URL = "https://api.spotify.com/v1/users/" + tokens._id + "/playlists";

    const options = {
        url: API_URL,
        headers: {
            'Authorization': 'Bearer ' + tokens.access_token
        },
        body: bodyObject,
        json: true
    };

    return new Promise((resolve, reject) => {
        request.post(options, (error, response, body) => {
            if (body.error) {
                eh.ErrorHandler(tokens, body.error).then((result) => {
                    createPlaylist(tokens, bodyObject);
                }).catch((error) => {
                    reject(error);
                });

            } else {
                resolve(body);
            }

        });
    });
}

function GetUserPlaylists(tokens) {

    const API_URL = "https://api.spotify.com/v1/me/playlists";

    const options = {
        url: API_URL,
        headers: {
            'Authorization': 'Bearer ' + tokens.access_token
        },
        json: true
    };

    return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }

        });
    });
}

function GetAllTracks(tokens, playlistId) {

    const limit = 100;

    const query = qs.stringify({
        fields: "total,offset,next,items(limit,track(id,duration_ms))",
        limit: limit
    });

    const apiURL = "https://api.spotify.com/v1/users/" + tokens._id + "/playlists/" + playlistId + "/tracks?" + query;

    const options = {
        url: apiURL,
        headers: {
            'Authorization': 'Bearer ' + tokens.access_token
        },
        json: true,
    };

    let allTracks = [];

    return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            if (error) {
                reject(error);
            } else {

                let offset = 0;
                const total = body.total;

                spotifyGetTracks(allTracks.concat(body.items), limit, offset, total, body.next, tokens).then((result) => {

                    //sort the result by non-decreasing duration
                    result.sort((a, b) => {
                        return a.track.duration_ms - b.track.duration_ms;
                    });

                    resolve(result);
                });
            }
        });
    });
}

function AddTracksToPlaylist(tokens, playlistId, bodyObject){
    const API_URL = "https://api.spotify.com/v1/users/" + tokens._id + "/playlists/" + playlistId + "/tracks";

    const options = {
        url: API_URL,
        headers: {
            'Authorization': 'Bearer ' + tokens.access_token
        },
        body: bodyObject,
        json: true
    };

    return new Promise((resolve, reject) => {
        request.post(options, (error, response, body) => {
            if (body.error) {
                eh.ErrorHandler(tokens, body.error).then((result) => {
                    AddTracksToPlaylist(tokens, playlistId, bodyObject);
                }).catch((error) => {
                    reject(error);
                });

            } else {
                resolve(body);
            }

        });
    });
}

module.exports.CreatePlaylist = CreatePlaylist;
module.exports.GetUserPlaylists = GetUserPlaylists;
module.exports.GetAllTracks = GetAllTracks;
module.exports.AddTracksToPlaylist = AddTracksToPlaylist;