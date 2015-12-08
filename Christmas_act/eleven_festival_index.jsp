<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
<meta name="format-detection" content="telephone=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="description" content="我刚在【药快到】领取了脱光福利！你也快来看看吧！"/> 
<title>【药快到】助你脱光</title>     
	<link rel="stylesheet" href="style/main_wechat.css" />
	<script src="js/jquery-1.9.0.min.js"></script>
	<script src="js/common.js"></script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	
	<style>
	 body{font-family:"微软雅黑","arial";font-size:12px;}
	.content .ac_code{width:100%;text-align: center;font-size:0;position:relative;}
	.content .ac_code img{width:100%;}
    /*弹出框公用样式*/
		.have_received ,.receive_success{display:none;position: fixed; width: 100%; 
   			height: 100%;  z-index: 110;top: 0;background-color: rgba(0, 0, 0,.7);}
   		.common_titleSty img{width: 100%;}
   		.common_titleSty{margin-top:3rem;position:relative;}
   		.common_descSty img{width: 40%; float: left;margin: 10px 8px 0 auto;}
	    .common_descSty p{color: #fff; font-size: 16px;line-height: 40px;}
	   	.closeShade{width: 25px;float:right;color:#fff;font-size:16px; text-align: center;
	    height: 25px; border: 3px soild #fff;border: .03rem solid #ffde00;line-height:25px;
	    border-radius: 15px; position: absolute;top: 18%; right: 12%;}
	    .use_btn{font-size: 16px;
		    background: url(images/elevenDay_coin.png) 10px center no-repeat;
		    color: #fff;float: left;
		    background-color: #2f8179;
		    width: 33%;font-family:"黑体";
		    line-height: 37px;
		    border-radius: 7px;
		    border: none;
		    margin-left: 16%;
		    display: block;
		    background-size: .5rem 1rem;;
		   padding-left:25px
		    }
	    .common_useStyle p{color: #fff;font-size: 20px;position: absolute; left: 44%;
		    font-weight: 600;
		    line-height: 1.6rem;
		    }
	    #long_ShareFri{ margin: 5% 33%;}
	    #small_ShareFri{margin-left: 3%;}
	    .shareFri{font-size: 16px;
		    color: #fff;
		    background-color: #2f8179;
		    width: 33%;
		    line-height: 37px;
		    border-radius: 7px;
		    border: none;
		    font-family:"黑体";
   			}
	    .shareAppPage{display: none;margin-top: 5%;}
		.shareAppPage button{
			width:2.5rem;padding:10px 20px;font-family:"黑体";float:left;background:#2f8179;border-radius: 7px;
			margin-left:.5rem;border:none;color:#fff;font-size:14px;
			}
		.commomLogin{
			width:100%;box-sizing:border-box;margin:0 auto;font-family:"黑体",arial;
  		 	position: absolute; left: 0;  top: .3rem; z-index: 8;
		}
		.commomLogin input{box-sizing:border-box;height:35px;color:#fff;font-size:14px;
			border:.03rem solid #fff;background:transparent;border-radius:8px;font-weight: 600;
			text-align:center;}
		.commomLogin #commomLogin_phoneNum{width:70%;display:block;margin-left: 15%;}
		#commomLogin_codeNum{width:33%;margin-left: 15%;}
		.commomLogin_getcodeagain{display:none;}
		#commomLogin_getcode{float:right;width:33%;height:35px;box-sizing:border-box;
			border-radius:8px;background:#ffde00;text-align:center;font-size:12px;
			    margin-right: 16%;
		}
		#commomLogin_getcode .commomLogin_getcode{line-height:35px;display:block;width:100%;height:35px;}
		#commomLogin_getcode .commomLogin_getcodeagain{font-size:10px;line-height:17px;}
		#commomLogin_getcode .commomLogin_getcodeagain var{font-style:normal;}
		::-moz-placeholder {
		    color: #fff;
		}
		:-ms-input-placeholder {
		   color: #fff;
		}
		::-webkit-input-placeholder {
		   color: #fff;
		}
		#loginsumbit{display:block;width:38%;color:#fff;
		font-size:.4rem;box-sizing:border-box;margin:.4rem auto 0;
		border-radius:8px;height:35px;background:transparent;
		border:.03rem solid #fff;line-height:35px;text-align:center;}
		
</style>
<!-- <script>
function makephoneNum(pNum){
	document.write(pNum.substring(0,3)+"****"+pNum.substring(7,11));
}
</script> -->

<script>
	var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "//hm.baidu.com/hm.js?ad944074f96dc318a2bb2265b8eb4c31";
	  var s = document.getElementsByTagName("script")[0]; 
	  s.parentNode.insertBefore(hm, s);
	})();
</script>
<script>
    (function (doc, win) {
        var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc    = function () {
                    var clientWidth = docEl.clientWidth;
                    if (clientWidth>=640) {
                        clientWidth = 640;
                    };
                    if (!clientWidth) return;
                    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
</script>
	
</head>

<body style="background: #2c6761;">
<div class="content">
	  <script>
        var wh=$(window).height();
        var ww=$(window).width();
        $(".content").width(ww);
        $(".content").css({minHeight:wh});
    </script>

	<div class="index" >
		<div class="ac_code">
			<img alt="" src="images/tuoguang_07.jpg">
		</div>
		<div class="ac_code">
			<img alt="" src="images/tuoguang_01.jpg">
		</div>
		<div class="ac_code">
			<img alt="" src="images/tuoguang_02.jpg">
		</div>
		<div class="ac_code">
			<img alt="" src="images/tuoguang_03.jpg">
		</div>
		<div class="ac_code">
			<img alt="" src="images/tuoguang_04.jpg">
		</div>
		<div class="ac_code">
			<img alt="" src="images/tuoguang_05.jpg">
			<img alt="" src="images/tuoguang_06.jpg">
			<div class="receive_code" id="receive_page">
					<div class="commomLogin">
					<script>
						(function(){
							var wh=$(window).height();
							if(wh<=540){
								$(".commomLogin").css({top:".2rem"});
							}
						})()
					</script>
						<input type="text" placeholder="输入手机号" id="commomLogin_phoneNum"/>
						<p id="commomLogin_loginwarn" style="font-size:12px;color:#fff;line-height:20px;">为保证您能成功领取奖品，请如实填写</p>
						<div style="width:100%;overflow:hidden;margin-top:.1rem;">
							<input type="text" placeholder="输入验证码" id="commomLogin_codeNum"/>
							<div id="commomLogin_getcode">
								<span class="commomLogin_getcode" id="commomLogin_getcodeBtn">获取验证码</span>
								<span class="commomLogin_getcodeagain"><var style="color:#ff0000">60</var>秒后<br/>重新获取</span>
							</div>
						</div>
						<div id="loginsumbit" id="loginsumbit">领取
						<script>
						(function(){
							var wh=$(window).height();
							if(wh<=540){
								$("#loginsumbit").css({top:".2rem"});
							}
						})()
					</script>
						</div>
					</div>
				</div>
		</div>
		</div>
		<!---成功领取-->
		 <div class="receive_success common_wrapSty controlAlertPage"  >
        	<div class="receive_success_box common_boxSty">
        		<div class="closeShade">X</div>
        	 	<div class="receive_success_title common_titleSty">
		            <img src="images/11Day_coupon_01.png" alt=""/>
	       		</div>
			    <div class="receive_success_desc common_descSty">
			        <img src="images/elevenDay_get_success_img.png" alt=""/>
			        <p class="commom_desc_psty2">领取成功啦！</p>
			    </div>
			    <div class="common_useStyle" style="margin-top:.3rem">
				    <a id="downloadA" href="http://store.ykd365.com/download.html">
				        	<button class="use_btn">去使用</button>
				    </a>
			    <button class="shareFri " id="small_ShareFri" >邀请好友</button>
			  	</div>
			  	<div class="shareAppPage" class="common_wrapSty">
					<button class="shareAppBtn" id="shareAppPage_shareFir" onclick="s(0)">分享给好友</button>
					<button class="shareAppBtn" id="shareAppPage_friRound" onclick="s(1)">分享到朋友圈</button>
				</div>
        	</div>
    	</div>			
    			<!--已经领过-->
    			
		<div class="have_received common_wrapSty controlAlertPage" >
			<div class="have_received_box common_boxSty">
			    <span class="closeShade">X</span>
			      <div class="have_received_title common_titleSty">
				    <img src="images/11Day_coupon_01.png" alt=""/>
				    <img style="position: absolute;top:2rem;right: 0;" src="images/elevenDay_has_got_btn.png" alt=""/>
				  </div>
			      <div class="have_received_desc common_descSty">
			        <p class="commom_desc_psty1" style="font-size:.4rem;padding-top: .4rem;text-align: center;">您已经领过券了！</p>
			      </div>
			      <button class="shareFri " id="long_ShareFri">邀请好友</button>
			     <div class="shareAppPage" class="common_wrapSty">
					<button class="shareAppBtn" id="shareAppPage_shareFir" onclick="s(0)">分享给好友</button>
					<button class="shareAppBtn" id="shareAppPage_friRound" onclick="s(1)">分享到朋友圈</button>
				</div>
			</div>
		</div>
	</div>
	<%@ include  file="act_common_sharePage.jsp"%>
</body>
<script>
var wechatObj = new Object();
function s(type){
	var jsonObject = {};
	if(type==0){
		jsonObject.shared_type = "0";
		jsonObject.shared_url =  wechatObj.link;
		jsonObject.shared_title = wechatObj.title;
		jsonObject.shared_content = wechatObj.desc;
		jsonObject.shared_img_url = wechatObj.imgUrl;
	} else 
	if(type==1){
		jsonObject.shared_type = "1";
		jsonObject.shared_url = wechatObj.link;
		jsonObject.shared_title = wechatObj.title;
		jsonObject.shared_content = wechatObj.desc;
		jsonObject.shared_img_url = wechatObj.imgUrl;
	}
	var jsonStr = JSON.stringify(jsonObject);
	sharedTypeByJson(jsonStr);
}
function sharedTypeByJson(jsonStr){  //ios会覆盖此方法
    camore.sharedTypeByJson(jsonStr);  //android会调用里面的方法
}

   $(function(){
	   /* $("#shareshade").on("click",function(){
			$("#shareshade").hide();
		}); */
	  
		/* 弹窗关闭 */
		$(".controlAlertPage").on("click",".closeShade",function(){
			$(".controlAlertPage").hide();
			$(".common_useStyle").show();
			$(".shareFri").show();
			$(".shareAppPage").hide();
		});
		/*点击分享*/
		$(".common_wrapSty").on("click",".shareFri",function(){
			if(is_weixin()){
				$("#shareshade").show();
			}else{
				$(".shareFri").hide();
				$(".common_useStyle").hide();
				$(".shareAppPage").show();
			}
			
		});
		
		$(".shareAppPage").on("click",function(e){
			var ev=e.target;
			if(ev.nodeName!="BUTTON"){
				$(".shareAppPage").hide();
			}
		})
		
		if(is_weixin()){
			$("#downloadA").attr("href","http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653");
		};	

		 /*领取事件  */
		$("#receive_page").on("click","#commomLogin_getcodeBtn",function(){
			getCodeCommon("comValCodeAjax");
		});
		$("#receive_page").on("click","#loginsumbit",function(){
			submitPhoneCodeCommon("receiveELReward",function(){
				$(".controlAlertPage").hide();
			  	$(".receive_success").show();
			},function(){
				$(".controlAlertPage").hide();
			  	$(".have_received").show(); 
			});
		});
	var time1=null;
	function getCodeCommon(url,otherInfoSubmit){
		waitShow();
		if($("#commomLogin_getcode").attr("noclick")){
			waitClose();
			return false;
		};
		var $_phoneno=$("#commomLogin_phoneNum").val();
		var regno = /1[3-8]+\d{9}/;
		if (!regno.test($_phoneno)) {
			alert("请输入正确的手机号！");
			waitClose();
			return false;
		};
		$("#commomLogin_getcode").attr("noclick",true);
		var _url=url;
		var _otherInfoSubmit=otherInfoSubmit?otherInfoSubmit : "";
		var n=60;
		$.ajax({
			type:"post",
 			url:_url,
 			data:"phoneNum="+$_phoneno+"&"+_otherInfoSubmit,
 			success:function(result){
 				waitClose();
 				if (result.result == "succ") {
					$("#commomLogin_getcode").css('background','#ccc');
					$(".commomLogin_getcode").hide();
					$(".commomLogin_getcodeagain").show();
					$("#commomLogin_loginwarn").html("验证码短信已发送至您的手机");
					time1=setInterval(function(){
						n--;
						$(".commomLogin_getcodeagain var").html(n);
						if(n<=0){
							getedHandle();
						}
					},1000)
	    		}else{
	    			waitClose();
	    			alert(result.message);
	    			$("#commomLogin_getcode").removeAttr("noclick");
	    		}
 			},error:function(){
 				waitClose();
 				alert("发送请求失败");
 				$("#commomLogin_getcode").removeAttr("noclick");
	        }
		});
	};
	
	function submitPhoneCodeCommon(url,succFun,receivedFun,otherInfoSubmit){
		waitShow();
		var _otherInfoSubmit=otherInfoSubmit?otherInfoSubmit:"";
 		$_phoneno=$("#commomLogin_phoneNum").val();
 		$_code=$("#commomLogin_codeNum").val()
 		var regno = /1[3-8]+\d{9}/;
 		if($_phoneno==""||$_phoneno=="请输入手机号码"||!regno.test($_phoneno)){
 			waitClose();
 			alert("请输入正确的手机号码")
 			return false
 		};
 		if($_code==""||($_code=="请输入验证码")){
 			waitClose();
 			alert("请输入正确的验证码")
 			return false
 		};
 		var _url=url;
 		var _otherInfoSubmit=otherInfoSubmit?otherInfoSubmit : "";
 		$.ajax({
 			type:"post",
 			url:_url,
 			//data:"phone="+$_phoneno+"&code="+$_code+"&"+_otherInfoSubmit,
 			data:"phone="+$_phoneno+"&code="+$_code,
 			success:function(result){
 				waitClose();
 				$("#commomLogin_phoneNum").val("");
 			  	$("#commomLogin_codeNum").val("")
 				if (result.result == "succ") {
	    			succFun();
	    			getedHandle();
	    		}else if(result.result == "fail"){
	    			if(result.message=="received"){
	    				receivedFun();
	    				getedHandle();
	    			}else{
	    				alert(result.message);
	    				waitClose();
	    				getedHandle();
	    			}
	    		}
 			},error:function(){
	        	alert("发送请求失败");
	        	waitClose();
	        	getedHandle();
 			}
 		});
	}
	function getedHandle(){
		clearInterval(time1);
		$("#commomLogin_getcode").removeAttr("noclick").css('background','#F7F40A');
		$("#commomLogin_loginwarn").html("为保证您能成功领取奖品，请如实填写");
		$(".commomLogin_getcode").show();
		$(".commomLogin_getcodeagain").hide();
		$(".commomLogin_getcodeagain var").html('60');
	}
 }) 
</script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript"></script>
<script>
//分享链接
$(function(){
	$.ajax({url:"/weixin/wechat/getwxjssign?",data:{url: location.href.split('#')[0]},
		success:function(wechatReturn){
		if (wechatReturn) {
			wx.config({
			    //debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: 'wxade8c5e473c645e9', // 必填，公众号的唯一标识
			    timestamp: wechatReturn.timestamp, // 必填，生成签名的时间戳
			    nonceStr: wechatReturn.nonceStr, // 必填，生成签名的随机串
			    signature: wechatReturn.signature,// 必填，签名，见附录1
			    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		}
	}});
	
	    wechatObj.title = '【药快到】助你脱光';
	    wechatObj.desc = '我刚在【药快到】领取了脱光福利！你也快来看看吧！';
	    wechatObj.link = 'http://store.ykd365.com/medhtml/common/startELGame';
	    wechatObj.imgUrl ='http://imgstore.camore.cn/icon/act/logo/elevenDay_weixinShare.jpg';
	    function getMenuShare(){
	    	var wechatShareMenu ={
		    		title:wechatObj.title, // 分享标题
		    		desc:wechatObj.desc, // 分享描述
		    		link:wechatObj.link,
		    	    imgUrl:wechatObj.imgUrl, // 分享图标
		    	    success: function () { 
		    	    },
		    	    cancel: function () {
		    	    }	
		    };
	    	var wechatShareMenu2 ={//朋友圈分享用
		    		title:wechatObj.desc, // 分享标题
		    		link:wechatObj.link,
		    	    imgUrl:wechatObj.imgUrl, // 分享图标
		    	    success: function () { 
		    	    },
		    	    cancel: function () {
		    	    }	
		    };
			wx.onMenuShareTimeline(wechatShareMenu2); 
	    	wx.onMenuShareAppMessage(wechatShareMenu);
	    	wx.onMenuShareQQ(wechatShareMenu);
	    	wx.onMenuShareWeibo(wechatShareMenu);
		};
		  wx.ready(function(){
			  getMenuShare();
		  });
})
</script>
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?ad944074f96dc318a2bb2265b8eb4c31";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
</html>