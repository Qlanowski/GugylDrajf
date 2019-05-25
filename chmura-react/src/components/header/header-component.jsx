import React from "react";
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export function Header() {
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
                        <Typography variant="title" color="inherit">
                            Gugyl drajw
                    </Typography>
                    </Toolbar>
                </Grid>
                <Grid item>
                    <Button component={props => <Link to="/" {...props}/>} color="inherit">Home</Button>
                    <Button component={props => <Link to="/login" {...props}/>} color="inherit">Login</Button>
                </Grid>
            </Grid>
        </AppBar>
    );
}