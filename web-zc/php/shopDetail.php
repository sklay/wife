<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_shop1 = array(
"shopLogo" => "http://localhost/zc/images/shopicon1.jpg",
 "shopName" => "永辉超市-龙旗广场店", 
 "category" => array( 
 array(
 "title" => "秒杀",
 "product" => array(
   array("img" => "http://localhost/zc/images/yhms1.jpg", "name" => "北京10度听装啤酒330ml/听", "price" => "1.00"),
   array("img" => "http://localhost/zc/images/yhms2.jpg", "name" => "西兰花（约）500g/份", "price" => "2.8"), 
   ),
  ), 
 array(
 "title" => "海报热卖", 
 "product" => array(
  array("img" => "http://localhost/zc/images/yhhb1.jpg", "name" => "可口可乐汽水600ml/瓶", "price" => "2.6"),
  array("img" => "http://localhost/zc/images/yhhb2.jpg", "name" => "维达超韧无芯卫生纸V4496/180g*10/提", "price" => "19.9"), 
  ), 
 ), 
 
  array(
 "title" => "0.99/1.9专区(7)", 
 "product" => array(
  array("img" => "http://localhost/zc/images/shop1-3-1.jpg", "name" => "青辣椒（约）350g/份", "price" => "1.9"),
  array("img" => "http://localhost/zc/images/shop1-3-2.jpg", "name" => "生姜（约）350g/份", "price" => "1.9"), 
  ), 
 ), 
 
 
 
 
), 
);


$arr_shop2 = array(
"shopLogo" => "http://localhost/zc/images/shopicon2.jpg",
 "shopName" => "幸福超市-安宁庄店", 
 "category" => array( 
 array(
 "title" => "直降",
 "product" => array(
   array("img" => "http://localhost/zc/images/zj1.jpg", "name" => "【爆款推荐】科尔沁五香牛肉丸160g/袋", "price" => "15.8"),
   array("img" => "http://localhost/zc/images/zj2.jpg", "name" => "【爆款推荐】科尔沁澳洲牛肉粒150g/袋", "price" => "2.8"), 
   ),
  ), 
 array(
 "title" => "干果特惠", 
 "product" => array(
  array("img" => "http://localhost/zc/images/ggmj1.jpg", "name" => "【分享愉悦】蒜味带壳花生500g/份", "price" => "8.6"),
  array("img" => "http://localhost/zc/images/ggmj2.jpg", "name" => "【分享愉悦】山楂条500g/份", "price" => "8.9"), 
  ), 
 ), 
), 
);


$arr_shop3 = array(
"shopLogo" => "http://localhost/zc/images/shopicon3.jpg",
 "shopName" => "乐天超市-霍营店", 
 "category" => array( 
 array(
 "title" => "调味料",
 "product" => array(
   array("img" => "http://localhost/zc/images/twl1.jpg", "name" => "陶华碧老干妈风味豆豉油制辣椒280g/瓶", "price" => "14"),
   array("img" => "http://localhost/zc/images/twl2.jpg", "name" => "天力芥末膏43g/支", "price" => "4.8"), 
   ),
  ), 
 array(
 "title" => "南北干货", 
 "product" => array(
  array("img" => "http://localhost/zc/images/nbgh1.jpg", "name" => "恒胜天祥红薯粉丝400g/袋", "price" => "7.9"),
  array("img" => "http://localhost/zc/images/nbgh2.jpg", "name" => "双塔绿豆龙口粉丝320g/袋", "price" => "11.4"), 
  ), 
 ), 
), 
);






$arr_shop4 = array(
"shopLogo" => "http://localhost/zc/images/shopicon4.jpg",
 "shopName" => "农鲜生—果色添香水果超市店", 
 "category" => array( 
 array(
 "title" => "国产水果",
 "product" => array(
   array("img" => "http://localhost/zc/images/gcsg1.jpg", "name" => "精品富士 约1kg/份", "price" => "19.8"),
   array("img" => "http://localhost/zc/images/gcsg2.jpg", "name" => "树上熟木瓜 约850-950g/份", "price" => "9.9"), 
   ),
  ), 
 array(
 "title" => "进口水果", 
 "product" => array(
  array("img" => "http://localhost/zc/images/jksg1.jpg", "name" => "泰国金枕头榴莲 约2.48kg/个", "price" => "128"),
  array("img" => "http://localhost/zc/images/jksg2.jpg", "name" => "奇异果绿心 约110-120g/个", "price" => "4.9"), 
  ), 
 ), 
), 
);

$arr_shop5 = array(
"shopLogo" => "http://localhost/zc/images/shopicon5.jpg",
 "shopName" => "电果网-上地店店", 
 "category" => array( 
 array(
 "title" => "助力奥运",
 "product" => array(
   array("img" => "http://localhost/zc/images/zlay1.jpg", "name" => "红牛饮料250ml/听", "price" => "6"),
   array("img" => "http://localhost/zc/images/zlay2.jpg", "name" => "越南白心火龙果2枚装约1kg/份", "price" => "18.8"), 
   ),
  ), 
 array(
 "title" => "今日推荐", 
 "product" => array(
  array("img" => "http://localhost/zc/images/jrtj1.jpg", "name" => "扶风富士苹果约450-500g/份", "price" => "7.8"),
  array("img" => "http://localhost/zc/images/jrtj2.jpg", "name" => "优选国产香蕉1kg/份", "price" => "9"), 
  ), 
 ), 
), 
);

if ($_GET['shopid'] == 1) {
	echo json_encode($arr_shop1);
} else if ($_GET['shopid'] == 2) {

	echo json_encode($arr_shop2);

} else if ($_GET['shopid'] == 3) {

	echo json_encode($arr_shop3);

} else if ($_GET['shopid'] == 4) {

	echo json_encode($arr_shop4);

} else if ($_GET['shopid'] == 5) {

	echo json_encode($arr_shop5);

}
