/**
 * 
 */
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
	 if(haveScore){
		 alert(scoreNum);
		if (scoreNum<=5){
			var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【盲人摸象】称号,拯救我的任务就交给你了！";
		}else if(scoreNum>5 && scoreNum<=10){
			var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【挑刺达人】称号,快来看看你能找到多少？";
		}else if(scoreNum>10 && scoreNum<=15){
			var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【安全卫士】称号,以后吃饭带着我可验毒哦~";
		}else if(scoreNum>15 && scoreNum<20){
			var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【火眼金睛】称号,我就不信你能找到的比我多！";
		}else if(scoreNum>=20){
			var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【火眼金睛】称号,据说全世界只有0.1%的人能做到，不服来战！";
		}
	} else{
		var myDesc =  "食品卫生，你注意过吗？快来看看自己能到哪关！" ;
	};
	function shareSucc(){
		clearInterval(countDownTime);
		//状态值回复初始
		scoreNum=0;
		countDownNum=60;
		boxNum=2;
		indexSub=0;
		haveScore=false;
		$(".controlAlertPage").hide();
		$("#food_img").show();
		$("#start_game").hide();
	  	$("#index").show();
	  	$("#shareshade").hide();
	};
	 var wechatObj = new Object();
	 	 wechatObj.title ='2+【药快到】食品卫生找茬大赛';
	    wechatObj.desc = myDesc;
	    // wechatObj.link = 'http://store.ykd365.com:10080/medhtml/common/910tech_index'; 
	    wechatObj.link = 'http://192.168.1.222:12080/medhtml/common/startFSGame';
	    wechatObj.imgUrl ='http://imgstore.camore.cn/icon/logo/act_foodSagety_weixinShare.jpg';
	    wx.ready(function(){
	    	wx.onMenuShareTimeline({
	    		// title: wechatObj.title, // 分享标题 
	    		title: wechatObj.desc, // 分享标题
	    	    link: wechatObj.link, // 分享链接
	    	    imgUrl: wechatObj.imgUrl, // 分享图标
	    	    success: function () { 
	    	    	shareSucc();
	    	    },
	    	    cancel: function () {
	    	    }
	    	}); 
	    	 wx.onMenuShareAppMessage({
	    		title: wechatObj.title, // 分享标题
	    		desc: wechatObj.desc, // 分享描述
	    	    link: wechatObj.link, // 分享链接
	    	    imgUrl: wechatObj.imgUrl, // 分享图标
	    	    success: function () {
	    	    	shareSucc();
	    	    	
	    	    },
	    	    cancel: function () {
	    	    }
	    	});
	    	wx.onMenuShareQQ({
	    		title: wechatObj.title, // 分享标题
	    		desc: wechatObj.desc, // 分享描述
	    	    link: wechatObj.link, // 分享链接
	    	    imgUrl: wechatObj.imgUrl, // 分享图标
	    	    success: function () { 
	    	    	shareSucc();
	    	    },
	    	    cancel: function () {
	    	    }
	    	});
	    	wx.onMenuShareWeibo({
	    		title: wechatObj.title, // 分享标题
	    		desc: wechatObj.desc, // 分享描述
	    	    link: wechatObj.link, // 分享链接
	    	    imgUrl: wechatObj.imgUrl, // 分享图标
	    	    success: function () { 
	    	    	shareSucc();
	    	    },
	    	    cancel: function () {
	    	    }
	    	});
	    });
	    wx.error(function(res){
	    	alert("config失败"+res);
	    });
});