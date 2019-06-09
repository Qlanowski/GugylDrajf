import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Signup } from '../signup/signup-component';
import { Login } from '../login/login-component';
import { Start } from '../start/start-component';

export function Routes() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Start} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Login} />
            </Switch>
        </main>
    );
}