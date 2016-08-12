 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_shop = array(
	array(
		"shopicon" => "http://iwen.wiki/zhichenshop/shopicon1.png",
		"shopname" => "多洗-北京店",
		"start" => 4,
		"shopnum" => 21,
		"sell" =>200
	),
	array(
		"shopicon" => "http://iwen.wiki/zhichenshop/shopicon2.png",
		"shopname" => "花里花外",
		"start" => 5,
		"shopnum" => 225,
		"sell" =>515
	),
	array(
		"shopicon" => "http://iwen.wiki/zhichenshop/shopicon3.png",
		"shopname" => "修哪儿-北京店",
		"start" => 3,
		"shopnum" => 14,
		"sell" =>489
	),
	array(
		"shopicon" => "http://iwen.wiki/zhichenshop/shopicon4.png",
		"shopname" => "护生堂-北京店",
		"start" => 5,
		"shopnum" => 991,
		"sell" =>403
	),
	array(
		"shopicon" => "http://iwen.wiki/zhichenshop/shopicon5.png",
		"shopname" => "维尔纳斯蛋糕",
		"start" => 5,
		"shopnum" => 57,
		"sell" =>358
	),
);

echo (json_encode($arr_shop));