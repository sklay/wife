<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");


$arr_shop = array(
    	array(
        "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon1.jpg",
        "shopname" => "永辉超市-龙旗广场店",
        "start" => 5,
        "shopnum" => 21,
        "sell" => 5487,
        "shopId" => 1
    ),
    array(
        "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon2.jpg",
        "shopname" => "幸福超市-安宁庄店",
        "start" => 5,
        "shopnum" => 225,
        "sell" => 2560,
        "shopId" => 2
    ),
    array(
        "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon3.jpg",
        "shopname" => "乐天超市-霍营店",
        "start" => 5,
        "shopnum" => 14,
        "sell" => 2182,
        "shopId" => 3
    ),
    array(
        "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon4.jpg",
        "shopname" => "农鲜生—果色添香水果超市店",
        "start" => 5,
        "shopnum" => 991,
        "sell" => 227,
        "shopId" => 4
    ),
    array(
        "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon5.jpg",
        "shopname" => "电果网-上地店",
        "start" => 5,
        "shopnum" => 57,
        "sell" => 244,
        "shopId" => 5
    )
    
//      array(
//          "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon1.jpg",
//          "shopname" => "永辉超市-龙旗广场店",
//          "start" => 5,
//          "shopnum" => 21,
//          "sell" => 5487,
//          "shopId" => 6,
//          "listimg" => array(
//              "http://localhost/A_wechat-games/Jd_web/images/listImg1-1.jpg",
//              "http://localhost/A_wechat-games/Jd_web/images/listImg1-2.jpg",
//              "http://localhost/A_wechat-games/Jd_web/images/listImg1-3.jpg",
//              "http://localhost/A_wechat-games/Jd_web/images/listImg1-4.jpg",
//          )
//      ),
//      array(
//          "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon2.jpg",
//          "shopname" => "幸福超市-安宁庄店",
//          "start" => 5,
//          "shopnum" => 225,
//          "sell" => 2560,
//          "shopId" => 7,
//          "desc" => "豹宇网络综合市场。品质优鲜，低价到家",
//          "listimg" => array(
//              "http://localhost/A_wechat-games/Jd_web/images/listImg2-1.jpg",
//              "http://localhost/A_wechat-games/Jd_web/images/listImg2-2.jpg",
//              "http://localhost/A_wechat-games/Jd_web/images/listImg2-3.jpg",
//              "http://localhost/A_wechat-games/Jd_web/images/listImg2-4.jpg",
//          )
//      ),
//      array(
//          "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon11.jpg",
//          "shopname" => "豹宇生鲜-广德惠普便民市场",
//          "start" => 5,
//          "shopnum" => 225,
//          "sell" => 2560,
//          "shopId" => 8,
//          "desc" => "豹宇网络综合市场。品质优鲜，低价到家",
//          "listimg" => array(
//              "http://localhost/A_wechat-games/Jd_web/images/listImg3-1.jpg",
//              "http://localhost/A_wechat-games/Jd_web/images/listImg3-2.jpg",
//              "http://localhost/A_wechat-games/Jd_web/images/listImg3-3.jpg",
//              "http://localhost/A_wechat-games/Jd_web/images/listImg3-4.jpg",
//          )
//      )
);
//$list_shop0 = array(
//  
//);






echo(json_encode($arr_shop));