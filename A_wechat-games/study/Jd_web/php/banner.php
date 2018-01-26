 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_str = array(
	"bannerimg" => array(
		"http://localhost/A_wechat-games/Jd_web/images/4.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/1.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/2.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/3.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/4.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/1.jpg",
	),
	"bannerimg2" => array(
		"http://localhost/A_wechat-games/Jd_web/images/mid-nav1.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/mid-nav2.jpg",
	),
//	"ballNum4" => array(
//	"http://localhost/A_wechat-games/Jd_web/images/ball1.png",
//	"http://localhost/A_wechat-games/Jd_web/images/ball2.png",
//	"http://localhost/A_wechat-games/Jd_web/images/ball3.png",
//	"http://localhost/A_wechat-games/Jd_web/images/ball4.png",
//	"http://localhost/A_wechat-games/Jd_web/images/ball5.png"
//	),
	"ballNum4" => array(
		array(
			"link" => "http://localhost/A_wechat-games/Jd_web/images/ball1.png",
			"text" => "超市生鲜"
		),
		array(
			"link" => "http://localhost/A_wechat-games/Jd_web/images/ball2.png",
			"text" => "外卖美食"
		) ,
		array(
			"link" => "http://localhost/A_wechat-games/Jd_web/images/ball3.png",
			"text" => "鲜花烘焙"
		) ,
		array(
			"link" => "http://localhost/A_wechat-games/Jd_web/images/ball4.png",
			"text" => "上门服务"
		) ,
		array(
			"link" => "http://localhost/A_wechat-games/Jd_web/images/ball5.png",
			"text" => "医药健康"
		)	
	),
	
	"sksImg" => array(
	"http://localhost/A_wechat-games/Jd_web/images/shop1.jpg",
	"http://localhost/A_wechat-games/Jd_web/images/shop2.jpg",
	"http://localhost/A_wechat-games/Jd_web/images/shop3.jpg"
	),
);

echo (json_encode($arr_str));