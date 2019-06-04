import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Signup } from '../Signup/signup-component';
import { Login } from '../Login/login-component';

export function Routes() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Signup} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Login} />
            </Switch>
        </main>
    );
}