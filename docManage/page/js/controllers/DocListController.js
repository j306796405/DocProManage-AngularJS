myApp.controller('DocListController', ['$scope', '$location', 'DocListService', function ($scope, $location, DocListService) {
    $scope.searchConfig = {keyword: $scope.keyword, page: 1};

    //接受字段搜索 DocSearchListDirective发来的事件
    $scope.$on('updateListData', function (e, data) {
        $scope.listData = data;

        $scope.updatePaging($scope.searchConfig);
    });

    //更新列表视图
    $scope.updateList = function (searchConfig) {
        DocListService.getDocsList(searchConfig)
            .success(function (data, status, headers, config) {
                $scope.listData = data;
            })
    }

    //更新分页视图
    $scope.updatePaging = function(searchCountConfig){
        DocListService.getDocsCount(searchCountConfig).success(function (data, status, headers, config) {
            $scope.searchConfig.page = 1;
            $scope.pageSize = DocListService.defaultSearchConfig.params.pageSize;
            $scope.total = data.count;
        });
    }

    //分页点击事件
    $scope.DoCtrlPagingAct = function (text, page, pageSize, total) {
        $scope.searchConfig.page = page;
        $scope.updateList($scope.searchConfig);
    };

    //点名字搜索经办人
    $scope.searchPerson = function(data){
        $scope.searchConfig = {keyword: data, page: 1};
        $scope.updateList($scope.searchConfig);
        $scope.updatePaging($scope.searchConfig);
        $scope.updateList($scope.searchConfig);
    };

    //初始化页面
    $scope.updateList($scope.searchConfig);
    $scope.updatePaging($scope.searchConfig);
}])