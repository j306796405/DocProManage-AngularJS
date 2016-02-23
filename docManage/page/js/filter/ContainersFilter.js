myApp.filter('ContainersFilter', [function () {
    return function (array, str){
        var bool = false;
        angular.forEach(array, function(v, i){
            if(v == str){
                bool = true;
                return false
            }
        })
        return bool;
    }
}])