import React, {Fragment} from 'react';
import Login from '../../components/Login/Login';
import classes from './Layout.css';

import {AppBar, Toolbar, Typography, Grid, Paper} from 'material-ui';
import TimerIcon from '@material-ui/icons/Timer';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const layout = props => {
  return (
    <Grid container>

      <Grid item xs={12}>
        <AppBar position="sticky" className={classes.topBar}>
          <Toolbar className={classes.mainToolBar}>

            <TimerIcon className={classes.logoImg} />
            <Typography
              variant="title"
              color="inherit"
              className={classes.title}
            >
              Spotify Stop Watch
            </Typography>
            <Login
              className={classes.logSpotifyBtn}
              onClick={props.onLogClicked}
              logged={props.logged}
            />
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        {props.logged ? props.children : null}
      </Grid>

      <Grid item xs={12} className={classes.gridDesc}>
        <div className={classes.mainDesc}>
          <Typography variant="display2" color="inherit" gutterBottom>
            What is Spotify Stop Watch?
          </Typography>

          <Paper>
            <Typography variant="display1" color="inherit" gutterBottom>
              The Spotify Stop Watch is a web application that will build a playlist off of a playlist in your Spotify library of a length you desire. Perfect for when you have a limited amount of time and instead of checking the time or using an ordinary stop watch, the music will let you know when you have to go!
            </Typography>
          </Paper>
          <Typography variant="display2" color="inherit" gutterBottom>
            How does this work?
          </Typography>

          <Paper>
            <Typography variant="display1" color="inherit" gutterBottom>
              <ol>
                <li>Log in using Spotify</li>
                <li>Choose a Playlist</li>
                <li>Select a duration in minutes</li>
                <li>Click create!</li>
              </ol>
            </Typography>

          </Paper>
        </div>
      </Grid>
      <Grid item xs={12} align='flex-end'>
        <AppBar position='static' className={classes.botBar}>
          <Toolbar className={classes.botToolBar}>
            <Typography
              variant="title"
              color="inherit"
              className={classes.title}
              align="center"
            >
              Made with <span><MusicNoteIcon className={classes.musicNoteIcon} /></span> By <a className={classes.githubLink} href="https://github.com/Abdul-Miraj"> Abdul Miraj </a>
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>

    </Grid>
  );
};

export default layout;
