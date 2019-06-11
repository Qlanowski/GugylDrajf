import React, { useState } from "react";
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
import * as audioRequestService from '../../services/audio-request-service';
import * as audioProcessingService from '../../services/audio-processing-service';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box'

var recordBlobs = [];

export function Signup(props) {
    let userId = "";
    let email = "";

    const [blobCount, setBlobCount] = useState(0);

    let onAudioChange = (eventArgs, index) => {
        if (eventArgs.duration > 0) {
            recordBlobs.push(eventArgs.audioData);
            setBlobCount(recordBlobs.length);
        }
    };

    let onIdChange = (event) => {
        userId = event.target.value;
    }

    let onEmailChange = (event) => {
        email = event.target.value;
    }

    const signUp = async () => {
        let responseJson = await audioRequestService.signUp(userId, email, recordBlobs);
        props.history.push('/')
    }

    var cardStyle = {
        minHeight: '30vw',
        margin: '100px 0px 0px 0px'
    }
    var textfieldStyle = {
        width: '75%'
    }

    var marginStyle = {
        margin: '1vw'
    }

    var buttonStyle = {
        margin: '0.3vw'
    }

    return (
        <Container maxWidth="md">
            <Paper style={cardStyle}>
                <Grid container container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={cardStyle}>
                    <Typography variant="h3"
                        component="h3"
                        style={marginStyle}>
                        <b>Sign up</b>
                    </Typography>
                    <TextField id="outlined-with-placeholder"
                        style={textfieldStyle}
                        label="User Id"
                        margin="normal"
                        variant="outlined"
                        onChange={onIdChange} />
                    <TextField id="outlined-with-placeholder"
                        style={textfieldStyle}
                        onChange={onEmailChange}
                        label="E-mail"
                        margin="normal"
                        variant="outlined" />
                    <Typography variant="body2"
                        component="p"
                        margin="normal"
                        style={marginStyle}>
                        Your phrase:  <b>"Houston we have had a problem"</b>
                    </Typography>
                    <Box style={buttonStyle} >
                        <AudioRecorder onChange={(eventArgs) => onAudioChange(eventArgs, 0)}
                            downloadable={false} />
                    </Box>
                    {
                        blobCount > 0 ? (
                            <Box style={buttonStyle} >
                                <AudioRecorder onChange={(eventArgs) => onAudioChange(eventArgs, 1)}
                                    downloadable={false} />
                            </Box>) : null
                    }
                    {
                        blobCount > 1 ? (
                            <Box style={buttonStyle} >
                                <AudioRecorder onChange={(eventArgs) => onAudioChange(eventArgs, 2)}
                                    downloadable={false} />
                            </Box>) : null
                    }
                    <Button variant="contained" color="primary" onClick={signUp} style={marginStyle}>Sign up</Button>
                </Grid>
            </Paper>
        </Container>

    );
}