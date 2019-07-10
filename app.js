let express = require('express');

let path = require('path');

let app = express();

let bodyParser = require('body-parser');

let session  = require('express-session');

let router = require('./router');

// 将public和node_modules文件夹开放出来
// app.use('/public/',express.static('./public/'));
app.use('/public/',express.static(path.join(__dirname,'./public/')));
// app.use('/node_modules/',express.static('./node_modules/'));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));
// 配置模板引擎
// 在 Node 中,有很多第三方模板引擎,不是只有 art-template,例如:ejs,jade(pug),handlebars
app.engine('html',require('express-art-template'));

app.set('views',path.join(__dirname,'./views')); // 默认就是 .views 目录

// 配置body-parser(一定要放在挂载路由之前) [配置解析表单POST请求体插件]
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 在 Express 框架中,默认不支持 Session 和 Cookie, 但是我们可以使用第三方中间件: express-session 来解决
/**
 * 1. 安装 npm install express-session
 * 2. 配置 (一定要在挂载路由之前)
 * 3. 使用
 *   当把这个插件配置好之后,我们就可以通过 req.session 来访问和设置 Session 成员( 添加Session数据: req.session.foo = 'bar', 访问Session数据: req.session.foo)
 */
app.use(session({
    secret: 'itcast',
    resave: false,
    saveUninitialized: true
}))

// 把路由挂载到app中
app.use(router);

// app.get('',function(req,res){
//     res.render('index.html',{
//         name:"张三"
//     })
// })

app.listen(8000,function(argument){
    console.log("server is running .......");
})