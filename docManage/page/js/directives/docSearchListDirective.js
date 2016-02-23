myApp.directive('docSearchListDirective', ['DocListService', 'DocUtils', function(DocListService, DocUtils){
    return {
        restrict: 'AE',
        link: function(scope, element, attrs){
            scope.search = DocUtils.throttle(function(){
                DocListService.getDocsList({keyword: scope.searchConfig.keyword}).success(function(data, status, headers, config){
                    DocListService.listData = data;
                    scope.$emit('updateListData', DocListService.listData);
                });
            }, 500);
        }
    }
}])