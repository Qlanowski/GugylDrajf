import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from '../Home/home-component';
import { Login } from '../Login/login-component';

export function Routes() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
            </Switch>
        </main>
    );
}