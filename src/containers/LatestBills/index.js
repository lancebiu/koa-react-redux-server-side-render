import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchLatestBills} from './actions';

class LatestBills extends Component{

    static fetchData({store}) {
        return store.dispatch(fetchLatestBills());
    }

    componentDidMount() {
        this.props.dispatch(fetchLatestBills());
    }

    render() {
        return (
            <div>
                <h1>最新账单</h1>
                {
                    this.props.isFetching && <p>加载中。。。</p>
                }
                {
                    !this.props.isFetching &&
                    <p>{this.props.bills.length}</p>
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
