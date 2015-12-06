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
}

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
}
function closeShade(){
	$("#shadeDiv").hide();
}
function closeDiv(id){
	$("#"+id).hide();
}
function showDiv(id){
	$("#"+id).show();
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
//	$("#prompt").show();
	setTimeout("closePrompt()", 1600 );
}
function closePrompt(){
	$("#prompt").fadeOut(200,function(){
		closeShade();
		$("#prompt").remove();
	});
}

function waitShow(){
	var shadeWaitDiv = '<div class="waitShade" id="shadeWaitDiv"></div>';
	$("body").append(shadeWaitDiv);
	$("#shadeWaitDiv").css("height",$(document).height());
	$("#shadeWaitDiv").css("width",$(document).width());
	$("#shadeWaitDiv").show();
	var waitImg = '<div class="waitAll" id="waitAll"><img src="images/jiazai.gif"></div>';
	$("body").append(waitImg);
	letDivCenter("waitAll");
}
function waitClose(){
	$("#shadeWaitDiv").remove();
	$("#waitAll").remove();
}
//百度地图模糊搜索，获取用户选择的地址与坐标

/*function getuseraddr(inputId){
	 var map = new BMap.Map("allmap");//创建地图  
	 var ac = new BMap.Autocomplete({"input" : inputId});
	 ac.show(); 
	
	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
		// 获取当前用户选择的具体地址，需要返回后台--start 
		var _value = e.item.value;
		 myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		 // console.log(myValue);
		  //console.log(e)
		  //获取当前用户选择的具体地址，需要返回后台--end 
		 
		  //获取百度返回用户选中地址的坐标，需要返回给后台--start
		 var point=$("#"+inputId).val(); 
		  var ls = new BMap.LocalSearch(point);  
		  ls.search(point);  
		  ls.setSearchCompleteCallback(function(rs){  
           if (ls.getStatus() == BMAP_STATUS_SUCCESS){  
               var poi=rs.getPoi(0);  
               getback=poi.title+":" +poi.point.lng+","+poi.point.lat; 
             //  console.log(getback)
           }
		  });
		  //获取百度返回用户选中地址的坐标，需要返回给后台--end
	 
	}); 
}*/

//反查经纬度
function getUserWritePoi(point){
	 var ls = new BMap.LocalSearch( point);  
	 var  getback,myaddr;
	  ls.search(point);   
	  ls.setSearchCompleteCallback(function(rs){  
	     if (ls.getStatus() == BMAP_STATUS_SUCCESS){  
	         var poi=rs.getPoi(0);  
	        getback=poi.point.lng+","+poi.point.lat; 
	        myaddr=poi.title;
	        $("#userlonlat").val(getback);
	        $("#useraddr").val(myaddr);
	        $("#userWriteAddr").submit();
	        waitClose();
	     }else{
	    	 showResult("error","获取地址信息失败");
			  waitClose();
			  if($(".userwrite_searchresult>div>p").length>0){
					$(".userwrite_searchresult").show().css({opacity:1});
				}
			  return false;
	     }
	  });
}



//百度统计
/*var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?91a99cd5410389d62371adc373fd589d";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

*/
