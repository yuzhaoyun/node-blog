let mongoose = require('mongoose');

// 链接数据库
mongoose.connect('mongodb://localhost/itcast', { useMongoClient: true })

let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        // 注意: 这里不要写 Date.now() 因为如果写了Date.now()会在创建 Schema 的时候即刻调用,即为一个固定值
        // 这里直接给了一个方法: Date.now   
        // 当你去 new Model 的时候,如果没有传递 create_time,则mongoose就会调用 default 指定的 Date.now 方法,使用其返回值作为默认值
        default: Date.now
    },
    last_modified_time:{
        type: Date,
        default: Date.now
    },
    avatar:{
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1,0,1],
        default: -1
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        // 0 没有权限限制
        // 1 不否可以评论
        // 2 不可以登录使用
        enum: [0,1,2],
        default: 0
    }
});

module.exports = mongoose.model('User',userSchema);