myApp.factory('DocLoginService', ['$http', '$rootScope', '$location', '$window', '$timeout', 'DocUtils', 'FAKE_URL',
    function ($http, $rootScope, $location, $window, $timeout, DocUtils, FAKE_URL) {
        return {
            defaultLoginConfig: {
                method: 'get',
                url: FAKE_URL + 'login/',
                params: {}
            },
            defaultLogoutConfig: {
                method: 'get',
                url: FAKE_URL + 'logout/',
                params: {}
            },
            login: function (loginConfig) {
                var copedLoginConfig = angular.copy(this.defaultLoginConfig);
                copedLoginConfig.params = angular.extend(copedLoginConfig.params, loginConfig);
                return $http(copedLoginConfig);
            },
            logout: function () {
                return $http(this.defaultLogoutConfig);
            },
            currentAngularUrl: function () {
                return $location.protocol() + '://' + location.host + location.pathname + '#' + $location.url();
            },
            //去除URL中的ticket参数
            formatUrl: function(){
                var ticket = DocUtils.getQueryString('ticket');
                if(ticket){
                    $window.location.href = FAKE_URL + 'app.html#' + $location.url();
                    return $timeout(function(){
                        console.log('done');
                    },5000)
                }
            },
            initLogin: function () {
                var ticket = DocUtils.getQueryString('ticket'),
                    currentUrl = $location.absUrl(),
                //验证ticket的service链接不可带有# 不然会报'service' and 'ticket' parameters are both required的错误
                    baseUrl = $location.protocol() + '://' + location.host + location.pathname;

                this.login({ticket: ticket, service: baseUrl})
                    .success(function (user, status, headers, config) {
                        if (user) {
                            $rootScope.user = user;
                        } else {
                            $rootScope.user = {name: ''};
                        }
                    }).error(function (data, status, headers, config) {
                        //返回错误并且有重定向说明页面后台无session页面没登录需要跳转到登录页面
                        if (data.error && data.redirect) {
                            window.location = data.redirect + currentUrl;
                        }
                    });
            }
        }
    }])