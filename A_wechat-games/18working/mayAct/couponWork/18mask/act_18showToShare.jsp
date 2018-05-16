<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<title>【药快到】补钙好时节，26元免单券等你来领！</title>
		<meta name="description" content="钙尔奇D3咀嚼片领券免费得~">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<meta name="format-detection" content="telephone=no, email=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<base href="../">
		<script src="js/jquery-2.2.0.min.js"></script>
		<script src="js/currentTool.js"></script>
		<script>
			/** 默认是生产APPID*/
			var appid = 'wxade8c5e473c645e9';
			if (location.host.indexOf('deve') >= 0) {
				/** 准生产APPID*/
				appid = 'wx697be0ec43c8cafa';
			}
					
		</script>
		<style>
			* {
			  margin: 0;
			  padding: 0;
			}
			i {
			  font-style: normal;
			  text-align: center;
			}
			html {
			  font-size: 62.5%;
			}
			html,
			body {
			  width: 100%;
			  background: #fff;
			  font-family: Microsoft Yahei, Arial;
			}
			.clearFix:after {
			  content: "";
			  display: block;
			  clear: both;
			}
			.clearFix {
			  *zoom: 1;
			}
			.content {
			  width: 100%;
			  height: 100%;
			}
			.content_top {
			  margin: 0 auto;
			  position: relative;
			}
			.content_top img{
			    width: 100%;
			    float: left;
			}
		</style>
	</head>
	<script>
		var _hmt = _hmt || [];
		(function() {
			var hm = document.createElement("script");
			hm.src = "//hm.baidu.com/hm.js?ad944074f96dc318a2bb2265b8eb4c31";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		})();
	</script>

	<body>
		<div class="content">
			<div class="indexPage">
				<div class="content_top clearFix">
					<img src="images/showToShare_1.jpg" />
					<img src="images/showToShare_2.jpg" />
					<img src="images/showToShare_3.jpg" />
					<img src="images/showToShare_4.jpg" />
					<img src="images/showToShare_5.jpg" />
					<img src="images/showToShare_6.jpg" />
					<img class="goForUse" src="images/showToShare_7.jpg" />
					<img src="images/showToShare_8.jpg" />
					<img src="images/showToShare_9.jpg" />
				</div>
			</div>
		</div>
		<%@ include file="act_common_sharePage.jsp"%>
	</body>
	<script>
		var fromUserId = '${user_id}';
		//分享者 的 信息
		var openId = '${openid}';
		var wechatObj = new Object();
		window.onload = function() {
			//去使用跳转页面
			$(".goForUse").on("click",function(){
				var target_href = 'http://deve.ykd365.com/medhtml/common/share/744?page_url=act_18exemptionInvite&codeActId=744&user_token=4eba3d8b99ef41f8ba7f80900f3f6823&pharmacy_id=1620';
				window.location.href=target_href ;
			});
		}
	</script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script>
	wechatObj.title = '【药快到】补钙好时节，26元免单券等你来领！';
	wechatObj.desc = '钙尔奇D3咀嚼片领券免费得~';
	wechatObj.link = location.href.split('#')[0];
	wechatObj.imgUrl = 'http://imgstore.camore.cn/icon/logo/showToShare_shareImg.jpg';
	if (is_weixin()) {
		$.ajax({
			url : "/medhtml/common/getwxjssign?",
			data : {
				url : location.href.split('#')[0]
			},
			success : function(wechatReturn) {
				if (wechatReturn) {
					wx.config({
						debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId : appid, // 必填，公众号的唯一标识
						timestamp : wechatReturn.timestamp, // 必填，生成签名的时间戳
						nonceStr : wechatReturn.nonceStr, // 必填，生成签名的随机串
						signature : wechatReturn.signature,// 必填，签名，见附录1
						jsApiList : [ "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo" ]
					// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
				};
				wx.ready(function() {
					getWechatObj()
				});
			}
		});
	};
	function getWechatObj() {
		wx.onMenuShareTimeline({
			title : wechatObj.title, // 分享标题
			link : wechatObj.link, // 分享链接
			imgUrl : wechatObj.imgUrl, // 分享图标
			success : function() {
			
			},
			cancel : function() {
			
			}
		});
		wx.onMenuShareAppMessage({
			title : wechatObj.title, // 分享标题
			desc : wechatObj.desc, // 分享描述
			link : wechatObj.link, // 分享链接
			imgUrl : wechatObj.imgUrl, // 分享图标
			success : function() {
			},
			cancel : function() {
			}
		});
		wx.onMenuShareQQ({
			title : wechatObj.title, // 分享标题
			desc : wechatObj.desc, // 分享描述
			link : wechatObj.link, // 分享链接
			imgUrl : wechatObj.imgUrl, // 分享图标
			success : function() {
			},
			cancel : function() {
			}
		});
		wx.onMenuShareWeibo({
			title : wechatObj.title, // 分享标题
			desc : wechatObj.desc, // 分享描述
			link : wechatObj.link, // 分享链接
			imgUrl : wechatObj.imgUrl, // 分享图标
			success : function() {
			},
			cancel : function() {
			}
		});
	}
</script>


</html>