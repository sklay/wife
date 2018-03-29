$(function() {

	// 登录状态时，显示用户名
	var url = location.search;
	var userIndex = url.indexOf("=");
	var user = url.substr(userIndex + 1);
    var index = url.lastIndexOf("jsp");
    var currentLink = url.substring(index + 4);
    var currentNav = $(".brednavigation a").eq(0).html();
	var urls = $(".container .content .left ul li a");
    var navUrls = $(".navbar-collapse .navbar-nav li a");
    var localtitle;
    $(urls).each(function (index, ele) {
        if ($(urls).eq(index).attr("href") == currentLink) {
            $(urls).eq(index).parent("li").addClass("currentLink");
            localtitle = $(urls).eq(index).html();
            $(urls).eq(index).parent("li").parent("ul").addClass("in");
        }
    });
	if (user) {
		$(".navbar-right li").remove();
		$("<li><a href='javascript:;'>" + user + "</a></li>").appendTo($(".navbar-right"));
		$(".navbar-right").show();

	} else {

		$(".navbar-right").show();

	}

	// 点赞接口

	
    var pageId = $(".container .content .left ul li.currentLink").attr("data-pageId");
    if (pageId) {
        pageId = $(".container .content .left ul li.currentLink").attr("data-pageId");
    } else {
        $(".container .content .left> ul> li").eq(0).find("ul").addClass("in");
        $(".container .content .left >ul >li").eq(0).find("ul li").eq(0).addClass("currentLink");
        pageId = 1;
    }

    var local = url.lastIndexOf("/");
    var localUrl = url.substring(local + 1);
	
	addpageIfo(pageId,localUrl,localtitle);

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
function addpageIfo(id,url,title) {


    $.ajax({
        type: "post",
        url: "/addPageInformation.do",
        data: {
            id: id,
            url: url,
            title: title
        },
        success: function (res) {


        },

        error: function (msg) {

            /* alert(msg); */
        }
    });


}