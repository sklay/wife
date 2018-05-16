var moment = require('moment');
var date = function(datetime) {
	return moment(datetime).format('YYYY-MM-DD');
}

var time = function(datetime) {
	return moment(datetime).format('HH:mm:ss');
}

var full = function (datetime) {
	return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {date, time, full}