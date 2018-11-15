var User = require("./dao/model/user.js");

/**
 * 插入
 */
function insert() {
    
    var user = new User({
        username : 'Tracy McGrady',                 //用户账号
        password: 'abcd'                         //密码
    });
    
    user.save(function (err, res) {
        
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
        
    });
}

insert();