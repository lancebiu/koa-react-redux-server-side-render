import thunkify from 'thunkify';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from '../routes';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from '../redux/rootReducer';

exports.home = function *() {

    const [redirectLocation, renderProps] = yield thunkify(match)({routes, location: this.request.url});

    const store = applyMiddleware(
        thunkMiddleware
    )(createStore)(rootReducer, {});

    const components = renderProps.components.filter(
        component => typeof component.fetchData === 'function'
    );

    const promises = components.map(component =>
        component.fetchData({
            dispatch:store.dispatch, params: renderProps.params
        })
    )

    yield Promise.all(promises);

    yield new Promise((resolve, reject) =>
        setTimeout(() => {
            resolve();
        }, 0)
    )

    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps}/>
        </Provider>
    );

    yield this.render('index', {
        content: html,
        state: JSON.stringify(store.getState())
    });

};