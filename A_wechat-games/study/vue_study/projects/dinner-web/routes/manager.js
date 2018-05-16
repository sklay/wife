'use strict';
var router = require('express').Router();
var Bmob = require('../util/bmob');

router.get('/login', function(req, res, next) {
    // 如果已经登录，自动跳转
    if (req.session.username) {
        res.redirect('/order/list');
    }
    res.render('manager/login', {
        layout: 'sub'
    });
});

router.post('/login', function(req, res, next) {
    var user = req.body;
    Bmob.User.logIn(user.username, user.password).then(user => {
        req.session.username = user.get('username');
        res.send(user);
    }, err => {
        console.log(err);
        res.send(err);
    });
});

router.get('/logout', function(req, res, next) {
	delete req.session.username;
    res.redirect('/manager/login');
});

module.exports = router;