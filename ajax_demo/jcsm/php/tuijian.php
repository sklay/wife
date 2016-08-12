 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_tuijian = array("永辉","酸奶","牛奶","面包","方便面","卫生纸","卫生巾","饮料","零食","泡打粉","饼干","天使蛋糕");

echo json_encode($arr_tuijian);