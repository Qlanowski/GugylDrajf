import React, { useState } from "react";
import Typography from '@material-ui/core/Typography'
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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

var recordBlobs = [];

export function Signup(props) {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');

    const [blobCount, setBlobCount] = useState(0);
    const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSnackbarOpened(false);
    }

    let onAudioChange = (eventArgs, index) => {
        if (eventArgs.duration > 0) {
            recordBlobs.push(eventArgs.audioData);
            setBlobCount(recordBlobs.length);
        }
    };

    let onIdChange = (event) => {
        setUserId(event.target.value);
    }

    let onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const signUp = async () => {
        try {
            console.log(userId);
            await audioRequestService.signUp(userId, email, recordBlobs);
            props.history.push('/')
        }
        catch (e) {
            setIsSnackbarOpened(true);
        }
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
                <Snackbar
                    variant="success"
                    open={isSnackbarOpened}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={<span>Signup failed!</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={handleSnackbarClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
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
                    <Button variant="contained" color="primary"  disabled={!userId.length || blobCount <= 2 } onClick={() => signUp()} style={marginStyle}>Sign up</Button>
                </Grid>
            </Paper>
        </Container>

    );
}