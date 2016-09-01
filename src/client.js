import React from 'react';
import ReactDOM from 'react-dom';

import {Router, hashHistory} from 'react-router';
import {Provider} from 'react-redux';

import configureStore from './redux/configureStore';
import route from './routes';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            {route}
        </Router>
    </Provider>
    , document.getElementById("app"));