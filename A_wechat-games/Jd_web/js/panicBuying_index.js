/**
 * Created by Administrator on 2016/7/13.
 */

$(function () {

    var timer = null;

    $(".rm li").on("click", function () {

        $(this).addClass("cur").siblings().removeClass("cur");
        $(".grabWrap").eq($(this).index()).addClass("grab_cur").siblings().removeClass("grab_cur");

        if ($(".grabWrap").hasClass("grab_cur")) {
            if ($(this).children(".rn").html() == "08:00") {
                clearInterval(timer);
                timer = setInterval('refresh($(".rk .rl i:nth-child(1)"),$(".rk .rl i:nth-child(2)"),$(".rk .rl i:nth-child(3)"),"june 18,2017 12:00:00")', 1000);
            }
            if ($(this).children(".rn").html() == "12:00") {
                clearInterval(timer);
                timer = setInterval('refresh($(".rk .rl i:nth-child(1)"),$(".rk .rl i:nth-child(2)"),$(".rk .rl i:nth-child(3)"),"june 18,2017 12:00:00")', 1000);
            }
            if ($(this).children(".rn").html() == "16:00") {
                clearInterval(timer);
                timer = setInterval('refresh($(".rk .rl i:nth-child(1)"),$(".rk .rl i:nth-child(2)"),$(".rk .rl i:nth-child(3)"),"june 18,2017 16:00:00")', 1000);
            }
            if ($(this).children(".rn").html() == "20:00") {
                clearInterval(timer);
                timer = setInterval('refresh($(".rk .rl i:nth-child(1)"),$(".rk .rl i:nth-child(2)"),$(".rk .rl i:nth-child(3)"),"june 18,2017 20:00:00")', 1000);
            }
        }
    });
    timer = setInterval('refresh($(".rk .rl i:nth-child(1)"),$(".rk .rl i:nth-child(2)"),$(".rk .rl i:nth-child(3)"),"june 18,2017 12:00:00")', 1000);


    $.ajax({
        type: "get",
        url: "http://localhost/A_wechat-games/Jd_web/php/panicBuying_index.php",
        dataTypel: "json",
        success: function (data) {
            buyView(data);
        },
        error: function () {

        }
    });

    function buyView(data) {
        $(data).each(function (index, ele) {
            $(".seckill-goods-list").append("<li class='r8 r'><a href='#' class='r7'><img class='ra-8' src='" + data[index].buyimg + "'><p class='rb'>" + data[index].buytitle + "</p><div class='qx'><i class='qy'><em class='r6'>￥</em>" + data[index].buyyj + "</i></div></div></a><a class='qz rt'><i class='r6'>￥</i>" + data[index].buyxj + "<i class='r5'>&nbsp;&nbsp;抢</i></a><p class='rs'>" + data[index].buyshop + "</p></li>");
        });
        $(".rp div.grabWrap:not(:first-child) .qz").addClass("rj");
    }
    
    //左边导航
        $(".zp").on("click", function (e) {
	        e.stopPropagation();
	        $(".zp .zq").fadeToggle(300);
	        var display = $(".zq").css("display");
	        if (display == "block") {
	            $(".zz").css({
	                display: "block"
	            })
	        } else {
	            $(".zz").css({
	                display: "none"
	            })
	        }
    	});
});