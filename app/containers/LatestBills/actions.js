import fetch from 'isomorphic-fetch';

export const REQUEST_LATEST_BILLS = 'REQUEST_LATEST_BILLS';
export const RECEIVE_LATEST_BILLS = 'RECEIVE_LATEST_BILLS';

function request_latest_bills() {
	return {
		type: REQUEST_LATEST_BILLS
	}
}

function receive_latest_bills(bills) {
	return {
		type : RECEIVE_LATEST_BILLS,
		bills: bills.items
	}
}

export function fetchLatestBills() {
	return dispatch => {
		dispatch(request_latest_bills());
		return fetch(`http://localhost:3000/api/bills`)
			.then(response => {
				if (response.ok) {
					response.json().then(json => dispatch(receive_latest_bills(json)));
				}
			});
	}
}