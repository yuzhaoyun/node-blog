let express = require('express');

let router = express.Router();

let User = require('./models/user');

router.get('/',function(req,res){
    res.render('index.html');
});

router.get('/login',function(req,res){
    res.render('login.html');
});

router.post('/login',function(req,res){
    res.render('login.html');
});

router.get('/register',function(req,res){
    res.render('register.html');
});

router.post('/register',function(req,res){
    /**
     * 1. 获取表单提交的数据
     * 2. 操作数据库
     *      判断用户是否存在
     *      如果已存在,不允许注册
     *      如果不存在,注册新建用户
     * 3. 发送响应
     */
    let body = req.body;
    User.findOne({
        $or:[{
            email:body.email},
            {nickName: body.nickName}
        ]
    },function(err,data){
        if(err){
            return res.status(500).json({
                success: false,
                message: "服务端错误"
            });
        }
        // console.log(data);
        // 如果邮箱已存在
        // 判断昵称
        if(data){
            console.log(data);
            // 邮箱或者昵称已存在
            return res.status(200).json({
                success: true,
                message: "邮箱或者昵称已存在"
            });
        }

        new User(body).save(function(err,user){
            console.log(body);
            if(err){
                return res.status(500).json({
                    success:false,
                    message: "服务端错误"
                })
            }
            // console.log('ok');
            // Express 提供了一个相应方法: json
            // 该方法接收一个对象作为参数,它会自动帮你把对象转为字符串发送到浏览器
            res.status(200).json({
                success: true,
                message: 'ok'
            });
        });

    })
})

module.exports = router;