import React from 'react';
import ReactDOM from 'react-dom';

import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import configureStore from './redux/configureStore';
import route from './routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {route}
        </Router>
    </Provider>
    , document.getElementById("app"));