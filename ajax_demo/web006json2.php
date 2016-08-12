 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");
$arr_str = array(
	array(
		"username" => "iwen",
		"data" => array(
			"blog" => array(
				array(
					"title" => "ajax解析",
					"images" => array(
						"img1" => "http://192.168.1.50/i2.jpg",
						"img2" => "http://192.168.1.50/interactive_ctitle.png"
					),
					"con" => "ajax解析是一个古老的技术，jquery为我们封装了很好的使用方式"
				),
				array(
					"title" => "html",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "html是一种标记语言"
				),
				array(
					"title" => "css",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "为了有更好的样式，我们使用了css样式表"
				),
				array(
					"title" => "javascript",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "这是一个牛B的脚本语言"
				),
				array(
					"title" => "jQuery",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "javascript开源库，使用率已经高达95%"
				),
			),
			"pl" => 1000
		) ,
	),
	array(
		"username" => "ime",
		"data" => array(
			"blog" => array(
				array(
					"title" => "android",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "android是在09年出现的，出现之后备受人们喜欢"
				),
				array(
					"title" => "ios",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "乔老大走了之后，就在不关注他了"
				),
				array(
					"title" => "java",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "古老的技术，经久不衰"
				),
				array(
					"title" => "web前端",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "刚刚兴起的新类别"
				),
				array(
					"title" => "大数据",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "很牛逼很牛逼。可惜我不会啊。。。"
				),
			),
			"pl" => 2000
		) ,
	),
	array(
		"username" => "leo",
		"data" => array(
			"blog" => array(
				array(
					"title" => "u3d",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "这是我第一篇关于u3d的博客"
				),
				array(
					"title" => "u3d2",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "第二篇博客我也不知道写点什么"
				),
				array(
					"title" => "u3d3",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "其实我不是leo，我实在编不下去了，因为我真的不会u3d，要是不说这个，咱们还是朋友"
				),
				array(
					"title" => "白鹭",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "咱们还是来谈谈这个引擎把！！！"
				),
				array(
					"title" => "createjs",
					"images" => array(
						"img" => "http://192.168.1.50/i2.jpg"
					),
					"con" => "他的出现，也并未能挽救flash啊，但是却是一个很轻巧的库"
				),
			),
			"pl" => 500
		) ,
	)
);



echo(json_encode($arr_str));