'use strict';
var router = require('express').Router();
var moment = require('../util/date');
var pageSize = require('../util/config').pageSize;

var Bmob = require('../util/bmob');
var Goods = Bmob.Object.extend('Food');


// 商品列表-页面
router.get('/list', function(req, res, next) {
    var query = new Bmob.Query(Goods);
    query.count().then(total => {
        res.render('goods/list', {
            total: total,
            pageSize: pageSize,
            pageIndex: 0,
            originalUrl: req.originalUrl
        });
    });
});

// 商品列表-接口
router.post('/list', function(req, res, next) {
    var pageIndex = req.body.pageIndex;
    var query = new Bmob.Query(Goods);
    query.include('category');
    query.ascending('priority');
    query.limit(pageSize);
    query.skip(pageSize * pageIndex);
    query.find().then(function(results) {
        res.send(results.map(item => {
            item.createdAt = moment.date(item.createdAt);
            return item;
        }));
    });
});

// 添加商品页面
router.get('/add', function(req, res, next) {
    res.render('goods/add', {
        originalUrl: req.originalUrl
    });
});

// 编辑时读取商品数据
router.post('/find', function(req, res, next) {
    var query = new Bmob.Query(Goods);
    query.get(req.body.objectId).then(goods => {
        goods.set('category', goods.get('category').id)
        res.send(goods);
    });
});

// 添加商品接口
router.post('/add', function(req, res, next) {
    var goods = new Goods;
    var form = req.body;
    /*各种数据转化*/
    // 价格格式化
    form.price = Number.parseFloat(form.price);
    // 价格格式化
    form.priority = Number.parseFloat(form.priority);
    // 生成分类对象
    form.category = Bmob.Object.createWithoutData('Category', form.category);
    // 转化upload带来的图片
    form.thumb_url = form.images[0].url;
    delete form.images;
    console.log(form);
    /*转化结束*/
    if (form.objectId) {
        // 查出原对象
        goods = Bmob.Object.createWithoutData('Food', form.objectId);
        delete form.objectId;
        delete form.createdAt;
        delete form.updatedAt;
    }
    goods.save(form).then(goods => {
        // console.log(goods);
        res.send(goods);
    }, err => {
        console.log(err);
        res.send(err);
    });

});

// 删除商品接口
router.post('/delete', function (req, res, next) {
    var objectId = req.body.objectId;
    var goods = Bmob.Object.createWithoutData('Food', objectId);
    goods.destroy().then(result => {
        res.send(result);
    }, err => {
        res.send(err);
    })
});


module.exports = router;