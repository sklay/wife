/**
 * manage公用js
 */
$(function() {
	//左侧导航菜单选中
	$(".left .leftModel").each(function() {
		var url = $(this).attr("data").split("|");
		for(var i=0;i<url.length;i++) {
			if(location.href.indexOf(url[i])>-1) {
				$(this).siblings().removeClass("checked");
				$(this).addClass("checked");
//				var sub = $(this).parent("li").next(".subMenu");
//				sub.show();
//				sub.find("a").each(function() {
//					var url = $(this).attr("data").split("|");
//					for(var i=0;i<url.length;i++) {
//						if(location.href.indexOf(url[i])>0) {
//							$(this).addClass("cur");
//						}
//					}
//				});
			}
		}
	});
});
