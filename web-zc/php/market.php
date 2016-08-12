 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");


$arr_market1 = array(
	"marketimg" => "http://localhost/zc/images/mtt.jpg",
	"marketinfo" => array(
	array(
		"mc" => "超市海报",
		"mcdesc" => "优惠乐享",
		"mcicon" => "http://localhost/zc/images/mtnav1.png"
	),
	array(
		"mc" => "火爆热卖",
		"mcdesc" => "直降满减购",
		"mcicon" => "http://localhost/zc/images/mtnav2.png"
	),
	array(
		"mc" => "生鲜优选",
		"mcdesc" => "健康绿色",
		"mcicon" => "http://localhost/zc/images/mtnav3.png"
	),
	array(
		"mc" => "每日奶品",
		"mcdesc" => "低至7折起",
		"mcicon" => "http://localhost/zc/images/mtnav4.png"
	))
);

$arr_market2 = array(
	"marketimg" => "http://localhost/zc/images/mtt1.jpg",
	"marketinfo" => array(
	array(
		"mc" => "无辣不欢",
		"mcdesc" => "随时嗨起来",
		"mcicon" => "http://localhost/zc/images/mtnav11.png"
	),
	array(
		"mc" => "满减专区",
		"mcdesc" => "满立减",
		"mcicon" => "http://localhost/zc/images/mtnav12.png"
	),
	array(
		"mc" => "惊爆促销",
		"mcdesc" => "均衡营养",
		"mcicon" => "http://localhost/zc/images/mtnav13.png"
	),
	array(
		"mc" => "品牌特供",
		"mcdesc" => "全国连锁",
		"mcicon" => "http://localhost/zc/images/mtnav14.png"
	))
);

$arr_market3 = array(
	"marketimg" => "http://localhost/zc/images/mtt2.jpg",
	"marketinfo" => array(
	array(
		"mc" => "限时抢购",
		"mcdesc" => "抢购中..",
		"mcicon" => "http://localhost/zc/images/cake1.png"
	),
	array(
		"mc" => "抢先订购",
		"mcdesc" => "爱在七夕前",
		"mcicon" => "http://localhost/zc/images/cake2.png"
	),
	array(
		"mc" => "绿植多肉",
		"mcdesc" => "爱上小生活",
		"mcicon" => "http://localhost/zc/images/cake3.png"
	),
	array(
		"mc" => "优选蛋糕",
		"mcdesc" => "满满的祝福",
		"mcicon" => "http://localhost/zc/images/cake4.png"
	))
);

$arr_market4 = array(
	"marketimg" => "http://localhost/zc/images/mtt3.jpg",
	"marketinfo" => array(
	array(
		"mc" => "手机快修",
		"mcdesc" => "3.5折起",
		"mcicon" => "http://localhost/zc/images/service1.png"
	),
	array(
		"mc" => "洗衣特价",
		"mcdesc" => "49元起",
		"mcicon" => "http://localhost/zc/images/service2.png"
	),
	array(
		"mc" => "推拿按摩",
		"mcdesc" => "38元起",
		"mcicon" => "http://localhost/zc/images/service3.png"
	),
	array(
		"mc" => "维修清洗",
		"mcdesc" => "低至3折",
		"mcicon" => "http://localhost/zc/images/service4.png"
	))
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

