import React from 'react';
import Playlist from './Playlist/Playlist';

import Button from 'material-ui/Button';
import RefreshIcon from '@material-ui/icons/Refresh';

const playlistDisplay = (props) => {
    const allPlaylists = props.playlists.map(playlist => {
        if (playlist.owner.id === props.spotifyId) {
            let pImage = '';
            if (playlist.images.length > 0) {
                if (playlist.images > 1) {
                    pImage = playlist.images[1].url;
                } else {
                    pImage = playlist.images[0].url;
                }
            }
            return <Playlist
                key={playlist.id}
                id={playlist.id}
                playlistImage={pImage}
                playlistName={playlist.name}
                numberOfTracks={playlist.tracks.total}
                playlistOwner={playlist.owner.display_name}
                onPlaylistSelect={props.onPlaylistSelect}
                selected={props.selected}
            />
        } else {
            return null;
        }
    });

    return (
        <div className="playlists">
            <Button>
                <RefreshIcon onClick={props.onLoadPlaylists} />
            </Button>
            {allPlaylists}
        </div>
    );
};

export default playlistDisplay;