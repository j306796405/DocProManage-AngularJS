myApp.factory('UploadService', ['$http', 'FAKE_URL', function ($http, FAKE_URL) {
    return {
        defaultDeleteConfig: {
            method: 'delete',
            url: FAKE_URL + 'deletePic',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {}
        },
        delPic: function (config) {
            var deleteConfig = angular.copy(this.defaultDeleteConfig);
            deleteConfig.data = angular.extend(deleteConfig.data, config);
            return $http(deleteConfig);
        }
    }
}])