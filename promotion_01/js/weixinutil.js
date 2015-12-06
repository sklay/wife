//分享链接
$(function(){

	//获取页面地址的签名
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
	 var wechatObj = new Object();
	    wechatObj.title = '过教师节，药快到给你最好的安排';
	    wechatObj.desc = '“药快到”教师节送礼，优惠拿到手抽筋';
	    wechatObj.link = '';
	    wechatObj.imgUrl ='';
	    wx.ready(function(){
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
	    })
})