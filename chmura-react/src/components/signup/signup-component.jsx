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
import {ReactMic} from "react-mic";

export function Signup() {
    let record = false;

    let startRecording = () => {
        record = true;
    }

    let stopRecording = () => {
        record = false;
    }

    let onData = (recordedBlob) => {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    let onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
    }

    return (
        <Container maxWidth="md">
            <Card>
                <CardContent>
                    <TextField id="outlined-with-placeholder"
                        label="User Id"
                        margin="normal"
                        variant="outlined" />
                    <Typography variant="body2" component="p">Your phrase:  <b>"Houston we have had a problem"</b></Typography>
                    <ReactMic
                        record={this.record}
                        className="sound-wave"
                        onStop={this.onStop}
                        onData={this.onData}
                        strokeColor="#000000"
                        backgroundColor="#FF4081" />
                    <button onTouchTap={this.startRecording} type="button">Start</button>
                    <button onTouchTap={this.stopRecording} type="button">Stop</button>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary">Sign in</Button>
                </CardActions>
            </Card>
        </Container>

    );
}