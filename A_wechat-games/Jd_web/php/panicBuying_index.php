<?php
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST');
	header('Access-Control-Max-Age:60');
	header('Access-Control-Allow-Headers:x-requested-with,content-type');
	header("Content-type:text/json;charset=utf-8");


$arr_str = array(
    array(
        "buyimg" => "http://localhost/A_wechat-games/Jd_web/images/buy1.jpg",
        "buytitle" => "巨峰葡萄（约）500g/份",
        "buyyj" => "7.90",
        "buyshop" => "永辉超市-太阳宫店",
        "buyxj" => "6.9"
        ),
    array(
    	"buyimg" => "http://localhost/A_wechat-games/Jd_web/images/buy2.jpg",
        "buytitle" => "蓝莓/盒", "buyyj" => "9.90",
        "buyshop" => "永辉超市-太阳宫店", 
        "buyxj" => "7.9"
        ),
    array(
    	"buyimg" => "http://localhost/A_wechat-games/Jd_web/images/buy3.jpg",
        "buytitle" => "西红柿(约）800g/份", "buyyj" => "3.90", 
        "buyshop" => "永辉超市-太阳宫店",
        "buyxj" => "1.9"
        ),
    array(
    	"buyimg" => "http://localhost/A_wechat-games/Jd_web/images/buy4.jpg",
        "buytitle" => "哈尔滨小麦王听装500ml*3/包", 
        "buyyj" => "14.5", 
        "buyshop" => "永辉超市-太阳宫店", 
        "buyxj" => "9.9"
        ),
    array(
    	"buyimg" => "http://localhost/A_wechat-games/Jd_web/images/buy5.jpg",
        "buytitle" => "可口可乐330ml*6/组", 
        "buyyj" => "13.8", 
        "buyshop" => "永辉超市-太阳宫店", 
        "buyxj" => "10.9"
        ),
    array(
    "buyimg" => "http://localhost/A_wechat-games/Jd_web/images/buy6.jpg",
        "buytitle" => "【全场8.1折】套袋红富士苹果（约）900g/份", 
        "buyyj" => "8.8",
        "buyshop" => "永辉超市-龙旗广场店", "buyxj" => "7.8"
        ),
    array(
    	"buyimg" => "http://localhost/A_wechat-games/Jd_web/images/buy7.jpg",
        "buytitle" => "【全场8.1折】红心火龙果（约）600g/份", 
        "buyyj" => "9.8",
        "buyshop" => "永辉超市-龙旗广场店", "buyxj" => "8.8"
        ),
    array(
    	"buyimg" => "http://localhost/A_wechat-games/Jd_web/images/buy8.jpg",
        "buytitle" => "【全场8.1折】西兰花（约）500g/份", 
        "buyyj" => "2.9",
        "buyshop" => "永辉超市-龙旗广场店", "buyxj" => "2.8"
        ),
    array(
    	"buyimg" => "http://localhost/A_wechat-games/Jd_web/images/buy9.jpg",
        "buytitle" => "【全场8.1折】绿豆(约)500g/份", 
        "buyyj" => "5.9",
        "buyshop" => "永辉超市-龙旗广场店", "buyxj" => "4.9"
        ),
    array(
    	"buyimg" => "http://localhost/A_wechat-games/Jd_web/images/buy10.jpg",
        "buytitle" => "【全场8.1折】北京10度听装啤酒330ml/听", 
        "buyyj" => "2.1", "buyshop" => "永辉超市-龙旗广场店", 
        "buyxj" => "1.00"
        )
    );


echo(json_encode($arr_str));


?>