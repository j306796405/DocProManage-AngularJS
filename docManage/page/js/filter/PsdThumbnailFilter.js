myApp.filter('PsdThumbnailFilter', ['UploadThumbnailService', function (UploadThumbnailService) {
    return function (pics) {
        if(angular.isArray(pics)){
            for (var i = 0; i < pics.length; i++) {
                if(/.psd$/.test(pics[i].name)){
                    pics[i].thumbnail = UploadThumbnailService.psd.url;
                }
            }
        }else if(angular.isObject(pics)){
            if(/.psd$/.test(pics.name)){
                pics.thumbnail = UploadThumbnailService.psd.url;
            }
        }
        return pics;
    }
}])