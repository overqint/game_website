import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import Home from './components/Home';
import Layout from './components/Layout';

export default () => {
    return (
        <Switch>
            <Route exact path="/">
                <Layout>
                    <Home />
                </Layout>
            </Route>
        </Switch>
    );
}