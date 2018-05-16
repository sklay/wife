'use strict';
var router = require('express').Router();
var Bmob = require('../util/bmob');
var Category = Bmob.Object.extend('Category');

// 分类列表-页面
router.get('/list', function (req, res, next) {
    res.render('category/list', {
        originalUrl: req.originalUrl
    });
})

// 分类列表-接口
router.post('/list', function(req, res, next) {
    var query = new Bmob.Query(Category);
    query.ascending('priority');
    query.find().then(function(categoryObjects) {
        // console.log(categoryObjects);
        res.send(categoryObjects);
    });
});

// 分类添加-接口
router.post('/add', function (req, res, next) {
    var category = new Category();
    var form = req.body;
    console.log('form');
    console.log(form);
    form.priority = Number.parseInt(form.priority);
    // 如果已经包含id，则是编辑
    if (form.objectId) {
        // 查出原对象
        category = Bmob.Object.createWithoutData('Category', form.objectId);
        delete form.objectId;
        delete form.createdAt;
        delete form.updatedAt;
    }
    console.log('category', category);
    category.save(form).then(result => {
        console.log(result);
        res.send(result);
    }, err => {
        console.log(err);
        res.send(err);
    });
});

// 分类删除
router.post('/delete', function (req, res, next) {
    var category = Bmob.Object.createWithoutData('Category', req.body.objectId);
    category.destroy().then(result => {
        console.log(result);
        res.send(result);
    }, err => {
        console.log(err);
        res.send(err);
    })

});

module.exports = router;