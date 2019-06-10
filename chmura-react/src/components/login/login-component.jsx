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
        const base64files = await audioProcessingService.blobsToBase64Data(recordBlobs);
        //const myJson = await audioRequestService.signUp(name, base64files);
        console.log('dd');
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
                        inputProps={nameFieldProps} />
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={logIn}
                        variant="outlined" >Log in</Button>
                    <AudioRecorder onChange={onAudioChange}
                            downloadable="false" />
                    </CardActions >
                </CardContent>
            </Card>
        </Container>
    );
}
