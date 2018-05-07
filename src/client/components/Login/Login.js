import React from 'react';
import constants from '../../assets/Constants'
import classes from './Login.css'

import { Button } from 'material-ui';

const logIn = (props) => {

    let buttonText = "Log in with Spotify";
    const loggedURL = constants.SERVER_LOGIN;

    if (props.logged === true){
        buttonText = "Log out";
        return (
            <Button className={classes.logOutBtn} color='inherit' onClick={props.onClick}>{buttonText}</Button>
        );
    } else {
        return (
            <Button className={classes.logOutBtn} color='inherit' href={loggedURL}>{buttonText}</Button>
        );
    }

};

export default logIn;