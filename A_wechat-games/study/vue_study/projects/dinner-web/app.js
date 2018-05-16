'use strict';

var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var expressLayouts = require('express-ejs-layouts');

// 引入Bmob
var Bmob = require('./util/bmob');
var { appId, appSecret } = require('./util/config');
Bmob.initialize(appId, appSecret);

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// 设置默认超时时间
app.use(timeout('15s'));

// 加载母版
app.use(expressLayouts);
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

app.enable('trust proxy');
// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 加入express-session支持
app.use(expressSession( {
    secret: 'dinner mall',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// 默认首页
app.get('/', function(req, res) {
    res.redirect('/manager/login');
});

// 登录判断中间件
app.use(function(req, res, next) {
    if (req.originalUrl != '/manager/login' && !req.session.username) {
        res.redirect('/manager/login');
        return;
    }
    next();
});

// 可以将一类的路由单独保存在一个文件中
app.use('/file', require('./routes/file'));
app.use('/goods', require('./routes/goods'));
app.use('/category', require('./routes/category'));
app.use('/order', require('./routes/order'));
app.use('/manager', require('./routes/manager'));

app.use(function(req, res, next) {
    // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
    if (!res.headersSent) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

// error handlers
app.use(function(err, req, res, next) {
    if (req.timedout && req.headers.upgrade === 'websocket') {
        // 忽略 websocket 的超时
        return;
    }

    var statusCode = err.status || 500;
    if (statusCode === 500) {
        console.error(err.stack || err);
    }
    if (req.timedout) {
        console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
    }
    res.status(statusCode);
    // 默认不输出异常详情
    var error = {};
    if (app.get('env') === 'development') {
        // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
        error = err;
    }
    res.render('error', {
        message: err.message,
        error: error,
        originalUrl: req.originalUrl
    });
});

module.exports = app;