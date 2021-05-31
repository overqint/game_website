import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import Layout from './components/Layout';

import Home from './components/Home';
import Gallery from './components/Gallery';

export default () => {
    return (
        <Switch>
            <Route exact path="/">
                <Layout>
                    <Home />
                </Layout>
            </Route>
            <Route exact path="/gallery">
                <Layout>
                    <Gallery />
                </Layout>
            </Route>
        </Switch>
    );
}