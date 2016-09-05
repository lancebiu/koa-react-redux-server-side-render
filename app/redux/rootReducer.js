import { combineReducers } from 'redux';

import { latestBills } from '../containers/LatestBills/reducer';
import { detailedBill } from '../containers/DetailedBill/reducer';

export default combineReducers({
	latestBills,
	detailedBill
});