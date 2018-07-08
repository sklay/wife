<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<base href="../">
		<link rel="stylesheet" href="style/act_18common.css" />
		<link rel="stylesheet" href="style/act_18exemptionShare.css" />
		<script src="js/jquery-2.2.0.min.js"></script>
		<script src="js/html_commonN.js"></script>
		<script>
			/** 默认是生产APPID*/
			var appid = 'wxade8c5e473c645e9';
			if (location.host.indexOf('deve') >= 0) {
				/** 准生产APPID*/
				appid = 'wx697be0ec43c8cafa';
			}
			
			var codeActId = '${codeActId}' || '';
			var act_url = '${act_url}' || '';
			var pharmacy_id = '${pharmacy_id}';
			var user_id = '${user_id}';
			var inviteType = '${inviteType}';
			var version_sys = 'wechat';
			var wxparam = "%26codeActId%3d"+ codeActId +"%26pharmacy_id%3d"+ pharmacy_id +"%26user_id%3d" + user_id + "%26inviteType%3d" +inviteType+ "%26version_sys%3dwehcat";
			// 新追加一个参数
			var redirect_uri = 'http%3a%2f%2f' + location.host + '%2fmedhtml%2fcommon%2fcouponAct%2f' + codeActId + '%3fact_url%3d' + act_url;
			console.debug(' cur href is ', redirect_uri);
			var parm = "&pharmacy_id=${pharmacy_id}&user_id=${user_id}&inviteType=${inviteType}&codeActId=${codeActId}&version_sys=wehcat";
			var redirect_URI = "http://" + location.host + "/medhtml/common/couponAct/" + parm;
			var ss = encodeURI(redirect_URI);
			console.debug(' cur href is ', encodeURI(redirect_URI));
			if (is_weixin()) {
				//alert(redirect_URI);
				var grantBoo = "${grantFail}";
				if (grantBoo == "true" || grantBoo == true) {
					var grantFailUserId = "${fromUserId}";
					//alert(wxparam);
					location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + wxparam + '&response_type=code&scope=snsapi_userinfo&state={"from_user_id":"${fromUserId}","silent_grant":"no"}&connect_redirect=1#wechat_redirect';
				}
			} else {
		//		location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state={"from_user_id":"${fromUserId}","silent_grant":"no"}#wechat_redirect';
			}
					
		</script>
		<style>
			/*.indexWrap{
				height: 8rem;
			}*/
			.received_result{
				display:none;
			}
			.failBox{
				position: fixed;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 100%;
			    background: rgba(0, 0, 0, .5);
			    z-index: 12;
			}
			.failBoxWrap{
			    width: 4rem;
			    height: 3.6rem;
			    background: #fff;
			    position: absolute;
			    left: 50%;
			    top: 50%;
			    margin-left: -2rem;
			    text-align: center;
			    padding: 0 .1rem;
			    box-sizing: border-box;
			    font-size: .24rem;
			    border-radius: 10px;
			    margin-top: -1.8rem;
			}
			.failBoxWrap img.closeBtn{
				display: block;
				width: .2rem;
				margin: 0.15rem auto 0;
				float: right;
				padding: 0 .1rem;
			}
			.descWap{
				width: 100%;
				margin: 0.45rem auto 0;	
				line-height: .5rem;
				font-size: .22rem;			
			}
			.btnWrap{
				width: 3.2rem;
				margin: 0.3rem auto 0;
			}
			.btnWrap button{
				font-size: .22rem;
				width: 100%;
				line-height: .6rem;
				height: .6rem;
				border-radius: 4px;
				outline: none;
				border: 0;
				color: #fff;
				display: block;
			}
			.btnWrap button.shareFri {
			    float: none;
			    background: #de150b;
			    box-shadow: none;
			    margin-top: .22rem;
			}
			.btnWrap button.use_btn {
			    float: none;
			    background: #fff;
			    color: #de150b;
			    border: 1px solid #de150b;
			    box-shadow: none;
			}
			#shareFriSha {
			    position: absolute;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 100%;
			    background: rgba(0, 0, 0, 0.6);
			    z-index: 100;
			    display: none;
			}
			#shareFriSha img {
			    width: 2.8rem;
		        padding: 0 .4rem;
		        box-sizing: border-box;
			    display: block;
			    margin: 0 auto;
			    float: right;
			}
			.userFriInf p{
				color: #828282;
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
				<div class="indexWrap">
					<div class="content_top">
					<img src="images/act_18exemptionInvite_1.jpg" />
					<img src="images/act_18exemptionInvite_2.jpg" />
					<img src="images/act_18exemptionInvite_3.jpg" />
					<img src="images/act_18exemptionInvite_4.jpg" />
					<img src="images/act_18exemptionInvite_5.jpg" />
					<img src="images/act_18exemptionInvite_6.jpg" />
					<img src="images/act_18exemptionInvite_7.jpg" />
				</div>
				<div class="getHbWrap">
					<div class="getHb">
						<div class="commomLogin">
							<input type="tel" placeholder="请输入手机号码" id="userPhone">
							<button id="getHbBtn">免费领取</button>
							<p id="downText" class="downloadP goForUse">下载药快到APP</p>
						</div>
					</div>
				</div>
				</div>
				
			<div class="friHbShowWrap ">
				<div class="comShowTitle">
					<div class="leftLineDot">
						<span style="height: 1px; width: .6rem;"></span> 
					</div>
					<div class="comshowTitleText">好友动态</div>
					<div class="rightLineDot">
						<span style="height: 1px; width: .6rem;"></span>
					</div>
				</div>
				<div class="friHbShow">
					<div class="userFriAvatat">
						<div class="userFriInf">
							<p>药快到  送您一张26元免单券</p>
						</div>
						<div class="couponWrap">
							<img src="images/act_18exemptionInvite_couponCode.png" alt="头像" />
						</div>
					</div>
				</div>
			</div>
			<!--二维码-->
			<div class="QRcodeWrap">
				<div class="comShowTitle">
					<div class="leftLineDot">
						<span style="height: 1px; width: .6rem;"></span> 
					</div>
					<div class="comshowTitleText">长按识别二维码</div>
					<div class="rightLineDot">
						<span style="height: 1px; width: .6rem;"></span>
					</div>
				</div>
				<div class="QRcodeWrapIocn">
					<img src="images/act_18exemptionInvite_QRcode.jpg" />
				</div>
				<div class="QRcodeDesc">
					<p>关注微信</p>
					<p>了解更多优惠信息</p>
				</div>
			</div>
			</div>
			<div class="received_result" >
				<div class="receive_success" style="display: none;">
					<div class=" getHbnNum">
           				<img  src="images/act_18exemptionInvite_resultIcon.png" alt="" />
           				<div class="getDesc">
           					<p>恭喜你!</p>
           					<p>获得一张26元免单券</p>
           					<p class="phoneWrap">已放入您<span id="phoneNCode"></span>账户</p>
           				</div>
           				<div class="commUsebtn clearfix">
							<button class="use_btn goForUse" id="goForUse">下载APP去享用</button>
						</div>
					</div>
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
					</div>
				</div>
				<div class="has_received" style="display: none;">
					<div class=" hasWrap">
						<p>你已经领取了26元免单券</p>
						<p>快去逛逛吧</p>
						<div class="hasCorp clearfix">
							<p id="downText" class="downloadP goForUse">去逛一逛</p>
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
			<div class="failResul">
				<p class="desc"></p>
				<p class="line"></p>
				<p class="closeBtn">知道了</p>
			</div>
		</div>
		<div class="failBox" style="display: none;">
			<script>
				(function(){
					var wh = $(document).height();
					$(".failBox").css({
						height:wh
					})
				})();
			</script>
			<div class="failBoxWrap clearfix" >
				<!--<span class="closeBtn">X</span>-->
				<img class="closeBtn" src="images/act_18GetCpnClose.jpg" />
				<div class="descWap">
					<p>您已经是药快到会员了</p>
					<p>请分享后再领取</p>
				</div>
				<div class="btnWrap">
					<button class="use_btn goForUse" id="goForUse">下载药快到APP</button>
					<button class="shareFri shareForFri" id="small_ShareFri">分享给小伙伴一起领</button>
				</div>
			</div>
		</div>
		<div id="shareFriSha">
			<img src="images/act_18GetCpnShare.png" alt="">
		</div>
		<%@ include file="act_common_sharePage.jsp"%>
	</body>
	<script>
		var phoneNum = '${phoneNum}';
		var fromUserId = '${user_id}';
		var openId = '${openid}';
		//分享者 的 信息
		var token = '${user_token}';
		var wechatObj = new Object();
		//ph = $("#userPhone").val().substring(0,3)+"****"+$("#userPhone").val().substring(7,11);
		
		//alert( ph);
		window.onload = function() {
		/* $("#userPhone").on("click",function() { 
			console.debug('click event');
			showSoftKeyboard();
		});  */
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
								//成功之后，后台返回用户的 手机号码 展示
								console.log("succ");
								$(".indexPage").hide();
//								$(".userFriAvatat").show();
								$("#phoneNCode").html( $_phoneno.substring(0,3)+"*******");
								$(".received_result").show();
								$(".receive_success").show();
							} else if (result.result == "fail") {
								//type = 3 用户已经领过 了 
							if (result.data.type == 3) {
								console.log("received");
//								$(".userFriAvatat").show();
								$(".received_result").show();
								$(".has_received").show();
							}else if(result.data.type == 2){
								//老用户
								$(".failBox").show();
//								$(".failShow").show();
//								$(".failResul .desc").html(result.data.msg);
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
		//去使用跳转页面
		$(".goForUse").on("click", function() {
			var target_href = 'http://store.ykd365.com/download.html';
			window.location.href = target_href;
		});
		//分享
		$(".shareForFri").on("click",function() {
			$('html , body').animate({scrollTop: 0},'slow');
			$("#shareFriSha").css("height", $(".content").height());
			$("#shareFriSha").show();
			$(".failBox").hide();
		});	
		$("#shareFriSha").on("click", function() {
			$("#shareFriSha").hide();
		});
		$(".collectCorp").click(function() {
			// $(this).text($("#content").is(":hidden") ? "收起" : "展开");
			$(".activeRuleShow").slideToggle();
		});
		$(".closeBtn").on("click",function(){
			$(".failShow").hide();
		});
		$(".failBoxWrap img.closeBtn").on("click",function(){
			$(".failBox").hide();
		});
	}
	</script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script>
		wechatObj.title = '${shareInfo.sharedTitle}';
		wechatObj.desc = '${shareInfo.sharedContent}';
// 		wechatObj.link = location.href.split('#')[0];
		wechatObj.link = '${shareInfo.sharedUrl}';
		wechatObj.imgUrl = '${shareInfo.sharedImgUrl}';
	if(is_weixin()) {
		$.ajax({
			url: "/medhtml/common/getwxjssign?",
			data: {
				url: location.href.split('#')[0]
			},
			success: function(wechatReturn) {
				if(wechatReturn) {
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: appid, // 必填，公众号的唯一标识
						timestamp: wechatReturn.timestamp, // 必填，生成签名的时间戳
						nonceStr: wechatReturn.nonceStr, // 必填，生成签名的随机串
						signature: wechatReturn.signature, // 必填，签名，见附录1
						jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
						// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
				};
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
			title: wechatObj.title, // 分享描述
			link: wechatObj.link, // 分享链接
			imgUrl: wechatObj.imgUrl, // 分享图标
			success: function() {},
			cancel: function() {}
		});
		wx.onMenuShareAppMessage({
			title: wechatObj.title, // 分享标题
			desc: wechatObj.desc, // 分享描述
			link: wechatObj.link, // 分享链接
			imgUrl: wechatObj.imgUrl, // 分享图标
			success: function() {},
			cancel: function() {}
		});
		wx.onMenuShareQQ({
			title: wechatObj.title, // 分享标题
			desc: wechatObj.desc, // 分享描述
			link: wechatObj.link, // 分享链接
			imgUrl: wechatObj.imgUrl, // 分享图标
			success: function() {},
			cancel: function() {}
		});
		wx.onMenuShareWeibo({
			title: wechatObj.title, // 分享标题
			desc: wechatObj.desc, // 分享描述
			link: wechatObj.link, // 分享链接
			imgUrl: wechatObj.imgUrl, // 分享图标
			success: function() {},
			cancel: function() {}
		});
	}
	</script>

</html>
