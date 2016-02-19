/* express主文件 */
var express = require('express')   //定义express
  , routes = require('./routes');    //定义路由

var app = module.exports = express.createServer();
var fs=require('fs'); 

// Configuration配置
app.configure(function(){
    app.set('views', __dirname + '/views');         //模板路径   
    app.set('view engine', 'ejs');
    app.register('.html', require('ejs'));        //支持html模板
    app.set('view engine', 'html');               //支持html模板
    app.use(express.static(__dirname + '/public'));      //公共文件路径
    app.use(express.bodyParser({                  
        keepExtensions: true,       //保留上传图片扩展名
        uploadDir: __dirname +'/public/images/temp'    //上传图片临时路径
    }));
    app.use(express.methodOverride());

    app.use(express.cookieParser());    //引入cookie
    app.use(express.session({        //引入session
        secret: 'baidu'
        // secret: settings.cookieSecret, 
        // store: new MongoStore({ 
        //   db: settings.db 
        // }) 
    }));
    app.use(express.router(routes)); //路由与主文件分离
});

app.configure('production', function(){
  app.use(express.errorHandler());    
});


app.dynamicHelpers({                 //调用视图助手
    loginName: function(req, res) {     //存储登录名为全局变量
        return req.session.loginName; 
    }, 
    token: function(req, res) {
        return req.session.token;    //存储token令牌为全局变量,用于防止csrf
    },
    error: function(req, res) { 
    var err = req.flash('error');
    if (err.length) 
        return err; 
    else 
        return null; 
    }, 
    success: function(req, res) { 
    var success = req.flash('success'); 
    if (success.length) 
        return success; 
    else 
        return null; 
    }, 
}); 

app.listen(3000);   //监听端口3000
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
