 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_drug = array(
	array(
		"drugName" => "永辉",
		"shopname" => "drug/yh.html"
	),
	array(
		"drugName" => "保健品",
		"shopname" => "drug/bj_index.html"
	),
	array(
		"drugName" => "处方药",
		"shopname" => "drug/cfy_index.html"
	),
	array(
		"drugName" =>"酸奶",
		"shopname" => "drug/sn_index.html"
	),
	array(
		"drugName" => "妇科",
		"shopname" => "drug/fk_index.html"
	),
	array(
		"drugName" => "处方",
		"shopname" => "drug/cf_index.html"
	),
	array(
		"drugName" =>"舒肤佳",
		"shopname" => "drug/sfj_index.html"
	),
	array(
		"drugName" => "牛奶",
		"shopname" => "drug/milk_index.html"
	),
	array(
		"drugName" => "香叶",
		"shopname" => "drug/xy_index.html"
	),
	array(
		"drugName" => "牛肉干",
		"shopname" => "drug/bull_index.html"
	),
	array(
		"drugName" => "同仁堂",
		"shopname" => "drug/trt_index.html"
	),
	array(
		"drugName" => "口罩",
		"shopname" =>"drug/kz_index.html"
	),

);

echo (json_encode($arr_drug));