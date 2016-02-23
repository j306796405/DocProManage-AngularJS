myApp.directive('branchesDirective', [function ($location) {
    return {
        restrict: 'AE',
        templateUrl: 'js/views/doc-branches.html',
        link: function (scope, element, attrs) {
        	//自定义对象 根据属性值设定boolean
        	scope.editable = false;
        	if(attrs.editable == 'true'){
        		scope.editable = true;
        	}else if(attrs.editable == 'false'){
        		scope.editable = false;
        	};
        }
    };
}]);
