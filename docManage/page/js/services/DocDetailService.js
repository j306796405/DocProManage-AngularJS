myApp.factory('DocDetailService', ['$http', 'FAKE_URL', function ($http, FAKE_URL) {
    return {
        getDocDetail: function (config) {
            return $http(config);
        },
        savingConfig: function (id) {
            return {
                method: 'post',
                url: FAKE_URL + 'item/' + id,
                data: {}
            }
        },
        updateField: function (id, config) {
            var copedSavingConfig = angular.copy(this.savingConfig(id));
            copedSavingConfig.data = angular.extend(copedSavingConfig.data, config);
            return $http(copedSavingConfig);
        }
    }
}])