import React from 'react';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import Logon from './pages/Logon';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path= "/" component= { Logon } />
            </Switch>
        </BrowserRouter>
    );
}