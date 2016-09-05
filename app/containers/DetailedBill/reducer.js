import {
	REQUEST_BILL_DETAIL,
	RECEIVE_BILL_DETAIL
} from './actions';

export function detailedBill(state = {
	isFetching: true,
	info      : {}
}, action) {
	switch (action.type) {
		case REQUEST_BILL_DETAIL:
			return Object.assign({}, state, {
				isFetching: true
			});
		case RECEIVE_BILL_DETAIL:
			return Object.assign({}, state, {
				isFetching: false,
				info      : action.info
			});
		default:
			return state;
	}
}