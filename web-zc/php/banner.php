 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_str = array(
	"bannerimg" => array(
	"http://localhost/zc/images/l4.jpg",
	"http://localhost/zc/images/l1.jpg",
	"http://localhost/zc/images/l2.jpg",
	"http://localhost/zc/images/l3.jpg",
	"http://localhost/zc/images/l4.jpg",
	"http://localhost/zc/images/l1.jpg"
	),
	"ballNum4" => array(
	"http://localhost/zc/images/ball1.png",
	"http://localhost/zc/images/ball2.png",
	"http://localhost/zc/images/ball3.png",
	"http://localhost/zc/images/ball4.png"
	
	),
	
	"sksImg" => array(
	"http://localhost/zc/images/shop1.jpg",
	"http://localhost/zc/images/shop2.jpg",
	"http://localhost/zc/images/shop3.jpg"

	
	),
);

echo (json_encode($arr_str));