/**
 * 微信公用js
 */
var _prompt = '<div class="promptDiv" id="prompt"><div class="opDiv"></div><div class="promptContent"><img alt="" src=""><p class="title"></p></div></div>';
/*$(function() {
	var waitImg = '<div class="waitAll" id="waitAll"><img src="images/loadingall.gif"></div>';
	var shadeDiv = '<div class="shadeDiv" id="shadeDiv"></div>';
	$("body").append(shadeDiv);
	
});
function shadeAll(){
	$(".shadeDiv").css("height",$(document).height());
	$(".shadeDiv").css("width",$(document).width());
	$(".shadeDiv").show();
}
function closeShade(){
	$(".shadeDiv").hide();
}*/
function closeDiv(id){
	$("#"+id).hide();
}
function showDiv(id){
	$("#"+id).show();
}
//带有加载条的遮罩
function shadeAll(){
	var shadeWaitDiv = '<div class="waitShade" id="shadeWaitDiv"></div>';
	$("body").append(shadeWaitDiv);
	$("#shadeWaitDiv").css("height",$(document).height());
	$("#shadeWaitDiv").css("width",$(document).width());
	$("#shadeWaitDiv").css("background","#aeaeae");
	$("#shadeWaitDiv").show();
	var waitImg = '<div class="waitAll" id="waitAll"><img src="images/loadingall.gif"></div>';
	$("body").append(waitImg);
	letDivCenter("waitAll");
}
function closeShade(){
	$("#shadeWaitDiv").remove();
	$("#waitAll").remove();
}

//让指定的DIV始终显示在屏幕正中间
function letDivCenter(divName){ 
	var top = ($(window).height() - $("#"+divName).height())/2; 
	var left = ($(window).width() - $("#"+divName).width())/2; 
	var scrollTop = $(document).scrollTop(); 
	var scrollLeft = $(document).scrollLeft();
	$("#"+divName).css('top', top + scrollTop+"px"); 
	$("#"+divName).css('left', left + scrollLeft+"px");
	$("#"+divName).show();
}

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
	setTimeout("closePrompt()", 2500 );
}
function closePrompt(){
	$("#prompt").fadeOut(200,function(){
		closeShade();
		$("#prompt").remove();
	});
}
function shaDiv(){
	var shadeDiv = '<div class="shadeDiv" id="shaDiv"></div>';
	$("body").append(shadeDiv);
	$("#shaDiv").css("height",$(document).height());
	$("#shaDiv").css("width",$(document).width());
	$("#shaDiv").show();
}
function removeSha(){
	$("#shaDiv").remove();
}
