/*
 * @Author: Jacky
 * @Date:   2016-01-08 17:50:36
 * @Last Modified by:   Jacky
 * @Last Modified time: 2016-01-09 23:49:46
 */

var log4js = require('log4js'),
	my_log4js_configuration,
	LOG_PATH,
	logType;


logType = process.env.NODE_ENV != 'production' ? 'console' : 'file';
LOG_PATH = process.env.NODE_ENV != 'production' ? '' : '/var/www/hotel.ued/_applog_/docManage_log/';

my_log4js_configuration = {
	'appenders': [{
		'type': logType,
		'absolute': true,
		'maxLogSize': 20480,
		'backups': 10,
		'filename': LOG_PATH + 'log4js-app.log',
		'category': 'app'
	}, {
		'type': logType,
		'absolute': true,
		'maxLogSize': 20480,
		'backups': 10,
		'filename': LOG_PATH + 'log4js-access.log',
		'category': 'http'
	}]
}

log4js.configure(my_log4js_configuration, {});


var logger = log4js.getLogger('app'); //log


exports.logger = logger;
