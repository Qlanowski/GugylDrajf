import React, { forwardRef } from "react";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import { useStateValue } from '../../context/user-state-provider';
import { HeaderButtons } from './header-buttons/header-buttons-component';
import Button from '@material-ui/core/Button';
import logo from './logo.png'

export function Header(props) {
    const [userState, dispatch] = useStateValue();
    const links = [{
        path: '/signup',
        name: 'Sign up'
    },
    {
        path: '/login',
        name: 'Login'
    }];
    const loggedInLinks = [{
        path: '/files',
        name: 'Files'
    }];

    const logout = () => {
        dispatch({
            type: 'deleteUser'
        });
        window.location.href = '/';
    }

    return (
        <AppBar position="static">
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Toolbar>
                        <img src={logo} height="75px"/>
                    </Toolbar>
                </Grid>
                <Grid item>
                    <HeaderButtons isLogged={userState.isLogged} loggedInLinks={loggedInLinks} logout={logout} loggedOutLinks={links} />
                </Grid>
            </Grid>
        </AppBar>
    );
}