import React from 'react';
import constants from '../../assets/Constants'

import { Button } from 'material-ui';

const logIn = (props) => {

    let buttonText = "Log in with Spotify";
    const loggedURL = constants.SERVER_LOGIN;

    if (props.logged === true){
        buttonText = "Log out";
        return (
            <Button color='inherit' onClick={props.onClick}>{buttonText}</Button>
        );
    } else {
        return (
            <Button color='inherit' href={loggedURL}>{buttonText}</Button>
        );
    }

};

export default logIn;