import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../header/header-component';
import { Routes } from '../routes/routes-component';
import { Footer } from '../footer/footer-component';
import CssBaseline from '@material-ui/core/CssBaseline';
import { UserStateProvider } from '../../context/user-state-provider';
import * as LocalStorageService from '../../services/local-storage-service';

export function Root() {
    const localStorageState = LocalStorageService.getObject('userState');
    const initialState = localStorageState !== null ? localStorageState : {
        isLogged: false,
        name: '',
    };

    const reducer = (state, action) => {
        switch (action.type) {
          case 'setUser':
            const newObj = {
              ...state,
              isLogged: true,
              name: action.name,
              token: action.token
            };
            LocalStorageService.setObject('userState', newObj);
            return newObj;
          case 'deleteUser':
            LocalStorageService.deleteObject('userState');
            return {
              name :'',
              isLogged: false
            }   
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
            </BrowserRouter>
        </UserStateProvider>
    );
}