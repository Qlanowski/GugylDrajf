import React from "react";
import Typography from '@material-ui/core/Typography'
import { useStateValue } from '../../context/user-state-provider';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export function MainPage() {
    const linkStyle = {
        textDecoration: 'none',
        color: 'white'
    }

    const LoggedOfButtons = () => (<div style={{ marginTop: '30px' }}>
        <Link to="/signup" style={linkStyle} ><Button color="primary" variant="outlined">sign up</Button></Link>
        <Link to="/login" style={linkStyle} ><Button color="primary" variant="outlined">login</Button></Link>
    </div>);

    const LoggedButtons = () => (<div style={{ marginTop: '30px' }}>
        <Link to="/files" style={linkStyle} ><Button color="primary" variant="outlined">files</Button></Link>
    </div>);

    const [userState, dispatch] = useStateValue();

    return (<div style={{ textAlign: 'center' }}>
        <Typography style={{ fontFamily: 'Comic Sans MS', marginTop: '40px' }} variant="h1">GUGYL DRAJF</Typography>
        {
            userState.isLogged ? <LoggedButtons /> : <LoggedOfButtons /> 
        }
    </div>);
}