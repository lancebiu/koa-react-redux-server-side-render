import {
	REQUEST_LATEST_BILLS,
	RECEIVE_LATEST_BILLS
} from './actions';

export function latestBills(state = {
	isFetching: true,
	items     : []
}, action) {
	switch (action.type) {
		case REQUEST_LATEST_BILLS:
			return Object.assign({}, state, {
				isFetching: true
			});
		case RECEIVE_LATEST_BILLS:
			return Object.assign({}, state, {
				isFetching: false,
				items     : action.bills
			});
		default:
			return state;
	}
}