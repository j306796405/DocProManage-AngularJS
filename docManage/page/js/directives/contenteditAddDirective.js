myApp.directive('contenteditableAddDirective', [function(){
	return{
		scope: true,
		templateUrl: 'js/views/doc-contentedit-add.html',
		transclude: true,
		link: function(scope, element, attrs, ngModel){
			scope.addLink = function(){
				if(scope.contenteditAddTitle){
					scope.formData.cssLink = scope.formData.cssLink || '';
					if(scope.contenteditAddTitle === undefined) scope.contenteditAddTitle = '';
					if(scope.contenteditAddLink === undefined) scope.contenteditAddLink = '';
					var linkStr = '<div>' + scope.contenteditAddTitle + '：' + '<a href="' + scope.contenteditAddLink +'" target="_blank">' + scope.contenteditAddLink + '</a></div>';
					scope.formData.cssLink += linkStr;
				}
			}
		}
	}
}])