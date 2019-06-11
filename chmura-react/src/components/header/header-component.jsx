import React, { forwardRef } from "react";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import { useStateValue } from '../../context/user-state-provider';
import { HeaderButtons } from './header-buttons/header-buttons-component';
import logo from './logo.png'

export function Header() {
    const [userState, dispatch] = useStateValue();
    const links = [{path: '/',
                    name: 'Sign up'}, 
                    {path: '/login',
                    name: 'Login'}];
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
                    <HeaderButtons isLogged={userState.isLogged} links={links} />
                </Grid>
            </Grid>
        </AppBar>
    );
}