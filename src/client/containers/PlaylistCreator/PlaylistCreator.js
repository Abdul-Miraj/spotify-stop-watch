import React, { Component } from 'react';
import axios from 'axios';
import Form from '../../components/Form/Form';
import PlaylistDisplay from '../../components/PlaylistDisplay/PlaylistDisplay';
import Constants from '../../assets/Constants'
import classes from './PlaylistCreator.css';

import { Typography, Grid, Modal } from 'material-ui';

class PlaylistCreator extends Component {

    state = {
        playlist_data: [],
        selected_playlist: '',
        timer: 0,
        open: false
    }

    componentWillMount() {

        const playlist_data = JSON.parse(localStorage.getItem('playlist_data'));

        if (playlist_data !== null) {
            this.setState({ playlist_data: playlist_data });
        }
    }

    componentDidMount() {

        const playlist_data = JSON.parse(localStorage.getItem('playlist_data'));

        if (playlist_data === null) {
            this.onLoadPlaylists();
        }
    };

    onLoadPlaylists = () => {
        axios.get(Constants.SERVER_URL + 'users/' + this.props.spotifyId + '/playlists/')
            .then(res => {
                this.setState({ playlist_data: res.data.items });
                localStorage.clear();
                localStorage.setItem('playlist_data', JSON.stringify(res.data.items));
            });
    };

    onPlaylistSelect = (playlist_id) => {
        this.setState({ selected_playlist: playlist_id });
    };

    onTimerChanged = (event) => {
        this.setState({ timer: Math.abs(event.target.value) });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onCreatePlaylist = () => {

        axios.post(Constants.SERVER_URL + 'users/' + this.props.spotifyId + '/playlists/')
            .then(res => {
                const newPlaylistId = res.data.id;
                axios.get(Constants.SERVER_URL + 'users/' + this.props.spotifyId + '/playlists/' + this.state.selected_playlist + '/tracks')
                    .then(res => {
                        const allPlaylistTracks = res.data
                        axios.post(Constants.SERVER_URL + 'users/' + this.props.spotifyId + '/playlists/' + newPlaylistId + '/tracks', {
                            duration: this.state.timer * 60000,
                            tracks: allPlaylistTracks
                        })
                            .then(res => {
                                this.handleOpen();
                            });

                    });
            });

    };

    render() {
        return (
            <Grid container align='center' className={classes.main}>
                <Grid item xs={12} className={classes.pDisplay} >
                    <PlaylistDisplay
                        selected={this.state.selected_playlist}
                        onPlaylistSelect={this.onPlaylistSelect}
                        playlists={this.state.playlist_data}
                        spotifyId={this.props.spotifyId}
                        onLoadPlaylists={this.onLoadPlaylists} />
                </Grid>
                <Grid item xs={12}>
                    <Form onTimerChange={this.onTimerChanged} value={this.state.timer} onCreatePlaylist={this.onCreatePlaylist} />
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}>
                        <div style={{ top: '50vh', left: '40vw' }} className={classes.paper}>
                            <Typography variant="title" id="modal-title">
                                Playlist has successfully been created!
                             </Typography>
                            <Typography variant="subheading" id="simple-modal-description">
                                Check your Spotify playlist for "Spotify Stop Watch"
                            </Typography>
                        </div>
                    </Modal>
                </Grid>
            </Grid>
        );
    }
}

export default PlaylistCreator;