import React, { Component, Fragment } from 'react';
import Layout from './components/Layout/Layout';
import PlaylistCreator from './containers/PlaylistCreator/PlaylistCreator'

import CssBaseline from 'material-ui/CssBaseline';

class App extends Component {

  constructor(props) {
    super(props);

    const spotifyId = document.cookie.split('=');

    let isLogged = false;
    if (spotifyId[0] === 'spotify_id') {
      isLogged = true;
    }

    this.state = {
      logged: isLogged,
      spotify_id: spotifyId[1]
    }

  };

  onLogClicked = () => {
    if (this.state.logged === false) {
      this.setState({ logged: true });
    } else {
      document.cookie = "spotify_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.setState({ logged: false });
    }
  };

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Layout onLogClicked={this.onLogClicked} logged={this.state.logged}>
          <PlaylistCreator spotifyId={this.state.spotify_id} />
        </Layout>
      </Fragment>
    );
  }
}

export default App;
