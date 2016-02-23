var xml2js = require('xml2js'),
	request = require('request'),
	config = require('./../config');
module.exports = function () {
	return {
		login: function (req, res) {
			var ticket = req.query.ticket,
				service = config.service;
			if (req.session.user) {
				res.render('index', {user: req.session.user});
			} else {
				if (ticket) {
					//验证ticket 获取用户信息
					request(config.getUserUrl(service, ticket), {strictSSL: false},
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								//explicitArray value不需要以数组形式展现
								var parser = new xml2js.Parser({explicitArray: false});
								parser.parseString(body, function (err, result) {
									var user = result;
									var isSuccess = user['cas:serviceResponse']['cas:authenticationSuccess'];
									if (isSuccess) {
										var name = isSuccess['cas:user'],
											department = isSuccess['cas:attributes']['cas:department'];
										if (name && department) {
											req.session.user = {
												name: name,
												department: department
											}
										}
										res.redirect(service);
									} else {
										//ticket失效 重新redirect获取ticket
										res.redirect(config.LOGIN_URL + service);
									}
								});
							} else {
								//网络之类的问题 重新redirect获取ticket
								res.redirect(config.LOGIN_URL + service);
							}
						})
				} else {
					res.redirect(config.LOGIN_URL + service);
				}
			}
		},
		isLogin: function (req, res, next) {
			if(!req.session.user){
				res.redirect(config.LOGIN_URL + config.service);
			}else{
				next();
			}
		}
	}
}