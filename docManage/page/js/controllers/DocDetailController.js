myApp.controller('DocDetailController', ['$scope', '$location', 'DocDetailService', 'FAKE_URL', 'STATIC_URL', 'DOC_TYPE_LOGO',
    function ($scope, $location, DocDetailService, FAKE_URL, STATIC_URL, DOC_TYPE_LOGO) {
        //详情页初始化
        var id = $location.search().id;

        //初始化变量
        $scope.isEdit = {};
        $scope.temp = {
            viLink: []
        };

        //初始化被选择的仓库和相应分支数据
        $scope.formData = {
            repository: {}
        };

        //页面初始化
        $scope.initForm = {
            tags: [
                {name: 'Online' ,isSelected: false},
                {name: 'Offline', isSelected: false},
                {name: 'Mobile', isSelected: false},
                {name: '物料', isSelected: false}
            ]
        };

        //获取项目数据
        DocDetailService.getDocDetail({
            method: 'get',
            url: FAKE_URL + 'item/' + id
        }).success(function (doc, status, headers, config) {
            angular.forEach(DOC_TYPE_LOGO, function (value, index) {
                if (DOC_TYPE_LOGO[index].name == doc.proClass) {
                    doc.proClassLogo = STATIC_URL + DOC_TYPE_LOGO[index].url;
                    return false;
                }
            });

            $scope.doc = doc;

            //初始化项目标签数据
            angular.forEach($scope.initForm.tags, function(value) {
                angular.forEach($scope.doc.tag, function(name) {
                    if(value.name == name){
                        value.isSelected = true;
                    }
                });
            });

            //通知branchesController初始化仓库分支信息
            $scope.$broadcast('makeBranchesView', $scope.doc.git);

            //通知uploadController初始化已上传的图片
            $scope.$broadcast('makePicsView', $scope.doc.viLink);
        });

        
        //修改经办人
        $scope.changeOperator = function(persons, group){
            angular.forEach(persons, function(person, key) {
                if(person.group == group){
                    person.isOperator = true;
                }else{
                    person.isOperator = false;
                }
            });
        }
        //通用修改事件
        $scope.modify = function (fieldName, e) {
            initIsEditField(fieldName);
            $scope.$broadcast('isContenteditable',{
                isEdit: $scope.isEdit[fieldName].bool,
                ngField: $scope.doc[fieldName],
                fieldName: fieldName
            });
        }
        //通用保存
        $scope.commonSave = function(fieldName){
            var config = {};
                config[fieldName] = $scope.doc[fieldName];

            $scope.updateFieldHandler(config, fieldName);//字段更新处理
        };

        //更新任务名和业务线
        $scope.saveNameAndFlag = function(fieldName){
            var tag = [];

            angular.forEach($scope.initForm.tags, function(initTag, i){
                if(initTag.isSelected){
                    tag.push(initTag.name);
                }
            });

            var data = {
                proName: $scope.doc.proName,
                tag: tag
            };

            $scope.updateFieldHandler(data, fieldName);//字段更新处理
        };

        //保存仓库分支
        $scope.repositorySave = function(fieldName){
            var config = {};
                config[fieldName] = $scope.formData.repository;

            $scope.updateFieldHandler(config, fieldName);//字段更新处理
        };

        //保存图片
        $scope.saveVi = function (fieldName) {
            $scope.doc.viLink = $scope.doc.viLink.concat($scope.temp.viLink);

            var data = {
                viLink: $scope.doc.viLink
            };

            $scope.updateFieldHandler(data, fieldName);//字段更新处理
        };

        //字段更新处理
        $scope.updateFieldHandler = function(data, fieldName){
            initIsEditField(fieldName);
            DocDetailService.updateField($scope.doc._id, data).success(function () {
                $scope.isEdit[fieldName].bool = false;
                if(fieldName == 'proName'){
                    $scope.doc.tag = data.tag;
                };
                if(fieldName == 'vi'){
                    $scope.temp.viLink = [];
                    $scope.$broadcast('imgSavingSuccess', '');
                };
                console.log(fieldName + ' updating success!');
            });
        };

        //业务线数据组合
        $scope.collectTag = function ($event, tag) {
            tag.isSelected = !tag.isSelected;
        };

        //仓库分支数据组合
        $scope.$on('addBranchesInfo', function(e, branchesInfo){
            $scope.formData.repository = branchesInfo;
        });

        //上传图片数据组合
        $scope.$on('addPicInfo', function (e, picInfo) {
            $scope.temp.viLink.push(picInfo);
        });

        //删除图片数据组合
        $scope.$on('delPic', function (e, path) {
            splicePics($scope.doc.viLink, path);
            splicePics($scope.temp.viLink, path);
        });

        //设置为修改状态
        function initIsEditField(fieldName){
            if(!$scope.isEdit[fieldName]){
                $scope.isEdit[fieldName] = {};
            }
            $scope.isEdit[fieldName].bool = !$scope.isEdit[fieldName].bool;
        };

        //移除本地数组图片对象
        function splicePics(pics, path){
            angular.forEach(pics, function (value, index) {
                if (value.path == path) {
                    pics.splice(index, 1);
                    return false;
                }
            })
        }
    }])