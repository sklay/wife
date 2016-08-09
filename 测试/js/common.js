/**
 * 微信公用js
 */
//使用rem单位
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
//判断是否从微信进入
function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
};


var _prompt = '<div class="promptDiv" id="prompt"><div class="opDiv"></div><div class="promptContent"><img alt="" src=""><p class="title"></p></div></div>';

$(function() {
	var shadeDiv = '<div class="shadeDiv" id="shadeDiv"></div>';
	$("body").append(shadeDiv);
//	$("body").append(waitShade);
	
});
function shadeAll(){
	$("#shadeDiv").css("height",$(document).height());
	$("#shadeDiv").css("width",$(document).width());
	$("#shadeDiv").show();
};
function closeShade(){
	$("#shadeDiv").hide();
};
function closeDiv(id){
	$("#"+id).hide();
};
function showDiv(id){
	$("#"+id).show();
};
//让指定的DIV始终显示在屏幕正中间
function letDivCenter(divName){ 
	var top = ($(window).height() - $("#"+divName).height())/2; 
	var left = ($(window).width() - $("#"+divName).width())/2; 
	var scrollTop = $(document).scrollTop(); 
	var scrollLeft = $(document).scrollLeft();
	$("#"+divName).css('top', top + scrollTop+"px"); 
	$("#"+divName).css('left', left + scrollLeft+"px");
	$("#"+divName).show();
};

function showResult(type,title){
	$("body").append(_prompt);
	if (type == "remind") {
		$("#prompt .promptContent").find("img").attr("src","images/w_prompt_remind.png");
	}else if (type == "success") {
		$("#prompt .promptContent").find("img").attr("src","images/w_prompt_ok.png");
	}else if (type == "error") {
		$("#prompt .promptContent").find("img").attr("src","images/w_prompt_error.png");
	}else{
		$("#prompt .promptContent").find("img").attr("src","images/w_prompt_remind.png");
	}
	$("#prompt").find(".title").text(title);
	letDivCenter("prompt");
	shadeAll();
//	$("#prompt").show();
	setTimeout("closePrompt()", 600 );
};
function closePrompt(){
	$("#prompt").fadeOut(200,function(){
		closeShade();
		$("#prompt").remove();
	});
};
function comWaitShow(){
    var shadeWaitDiv = '<div class="waitShade" id="shadeWaitDiv" style="background:rgba(200,200,200,.7);position:absolute;top:0;left:0;z-index:8888"></div>';
    $("body").append(shadeWaitDiv);
    $("#shadeWaitDiv").css("height",$(document).height());
    $("#shadeWaitDiv").css("width",$(document).width());
    $("#shadeWaitDiv").show();
    var top=($(document).height()-50)/2;
    var left=($(document).width()-50)/2;
    var waitImg = '<div class="waitAll" id="waitAll" style="width:50px;position:absolute;z-index:9999"><img style="width:50px;" src="images/jiazai.gif"></div>';
    $("#shadeWaitDiv").empty();
    $("#shadeWaitDiv").append(waitImg);
    $("#waitAll").css({"top":top,"left":left})
};
function comWaitClose(){
    $("#shadeWaitDiv").remove();
    $("#waitAll").remove();
};
function waitShow(){
	var shadeWaitDiv = '<div class="waitShade" id="shadeWaitDiv"></div>';
	$("body").append(shadeWaitDiv);
	$("#shadeWaitDiv").css("height",$(document).height());
	$("#shadeWaitDiv").css("width",$(document).width());
	$("#shadeWaitDiv").show();
	var waitImg = '<div class="waitAll" id="waitAll"><img src="images/jiazai.gif"></div>';
	$("body").append(waitImg);
	letDivCenter("waitAll");
};
function waitClose(){
	$("#shadeWaitDiv").remove();
	$("#waitAll").remove();
};
/* 以*隐藏电话号码中间四位 */
function hidePhoneNum(selector){
	 var anum=$("#"+selector).html();
	 var bnum=anum.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
	 $("#"+selector).html(bnum);
};

/*封装点击自己关闭函数*/
function closeSelf_common(_this){
	_this.style.display="none";
};
/*点击显示*/
function clickShow_common(showDom){
	var a=document.getElementById(showDom);
	a.style.display="block";
}

/*获取验证码 领取遮罩公用Js,实际应用中需要在自己的页面中定义html的css样式  这个样式在act_powerImmuneDay.jsp页面中有定义*/
function getMask(){
	var shadeWaitDiv = '<div class="waitShade" id="shadeWaitDiv"></div>';
	$("body").append(shadeWaitDiv);
	$("#shadeWaitDiv").css("height",$(document).height());
	$("#shadeWaitDiv").css("width",$(document).width());
	$("#shadeWaitDiv").show();
	var waitImg = '<div class="waitAll" id="waitAll"><img src="images/jiazai.gif"></div>';
	$("body").append(waitImg);
	$("#waitAll").show();
};
function closeMask(){
	$("#shadeWaitDiv").remove();
	$("#waitAll").remove();
};