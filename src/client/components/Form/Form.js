import React, { Fragment } from 'react';

import { Typography, Button, TextField, Grid } from 'material-ui';
import CreateIcon from '@material-ui/icons/Create';

import classes from './Form.css';

const form = (props) => {

    return (
        <Fragment>
            <Typography variant='body1' gutterBottom>
                Timer
            </Typography>
            <form className={classes.durationForm}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='Minutes'
                            label='Minutes'
                            type='number'
                            defaultValue='0'
                            value={props.timer}
                            onChange={props.onTimerChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} className={classes.createButton}>
                        <Button onClick={props.onCreatePlaylist} variant="raised" size="small">
                            Create Playlist
                        <CreateIcon />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Fragment>
    );

};

export default form;