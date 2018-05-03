const SpotifyLogin = require('../auth/spotify-auth');

function ErrorHandler(spotifyUserData, error) {

    return new Promise((resolve, reject) => {
        if (error.message == "The access token expired") {
            SpotifyLogin.RefreshToken(spotifyUserData._id, spotifyUserData.refresh_token).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        }
    });
}

module.exports.ErrorHandler = ErrorHandler;