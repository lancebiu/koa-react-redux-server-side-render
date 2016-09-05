import fs from 'fs';
import thunkify from 'thunkify';

const readFile = thunkify(fs.readFile);

export default {
	list: function *() {
		var data = yield readFile('./data/latest-bills.json');
		this.type = 'json';
		this.body = JSON.parse(data);
	},
	info: function *() {
		var data = yield readFile('./data/detailed-bills.json');
		var billData = JSON.parse(data).items.filter(item => item.id === this.params.id)[0];
		this.type = 'json';
		this.body = billData;
	}
}