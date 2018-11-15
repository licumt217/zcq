/**
 * 用户信息
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : { type: String },                    //用户账号
    password: {type: String}                        //密码
});

module.exports = mongoose.model('User',UserSchema);