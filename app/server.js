require("babel-core/register");
require("babel-polyfill");

import koa from 'koa';
import staticCache from 'koa-static-cache';
import render from 'koa-ejs';
import route from 'koa-route';
import path from 'path';

import siteController from './controller/site';
import billController from './controller/bill';

const app = koa();

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

app.use(route.get('/api/bills', billController.list));
app.use(route.get('/api/bill/:id', billController.info));
app.use(route.get('*',siteController.home));

app.listen(3000, function () {
    console.log('Server listening at port 3000...');
});