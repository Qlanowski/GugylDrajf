import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Signup } from '../signup/signup-component';
import { Login } from '../login/login-component';
import { MainPage } from '../main-page/main-page-component';
import { Files } from '../files/files-component';

export function Routes() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/files' component={Files} />
            </Switch>
        </main>
    );
}