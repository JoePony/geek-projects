/* 数据库参数 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost', //服务器
    user: 'root', //用户名
    password: '', //密码
    database: 'baidunews', //数据库名
    port: 3306 //端口
});
conn.connect(); //连接数据库

var sql; //声明sql语句
var table = 'news'; //声明news表名
var tableCategory = 'category'; //声明category表名
var tableUser = 'user'; //声明user表名

var fs = require('fs'); //文件操作中间件

/*  路由设置 */
module.exports = function(app) {
    app.get('/', getCategoryList); //首次加载时调用方法进行渲染

    app.get('/getCategoryList/:name', getCategoryList); //如果是获取导航的请求

    /*  获取导航 */
    function getCategoryList(req, res) {
        sql = 'select * from ' + tableCategory;
        conn.query(sql, function(err, rows, fields) {
            if (req.params.name) {
                res.send(rows); //如果是获取导航的请求,则返回相应数据                            
            } else {
                res.render('index', {
                    'categoryList': rows,
                    title: '百度新闻',
                    layout: 'layout' //使用前端公用模板
                }); //如果是首次加载，则对导航进行渲染
            }
        });
    }

    /* 按指定导航栏目category，从news表中获取新闻 */
    app.get('/newsByCategory/:category/:start/:num', setSql, newsByCategory);

    function setSql(req, res, next) { //从start位置开始获取num条新闻
        // sql = "select * from " + table + " where category='" + req.params.category + "' limit " + req.params.start + "," + req.params.num;
        sql = "select * from " + table + " where category='" + req.params.category + "' order by id desc limit " + req.params.start + "," + req.params.num;
        next(); //尝试next的作用
    }

    function newsByCategory(req, res) { //执行sql并返回数据
        conn.query(sql, function(err, rows, field) {
            res.send(rows);
        });
    }

    /* 客户端显示某一新闻 */
    app.get('/shownews/:id', getOneNews);

    /* 后台修改时显示某一新闻 */
    app.get('/edit', checkLogin); //检测登录状态
    app.get('/edit/:id', checkLogin); //检测登录状态
    app.get('/edit/:id', getOneNews);
    /* 获取指点某一条新闻 */
    function getOneNews(req, res) {
        sql = 'select * from ' + table + ' where id=' + req.params.id;
        conn.query(sql, function(err, rows, fields) {
            if (rows.length == 0) {
                return false;
            }
            if (/shownews/.test(req.originalUrl)) { //如果是前台显示操作
                res.render('show-news', {
                    'news': rows[0]
                });
            } else if (/edit/.test(req.originalUrl)) { //如果是后台修改操作
                res.render('edit', {
                    'news': rows[0],
                    title: '修改新闻',
                    layout: 'layout-admin' //使用后台公用模板
                });
            }
        });
    }

    /* 取消修改 */
    app.get('/cancel', function(req, res) {
        res.redirect('/admin');
    });

    /* 从news表中获取指定导航栏目category下的记录总数 */
    app.get('/getTotal/:category', function(req, res) {
        sql = "select count(*) as total from " + table + " where category='" + req.params.category + "'";
        conn.query(sql, function(err, rows, field) {
            res.json({
                total: rows[0].total
            });
        });
    });
    /* 从news表中获取全部新闻记录总数 */
    app.get('/getTotal', function(req, res) {
        sql = "select count(*) as total from " + table;
        conn.query(sql, function(err, rows, field) {
            res.json({
                total: rows[0].total
            });
        });
    });

    /* 新闻详细页路由 */
    app.get('/show', function(req, res) {
        res.render('index', {
            title: '百度新闻',
            layout: 'layout' //使用前端公用模板
        });
    });

    /* 登录路由 */
    app.get('/login', function(req, res) {
        res.render('login', {
            title: '后台登录',
            layout: 'login' //使用登录模板
        });
    });

    /* 后台退出 */
    app.get('/logout', function(req, res) {
        req.session.loginName = null;    //退出后台，清除session
        res.redirect('/login');
    });

    /* 后台登录 */
    app.post('/login', function(req, res) {
        var username = req.body.username,
            psw = req.body.psw;
        sql = "select count(*) as num from " + tableUser + " where username='" + username + "' and binary password='" + psw + "'";
        conn.query(sql, function(err, rows, fields) {
            var num = rows[0].num;
            res.send({
                num: num       //ajax发送登录结果
            });
            if (num > 0) {
                req.session.loginName = username;     //设置session
            }
        });
    });

    app.get('/admin', checkLogin); // 检测登录状态、

    /* 登录后后台路由 */
    app.get('/admin', function(req, res) {
        var start = 0; //默认初始检索位置
        var numPerPage = 30; //默认后台显示条数
        sql = "select * from news order by id desc limit " + start + "," + numPerPage;
        conn.query(sql, function(err, rows, field) {
            res.render('admin', { //渲染后台模板
                'newsList': rows,
                title: '后台管理',
                start: start,
                numPerPage: numPerPage,
                layout: 'layout-admin' //使用后台公用模板
            });
        });
    });

    /* 添加新闻 */
    app.post('/add', function(req, res) {
        var title = req.body.title, //获取post新闻信息
            content = req.body.content,
            category = req.body.category,
            source = req.body.source;
        var isUpload = req.files['uploadImg'].name == '' ? false : true;  //是否上传图片
        var imgPath = '';
        var time = Date.parse(new Date()) / 1000;  //当前时间戳
        if (isUpload) {
            imgPath = uploadImg(req, time);  //调用上传方法
        }
        sql = "insert into " + table + "(title,content,category,imgPath,source,time) values('" + title + "','" + content + "','" + category + "','" + imgPath + "','" + source + "','" + time + "')";
        conn.query(sql, function(err, rows, fields) {   //执行数据库添加
            res.redirect('/admin');
        });
    });

    /* 修改新闻 */
    app.post('/edit/:id', function(req, res, next) {
        var title = req.body.title, //获取post新闻信息
            content = req.body.content,
            category = req.body.category,
            source = req.body.source,
            id = req.params.id;
        var isUpload = req.files['uploadImg'].name == '' ? false : true;
        var time = Date.parse(new Date()) / 1000; //时间戳                           
        if (isUpload) { //如果上传里图片
            var imgPath = uploadImg(req, time);   //调用上传方法
            sql = "update " + table + " set title='" + title + "', content='" + content + "', category='" + category + "', source='" + source + "', imgPath='" + imgPath + "' where id=" + id;
        } else { //如果未做图片修改
            sql = "update " + table + " set title='" + title + "', content='" + content + "', category='" + category + "', source='" + source + "' where id=" + id;
        }
        conn.query(sql, function(err, rows, fields) {   //执行数据库更新
            res.redirect('/admin');
        });
    });
    /* 上传图片公用方法 */
    function uploadImg(req, time) {
        for (var i in req.files) {
            if (req.files[i].size == 0) {
                // 使用同步方式删除一个文件
                fs.unlinkSync(req.files[i].path);
            } else {
                // 使用同步方式重命名一个文件
                var size = req.files[i].size;
                var name = time + '_' + req.files[i].name;   //添加时间戳，防止重名
                var path = '/images/upload/' + name;
                var type = req.files[i].type;
                fs.renameSync(req.files[i].path, 'public' + path); //上传图片
            }
        }
        return path;  //返回图片路径
    }

    /* 删除新闻 */
    app.get('/delete/:id', function(req, res) {
        sql = "delete from " + table + " where id=" + req.params.id;
        conn.query(sql, function(err, rows, filed) {
            res.redirect('/admin');
        });
    });

    /* 检查是否登录 */
    function checkLogin(req, res, next) {
        if (!req.session.loginName) {
            res.redirect('/login');    //没有session即未登录则跳转到登录页
        }
        next(); //如果登录则继续
    }
}
