 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_city= array(
	array(
		"city" =>"北京市",
		"cityid"=>1
	),
	array(
		"city" =>"上海市",
		"cityid"=>2
	),
	array(
		"city" =>"武汉市",
		"cityid"=>1381
	),
	array(
		"city" =>"广州市",
		"cityid"=>1601
	),
	array(
		"city" =>"深圳市",
		"cityid"=>1607
	),
	array(
		"city" =>"成都市",
		"cityid"=>1930
	),
	array(
		"city" =>"天津市",
		"cityid"=>3
	),
	array(
		"city" =>"南京市",
		"cityid"=>904
	),
	array(
		"city" =>"宁波市",
		"cityid"=>1158
	),
	array(
		"city" =>"廊坊市",
		"cityid"=>274
	),
	array(
		"city" =>"西安市",
		"cityid"=>2376
	),
	array(
		"city" =>"重庆市",
		"cityid"=>4
	),
	array(
		"city" =>"苏州市",
		"cityid"=>988
	),
	array(
		"city" =>"杭州市",
		"cityid"=>1213
	),
	array(
		"city" =>"长沙市",
		"cityid"=>1482
	),
	array(
		"city" =>"青岛市",
		"cityid"=>1007
	),
	array(
		"city" =>"合肥市",
		"cityid"=>1116
	),
	array(
		"city" =>"郑州市",
		"cityid"=>412
	),
	array(
		"city" =>"常州市",
		"cityid"=>978
	)
);

echo (json_encode($arr_city));