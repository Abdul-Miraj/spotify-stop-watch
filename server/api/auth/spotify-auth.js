const request = require ('request');
const qs = require ('querystring');
const SpotifyUser = require ('../models/SpotifyUsers');

// Spotify API variables
const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI_PRODUCTION; // Your redirect uri

function LogInSpotify (res) {
  const scopes =
    'user-read-private playlist-read-private playlist-modify-public ';

  res.redirect (
    'https://accounts.spotify.com/authorize?' +
      qs.stringify ({
        response_type: 'code',
        client_id: client_id,
        scope: scopes,
        redirect_uri: redirect_uri,
        show_dialog: true,
      })
  );
}

function RetrieveTokens (req, res) {
  const code = req.query.code || null;
  const error = req.query.error || null;

  if (error) {
    res.status (400).json ({
      error: error,
    });
  } else {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: 'Basic ' +
          new Buffer (client_id + ':' + client_secret).toString ('base64'),
      },
      json: true,
    };

    // request access token and refresh token
    request.post (authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const accessToken = body.access_token;
        const refreshToken = body.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get (options, function (error, response, body) {
          if (error) {
            res.status (400).json ({
              message: error,
            });
          } else {
            const spotifyUser = new SpotifyUser ({
              _id: body.id,
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            // check then update if the SpotifyUser exists already
            SpotifyUser.findByIdAndUpdate (spotifyUser._id, {
              $set: {
                access_token: accessToken,
                refresh_token: refreshToken,
              },
            })
              .then (result => {
                if (result === null) {
                  spotifyUser
                    .save ()
                    .then (result => {
                      res.cookie ('spotify_id', body.id);
                      res.redirect (302, process.env.WEBSITE_CALLBACK);
                    })
                    .catch (err => console.log (err));
                } else {
                  res.cookie ('spotify_id', body.id);
                  res.redirect (302, process.env.WEBSITE_CALLBACK);
                }

              })
              .catch (error => {
                res.send (error);
              });
          }
        });
      } else {
        res.status (response.statuseCode).json ({
          message: 'error code:' + response.statusCode,
        });
      }
    });
  }
}

function RefreshToken (spotifyId, refreshToken) {
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: 'Basic ' +
        new Buffer (client_id + ':' + client_secret).toString ('base64'),
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    json: true,
  };

  return new Promise ((resolve, reject) => {
    request.post (authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var accessToken = body.access_token;

        // update db
        SpotifyUser.findByIdAndUpdate (spotifyId, {
          $set: {
            access_token: accessToken,
          },
        })
          .then (result => {
            // User didn't exist in DB
            if (result === null) {
              const userDidNotExist = {
                status: 401,
                message: "User doesn't exist in DB",
              };
              reject (userDidNotExist);
            } else {
              const success = {
                status: 200,
                desc: 'SpotifyUser access and refresh tokens successfully updated',
                spotify_id: spotifyId,
              };

              resolve (success);
            }
          })
          .catch (error => {
            reject (error);
          });
      }
    });
  });
}

module.exports.LogInSpotify = LogInSpotify;
module.exports.RetrieveTokens = RetrieveTokens;
module.exports.RefreshToken = RefreshToken;
