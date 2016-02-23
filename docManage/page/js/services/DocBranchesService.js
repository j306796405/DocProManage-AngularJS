myApp.factory('DocBranchesService', ['$http', 'FAKE_URL', function ($http, FAKE_URL) {
    return {
        defaultGetProjectsConfig: {
            method: 'get',
            url: FAKE_URL + 'getProjects'
        },
        defaultGetBranchesConfig: function (id) {
            return {
                method: 'get',
                url: FAKE_URL + 'getBranches/' + id
            }
        },
        getDocsProjects: function () {
            var copedProjectsConfig = angular.copy(this.defaultGetProjectsConfig);
            return $http(copedProjectsConfig);
        },
        getDocsBranches: function(branchName){
            var copedBranchesConfig = angular.copy(this.defaultGetBranchesConfig(branchName));
            return $http(copedBranchesConfig);
        }
    }
}])