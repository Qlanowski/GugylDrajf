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

export function Login() {
    let recordBlobs = [];
    let userId = "";

    let onAudioChange = (eventArgs) => {
        console.log(eventArgs);
        if (eventArgs.duration > 0)
            recordBlobs.push(eventArgs.audioData);
        console.log(recordBlobs.length);
        console.log(recordBlobs);
    };

    let onIdChange = (event) => {
        userId = event.target.value;
    }

    let logIn = () => {
        let base64files = [];

        var promise1 = new Promise(function (resolve, reject) {
            for (let blob of recordBlobs) {
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    let base64data = reader.result;
                    base64files.push(base64data);
                    if (base64files.length === recordBlobs.length)
                        resolve(base64files);
                }
            }
        });

        promise1.then((base64files) => {
            let json = JSON.stringify({
                id: userId,
                audioSamples: base64files,
            });

            // TODO: SEND TO SERVER AND WAIT FOR RESPONSE
            // TODO: CHANGE ENDPOINT
            fetch('https://neu1fmwq5k.execute-api.us-east-1.amazonaws.com/default/gd-SignUp', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: json
            }).then(function (response) {
                return response.json();
            }).then(function (myJson) {
                console.log(JSON.stringify(myJson));
            });
        });
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
                    <AudioRecorder onChange={onAudioChange}
                        downloadable="false" />
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={logIn}>Log in</Button>
                </CardActions >
            </Card>
        </Container>
    );
}