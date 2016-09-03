import fs from 'fs';
import thunkify from 'thunkify';

const readFile = thunkify(fs.readFile);

exports.list =  function *() {
    var data = yield readFile('./data/latest-bills.json');
    this.type = 'json';
    this.body = JSON.parse(data);
}

exports.info = function *(billId) {
    var data = yield readFile('./data/detailed-bills.json');
    var billData = JSON.parse(data).items.filter(item => item.id === billId)[0];
    this.type = 'json';
    this.body = billData;
};