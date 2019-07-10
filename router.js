let express = require('express');

let router = express.Router();

let User = require('./models/user');

let md5 = require('blueimp-md5');

router.get('/',function(req,res){
    res.render('index.html',{
        user:req.session.user
    });
});

router.get('/login',function(req,res){
    res.render('login.html');
});

router.post('/login',function(req,res){
    // 1. 获取表单数据
    // 2. 查询数据库用户名密码是否正确
    // 3. 发送响应数据
    let body = req.body;

    User.findOne({
        email:body.email,
        password: md5(md5(body.password))
    },function(err,user){
        if(err){
            return res.status(500).json({
                err_code:500,
                message: err.message
            })
        }

        if(!user){
            return res.status(200).json({
                err_code:1,
                message: "email or password is invalid !"
            })
        }

        // 用户存在,登陆成功,通过 Session 记录登陆状态
        req.session.user = user;
        res.status(200).json({
            err_code: 0,
            message : "Ok"
        })
    })
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
        $or:[
            {email:body.email},
            {nickname: body.nickname}
        ]
    },function(err,data){
        if(err){
            console.log(err)
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
                err_code: 1,
                message: "email or nickname aleady exists ."
            });
        }
        // 对密码进行 md5 重复加密
        body.password = md5(md5(body.password));
        
        new User(body).save(function(err,user){
            if(err){
                return res.status(500).json({
                    err_code: 500,
                    message: "Internal error ."
                })
            }
            // 注册成功,使用 Session 记录用户的登陆状态
            req.session.user = user;

            // Express 提供了一个相应方法: json
            // 该方法接收一个对象作为参数,它会自动帮你把对象转为字符串发送到浏览器
            res.status(200).json({
                err_code: 0,
                message: 'OK'
            });
        });

    })
});

router.get("/logout",function(req,res){
    // 清楚登陆状态
    req.session.user = null;

    // 重定向到登录页
    res.redirect("/login");
})

module.exports = router;