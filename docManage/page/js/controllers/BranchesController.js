myApp.controller('BranchesController', ['$scope', 'DocBranchesService', 'DocReleaseService', 'STATIC_URL',
    function ($scope, DocBranchesService, DocReleaseService, STATIC_URL) {
    $scope.STATIC_URL = STATIC_URL;

    $scope.gitData = {
        git: null,
        repository: {},
        repositories: [],//存储仓库数据
        repositoriesSelected: [],//存储被选择仓库数据
        branches: {},//存储分支数据
        branch: {}//存储被选择分支数据
    };

    //详情页初始化仓库分支的视图
    $scope.$on('makeBranchesView', function (e, git) {
        $scope.gitData.git = git;
    });

    //初始化仓库数据
    DocBranchesService.getDocsProjects().success(function(data){
        //如果是详情页整合已选中仓库分支信息
        angular.forEach(data.allRemotes, function(key, value){
            if($scope.gitData.git && $scope.gitData.git[value] && $scope.gitData.git[value].repository == key.id){
                $scope.updateRepositorySelected.state('add', value, key.id);
                $scope.gitData.branch[key.id] = {
                    selected: {
                        name: $scope.gitData.git[value].branch
                    }
                };
            }
        });
        $scope.gitData.repositories = data.allRemotes;

        //监测$scope.gitData.branch值变化，并记录
        $scope.$watch('gitData.branch', function(newValue, oldValue){
            if(newValue == oldValue){return};
            $scope.repositoryResult($scope.gitData.branch, null);//执行方法
        }, true);
    });

    //选择仓库
    $scope.collectRepository = function ($event, alias, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
            $scope.updateRepositorySelected.state(action, alias, id);
    }

    //返回被选择的仓库状态
    $scope.repositoryIsSelected = function(id){
        return $scope.gitData.repositoriesSelected.indexOf(id) >= 0;
    };

    //更新被选择的仓库及分支数据
    $scope.updateRepositorySelected = {
        repositoriesSelected: $scope.gitData.repositoriesSelected,//被选择的仓库
        state: function(action, alias, id){
            return this[action](alias, id);//根据状态调用方法: action='add'/action='remove'
        },
        add: function(alias, id){//添加仓库选择项
            if(this.repositoriesSelected.indexOf(id) == -1){
                this.repositoriesSelected.push(id);//保存被选择仓库数据

                //获取该仓库分支数据
                DocBranchesService.getDocsBranches(alias).success(function(data){
                    $scope.gitData.branches[id] = {'alias': alias, 'branch': []};
                    angular.forEach(data.remoteData.banches, function(key){
                        $scope.gitData.branches[id].branch.push({'name': key});
                    });

                    $scope.repositoryResult($scope.gitData.branch, null);//整合被选择的仓库及分支数据
                });
            }
        },
        remove: function(alias, id){//删除仓库选择项
            if(this.repositoriesSelected.indexOf(id) != -1){
                var idx = this.repositoriesSelected.indexOf(id);
                    this.repositoriesSelected.splice(idx, 1);
                delete $scope.gitData.branches[id];
                if($scope.gitData.branch){//删除仓库的同时清除对应的已选择分支
                    delete $scope.gitData.branch[id];
                };
                if($scope.gitData.repository){//删除仓库的同时清除对应的已发布分支状态
                    delete $scope.gitData.repository[alias];
                };
            }
        }
    };

    //整合被选择的仓库及分支数据
    $scope.repositoryResult = function(data, id){
        if(data != undefined && id != null){
            angular.forEach(data, function(key, value){
                if(value == id && $scope.gitData.branches[value]){
                    $scope.gitData.repository[$scope.gitData.branches[value].alias] = {'repository': value, 'branch': key.selected.name};
                }
            });
        }else if(data != undefined && id == null){
            angular.forEach(data, function(key, value){
                if($scope.gitData.branches[value]){
                    $scope.gitData.repository[$scope.gitData.branches[value].alias] = {'repository': value, 'branch': key.selected.name};
                };
            });
        }

        var branchesInfo = $scope.gitData.repository;

        //向父级controller的推送仓库分支信息
        $scope.$emit('addBranchesInfo', branchesInfo);
    };

    //发布分支数据
    $scope.releaseData = function(id){
        //整合被选择的仓库及分支数据
        $scope.repositoryResult($scope.gitData.branch, id);//执行方法

        //提交数据
        if($scope.gitData.repository && $scope.gitData.repository != {}){
            DocReleaseService.releaseBranch($scope.gitData.repository, id).success(function(data, header, config, status){
                $scope.gitData.branch[id].selected['publish'] = true;
                console.log(data);
            });
        }
    }; 
}]);