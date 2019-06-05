import React from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export function HeaderButtons(props) {
    return props.isLogged ? (<div></div>) : (
        <div>
            <Button component={props => <Link to="/" {...props} />} color="inherit">Signup</Button>
            <Button component={props => <Link to="/login" {...props} />} color="inherit">Login</Button>
        </div>
    );
}