import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/header/header-component';
import { Routes } from './components/routes/routes-component';
import { Footer } from './components/footer/footer-component';
import CssBaseline from '@material-ui/core/CssBaseline';

function Index() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Header />
            <Routes />
            <Footer />
        </BrowserRouter>
    );
}

ReactDOM.render(<Index />, document.getElementById("index"));