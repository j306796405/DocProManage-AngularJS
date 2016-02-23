myApp.factory('DocAddService', ['$http', 'FAKE_URL', function ($http, FAKE_URL) {
    return {
        defaultAddConfig: {
            method: 'post',
            url: FAKE_URL + 'item',
            data: {}
        },
        addDoc: function(doc){
            var copedAddConfig = angular.copy(this.defaultAddConfig);
            copedAddConfig.data = angular.extend(copedAddConfig.data, doc);
            return $http(copedAddConfig);
        }
    }
}])