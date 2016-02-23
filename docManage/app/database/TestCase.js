var Manage = require('./model');

//update
/*Manage.updateById('5660fd49334f65c03c000001', {proClass: '测试用例', viLink: ''}, {new: true}, function (err, num) {
    if (err) {
        console.log(err);
    }
    console.log('**************');
    console.log(num);
});*/
/*var json = {
    "tag": ["Offline", "Mobile"],
    "person": [{"group": "CSS", "value": "江毅平", "isOperator": true}, {
        "group": "VI",
        "isOperator": false
    }, {"group": "UI", "isOperator": false}, {"group": "PM", "isOperator": false}],
    "git": {
        "ebooking": {"branch": "cssMain", repository: 'ResHotelEbooking'},
        "presstatic": {"branch": "dev/timezone_2", repository: 'Pres.Static'}
    },
    "branches": [],
    "viLink": [],
    "proClass": "变更",
    "proName": "项目名称",
    "proDes": "无",
    "cp4": "无",
    "cssLink": "无",
    "picsLink": "无",
    "lowfiLink": "无",
    submitTime: new Date,
    createDate: new Date
}*/

//create
/*
var db = new Manage(json);
db.create(function(err, model){
    if(err){
        console.log(err);
    }
    console.log(model);
})*/

/*Manage.findAll({repository: '无'}, function(err, result){
    for(var i= 0, item; item= result[i++];){
        (function(j){
            Manage.updateById('5665351cd17012c964000014', {repository: ''} , {new: true},function(err,model){
                if(err){
                    console.log(err);
                }
                console.log('success' + j);
            } )
        })(i)

    }
});*/
