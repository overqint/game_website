import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import Layout from './components/Layout';

import Home from './components/Home';
import Gallery from './components/Gallery';
import PrivacyPolicy from './components/PrivacyPolicy';
import Help from './components/Help';

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
            <Route exact path="/privacy-policy">
                <Layout>
                    <PrivacyPolicy />
                </Layout>
            </Route>
            <Route exact path="/help">
                <Layout>
                    <Help />
                </Layout>
            </Route>
        </Switch>
    );
}