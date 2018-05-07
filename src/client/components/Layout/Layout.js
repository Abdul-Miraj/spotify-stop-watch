import React from 'react';
import Login from '../../components/Login/Login';
import classes from './Layout.css';

import {AppBar, Toolbar, Typography, Grid, Paper} from 'material-ui';
import TimerIcon from '@material-ui/icons/Timer';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const layout = props => {
  return (
    <Grid container className={classes.allGrid}>
      <Grid item xs={12}>
        <AppBar position="sticky" className={classes.topBar}>
          <Toolbar className={classes.mainToolBar}>
            <TimerIcon className={classes.logoImg} />
            <Typography
              variant="title"
              color="inherit"
              className={classes.title}
            >
              Spotify Stopwatch
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
        <Typography variant="display2" color="inherit" gutterBottom className={classes.descTitle}>
          What is Spotify Stopwatch?
        </Typography>

        <Paper>
          <Typography variant="display1" color="inherit" gutterBottom className={classes.descText}>
            The Spotify Stopwatch is a web application that will build a playlist off of a playlist in your Spotify library of a length you desire. Perfect for when you have a limited amount of time and instead of checking the time or using an ordinary stop watch, the music will let you know when you have to go!
          </Typography>
        </Paper>
        <Typography variant="display2" color="inherit" className={classes.descTitle} >
          How does this work?
        </Typography>

        <Paper>
          <Typography variant="display1" color="inherit" className={classes.descText}>
            <ol>
              <li>Log in using Spotify</li>
              <li>Choose a Playlist</li>
              <li>Select a duration in minutes</li>
              <li>Click create!</li>
            </ol>
          </Typography>

        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.footerGrid}>
        <AppBar position="static" className={classes.botBar}>
          <Toolbar className={classes.botToolBar}>
            <Typography
              variant="title"
              color="inherit"
              className={classes.title}
              align="center"
            >
              Made with
              {' '}
              <span><MusicNoteIcon className={classes.musicNoteIcon} /></span>
              {' '}
              By
              {' '}
              <a
                className={classes.githubLink}
                href="https://github.com/Abdul-Miraj"
              >
                {' '}Abdul Miraj{' '}
              </a>
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>

    </Grid>
  );
};

export default layout;
