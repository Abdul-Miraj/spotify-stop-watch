import React, {Fragment} from 'react';
import classes from './Form.css';

import {Typography, Button, TextField, Grid, Paper} from 'material-ui';

const form = props => {
  return (
    <Fragment>
      <Typography className={classes.timerTitle} variant="subheading" gutterBottom>
        Enter the duration of the stopwatch
      </Typography>
      <form className={classes.durationForm}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="Minutes"
              label="Timer in minutes"
              type="number"
              defaultValue="0"
              value={props.timer}
              onChange={props.onTimerChange}
              required
              className={classes.inputField}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className={classes.createPlaylistBtn}
              onClick={props.onCreatePlaylist}
              variant="raised"
              size="small"
            >
              Create Playlist
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default form;
