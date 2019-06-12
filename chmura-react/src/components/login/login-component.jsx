import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useStateValue } from '../../context/user-state-provider';
import AudioRecorder from 'react-audio-recorder';
import * as audioRequestService from '../../services/audio-request-service';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export function Login(props) {
    const [name, setName] = useState('');
    const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSnackbarOpened(false);
    }

    const nameFieldProps = {
        onChange: (e) => setName(e.target.value)
    }
    const [userState, dispatch] = useStateValue();

    let recordBlobs = [];
    const onAudioChange = (eventArgs) => {
        if (eventArgs.duration > 0) {
            recordBlobs.push(eventArgs.audioData);
        }
    };

    const logIn = async () => {
        try {
            const token = await audioRequestService.login(name, recordBlobs[0]);
            dispatch({
                type: 'setUser',
                name,
                token
            });
            props.history.push('/files')
        } catch(e) {
            setIsSnackbarOpened(true);
        }
    }

    var cardStyle = {
        minHeight: '30vw',
        margin: '100px 0px 0px 0px'
    }
    var textfieldStyle = {
        width: '75%',
        margin: '1vw'
    }

    var marginStyle = {
        margin: '1vw'
    }

    return (
        <Container maxWidth="md">
            <Paper style={cardStyle}>
                <Snackbar
                    variant="success"
                    open={isSnackbarOpened}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={<span>Login failed!</span>}
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
                        <b>Log in</b>
                    </Typography>
                    <TextField id="outlined-with-placeholder"
                        style={textfieldStyle}
                        label="User Id"
                        margin="normal"
                        variant="outlined"
                        inputProps={nameFieldProps} />
                    <AudioRecorder onChange={onAudioChange}
                        downloadable={false} />
                    <Button variant="contained" color="primary" disabled={!name.length} onClick={logIn} style={marginStyle}>
                        Log in
                    </Button>
                </Grid>

            </Paper>
        </Container>
    );
}
