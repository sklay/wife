<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_str = array( 
array(
"priceimg" => "http://localhost/zc/images/priceshop1.jpg", 
"pricetitle" => "黄瓜（约）400g/份", 
"pricem" => "1.9", 
"priceloca" => "永辉超市-太阳宫店", 

), 
array(
"priceimg" => "http://localhost/zc/images/priceshop2.jpg", 
"pricetitle" => "蓝莓/盒", 
"pricem" => "7.9", 
"priceloca" => "永辉超市-太阳宫店", 

), 

array(
"priceimg" => "http://localhost/zc/images/priceshop3.jpg", 
"pricetitle" => "西红柿(约）800g/份", 
"pricem" => "1.9", 
"priceloca" => "永辉超市-太阳宫店", 

),

array(
"priceimg" => "http://localhost/zc/images/priceshop4.jpg", 
"pricetitle" => "新土豆（约）1kg/份", 
"pricem" => "3.9", 
"priceloca" => "永辉超市-太阳宫店", 

),

array(
"priceimg" => "http://localhost/zc/images/priceshop5.jpg", 
"pricetitle" => "油菜（约）350g/份", 
"pricem" => "1.5", 
"priceloca" => "永辉超市-太阳宫店", 

),

array(
"priceimg" => "http://localhost/zc/images/priceshop6.jpg", 
"pricetitle" => "柴鸡蛋(约)1kg/份", 
"pricem" => "7.8", 
"priceloca" => "永辉超市-太阳宫店", 

),


array(
"priceimg" => "http://localhost/zc/images/priceshop7.jpg", 
"pricetitle" => "玫瑰香/1盒（290-300g）", 
"pricem" => "5.9", 
"priceloca" => "永辉超市-太阳宫店", 

),

array(
"priceimg" => "http://localhost/zc/images/priceshop8.jpg", 
"pricetitle" => "京红大桃/1盒（620-640g", 
"pricem" => "6.3", 
"priceloca" => "永辉超市-太阳宫店", 

),


 );

echo(json_encode($arr_str));
