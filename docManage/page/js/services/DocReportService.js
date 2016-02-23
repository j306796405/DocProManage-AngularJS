myApp.factory('DocReportService', ['$http', 'FAKE_URL', function ($http, FAKE_URL) {
    return {
        reportConfig: {
            method: 'get',
            url: FAKE_URL + 'report',
            params: {}
        },
        getReport: function (config) {
            var copedReportConfig = angular.copy(this.reportConfig);
            copedReportConfig.params = angular.extend(copedReportConfig.params, config);
            return $http(copedReportConfig);
        }
    }
}])