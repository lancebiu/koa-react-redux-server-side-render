import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchLatestBills } from './actions';

class LatestBills extends Component {

	static fetchData({dispatch}) {
		return dispatch(fetchLatestBills());
	}

	componentDidMount() {
		const {dispatch, isFetching} = this.props;
		this.constructor.fetchData({dispatch});
	}

	render() {
		return (
			<div>
				<h1>Latest Bills</h1>
				{this.props.isFetching && <p>Loaing...</p>}
				{
					!this.props.isFetching &&
					<ul>
						{
							this.props.bills.map(bill =>
								<li key={bill.id}><Link to={`/bill/${bill.id}`}>{bill.vendor}</Link></li>
							)
						}
					</ul>
				}
			</div>
		)
	}

}

function mapStatetoProps(state) {
	const {
		isFetching,
		items: bills
	} = state.latestBills;

	return {
		isFetching,
		bills
	}
}

export default connect(mapStatetoProps)(LatestBills);
