import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchBillDetail } from './actions';

class DetailedBill extends Component {

	static fetchData({dispatch, params}) {
		return dispatch(fetchBillDetail(params.billId));
	}

	componentDidMount() {
		const {dispatch, params, isFetching} = this.props;
		this.constructor.fetchData({dispatch, params})
	}

	render() {

		const {isFetching, info} = this.props;
		return (
			<div>
				<h1>{info.vendor}</h1>
				{isFetching && <p>Loading...</p>}
				{!isFetching &&
				<table>
					<tbody>
					<tr>
						<td>id:</td>
						<td>{info.id}</td>
					</tr>
					<tr>
						<td>amount:</td>
						<td>{info.amount}</td>
					</tr>
					<tr>
						<td>paymeans:</td>
						<td>{info.paymeans}</td>
					</tr>
					<tr>
						<td>period:</td>
						<td>{info.period}</td>
					</tr>
					</tbody>
				</table>
				}
				<br/>
				<Link to="/">Back</Link>
			</div>
		)

	}

}

function mapStatetoProps(state) {
	const {
		isFetching,
		info
	} = state.detailedBill;

	return {
		isFetching,
		info
	}
}

export default connect(mapStatetoProps)(DetailedBill);