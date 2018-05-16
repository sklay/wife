'use strict';
var router = require('express').Router();
var Bmob = require('../util/bmob');
var moment = require('../util/date');
var config = require('../util/config');
var pageSize = config.pageSize;
var status = config.status;

var Order = Bmob.Object.extend('Order');

// 订单列表-页面
router.get('/list', function(req, res, next) {
    var query = new Bmob.Query(Order);
    query.count().then(total => {
        res.render('order/list', {
            total: total,
            pageSize: pageSize,
            pageIndex: 0,
            originalUrl: req.originalUrl
        });
    }, err => {
        console.log(err);
    });
})

// 订单列表-接口
router.post('/list', function(req, res, next) {
    var pageIndex = req.body.pageIndex;
    // console.log(pageIndex);
    var query = new Bmob.Query(Order);
    query.include('user');
    query.include('address');
    query.descending('createdAt');
    query.limit(pageSize);
    query.skip(pageSize * pageIndex);
    query.find().then(function(orderObjects) {
        res.send(orderObjects);
    });
});

// 订单发货-接口
router.post('/deal', function(req, res, next) {
    var objectId = req.body.objectId;
    var order = Bmob.Object.createWithoutData('Order', objectId);
    order.set('status', status.SENT);
    order.save().then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
});

module.exports = router;