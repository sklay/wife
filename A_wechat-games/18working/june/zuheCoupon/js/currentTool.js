/**
 * 微信公用js
 */
//使用rem单位
setSize();

$(function() {
	$(window).resize(setSize);
})

function setSize() {

	var pixelRatio = 1 / window.devicePixelRatio;
	$("#device").attr("content", "width=device-width,initial-scale=" + pixelRatio + ",maximum-scale=" + pixelRatio + "");

	var html = document.getElementsByTagName("html")[0];
	var pageWidth = html.getBoundingClientRect().width;
	console.log("pageWidth的值是",pageWidth);
	html.style.fontSize = pageWidth / 10 + "px";
}

//判断是否从微信进入
function is_weixin() {
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
};
/*等待遮罩js*/
function waitShow() {
	var shadeWaitDiv = '<div class="waitShade" id="shadeWaitDiv" style="background:rgba(200,200,200,.7);position:absolute;top:0;left:0;z-index:8888"></div>';
	$("body").append(shadeWaitDiv);
	var wh = $(window).height();
	var dh = $(document).height();
	if(wh > dh) {
		var shadeHei = wh;
	} else {
		var shadeHei = dh;
	}
	$("#shadeWaitDiv").css("height", shadeHei);
	$("#shadeWaitDiv").css("width", $(document).width());
	$("#shadeWaitDiv").show();
	var top = ($(document).height() - 50) / 2;
	var left = ($(document).width() - 50) / 2;
	var waitImg = '<div class="waitAll" id="waitAll" style="width:50px;position:absolute;z-index:9999"><img style="width:50px;" src="images/jiazai.gif"></div>';
	$("#shadeWaitDiv").empty();
	$("#shadeWaitDiv").append(waitImg);
	$("#waitAll").css({
		"top": top,
		"left": left
	})
};

function waitClose() {
	$("#shadeWaitDiv").remove();
	$("#waitAll").remove();
};
//未登录消息提示遮罩层
var _prompt = '<div class="promptDiv" id="prompt"><div class="opDiv"></div><div class="promptContent"><img alt="" src=""><p class="title"></p></div></div>';
$(function() {
	var shadeDiv = '<div class="shadeDiv" id="shadeDiv" style="position: absolute;top:0px;left: 0px;background: rgba(0, 0, 0, 0.4);"></div>';
	$("body").append(shadeDiv);
});

function shadeAll() {
	$("#shadeDiv").css("height", $(document).height());
	$("#shadeDiv").css("width", $(document).width());
	$("#shadeDiv").show();
};

function closeShade() {
	$("#shadeDiv").hide();
};

function closeDiv(id) {
	$("#" + id).hide();
};

function showDiv(id) {
	$("#" + id).show();
}
/*点击查看优惠券/去使用按钮    结果的消息提示共用样式js*/
function showResultApp(type, title) {
	$("body").append(_prompt);
	if(type == "remind") {
		$("#prompt .promptContent").find("img").attr("src", "images/w_prompt_remind.PNG");
	} else if(type == "success") {
		$("#prompt .promptContent").find("img").attr("src", "images/w_prompt_ok.png");
	} else if(type == "error") {
		$("#prompt .promptContent").find("img").attr("src", "images/w_prompt_error.png");
	} else {
		$("#prompt .promptContent").find("img").attr("src", "images/w_prompt_remind.PNG");
	}
	$("#prompt").find(".title").text(title);
	var top = ($(window).height() - $("#prompt").height()) / 2;
	var left = ($(window).width() - $("#prompt").width()) / 2;
    var scrollTop = $(document).scrollTop();   
	$("#prompt").css({
		'top':(top + scrollTop) + "px",
		'left': left + "px"
	});
	$("#prompt").show();
	shadeAll();
	//	$("#prompt").show();
	setTimeout("closePrompt()", 1000);
};

function closePrompt() {
	$("#prompt").fadeOut(200, function() {
		closeShade();
		$("#prompt").remove();
	});
};

/*app调用的共用js*/
function s(type) {
	var jsonObject = {};
	if(type == 0) {
		jsonObject.shared_type = "0";
		jsonObject.shared_url = wechatObj.link;
		jsonObject.shared_title = wechatObj.title;
		jsonObject.shared_content = wechatObj.desc;
		jsonObject.shared_img_url = wechatObj.imgUrl;
	} else
	if(type == 1) {
		jsonObject.shared_type = "1";
		jsonObject.shared_url = wechatObj.link;
		jsonObject.shared_title = wechatObj.desc;
		jsonObject.shared_content = wechatObj.desc;
		jsonObject.shared_img_url = wechatObj.imgUrl;
	}
	var jsonStr = JSON.stringify(jsonObject);
	sharedTypeByJson(jsonStr);
}
/*分享的方法*/
function sharedTypeByJson(jsonStr) { //ios会覆盖此方法
	camore.sharedTypeByJson(jsonStr); //android会调用里面的方法
};
//安卓会调用这个方法，如果页面有输入框，调用这个方法
function showSoftKeyboard(){  
    camore.showSoftKeyboard();  
};
/*点击去使用跳转的方法*/
function gotoPage(jsonStr) { //ios会覆盖此方法
	camore.gotoPage(jsonStr); //android会调用里面的方法
};