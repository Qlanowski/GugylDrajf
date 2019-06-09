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
import * as audioRequestService from '../../services/audio-request-service';
import * as audioProcessingService from '../../services/audio-processing-service';
import { useStateValue } from '../../context/user-state-provider';

export function Signup(props) {
    let recordBlobs = [];
    let userId = "";
    let email = "";
    const [userState, dispatch] = useStateValue();

    let onAudioChange = (eventArgs) => {
        if (eventArgs.duration > 0)
            recordBlobs.push(eventArgs.audioData);
    };

    let onIdChange = (event) => {
        userId = event.target.value;
    }

    let onEmailChange = (event) => {
        email = event.target.value;
    }

    const signUp = async () => {
        const base64files = await audioProcessingService.blobsToBase64Data(recordBlobs);
        //const myJson = await audioRequestService.signUp(name, base64files);
        dispatch({
            type: 'setUser',
            name
        });
        props.history.push('/')
    }


    return (
        <Container maxWidth="md">
            <Card>
                <CardContent>
                    <TextField id="outlined-with-placeholder"
                        label="User Id"
                        margin="normal"
                        variant="outlined"
                        onChange={onIdChange} />
                    <TextField id="outlined-with-placeholder"
                        onChange={onEmailChange}
                        label="E-mail"
                        margin="normal"
                        variant="outlined" />
                    <Typography variant="body2" component="p">Your phrase:  <b>"Houston we have had a problem"</b></Typography>
                    <AudioRecorder onChange={onAudioChange}
                        downloadable="false" />
                    <AudioRecorder onChange={onAudioChange}
                        downloadable="false" />
                    <AudioRecorder onChange={onAudioChange}
                        downloadable="false" />
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={signUp}>Sign up</Button>
                </CardActions>
            </Card>
        </Container>

    );
}