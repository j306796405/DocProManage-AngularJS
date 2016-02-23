myApp.factory('DocListService', ['$http', 'FAKE_URL', function ($http, FAKE_URL) {
    return {
        defaultSearchConfig: {
            method: 'get',
            url: FAKE_URL + 'list',
            params: {keyword: '', page: 1, pageSize: 20}
        },
        defaultSearchCountConfig: {
            method: 'get',
            url: FAKE_URL + 'paging',
            params: {keyword: ''}
        },
        getDocsList: function (searchConfig) {
            var copedSearchConfig = angular.copy(this.defaultSearchConfig);
            copedSearchConfig.params = angular.extend(copedSearchConfig.params, searchConfig);
            return $http(copedSearchConfig);
        },
        getDocsCount: function(searchCountConfig){
            var copedSearchCountConfig = angular.copy(this.defaultSearchCountConfig);
            copedSearchCountConfig.params = angular.extend(copedSearchCountConfig.params, searchCountConfig);
            return $http(copedSearchCountConfig);
        },
        listData: []
    }
}])