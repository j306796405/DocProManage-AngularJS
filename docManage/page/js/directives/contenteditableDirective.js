myApp.directive('contenteditableDirective', ['$sce', function ($sce) {
    return {
        require: '?ngModel',
        scope: true,
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            }

            //通过持续监测变量动态判断是否添加contenteditable
            scope.$watch(function () {
                return scope.$eval(attrs.contenteditableDirective);
            }, function (newValue, oldValue) {
                scope.toggleContentEditable();
            })

            //绑定事件
            element.bind('blur keyup change', function () {
                readContent();
            });

            //向modelView写入更新数据
            function readContent() {
                ngModel.$setViewValue(element.html());
            }

            //判断是否需要添加contenteditable
            scope.toggleContentEditable = function () {
                if (scope.$eval(attrs.contenteditableDirective)) {
                    attrs.$set('contenteditable', '');
                } else {
                    element.removeAttr('contenteditable');
                }
            }

            ngModel.$render = function () {
                //element.html($sce.trustAsHtml(ngModel.$viewValue));
                element.html(ngModel.$viewValue);
            };

            //初始化判断是否需要添加contenteditable属性
            scope.toggleContentEditable();
        }
    };
}]);