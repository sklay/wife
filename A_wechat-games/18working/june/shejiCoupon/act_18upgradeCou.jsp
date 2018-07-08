<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<title>【药快到】升级有礼！送你6元现金券~</title>
		<meta name="description" content="全场通用，无门槛！">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<meta name="format-detection" content="telephone=no, email=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<base href="../">
		<link rel="stylesheet" href="style/act_18upgradeCou.css?v=000001" />
		<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
		<script src="js/currentTool.js"></script>
		<script>
			/** 默认是生产APPID*/
			var appid = 'wxade8c5e473c645e9';
			if (location.host.indexOf('deve') >= 0) {
				/** 准生产APPID*/
				appid = 'wx697be0ec43c8cafa';
			}
		 	

			var codeActId = '${codeActId}' || '';
			var act_url = '${act_url}' || '';
			var wxparam = "%26codeActId%3d${codeActId}%26pharmacy_id%3d${pharmacy_id}%26user_id%3d${user_id}%26inviteType%3d${inviteType}%26version_sys%3dwehcat";
			var redirect_uri = 'http%3a%2f%2f' + location.host + '%2fmedhtml%2fcommon%2fcouponAct%2f' + codeActId + '%3fact_url%3d' + act_url;
			console.debug(' cur href is ', redirect_uri);
			if (is_weixin()) {
				var grantBoo = "${grantFail}";
				if (grantBoo == "true" || grantBoo == true) {
					var grantFailUserId = "${fromUserId}";
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + wxparam + '&response_type=code&scope=snsapi_userinfo&state={"from_user_id":"${fromUserId}","silent_grant":"no"}&connect_redirect=1#wechat_redirect';
				}
			} else {
				//location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state={"from_user_id":"${fromUserId}","silent_grant":"no"}&connect_redirect=1#wechat_redirect';
			}
					
		</script>
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
					<img src="images/act_18upgradeCou_1.jpg" />
					<img src="images/act_18upgradeCou_2.jpg" />
					<img src="images/act_18upgradeCou_3.jpg" />
					<img src="images/act_18upgradeCou_4.jpg" />
					<img src="images/act_18upgradeCou_5.jpg" />
					<img src="images/act_18upgradeCou_6.jpg" />
					<img src="images/act_18upgradeCou_7.jpg" />
					<img src="images/act_18upgradeCou_8.jpg" />
				</div>
				<div class="getHbWrap">
					<div class="getHb">
						<div class="commomLogin">
							<input type="tel" placeholder="请输入手机号码" id="userPhone">
							<button id="getHbBtn">更新领取</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="failShow" style="display: none;">
			<script>
				(function(){
					var wh = $(document).height();
					$(".failShow").css({
						height:wh
					})
				})();
			</script>
			<div class="failResul" >
				<p class="desc"></p>
				<p class="line"></p>
				<p class="closeBtn">知道了</p>
			</div>
		</div>
		<%@ include file="act_common_sharePage.jsp"%>
	</body>
	<script>
		var phoneNum = '${phone_num}';
		var fromUserId = '${user_id}';
		//分享者 的 信息
		var token = '${user_token}';
		var openId = '${openid}';
		var wechatObj = new Object();
		window.onload = function() {
			$(".getHbWrap").on("click", "#getHbBtn", function() {
				waitShow();
				$_phoneno = $("#userPhone").val();
				var regno = /1[3-8]+\d{9}/;
				if ($_phoneno == "" || $_phoneno == "请输入手机号码" || !regno.test($_phoneno)) {
					waitClose();
					alert("请输入正确的手机号码")
					return false
				};
				var phone_num = $('#userPhone').val();
				$.ajax({
					type : "post",
					url : "couponActR",
					data : "phone_num=" + $_phoneno+ "&code_act_id=" + codeActId+ "&user_id=" + fromUserId + "&user_token=" + "&openId=" + openId,
					success : function(result) {
						console.debug("result");
						waitClose();
						$("#userPhone").val("");
						if (result.result == "succ") {
							console.log("succ");
							var target_href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653' ;
							window.location.href=target_href ;
						}else if (result.result == "fail") {
							if(result.data.type == 3){
								//已经领过了
								$(".failShow").show();
								$(".failResul .desc").html(result.data.msg);
								var target_href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653' ;
								window.location.href=target_href ;
							}else if(result.data.type == 1){
								//请求太频繁了
								$(".failShow").show();
								$(".failResul .desc").html(result.data.msg);
							}else{
								//系统异常，请稍后再试
								$(".failShow").show();
								$(".failResul .desc").html(result.data.msg);
								waitClose();
							}
						}
					},
					error : function() {
						alert("发送请求失败");
						waitClose();
					}
				});
			});
			//分享
			$(".getHbWrap").on("click", ".shareForFri", function() {
				$("#shareshade").css("height", $(".content").height());
				$("#shareshade").show();
			});
		};
	</script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script>
	var wechatObj = new Object();
	wechatObj.title = '【药快到】升级有礼！送你6元现金券~';
	wechatObj.desc = '全场通用，无门槛！';
	wechatObj.link = location.href.split('#')[0];
	wechatObj.imgUrl = 'http://imgstore.camore.cn/medhtml/common/images/act_18upgradeCouShareImg.jpg';
	console.log("appId：" + appid);
// 	if (is_weixin()) {
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
// 	};
	
	function getWechatObj() {
		wx.onMenuShareTimeline({
			title : wechatObj.title, // 分享标题
			link : wechatObj.link, // 分享链接
			imgUrl : wechatObj.imgUrl, // 分享图标
			desc : wechatObj.desc, // 分享描述
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
	
	
	function reuseWx(){
		wx.onMenuShareTimeline({
			title: wechatObj.title, // 分享标题
			link: wechatObj.link, // 分享链接
			imgUrl: wechatObj.imgUrl, // 分享图标
			success: function () {
			},
			cancel: function () {}
		});

		wx.onMenuShareAppMessage({
			title: wechatObj.title, // 分享标题
			desc: wechatObj.desc, // 分享描述
			link: wechatObj.link, // 分享链接
			imgUrl: wechatObj.imgUrl, // 分享图标
			success: function () {
			},
			cancel: function () {}
		});

		wx.onMenuShareQQ({
			title: wechatObj.title, // 分享标题
			desc: wechatObj.desc, // 分享描述
			link: wechatObj.link, // 分享链接
			imgUrl: wechatObj.imgUrl, // 分享图标
			success: function () {
			},
			cancel: function () {}
		});
		wx.onMenuShareWeibo({
			title: wechatObj.title, // 分享标题
			desc: wechatObj.desc, // 分享描述
			link: wechatObj.link, // 分享链接
			imgUrl: wechatObj.imgUrl, // 分享图标
			success: function () {
			},
			cancel: function () {}
		});
	}
</script>


</html>