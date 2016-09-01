require("babel-core/register");
require("babel-polyfill");

import koa from 'koa';
import staticCache from 'koa-static-cache';
import render from 'koa-ejs';
import route from 'koa-route';
import path from 'path';
import fs from 'fs';
import thunkify from 'thunkify';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from './routes';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './redux/rootReducer';

var app = koa();

var readFile = thunkify(fs.readFile);

// static file serving
app.use(staticCache('./app/public', {
    gzip: true
}));

render(app, {
    root: path.join(__dirname, 'view'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
});

const reactView = function *() {

    const matched = yield thunkify(match)({routes, location: this.request.url});
    const renderProps = matched[1];

    const store = applyMiddleware(
        thunkMiddleware
    )(createStore)(rootReducer, {});

    const components = renderProps.components.filter(
        component => (typeof component.fetchData === 'function')
    );

    const promises = components.map(
        component => component.fetchData({store, params: renderProps.params})
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

const latestBills = function *() {
    var data = yield readFile('./data/latest-bills.json');
    this.type = 'json';
    this.body = JSON.parse(data);
}

const billInfo = function *(billId) {
    var data = yield readFile('./data/detailed-bills.json');
    var billData = JSON.parse(data).items.filter(item => item.id === billId)[0];
    this.type = 'json';
    this.body = billData;
};

app.use(route.get('/api/bills', latestBills));
app.use(route.get('/api/bill/:id', billInfo));
app.use(route.get('*', reactView));

app.listen(3000, function () {
    console.log('Server listening at port 3000...');
});