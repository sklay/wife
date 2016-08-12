 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_str = array(
    "result"=>1,
	"bannerimg" => array("http://iwen.wiki/zhichenshop/l4.jpg","http://iwen.wiki/zhichenshop/l1.jpg","http://iwen.wiki/zhichenshop/l2.jpg","http://iwen.wiki/zhichenshop/l3.jpg","http://iwen.wiki/zhichenshop/l4.jpg","http://iwen.wiki/zhichenshop/l1.jpg"),
	"qgimg" => array("http://iwen.wiki/zhichenshop/shop1.jpg","http://iwen.wiki/zhichenshop/shop2.jpg","http://iwen.wiki/zhichenshop/shop3.jpg"),
	"season"=>array("spring","summer","auttum","winter"),
);

echo (json_encode($arr_str));