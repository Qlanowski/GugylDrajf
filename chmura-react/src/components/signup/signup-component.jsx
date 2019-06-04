import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import AudioRecorder from 'react-audio-recorder';

export function Signup() {
    return (
        <Container maxWidth="md">
            <Card>
                <CardContent>
                    <TextField id="outlined-with-placeholder"
                        label="User Id"
                        margin="normal"
                        variant="outlined" />
                    <Typography variant="body2" component="p">Your phrase:  <b>"Houston we have had a problem"</b></Typography>
                    <AudioRecorder/>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary">Sign in</Button>
                </CardActions>
            </Card>
        </Container>

    );
}