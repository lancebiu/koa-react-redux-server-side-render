require("babel-core/register");
require("babel-polyfill");

import koa from 'koa';
import staticCache from 'koa-static-cache';
import render from 'koa-ejs';
import koaRouter from 'koa-router';
import path from 'path';

import siteController from './controller/site';
import billController from './controller/bill';

const app = koa();

// static file serving
app.use(staticCache('./app/public', {
	gzip: true
}));

render(app, {
	root   : path.join(__dirname, 'view'),
	layout : false,
	viewExt: 'ejs',
	cache  : false,
	debug  : true
});

const router = koaRouter();
router.get('/api/bills', billController.list);
router.get('/api/bill/:id', billController.info);
router.get('*', siteController.home);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, function () {
	console.log('Server listening at port 3000...');
});