var myApp = angular.module('MyApp', ['ngSanitize', 'ui.router', 'bw.paging', 'angularFileUpload', 'highcharts-ng', 'ngMessages', 'daterangepicker', 'textAngular', 'ui.select']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$provide', 'FAKE_URL',
	function ($stateProvider, $urlRouterProvider, $provide, FAKE_URL) {
		//textAngular config
		$provide.decorator('taOptions', ['taRegisterTool', '$delegate', function (taRegisterTool, taOptions) {
			taRegisterTool('colourRed', {
				iconclass: "fa fa-square red",
				action: function () {
					this.$editor().wrapSelection('forecolor', 'red');
				}
			});
			// set the button to the default toolbar definition
			taOptions.toolbar = [['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'bold', 'italics', 'underline', 'strikeThrough', 'colourRed', 'insertLink', 'html', 'undo']];
			taOptions.defaultTagAttributes.a.target = '_blank';
			return taOptions;
		}]);

		$urlRouterProvider.otherwise('/docs-list');
		$stateProvider
			.state('/', {
				url: '/docs-list',
				views: {
					'header': {
						templateUrl: FAKE_URL + 'js/views/header.html',
						controller: 'HeaderController'
					},
					'main-container': {
						templateUrl: FAKE_URL + 'js/views/doc-list.html',
						controller: 'DocListController'
					}
				}
			})
			.state('list', {
				url: '/doc-add',
				views: {
					'header': {
						templateUrl: FAKE_URL + 'js/views/header.html',
						controller: 'HeaderController'
					},
					'main-container': {
						templateUrl: FAKE_URL + 'js/views/doc-add.html',
						controller: 'DocAddController'
					},
					'upload@list': {
						templateUrl: FAKE_URL + 'js/views/doc-add-upload.html',
						controller: 'UploadController'
					}
				}
			})
			.state('detail', {
				url: '/doc-detail?id',
				views: {
					'header': {
						templateUrl: FAKE_URL + 'js/views/header.html',
						controller: 'HeaderController'
					},
					'main-container': {
						templateUrl: FAKE_URL + 'js/views/doc-detail.html',
						controller: 'DocDetailController'
					},
					'upload@detail': {
						templateUrl: FAKE_URL + 'js/views/doc-add-upload.html',
						controller: 'UploadController'
					}
				}
			})
			.state('report', {
				url: '/doc-report',
				views: {
					'header': {
						templateUrl: FAKE_URL + 'js/views/header.html',
						controller: 'HeaderController'
					},
					'main-container': {
						templateUrl: FAKE_URL + 'js/views/doc-report.html',
						controller: 'DocReportController'
					}
				}
			})
			.state('version', {
				url: '/doc-version',
				views: {
					'header': {
						templateUrl: FAKE_URL + 'js/views/header.html',
						controller: 'HeaderController'
					},
					'main-container': {
						templateUrl: FAKE_URL + 'js/views/doc-version.html',
						controller: ''
					}
				}
			})
	}])