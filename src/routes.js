import React from 'react';
import {IndexRoute, Route} from 'react-router';

import Container from './component/Container';

import LatestBills from './containers/LatestBills';
import DetailedBill from './containers/DetailedBill';

export default(
    <Route path="/" component={Container}>
        <IndexRoute component={LatestBills}/>
        <Route path="bill/:billId" component={DetailedBill}/>
    </Route>
)