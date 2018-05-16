'use strict';
var router = require('express').Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var path = require('path');
var fs = require('fs');
var Bmob = require('../util/bmob.js');
var {appId, appSecret} = require('../util/config');

// 添加分类
router.post('/upload', multipartMiddleware, function(req, res) {
    console.log('uploading');
    // 临时文件完整路径
    var file_url = req.files.file.path;
    // 截取文件名
    var filename = path.basename(file_url);
    console.log(filename)
    /* request 上传 */
    var request = require('request');
    request.post({
        headers: {
            "X-Bmob-Application-Id": appId,
            "X-Bmob-REST-API-Key": appSecret
        },
        url: 'https://api.bmob.cn/2/files/' + filename,
        body: fs.readFileSync(file_url)
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        res.send(body);
    });
});

module.exports = router;