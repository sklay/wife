/**
 * 微信公用js
 */
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

