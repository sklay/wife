 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_category_1 = array(
	array(
		"fruit" => "水果",
		"fruitimg" => array(
			"http://localhost/category/s1.jpg",
			"http://localhost/category/s2.jpg",
			"http://localhost/category/s3.jpg",
			"http://localhost/category/s4.jpg",
			"http://localhost/category/s5.jpg",
			"http://localhost/category/s6.jpg"
		),
		"fruitdesc" => array(
			"苹果","梨","瓜类","迷糊桃","柑桔柚","更多水果"
		),
	),
	array(
		"fruit" => "蔬菜",
		"fruitimg" => array(
			"http://localhost/category/c1.jpg",
			"http://localhost/category/c2.jpg",
			"http://localhost/category/c3.jpg",
			"http://localhost/category/c4.jpg",
			"http://localhost/category/c5.jpg",
			"http://localhost/category/c6.jpg"
		),
		"fruitdesc" => array(
			"根茎类","叶菜类","瓜果类","菇菌类","调味类","半成品净菜"
		),
	),
);

$arr_category_2 = array(
	array(
		"fruit" => "牛羊猪禽",
		"fruitimg" => array(
			"http://localhost/category/q1.jpg",
			"http://localhost/category/q2.jpg",
			"http://localhost/category/q3.jpg",
			"http://localhost/category/q4.jpg",
			"http://localhost/category/q5.jpg"
		),
		"fruitdesc" => array(
			"牛肉","羊肉","猪肉","内脏","禽类"
		),
	),
	array(
		"fruit" => "水产海鲜",
		"fruitimg" => array(
			"http://localhost/category/h1.jpg",
			"http://localhost/category/h2.jpg",
			"http://localhost/category/h3.jpg"
		),
		"fruitdesc" => array(
			"鱼类","虾蟹贝类","其他水产"
		),
	),
	array(
		"fruit" => "蛋类",
		"fruitimg" => array(
			"http://localhost/category/d1.jpg",
			"http://localhost/category/d2.jpg",
			"http://localhost/category/d3.jpg"
		),
		"fruitdesc" => array(
			"鸡蛋","鸭蛋","其他蛋类"
		),
	),
	array(
		"fruit" => "奶制品",
		"fruitimg" => array(
			"http://localhost/category/n1.jpg",
			"http://localhost/category/n2.jpg",
			"http://localhost/category/n3.jpg",
			"http://localhost/category/n4.jpg",
			"http://localhost/category/n5.jpg"
		),
		"fruitdesc" => array(
			"牛奶","酸奶","乳酪类","加味奶","豆浆/豆奶"
		),
	),
	array(
		"fruit" => "进口奶制品",
		"fruitimg" => array(
			"http://localhost/category/n1.jpg",
			"http://localhost/category/n2.jpg"
		),
		"fruitdesc" => array(
			"进口牛奶","其他乳制品"
		),
	),

);

if ($_GET['category'] == "水果蔬菜") {
	echo json_encode($arr_category_1);
}else if($_GET['category'] == "肉禽蛋奶"){
	echo json_encode($arr_category_2);
}else{
	echo json_encode($arr_category_1);
}