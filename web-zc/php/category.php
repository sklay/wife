<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_category_1 = array( array("fruit" => "水果", "fruitimg" => array("http://localhost/zc/images/s1.jpg", "http://localhost/zc/images/s2.jpg", "http://localhost/zc/images/s3.jpg", "http://localhost/zc/images/s4.jpg", "http://localhost/zc/images/s5.jpg", "http://localhost/zc/images//s6.jpg"), "fruitdesc" => array("苹果", "梨", "瓜类", "迷糊桃", "柑桔柚", "更多水果"), ), array("fruit" => "蔬菜", "fruitimg" => array("http://localhost/zc/images/c1.jpg", "http://localhost/zc/images/c2.jpg", "http://localhost/zc/images/c3.jpg", "http://localhost/zc/images/c4.jpg", "http://localhost/zc/images/c5.jpg", "http://localhost/zc/images/c6.jpg"), "fruitdesc" => array("根茎类", "叶菜类", "瓜果类", "菇菌类", "调味类", "半成品净菜"), ), );

$arr_category_2 = array( array("fruit" => "牛羊猪禽", "fruitimg" => array("http://localhost/zc/images/q1.jpg", "http://localhost/zc/images/q2.jpg", "http://localhost/zc/images/q3.jpg", "http://localhost/zc/images/q4.jpg", "http://localhost/zc/images/q5.jpg"), "fruitdesc" => array("牛肉", "羊肉", "猪肉", "内脏", "禽类"), ), array("fruit" => "水产海鲜", "fruitimg" => array("http://localhost/zc/images/h1.jpg", "http://localhost/zc/images/h2.jpg", "http://localhost/zc/images/h3.jpg"), "fruitdesc" => array("鱼类", "虾蟹贝类", "其他水产"), ), array("fruit" => "蛋类", "fruitimg" => array("http://localhost/zc/images/d1.jpg", "http://localhost/zc/images/d2.jpg", "http://localhost/zc/images/d3.jpg"), "fruitdesc" => array("鸡蛋", "鸭蛋", "其他蛋类"), ), array("fruit" => "奶制品", "fruitimg" => array("http://localhost/zc/images/n1.jpg", "http://localhost/zc/images/n2.jpg", "http://localhost/zc/images/n3.jpg", "http://localhost/zc/images/n4.jpg", "http://localhost/zc/images/n5.jpg"), "fruitdesc" => array("牛奶", "酸奶", "乳酪类", "加味奶", "豆浆/豆奶"), ), array("fruit" => "进口奶制品", "fruitimg" => array("http://localhost/zc/images/n1.jpg", "http://localhost/zc/images/n2.jpg"), "fruitdesc" => array("进口牛奶", "其他乳制品"), ), );

$arr_category_3 = array( array("fruit" => "低温速食", "fruitimg" => array("http://localhost/zc/images/ds1.jpg", "http://localhost/zc/images/ds2.jpg", "http://localhost/zc/images/ds3.jpg", "http://localhost/zc/images/ds4.jpg", "http://localhost/zc/images/ds5.jpg", "http://localhost/zc/images/ds6.jpg"), "fruitdesc" => array("火锅丸类", "汤圆", "水饺/馄饨", "速食肉类", "冷藏米面制品", "速食蛋类"), ), array("fruit" => "常温速食", "fruitimg" => array("http://localhost/zc/images/cs1.jpg", "http://localhost/zc/images/cs2.jpg", "http://localhost/zc/images/cs3.jpg", "http://localhost/zc/images/cs4.jpg", "http://localhost/zc/images/cs5.jpg", "http://localhost/zc/images/cs6.jpg"), "fruitdesc" => array("方便面、粉", "酱菜类", "常温火腿肠", "罐头", "八宝粥", "果酱"), ), );

$arr_category_4 = array( array("fruit" => "休闲零食", "fruitimg" => array("http://localhost/zc/images/xl1.jpg", "http://localhost/zc/images/xl2.jpg", "http://localhost/zc/images/xl3.jpg", "http://localhost/zc/images/xl4.jpg", "http://localhost/zc/images/xl5.jpg", "http://localhost/zc/images/xl6.jpg", "http://localhost/zc/images/xl7.jpg", "http://localhost/zc/images/xl8.jpg", "http://localhost/zc/images/xl9.jpg"), "fruitdesc" => array("膨化食品", "果干蜜饯", "肉干肉脯", "坚果", "巧克力", "果冻", "硬糖", "软糖", "口香糖"), ), array("fruit" => "饼干/糕点", "fruitimg" => array("http://localhost/zc/images/bg1.jpg", "http://localhost/zc/images/bg2.jpg", "http://localhost/zc/images/bg3.jpg"), "fruitdesc" => array("面包", "饼干/威化", "传统糕点"), ), array("fruit" => "进口休闲食品", "fruitimg" => array("http://localhost/zc/images/ip1.jpg", "http://localhost/zc/images/ip2.jpg", "http://localhost/zc/images/ip4.jpg", "http://localhost/zc/images/ip5.jpg", "http://localhost/zc/images/ip6.jpg", "http://localhost/zc/images/ip7.jpg"), "fruitdesc" => array("饼干/曲奇", "进口膨化食品", "糖果/巧克力", "进口坚果炒货", "进口蜜饯果干", "其他休闲食品"), ), );

$arr_category_5 = array( array("fruit" => "酒", "fruitimg" => array("http://localhost/zc/images/sp1.jpg", "http://localhost/zc/images/sp2.jpg", "http://localhost/zc/images/sp3.jpg", "http://localhost/zc/images/sp4.jpg", "http://localhost/zc/images/sp5.jpg", "http://localhost/zc/images/sp6.jpg"), "fruitdesc" => array("啤酒", "白酒", "洋酒", "红酒", "黄酒", "其他酒"), ), array("fruit" => "饮料", "fruitimg" => array("http://localhost/zc/images/yl1.jpg", "http://localhost/zc/images/yl2.jpg", "http://localhost/zc/images/yl3.jpg", "http://localhost/zc/images/yl4.jpg", "http://localhost/zc/images/yl5.jpg", "http://localhost/zc/images/yl6.jpg"), "fruitdesc" => array("水", "碳酸饮料", "功能性饮料", "茶饮料", "果汁", "其他饮料"), ), array("fruit" => "充饮类", "fruitimg" => array("http://localhost/zc/images/cy1.jpg", "http://localhost/zc/images/cy2.jpg", "http://localhost/zc/images/cy3.jpg", "http://localhost/zc/images/cy4.jpg", "http://localhost/zc/images/cy5.jpg", "http://localhost/zc/images/cy6.jpg"), "fruitdesc" => array("茶叶", "咖啡", "麦片谷物类", "成人奶粉", "果珍", "其他冲调类"), ), array("fruit" => "进口冲饮", "fruitimg" => array("http://localhost/zc/images/icy1.jpg"), "fruitdesc" => array("进口咖啡"), ), array("fruit" => "进口酒水饮料", "fruitimg" => array("http://localhost/zc/images/isp1.jpg", "http://localhost/zc/images/isp2.jpg", "http://localhost/zc/images/isp3.jpg"), "fruitdesc" => array("进口葡萄酒", "饮料/矿泉水", "其他进口酒"), ), );

if ($_GET['category'] == "水果蔬菜") {
	echo json_encode($arr_category_1);
} else if ($_GET['category'] == "肉禽蛋奶") {
	echo json_encode($arr_category_2);
} else if ($_GET['category'] == "冷热速食") {
	echo json_encode($arr_category_3);
} else if ($_GET['category'] == "休闲食品") {
	echo json_encode($arr_category_4);
} else if ($_GET['category'] == "酒水饮料") {
	echo json_encode($arr_category_5);
} else {
	echo json_encode($arr_category_1);
}
