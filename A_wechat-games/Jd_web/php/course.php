 <?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Max-Age:60');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type:text/json;charset=utf-8");

//$arr_str = array(
//	"courseSrc" => array(
//		"http://localhost/A_wechat-games/Jd_web/img/icon1.png",
//		"http://localhost/A_wechat-games/Jd_web/img/icon2.png",
//		"http://localhost/A_wechat-games/Jd_web/img/icon3.png",
//		"http://localhost/A_wechat-games/Jd_web/img/icon4.png",
//		"http://localhost/A_wechat-games/Jd_web/img/icon5.png",
//		"http://localhost/A_wechat-games/Jd_web/img/icon6.png",
//		"http://localhost/A_wechat-games/Jd_web/img/icon7.png",
//		"http://localhost/A_wechat-games/Jd_web/img/icon8.png",
//	),
//	"courseName" => array(
//		"Java学院",
//		"UI学院",
//		"iOS学院",
//		"Android学院",
//		"HTML5学院",
//		"互联网架构",
//		"大数据学院",
//		"在线课堂",
//	),
//
//);


$arr_str = array( 
array("courseSrc" => "http://localhost/A_wechat-games/Jd_web/img/icon1.png", "courseName" => "JAVA学院"),
array("courseSrc" => "http://localhost/A_wechat-games/Jd_web/img/icon2.png", "courseName" => "UI学院"),
array("courseSrc" => "http://localhost/A_wechat-games/Jd_web/img/icon3.png", "courseName" => "iOS学院"), 
array("courseSrc" => "http://localhost/A_wechat-games/Jd_web/img/icon4.png", "courseName" => "Android学院"),
array("courseSrc" => "http://localhost/A_wechat-games/Jd_web/img/icon5.png", "courseName" => "HTML5学院"), 
array("courseSrc" => "http://localhost/A_wechat-games/Jd_web/img/icon6.png", "courseName" => "互联网架构"), 
array("courseSrc" => "http://localhost/A_wechat-games/Jd_web/img/icon7.png", "courseName" => "大数据学院"),
array("courseSrc" => "http://localhost/A_wechat-games/Jd_web/img/icon8.png", "courseName" => "在线课堂"),  
   

   );
echo (json_encode($arr_str));