myApp.controller('DocReportController', ['$scope', 'DocReportService', 'DocUtils', function ($scope, DocReportService, DocUtils) {
    /* 初始化 */
    var today = new Date();
    //下拉分类的默认数据
    $scope.typeOptions = [
        { name: '项目类型', value: 'proClass' },
        { name: '业务线', value: 'tag' }
    ];
    //初始化表单
    $scope.formData = {
        type: $scope.typeOptions[0].value,
        startDate: new Date(today.getFullYear(), DocUtils.getQuarterStartMonth(today.getMonth(), 1)),
        endDate: new Date()
    }

    $scope.chartSeries = [];
    //图表 业务线有规定的对应颜色
    $scope.reportColor = {
        Mobile: '#ee6767',
        Offline: '#00b4f7',
        Online: '#56cd86',
        物料: '#f4b327'
    }
    //图表默认设置
    $scope.chartConfig = {
        options: {
            chart: {
                type: 'column'
            },
            colors: [],
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
        },
        series: $scope.chartSeries,
        xAxis: {
            title: {text: ''},
            categories: []
        },
        yAxis: {
            title: {text: ''},
            tickInterval:5
        },
        title: {
            text: ''
        },
        size: {
            height: 800
        }
    };

    //初始化图表的默认颜色
    angular.forEach($scope.reportColor, function(val, key){
        $scope.chartConfig.options.colors.push(val);
    })

    $scope.search = function(){
        $scope.chartConfig.title.text = $scope.chartTitle;
        //图表标题更新
        angular.forEach($scope.typeOptions, function(item, key){
            if(item.value == $scope.formData.type){
                $scope.chartConfig.title.text =  item.name + '图标统计';
            }
        })
        DocReportService.getReport($scope.formData).success(function(data, status, headers, config){
            $scope.chartConfig.xAxis.categories = data.xData;
            $scope.chartSeries.splice(0,$scope.chartSeries.length);
            //设置图表的ajax数据
            angular.forEach(data.yData, function(data, key){
                var item = {
                    name: key,
                    data: data
                };
                var color = $scope.reportColor[key];
                if(color){
                    item.color = color;
                    item.dataLabels = {
                        color: color,
                        style: {
                            textShadow: 'none'
                        }
                    };
                }
                $scope.chartSeries.push(item);
            })
        });
    }

    $scope.search();
}])