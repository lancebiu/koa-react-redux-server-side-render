import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './rootReducer';

export default function configureStore(initialState = {}) {
	let middleware = applyMiddleware(
		thunkMiddleware
	)(createStore);

	return middleware(rootReducer, initialState,
		window.devToolsExtension ? window.devToolsExtension() : undefined
	);
};