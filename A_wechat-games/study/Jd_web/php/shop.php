 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");



$arr_shop = array(
    array(
        "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon1.jpg",
        "shopname" => "永辉超市-龙旗广场店",
        "start" => 5,
        "shopnum" => 21,
        "sell" => 5487,
        "shopId" => 1,
        "actNum" => "8个活动",
        "cx"=> array(
	        array(
				"text" => "满减",
				"bg" =>"#5FBC65",
				"mjdesc" => "部分商品满60减15"
			),
			array(
				"text" => "满减",
				"bg" =>"#5FBC65",
				"mjdesc" => "部分商品满200减60"
			),
			array(
				"text" => "满减",
				"bg" =>"#5FBC65",
				"mjdesc" => "部分商品满30减5"
			),
			array(
				"text" => "满减",
				"bg" =>"#5FBC65",
				"mjdesc" => "部分商品满50减10"
			),
			array(
				"text" => "满减",
				"bg" =>"#5FBC65",
				"mjdesc" => "部分商品满30减5"
			),
			array(
				"text" => "满减",
				"bg" =>"#5FBC65",
				"mjdesc" => "部分商品满25减5"
			),
			array(
				"text" => "满减",
				"bg" =>"#5FBC65",
				"mjdesc" => "部分商品满25减5"
			),
			array(
				"text" => "满减",
				"bg" =>"#5FBC65",
				"mjdesc" => "部分商品满50减10"
			)
			
        ),
        
	    "imgList" => array(
//			"http://localhost/A_wechat-games/Jd_web/images/listImg1-1.jpg",
//			"http://localhost/A_wechat-games/Jd_web/images/listImg1-2.jpg",
//			"http://localhost/A_wechat-games/Jd_web/images/listImg1-3.jpg",
//			"http://localhost/A_wechat-games/Jd_web/images/listImg1-4.jpg"
			
			
			array(
				"text" => "省4元",
				"link" => "http://localhost/A_wechat-games/Jd_web/images/listImg1-1.jpg",
				"sprice" => "￥9.90"
			),
			array(
				"text" => "省4元",
				"link" => "http://localhost/A_wechat-games/Jd_web/images/listImg1-2.jpg",
				"sprice" => "￥29.90"
			),
			array(
				"text" => "热销",
				"link" => "http://localhost/A_wechat-games/Jd_web/images/listImg1-3.jpg",
				"sprice" => "￥2.80"
			),
			array(
				"text" => "省3元",
				"link" => "http://localhost/A_wechat-games/Jd_web/images/listImg1-4.jpg",
				"sprice" => "￥7.50"
			)
		),
    ),

   array(
        "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon2.jpg",
        "shopname" => "幸福超市-安宁庄店",
        "start" => 5,
        "shopnum" => 225,
        "sell" => 2560,
        "shopId" => 2,
        "actNum" => "",
        "cx"=> array(
    		array(
				"text" => "领劵",
				"bg" =>"#fa3e2d",
				"mjdesc" => "9.5折劵,满10减5"
			),
//			array(
//				"text" => "",
//				"mjdesc" => ""
//			)
        ),
        "imgList" => array(
//	    	"http://localhost/A_wechat-games/Jd_web/images/listImg2-1.jpg",
//	        "http://localhost/A_wechat-games/Jd_web/images/listImg2-2.jpg",
//	        "http://localhost/A_wechat-games/Jd_web/images/listImg2-3.jpg",
//	        "http://localhost/A_wechat-games/Jd_web/images/listImg2-4.jpg"
	        
	        
	        array(
				"text" => "省1元",
				"link" => "http://localhost/A_wechat-games/Jd_web/images/listImg2-1.jpg",
				"sprice" => "￥1.90"
			),
			array(
				"text" => "省36元",
				"link" => "http://localhost/A_wechat-games/Jd_web/images/listImg2-2.jpg",
				"sprice" => "￥30.00"
			),
			array(
				"text" => "省36元",
				"link" => "http://localhost/A_wechat-games/Jd_web/images/listImg2-3.jpg",
				"sprice" => "￥2.90"
			),
			array(
				"text" => "省10元",
				"link" => "http://localhost/A_wechat-games/Jd_web/images/listImg2-4.jpg",
				"sprice" => "￥19.90"
			)
	    )
    ),
    
);



/*$arr_shop2 = array(
    array(
        "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon3.jpg",
        "shopname" => "乐天超市-霍营店",
        "start" => 5,
        "shopnum" => 14,
        "sell" => 2182,
        "shopId" => 3
    ),
    "imgList" => array(
    	"http://localhost/A_wechat-games/Jd_web/images/listImg3-1.jpg",
        "http://localhost/A_wechat-games/Jd_web/images/listImg3-2.jpg",
        "http://localhost/A_wechat-games/Jd_web/images/listImg3-3.jpg",
        "http://localhost/A_wechat-games/Jd_web/images/listImg3-4.jpg"
    )
);
$arr_shop3 = array(
   array(
        "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon4.jpg",
        "shopname" => "农鲜生—果色添香水果超市店",
        "start" => 5,
        "shopnum" => 991,
        "sell" => 227,
        "shopId" => 4
    ),
    "imgList" => array(
    )
);
$arr_shop4 = array(
    array(
        "shopicon" => "http://localhost/A_wechat-games/Jd_web/images/shopicon5.jpg",
        "shopname" => "电果网-上地店",
        "start" => 5,
        "shopnum" => 57,
        "sell" => 244,
        "shopId" => 5
    ),
    "imgList" => array(
    )
);*/

echo(json_encode($arr_shop));