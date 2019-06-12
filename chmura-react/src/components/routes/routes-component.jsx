import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Signup } from '../signup/signup-component';
import { Login } from '../login/login-component';
import { MainPage } from '../main-page/main-page-component';
import { Files } from '../files/files-component';
import { RedirectedRoute } from './RedirectedRoute/redirected-route-component';
import { useStateValue } from '../../context/user-state-provider';

export function Routes() {
    const [userState, dispatch] = useStateValue();
    const isLoggedIn = userState.isLogged;

    return (
        <main>
            <Switch>
                <Route exact path='/' component={MainPage} />
                <RedirectedRoute exact path='/signup' component={Signup} isLoggedIn={isLoggedIn} shouldBeLoggedIn={false} />
                <RedirectedRoute exact path='/login' component={Login} isLoggedIn={isLoggedIn} shouldBeLoggedIn={false} />
                <RedirectedRoute exact path='/files' component={Files} isLoggedIn={isLoggedIn} shouldBeLoggedIn={true} />
            </Switch>
        </main>
    );
}