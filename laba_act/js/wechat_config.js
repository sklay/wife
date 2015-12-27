/**
 * 微信配置js
 */
var wechatObj = new Object();
wechatObj.title = '药快到--家边上的药店！品类齐全，架构优惠！60分钟内必定送达';
wechatObj.desc = '药快到--家边上的药店！品类齐全，架构优惠！60分钟内必定送达';
wechatObj.link = location.href.split('#')[0];
wechatObj.imgUrl = 'http://imgstore.camore.cn/icon/home/ic_splash_yao.png';
$.ajax({url:"http://store.camore.cn/weixin/wechat/getwxjssign?",data:{url: location.href.split('#')[0]},success:function(wechatReturn){
	if (wechatReturn) {
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: 'wx697be0ec43c8cafa', // 必填，公众号的唯一标识
		    timestamp: wechatReturn.timestamp, // 必填，生成签名的时间戳
		    nonceStr: wechatReturn.nonceStr, // 必填，生成签名的随机串
		    signature: wechatReturn.signature,// 必填，签名，见附录1
		    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	}
}});
wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
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
	    success: function () {},
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
    
});