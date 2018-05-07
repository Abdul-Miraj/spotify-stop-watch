import React from 'react';
import Playlist from './Playlist/Playlist';
import classes from './PlaylistDisplay.css';

import {Button, Grid, Typography} from 'material-ui';
import RefreshIcon from '@material-ui/icons/Refresh';

const playlistDisplay = props => {
  const allPlaylists = props.playlists.map (playlist => {
    if (playlist.owner.id === props.spotifyId) {
      let pImage = 'https://picsum.photos/300/300';
      if (playlist.images.length > 0) {
        if (playlist.images > 1) {
          pImage = playlist.images[1].url;
        } else {
          pImage = playlist.images[0].url;
        }
      }
      return (
        <Playlist
          key={playlist.id}
          id={playlist.id}
          playlistImage={pImage}
          playlistName={playlist.name}
          numberOfTracks={playlist.tracks.total}
          playlistOwner={playlist.owner.display_name}
          onPlaylistSelect={props.onPlaylistSelect}
          selected={props.selected}
        />
      );
    } else {
      return null;
    }
  });

  return (
    <Grid container className={classes.playlistsDisplay} align="left">
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <Button className={classes.RefreshIconBtn}>
              <RefreshIcon
                className={classes.RefreshIcon}
                onClick={props.onLoadPlaylists}
              />
            </Button>
          </Grid>
          <Grid item align='center' xs={12} sm={9}>
            <Typography className={classes.playlistsDisplayText} variant='headline'>
              CHOOSE A PLAYLIST
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.playlists}>
        {allPlaylists}
      </Grid>
    </Grid>
  );
};

export default playlistDisplay;
