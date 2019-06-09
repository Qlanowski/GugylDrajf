import React from "react";
import { useStateValue } from '../../context/user-state-provider';
import { Files } from '../files/files-component';
import { Signup } from '../signup/signup-component';

export function Start() {
    const [userState, dispatch] = useStateValue();
    return userState.isLogged ? (<Files/>) : (<Signup/>);
}