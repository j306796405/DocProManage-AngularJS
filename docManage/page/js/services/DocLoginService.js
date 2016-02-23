myApp.factory('DocLoginService', ['$http', '$rootScope', '$location', '$window', '$timeout', 'DocUtils', 'FAKE_URL',
    function ($http, $rootScope, $location, $window, $timeout, DocUtils, FAKE_URL) {
        return {
            defaultLogoutConfig: {
                method: 'get',
                url: FAKE_URL + 'logout/',
                params: {}
            },
            logout: function () {
                return $http(this.defaultLogoutConfig);
            },
            currentAngularUrl: function () {
                return $location.protocol() + '://' + location.host + location.pathname + '#' + $location.url();
            }
        }
    }])