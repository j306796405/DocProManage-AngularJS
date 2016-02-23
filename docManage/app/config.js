var path = require('path');
var config = {
	DB: {
		COLLECTION: {
			MANAGE: 'manage',
			SESSION: 'sessions'
		}
	},
	AUTHORITY: {
		MAILGROUP: ['R&D UED Hotel']
	},
	LOGIN_URL: 'https://cas.ctripcorp.com/caso/login?service=',
	getUserUrl: function (service, ticket) {
		return 'https://cas.ctripcorp.com/caso/serviceValidate?service=' + service + '&ticket=' + ticket;
	},
	PROJECTS: 'http://localhost:3100/showProject',
	getBranches: function(alias){
		return 'http://localhost:3100/showBranches?remote=' + alias
	},
	publishBranches: function(projectName, branchName){
		return 'http://localhost:3100/deploy?remoteId='+ projectName +'&branchName=' + branchName;
	}
};

//local config
/*config.dbConnect = 'mongodb://localhost/doc';
config.static_path = '/docmapp';
config.STATIC = path.join(__dirname, './../page/');
config.UPLOAD_DIR = './../page/upload/';
config.port = 3000;
process.env.NODE_ENV = 'local';
//local office
config.static = 'docmapp';
//local home
//config.static = '';*/

//DEV config
/*config.dbConnect = 'mongodb://docmDEV:docmDEV@10.3.8.87/docmDEV';
config.root_path = '/var/www/hotel.ued/static/docmapp_static.beta';
config.static_path = 'http://hfdoc.qa.nt.ctripcorp.com/static/docmapp_static.beta/';
config.STATIC = config.root_path;
config.UPLOAD_DIR = config.root_path + '/upload/';
config.port = 3333;
process.env.NODE_ENV = 'dev'
config.service = 'http://hfdoc.qa.nt.ctripcorp.com/docmapp_beta/';*/

//release config
config.dbConnect = 'mongodb://docmGA:docmGA_pass0d@10.3.8.87/docmGA';
config.root_path = '/var/www/hotel.ued/static/docmapp_static';
config.static_path = 'http://hfdoc.qa.nt.ctripcorp.com/static/docmapp_static/';
config.STATIC = config.root_path;
config.UPLOAD_DIR = config.root_path + '/upload/';
config.port = 3000;
config.service = 'http://hfdoc.qa.nt.ctripcorp.com/docmapp/';



module.exports = config;
