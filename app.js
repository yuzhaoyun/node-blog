let express = require('express');

let path = require('path');

let app = express();

// 将public和node_modules文件夹开放出来
// app.use('/public/',express.static('./public/'));
app.use('/public/',express.static(path.join(__dirname,'./public/')));
// app.use('/node_modules/',express.static('./node_modules/'));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));
// 配置模板引擎
// 在 Node 中,有很多第三方模板引擎,不是只有 art-template,例如:ejs,jade(pug),handlebars
app.engine('html',require('express-art-template'));

app.set('views',path.join(__dirname,'./views')); // 默认就是 .views 目录

app.get('',function(req,res){
    res.render('index.html',{
        name:"张三"
    })
})

app.listen(8000,function(argument){
    console.log("server is running .......");
})