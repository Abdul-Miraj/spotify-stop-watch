import React from 'react';

import Card, { CardContent, CardMedia } from 'material-ui/Card';
import { Typography, IconButton } from 'material-ui';
import AddBox from '@material-ui/icons/CheckCircle';

import classes from './Playlist.css';

const playlist = (props) => {

    let selectedBoxColor = 'action';

    if(props.id === props.selected) {
        selectedBoxColor = 'primary';
    }

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cover}
                image={props.playlistImage}
                title={props.playlistName}
            />
            <div className={classes.content}>
                <div className={classes.details}>
                    <CardContent className={classes.title}>
                        <Typography variant="headline">{props.playlistName}</Typography>
                        <Typography variant="subheading" color="textSecondary">{props.playlistOwner}</Typography>
                        <Typography variant="caption" color="textSecondary">Number of Tracks: {props.numberOfTracks}</Typography>
                    </CardContent>
                </div>

                <div className={classes.add}>
                    <IconButton aria-label="Play/pause">
                        <AddBox color={selectedBoxColor} onClick={() => props.onPlaylistSelect(props.id)} className={classes.SkipPreviousIcon} />
                    </IconButton>
                </div>
            </div>
        </Card>
    );
};

export default playlist;