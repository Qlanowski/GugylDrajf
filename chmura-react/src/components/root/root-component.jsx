import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../header/header-component';
import { Routes } from '../routes/routes-component';
import { Footer } from '../footer/footer-component';
import CssBaseline from '@material-ui/core/CssBaseline';
import { UserStateProvider } from '../../context/user-state-provider';

export function Root() {
    const initialState = {
        isLogged: false,
        name: '',
    };

    const reducer = (state, action) => {
        switch (action.type) {
          case 'setUser':
            return {
              ...state,
              isLogged: true,
              name: action.name
            };
            
          default:
            return state;
        }
      };
    return (
        <UserStateProvider initialState={initialState} reducer={reducer}>
            <BrowserRouter>
                <CssBaseline />
                <Header />
                <Routes />
                <Footer />
            </BrowserRouter>
        </UserStateProvider>
    );
}