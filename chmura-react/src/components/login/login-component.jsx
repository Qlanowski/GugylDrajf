import React, { useState } from "react";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useStateValue } from '../../context/user-state-provider';
import AudioRecorder from 'react-audio-recorder';
import * as audioRequestService from '../../services/audio-request-service';
import * as audioProcessingService from '../../services/audio-processing-service';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export function Login(props) {
    const [name, setName] = useState('');
    const nameFieldProps = {
        onChange: (e) => setName(e.target.value)
    }
    const [userState, dispatch] = useStateValue();

    let recordBlobs = [];
    const onAudioChange = (eventArgs) => {
        if (eventArgs.duration > 0)
            recordBlobs.push(eventArgs.audioData);
    };

    const logIn = async () => {
        const token = await audioRequestService.login(name, recordBlobs[0]);
        console.log(token);
        dispatch({
            type: 'setUser',
            name,
            token
        });
        props.history.push('/')
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
                    <Button variant="contained" color="primary" onClick={logIn} style={marginStyle}>
                        Log in
                    </Button>
                </Grid>

            </Paper>
        </Container>
    );
}
