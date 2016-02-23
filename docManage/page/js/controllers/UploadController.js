myApp.controller('UploadController', ['$scope', '$filter', 'FileUploader', 'UploadService', 'FAKE_URL', 'STATIC_URL',
    function ($scope, $filter, FileUploader, UploadService, FAKE_URL, STATIC_URL) {
        $scope.STATIC_URL = STATIC_URL;

        var itemsList = [];

        var uploader = $scope.uploader = new FileUploader({
            url: FAKE_URL + 'upload'
        });

        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                //psd的type有bug 需要另外解析
                if (item.type) {
                    return '|jpg|png|jpeg|bmp|gif|psd'.indexOf(type) !== -1;
                } else {
                    return /.psd*$/.test(item.name);
                }
            }
        });

        //删除图片
        $scope.delPic = function (item) {
            UploadService.delPic({imgPath: item.href}).success(function (data, status, headers, config) {
                item.remove();
                $scope.$emit('delPic', item.href);
            });
        }

        //详情页初始化图片的视图
        $scope.$on('makePicsView', function (e, pics) {
            var filter_pics = $filter('PsdThumbnailFilter')(pics);
            $scope.pics = filter_pics;
        })

        //详情页图片保存成功
        $scope.$on('imgSavingSuccess', function(e){
            angular.forEach(itemsList, function(item, index){
                delete item.isSuccess;
                //此处如果保存对象引用 可自动更改修改状态
                item.isEdit = $scope.isEdit.vi;
            })
            itemsList = [];
        })

        $scope.delInitPic = function(pics, index){
            var path = pics[index].path;
            UploadService.delPic({imgPath: pics[index].path}).success(function (data, status, headers, config) {
                pics.splice(index, 1);
                $scope.$emit('delPic', path);
            })
        }

        // CALLBACKS
        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            //console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            //console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            //console.info('onAfterAddingAll', addedFileItems);
            uploader.uploadAll();
        };
        uploader.onBeforeUploadItem = function (item) {
            //console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function (fileItem, progress) {
            //console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            //console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            //console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            //console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            //console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            //console.info('onCompleteItem', fileItem, response, status, headers);
            var path = response[0].path,
                name = response[0].name;
            fileItem.href = path;
            itemsList.push(fileItem);
            $filter('PsdThumbnailFilter')(fileItem.file);

            var picInfo = {
                name: name,
                path: path
            }
            //向父级controller的推送新增图片信息
            $scope.$emit('addPicInfo', picInfo);
        };
        uploader.onCompleteAll = function () {
            //console.info('onCompleteAll');
        };

        //console.info('uploader', uploader);
    }]);