<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>


<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
<meta name="format-detection" content="telephone=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="description" content="【邀请有奖】邀请新伙伴，你得30元，TA得60元，限时活动，先到先得！"/>
<title>【药快到】新用户送30元</title>
	<link rel="stylesheet" href="style/main_wechat.css" />
	<script src="js/jquery-1.9.0.min.js"></script>
	<script src="js/common.js"></script>
</head>
<style>
.content{overflow:hidden;}
.content .ac_code{width:100%;height:100%;text-align: center;font-size:0;position:relative;margin-top:-1px;}
.content .ac_code img{width:100%;}
.content .ac_code .codeDiv{width:100%;height:30px;position:absolute;left:0;top:0;z-index:8;font-size:16px;font-weight: bold;color:#fff;text-align: center;}
.content .ac_code .butDiv{width:100%;height:30px;position:absolute;left:0;bottom:22px;z-index:8;}
.content .ac_code .envelopeList{width:100%;height:30px;position:absolute;left:0;bottom:24px;z-index:8;}
.content .ac_code .envelopeList .enveloItem{position:relative;width:200px;height:77px;margin:0 auto;}
.content .ac_code .envelopeList .enveloItem input{border-radius:15px;display:block;width:150px;padding-left:10px;margin:0 auto;height:22px;border:2px solid #c60000;}
#downthis{display:block;width:180px;margin:50px auto;}
#downthis img{width:100%;}
/*.fffdiv{width:100%;height:250px;background:#fff;overflow:hidden;}*/

.desc_div{ position: fixed; left: 0;  width: 100%;  bottom: 0;display:none;}
#actDescbut{position:relative;}
#closeBtn{position:absolute;top:0;width:10%;left:45%;}
</style>

<body style="background: #bf0029;">
  <script>
    	(function(){
	   	 var wh=$(window).height();
	       $("body").css({minHeight:wh})
	   })();
    </script>

	<div class="content">
		<div class="ac_code">
			<img alt="" src="images/dec_slow_01.jpg">
		</div>
		<div class="ac_code">
			<img alt="" src="images/dec_slow_02.jpg">
		</div>
		<div class="ac_code">
			<img alt="" src="images/dec_slow_03.jpg">
		</div>
		<div class="ac_code">
			<img alt="" src="images/dec_slow_04.jpg">
		</div>

		<div class="ac_code">
			<img alt="" src="images/dec_slow_05.jpg">
		</div>
		<div class="ac_code">
			<img alt="" src="images/dec_slow_06.jpg">
		</div>

		<a id="downloadA" href="http://store.ykd365.com/download.html">
			<div class="ac_code">
				<img alt="" src="images/dec_slow_07.jpg">
			</div>
		</a>
		<div class="ac_code " id="actDescbut">
				<img alt="" src="images/dec_slow_08.jpg">
		</div>
	</div>
	<div class="desc_div">
		<img class="desc_divimg" alt="" style="width: 100%" src="images/dec_act_desc.png">
	</div>
</body>
<script>

$(function() {
	/* 当微信进入时，下载页进入“应用宝”页面 */
	if(is_weixin()){
		$("#downloadA").attr("href","http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653");
	};
	/*活动说明*/
		$("#actDescbut").on("click",function(){
			$(".desc_div").show();
		});
		$("body").on("click",".desc_divimg",function(){
			$(".desc_div").hide();
		});
});
</script>
</html>