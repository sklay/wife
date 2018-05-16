﻿<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<title>【药快到】送你一张26元免单券，分享免单健康接力！</title>
		<meta name="description" content="我已领取，你也快来">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<meta name="format-detection" content="telephone=no, email=no" />
		<!-- <base href="../"> -->
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<link rel="stylesheet" href="../style/ act_18common.css" />
		<link rel="stylesheet" href="../style/act_18exemptionInvite.css" />
		
		<script src="../js/jquery-2.2.0.min.js"></script>
		<script src="../js/html_commonN.js"></script>
		
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
				<div class="content_top">
					<img src="../images/act_18exemptionInvite_logo.png" />
					<img src="../images/act_18exemptionInvite_theme_1.png" />
				</div>
				<div class="getHbWrap">
					<div class="getHb">
						<div class="operateCon">
							<h3>分享免单，健康接力！ </h3>
							<p>给好友送26元免单券，TA免你也得</p>
						</div>
						<div class="shareAppPage commUsebtn clearfix">
							<img class="shareAppBtn" id="shareAppPage_shareFir" src="../images/act_18exemptionInvite_shareTofriBtn.png" />
							<img class="shareAppBtn" id="shareAppPage_friRound" src="../images/act_18exemptionInvite_shareToFritoundBtn.png" />
						</div>
					</div>
				</div>
			</div>
			
			<!--看领券记录-->
			<div class="friHbShowWrap ">
				<div class="comShowTitle">
					<div class="leftLineDot">
						<span style="height: 1px; width: .6rem;"></span> 
					</div>
					<div class="comshowTitleText">已获赠券</div>
					<div class="rightLineDot">
						<span style="height: 1px; width: .6rem;"></span>
					</div>
				</div>
				<div class="friHbShow">
					<c:if test="${ not empty couponlist }">
						<c:forEach var="rc" items="${couponlist}" varStatus="status">
							<div class="userFriAvatat">
								<c:if test="${ not empty rc.headimgurl }">
									<img src="${rc.headimgurl }" alt="头像" />
								</c:if>
								<c:if test="${ empty rc.headimgurl }">
									<img src="../images/act_commonHead_img.jpg" alt="头像" />
								</c:if>
								<p>您的好友${rc.nickname } 送了您一张28元免单券</p>
							</div>
						</c:forEach>
					</c:if>
					<c:if test="${ empty couponlist}">
						<div class="userFriAvatat">
							<p>还没有获得奖励，快送好友购物免单券</p>
						</div>
					</c:if>
				</div>
			</div>
			
			<!--活动规则 start-->
			<div class="activeRuleShowWrap ">
				<div class="comShowTitle">
					<div class="leftLineDot">
						<span style="height: 1px; width: .6rem;"></span> 
					</div>
					<div class="comshowTitleText">活动细则</div>
					<div class="rightLineDot">
						<span style="height: 1px; width: .6rem;"></span>
					</div>
				</div>
				<div class="activeRuleShow">
					<p>1.新用户注册下载app即可获得26元免单券一张，在我的优惠券中查看（有效期30天)。</span></p>
					<p>2.老用户邀请一位新用户注册下载app，并且新用户下单后成功签收（包含使用26元免单券下单），老用户即可获得26元免单券一张，在我的优惠券中查看（有效期30天)。</p>
					<p>3.同一设备只可绑定同一手机号，其他手机号无法使用。</p>
				</div>
				<div class="collectCorp">
					<img src="../images/act_18exemptionInvite_collect.png" />
				</div>
			</div>
			<!--活动规则 end-->
		</div>
		<!--<%@ include file="act_common_sharePage.jsp"%>-->
	</body>
	
	<script>
		/** 默认是生产APPID*/
			var appid = 'wxade8c5e473c645e9';
			if (location.host.indexOf('deve') >= 0) {
				/** 准生产APPID*/
				appid = 'wx697be0ec43c8cafa';
			}
		var codeActId = '${codeActId}' || '';
		var userId = '${userId}';
		var token = '${userToken}';//这是我写的
		var wechatObj = new Object();
		window.onload = function() {
			/**判断是否登陆*/
			isLogin = function(){
				//token  哪里的获取到的token，就直接判断？？？？？
				if (token == "" || token == null || token == undefined) {
					showResultApp("remind", "请先登录后再分享");
					return false;
				} else {
					return true;
				}
			}
			// app分享点击
			$("#shareAppPage_shareFir").on("click", function() {
				if (isLogin()) {
					//s(0);
					toShare(0);
				}
			});
			$("#shareAppPage_friRound").on("click", function() {
				if (isLogin()) {
					//s(1)
					toShare(1);
				}
			});
			
			/*规则展开收起*/
			 $(".collectCorp").click(function() {
		        $(".activeRuleShow").slideToggle();
		    });
		}
		
		function toShare(obj){
			var shareType = ${shareType};
			if (shareType == 0) {
				sharedType(obj);
			} else {
				var jsonObj = ${shareJson};
				var json = toJson(jsonObj[obj]);
				sharedTypeByJson(json);
			}
		}

		function sharedType(obj){
			camore.sharedType(obj);
		}

		function toJson(json){
			try {
				var s = JSON.stringify(json);
			} catch (e) {
			}
		}
			
		function  sharedTypeByJson(json){  //ios会覆盖此方法
		 camore.sharedTypeByJson(json);  //android会调用里面的方法
		}
	</script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script>
		var shareJson = ${shareJson};
		var json = toJson(shareJson[0]);
		wechatObj.title = json.sharedTitle;
		wechatObj.desc = json.sharedContent;
// 		wechatObj.link = location.href.split('#')[0];
		wechatObj.link = json.sharedUrl;
		wechatObj.imgUrl = json.sharedImgUrl;
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
					}
					;
					wx.ready(function() {
						getMenuShare();
					});
				}
			});
		};
		wx.ready(function() {
			getWechatObj()
		})
		function getWechatObj() {
			wx.onMenuShareTimeline({
				title : wechatObj.desc, // 分享描述
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