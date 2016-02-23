myApp.directive('ngThumb', ['$window', 'UploadThumbnailService', 'STATIC_URL', function ($window, UploadThumbnailService, STATIC_URL) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function (item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|psd'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function (scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);
            var isPsd = /.psd*$/.test(params.file.name);

            //文件或是非图片非psd的话return
            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file) && !isPsd){
                return;
            }

            //用canvas画出缩略图
            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                if(isPsd){
                    //用默认的psd缩略图
                    img.src = UploadThumbnailService.psd.url;
                }else{
                    img.src = event.target.result;
                }
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({width: width, height: height});
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }

        }
    };
}]);
