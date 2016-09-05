import fetch from 'isomorphic-fetch';

export const REQUEST_BILL_DETAIL = 'REQUEST_BILL_DETAIL';
export const RECEIVE_BILL_DETAIL = 'RECEIVE_BILL_DETAIL';

function request_bill_detail() {
	return {
		type: REQUEST_BILL_DETAIL
	}
}

function receive_bill_detail(info) {
	return {
		type: RECEIVE_BILL_DETAIL,
		info
	}
}

export function fetchBillDetail(id) {
	return dispatch => {
		dispatch(request_bill_detail());
		return fetch(`http://localhost:3000/api/bill/${id}`)
			.then(response => {
				if (response.ok) {
					response.json().then(json => dispatch(receive_bill_detail(json)));
				}
			})
	}
}