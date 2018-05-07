import React from 'react';

import Card, { CardContent, CardMedia } from 'material-ui/Card';
import { Typography, IconButton } from 'material-ui';
import AddBox from '@material-ui/icons/CheckCircle';

import classes from './Playlist.css';

const playlist = (props) => {

    const playlistCardStyles = {
        display: 'flex',
        backgroundColor: '#ecebe8',
    }

    if(props.id === props.selected) {
        playlistCardStyles['backgroundColor'] = 'white';
    }

    return (
        <Card style={playlistCardStyles} onClick={() => props.onPlaylistSelect(props.id)}>
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
            </div>
        </Card>
    );
};

export default playlist;