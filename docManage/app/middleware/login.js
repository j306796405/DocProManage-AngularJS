var xml2js = require('xml2js'),
	request = require('request'),
	config = require('./../config');
module.exports = function (req, res, next) {
	//如果是本地环境就不用验证了
	if(process.env.NODE_ENV == 'local'){
		req.session.user = {
			name: '吊炸天',
			department: 'CEO'
		}
		next();
	}else{
		if(!req.session.user){
			var ticket = req.query.ticket,
				service = config.service;
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
								console.log(isSuccess);
								if (isSuccess) {
									var name = isSuccess['cas:user'],
										hasMailGroup = isSuccess['cas:attributes']['cas:memberOf'],
										MAILGROUP = 'R&D UED Hotel',
										mailGroup = '';
									//匹配到白名单邮件组 可访问PSD
									if(hasMailGroup.indexOf(MAILGROUP) >= 0){
										mailGroup = MAILGROUP
									}
									if (name) {
										req.session.user = {
											name: name,
											mailGroup: mailGroup
										}
									}
									console.log('登录成功 准备redirect');
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
		}else{
			next();
		}
	}
}