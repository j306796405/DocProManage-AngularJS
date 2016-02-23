var config = require('../config'),
    MAILGROUP = config.AUTHORITY.MAILGROUP;

module.exports = {
    removeAttachment: function(user, model){
        if(user){
            for(var i= 0, len = MAILGROUP.length; i< len; i++){
                if(MAILGROUP[i] !== user.mailGroup){
                    console.log('no authority to view psd');
                    //如果没有权限的人 怎么图片数组过滤PSD加入returnViLinks
                    var returnViLinks = [];
                    if(model.viLink){
                        for(var j= 0, viLinksLen = model.viLink.length; j< viLinksLen; j++){
                            var file = model.viLink[j];
                            if(!/.psd*$/.test(file.path)){
                                returnViLinks.push(file);
                            }
                        }
                        model.viLink = returnViLinks;
                    }
                    return model;
                }
            }
        }
    }
}