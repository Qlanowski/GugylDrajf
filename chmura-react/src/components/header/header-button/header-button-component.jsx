import React from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export function HeaderButton(props) {
    const linkStyle = {
        textDecoration: 'none',
        color: 'white'
    }
    return (
        <Button color="inherit"><Link to={props.link} style={linkStyle} >{props.name}</Link></Button>
    );
}