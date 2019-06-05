import React, { useContext, useState } from "react";
import { UserContext } from '../../context/user-state-provider'; 
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import { useStateValue } from '../../context/user-state-provider';


export function Login(props) {
    const [name, setName] = useState('');
    
    const nameFieldProps = {
        onChange: (e) => setName(e.target.value)
    }

    const onButtonClick = (name, props) => {
        dispatch({
            type: 'setUser',
            name });
        props.history.push('/')

    }
    const [userState, dispatch] = useStateValue();
    return (
        <Container maxWidth="md">
            <Card>
                <CardContent>
                    <TextField id="outlined-with-placeholder"
                        label="User Id"
                        margin="normal"
                        variant="outlined" 
                        inputProps={nameFieldProps} />
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={() => onButtonClick(name, props)}>Log in</Button>
                </CardActions >
            </Card>
        </Container>
    );
}