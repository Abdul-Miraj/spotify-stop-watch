import React, { Fragment } from 'react';
import Login from '../../components/Login/Login';
import classes from './Layout.css'

import { AppBar, Toolbar, Typography } from 'material-ui';

const layout = (props) => {
    return (
        <Fragment>
            <AppBar position="static" color="default">
                <Toolbar >
                    <Typography variant="title" color="inherit" className={classes.title}>
                        Spotify Stop Watch
                        </Typography>
                    <Login onClick={props.onLogClicked} logged={props.logged} />
                </Toolbar>
            </AppBar>

            {props.logged ? props.children : null}
        </Fragment>
    );

}

export default layout;