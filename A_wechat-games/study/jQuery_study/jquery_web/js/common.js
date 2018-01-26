$(function() {

	// 登录状态时，显示用户名
	var url = location.search;
	var userIndex = url.indexOf("=");
	var user = url.substr(userIndex + 1);

	if (user) {
		$(".navbar-right li").remove();
		$("<li><a href='javascript:;'>" + user + "</a></li>").appendTo($(".navbar-right"));
		$(".navbar-right").show();

	} else {

		$(".navbar-right").show();

	}

	// 点赞接口

	var pageId = $(".container .content .left ul li ul li.currentLink").attr("data-pageId");

	$(".likeOrdis").delegate("span", "click", function() {
		var clickClass = $(this).attr("class");
		if (clickClass.indexOf("glyphicon-thumbs-up") > 0) {

			likeOrdis("/jQuery360/like/addLike.do", pageId);
		} else if (clickClass.indexOf("glyphicon-thumbs-down") > 0) {

			likeOrdis("/jQuery360/dislike/addDislike.do", pageId);

		}

	});

	// 获取页面的所有信息
	likeOrdiscount("/jQuery360/findPageForLikeByPid.do", pageId)

})

function likeOrdis(url, pageId) {

	$.ajax({
		type : "post",
		url : url,
		data : {
			url_id : pageId
		},
		success : function(res) {
			
			

		},

		error : function(msg) {

			alert(msg.result);
		}
	});

}

function likeOrdiscount(url, pageId) {

	$.ajax({
		type : "post",
		url : url,
		data : {
			url_id : pageId
		},
		success : function(res) {

			if (res.code == 1) {

				$(".likeOrdis").html('赞 ' + res.message.p_like  + '<span class="glyphicon glyphicon-thumbs-up" aria-hidden="true" style="padding-left:10px"></span>踩 ' + res.message.dislike + '<span class="glyphicon glyphicon-thumbs-down" aria-hidden="true" style="padding-left:10px">')
			}

		},

		error : function(msg) {

			alert(msg.result);
		}
	});

}
