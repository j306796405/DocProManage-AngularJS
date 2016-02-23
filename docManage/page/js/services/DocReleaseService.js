myApp.factory('DocReleaseService', ['$http', 'FAKE_URL', function ($http, FAKE_URL) {
    return {
        defaultReleaseConfig: {
            method: 'get',
            url: FAKE_URL + 'publishBranches',
            params:{}
        },
        releaseBranch: function(data, id){
            var newData = {};
                angular.forEach(data, function(key){
                    if(key.repository == id){
                        newData = {
                            projectName: key.repository, 
                            branchName: key.branch
                        }
                    }
                });
            var copedReleaseConfig = angular.copy(this.defaultReleaseConfig);
                copedReleaseConfig.params = angular.extend(copedReleaseConfig.params, newData);
                return $http(copedReleaseConfig);
        }
    }
}])