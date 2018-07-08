<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<title>【药快到】健康过六一，送你5元无门槛券</title>
		<meta name="description" content="数量有限，先到先得！">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<meta name="format-detection" content="telephone=no, email=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<base href="../">
		<link rel="stylesheet" href="style/act_18fiveCoupon.css" />
		<script src="js/jquery-2.2.0.min.js"></script>
		<script src="js/currentTool.js"></script>
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
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
			// 新追加一个参数
			var redirect_uri = 'http%3a%2f%2f' + location.host + '%2fmedhtml%2fcommon%2fcouponAct%2f' + codeActId + '%3fact_url%3d' + act_url;
			console.debug(' cur href is ', redirect_uri);
			if (is_weixin()) {
				var grantBoo = "${grantFail}";
				if (grantBoo == "true" || grantBoo == true) {
					var grantFailUserId = "${fromUserId}";
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + wxparam + '&response_type=code&scope=snsapi_userinfo&state={"from_user_id":"${fromUserId}","silent_grant":"no"}&connect_redirect=1#wechat_redirect';
				}
			} else {
				<!--location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state={"from_user_id":"${fromUserId}","silent_grant":"no"}&connect_redirect=1#wechat_redirect';-->
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
					<img src="images/act_18fiveCoupon_1.jpg" />
					<img src="images/act_18fiveCoupon_2.jpg" />
					<img src="images/act_18fiveCoupon_3.jpg" />
					<img src="images/act_18fiveCoupon_4.jpg" />
					<img src="images/act_18fiveCoupon_5.jpg" />
					<img src="images/act_18fiveCoupon_6.jpg" />
				</div>
				<div class="getHbWrap">
					<div class="getHb">
						<div class="commomLogin">
							<input type="tel" placeholder="请输入手机号码" id="userPhone">
							<button id="getHbBtn">免费领取</button>
						</div>
						<div class="received_result" style="display: none;">
						<!--领取成功  -->
							<div class="receive_success" style="display: none;">
								<div class=" getHbnNum clearFix">
	                   				<img  src="images/act_18fiveCoupon_succ.jpg" alt="" />
								</div>
							</div>
							<!-- 领过了 -->
							<div class="has_received " style="display: none;">
								<div class=" getHbnNum clearFix">
									<img  src="images/act_18fiveCoupon_fail.jpg" alt="" />
								</div>
							</div>
							<div class="commUsebtn clearfix">
								<button class="use_btn goForUse" id="goForUse">下载APP</button>
								<button class="shareFri shareForFri" id="small_ShareFri">邀请好友领</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--活动规则 start-->
			<div class="activeRuleShowWrap ">
				<div class="comShowTitle">
					<img src="images/act_18allergyIndex_title.jpg" />
				</div>
				<div class="activeRuleShow">
					<p>1.此活动药快到新老用户均可参与（限北京地区）</span></p>
					<p>2.活动时间：${startTime} — ${endTime}</p>
					<p>3.专享券有效期截止${endTime}</p>
					<p>4.活动期间，每人限领一次(相同设备号、手机号、收货地址视为同一用户)</p>
				</div>
			</div>
			<!--活动规则 end-->
		</div>
		<!-- 已经被抢光了 -->
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
							$(".commomLogin").hide();
							$(".received_result").show();
							$(".receive_success").show();
						} else if (result.result == "fail") {
								//type = 3 用户已经领过 了 
							if (result.data.type == 3) {
								console.log("received");
								$(".commomLogin").hide();
								$(".received_result").show();
								$(".has_received").show();
							}else if(result.data.type == 4){
								//已经抢光了
								$(".failShow").show();
								$(".failResul .desc").html(result.data.msg);
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
			//去使用跳转页面
			$(".goForUse").on("click",function(){
				//var target_href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653' ;
				var target_href = 'http://store.ykd365.com/dwonload.html';
				window.location.href=target_href ;
			});
			
			$(".closeBtn").on("click",function(){
				$(".failShow").hide();
			})
		};
	</script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script>
	var wechatObj = new Object();
	wechatObj.title = '【药快到】健康过六一，送你5元无门槛券！';
	wechatObj.desc = '数量有限，先到先得！';
	wechatObj.link = location.href.split('#')[0];
	wechatObj.imgUrl = 'http://imgstore.camore.cn/medhtml/common/images/act_18fiveCoupon_shareImg.jpg';
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
						debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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