<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

$arr_market1 = array(
	"marketimg" => array(
//		"http://localhost/A_wechat-games/Jd_web/images/4.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav1-1.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav1-2.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav1-3.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav1-4.jpg",
//		"http://localhost/A_wechat-games/Jd_web/images/1.jpg",
	),
	"marketinfo" => array(
		array(
			"mc" => "大闸蟹",
			"mcdesc" => "4.99起",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav3.png"
		),
		array(
			"mc" => "永辉超市",
			"mcdesc" => "海报钜惠",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/yh.png"
		),
		array(
			"mc" => "鸡尾酒",
			"mcdesc" => "10元2瓶",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav2.png"
		),
		array(
			"mc" => "海报同步",
			"mcdesc" => "火爆热卖",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav1.png"
		),
		array(
			"mc" => "生鲜优选",
			"mcdesc" => "健康绿色",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav4.png"
		),
		array(
			"mc" => "每日奶品",
			"mcdesc" => "低至7折起",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav5.png"
		)
	)
);

$arr_market2 = array(
	"marketimg" => array(
		"http://localhost/A_wechat-games/Jd_web/images/nav2-1.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav2-2.jpg",
	),
	"marketinfo" => array(
		array(
			"mc" => "卤味小食",
			"mcdesc" => "均衡营养",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav6.png"
		),
		array(
			"mc" => "下午茶",
			"mcdesc" => "热销推荐",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav7.png"
		),
		array(
			"mc" => "品牌正餐",
			"mcdesc" => "吃放不发愁",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav8.png"
		),
		array(
			"mc" => "满减专区",
			"mcdesc" => "满立减",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav9.png"
		),
		array(
			"mc" => "满20元",
			"mcdesc" => "赠进口牛奶",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav10.png"
		),
		array(
			"mc" => "外卖惠",
			"mcdesc" => "满18减8",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav11.png"
		)
	)
);

$arr_market3 = array(
	"marketimg" => array(
		"http://localhost/A_wechat-games/Jd_web/images/nav3-1.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav3-2.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav3-3.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav3-4.jpg",
	),
	"marketinfo" => array(
		array(
			"mc" => "精选蛋糕",
			"mcdesc" => "分享时刻",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav1.jpg"
		),
		array(
			"mc" => "惊爆抢购",
			"mcdesc" => "优惠多多",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav2.jpg"
		),
		array(
			"mc" => "烘焙",
			"mcdesc" => "面包下午茶",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav3.jpg"
		),
		array(
			"mc" => "每周一花",
			"mcdesc" => "体验价29",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav4.jpg"
		),
		array(
			"mc" => "多肉植物",
			"mcdesc" => "9.9免运",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav5.jpg"
		),
		array(
			"mc" => "办公居家",
			"mcdesc" => "话术DIY",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav6.jpg"
		),
		array(
			"mc" => "绿植",
			"mcdesc" => "领券再减",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav7.jpg"
		),
		array(
			"mc" => "长辈亲友",
			"mcdesc" => "花礼",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav8.jpg"
		),
		array(
			"mc" => "优生日",
			"mcdesc" => "鲜花 蛋糕",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav9.jpg"
		)
	)
);

$arr_market4 = array(
	"marketimg" => array(
		"http://localhost/A_wechat-games/Jd_web/images/nav4-1.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav4-2.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav4-3.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav4-4.jpg",
	),
	"marketinfo" => array(
		array(
			"mc" => "多洗洗衣",
			"mcdesc" => "6折特惠",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav12.png"
		),
		array(
			"mc" => "小二家修",
			"mcdesc" => "封窗户49",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav13.png"
		),
		array(
			"mc" => "十分到家",
			"mcdesc" => "换季特惠",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav14.png"
		),
		array(
			"mc" => "维修侠",
			"mcdesc" => "维修35折",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav15.png"
		)
	)
);
$arr_market5 = array(
	"marketimg" => array(
		"http://localhost/A_wechat-games/Jd_web/images/nav5-1.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav5-2.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav5-3.jpg",
		"http://localhost/A_wechat-games/Jd_web/images/nav5-4.jpg",
	),
	"marketinfo" => array(
		array(
			"mc" => "疯狂秒杀",
			"mcdesc" => "健康专场",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav16.png"
		),
		array(
			"mc" => "熬胶专场",
			"mcdesc" => "要是熬制",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav17.png"
		),
		array(
			"mc" => "自测用药",
			"mcdesc" => "对症找药",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav18.png"
		),
		array(
			"mc" => "健康驿站",
			"mcdesc" => "身边的医生",
			"mcicon" => "http://localhost/A_wechat-games/Jd_web/images/mtnav19.png"
		)
	)
);



if ($_GET['ball'] == "market") {
	echo json_encode($arr_market1);
}
if ($_GET['ball'] == "takeout") {
	echo json_encode($arr_market2);
}

if ($_GET['ball'] == "cake") {
	echo json_encode($arr_market3);
}

if ($_GET['ball'] == "service") {
	echo json_encode($arr_market4);
}
if ($_GET['ball'] == "safty") {
	echo json_encode($arr_market5);
}

?> 