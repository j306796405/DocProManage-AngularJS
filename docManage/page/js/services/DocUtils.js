myApp.factory('DocUtils', [function () {
    return {
        getQuarterStartMonth: function (month) {
            if (month <= 2) {
                return 0;
            }
            else if (month <= 5) {
                return 3;
            }
            else if (month <= 8) {
                return 6;
            }
            else {
                return 9;
            }
        },
        getDate: function (year, month, day) {
            return new Date(year, month, day);
        },
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        },
        formatUserName: function(name){
            var reg = /[a-zA-Z0-9]/g;
            return name.replace(reg, '');
        },
        throttle: function(fn, interval){
            var __self = fn, // 保存需要被延迟执行的函数引用
                timer; // 定时器
                // firstTime = true; // 是否是第一次调用
            return function(){
                var args = arguments,
                __me = this;
                // if(firstTime){ // 如果是第一次调用，不需延迟执行
                //     __self.apply(__me, args);
                //     return firstTime = false;
                // };
                if (timer){ // 如果定时器还在，说明前一次延迟执行还没有完成
                    return false;
                };
                timer = setTimeout(function(){ // 延迟一段时间执行
                    clearTimeout(timer);
                    timer = null;
                    __self.apply(__me, args);
                }, interval || 300);
            };
        }
    }
}])