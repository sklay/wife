$(function(){
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
    
    
     /*
     * 解析url
     * */
    function getQueryStringArgs() {
        var qs = location.search.length > 0 ? location.search.substring(1) : "";
        var args = {};
        var item = [];
        var name = null;
        var value = null;
        var items = qs.length ? qs.split("&") : [];
        for (var i = 0; i < items.length; i++) {
            item = items[i].split("=");
            name = item[0];
            value = item[1];

            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    }
    
     myAjax(getQueryStringArgs().ball);
    //列表数据请求
    function myAjax(ballct) {
        
           $.get("./data/marketShop_index.json", function (data) {
                marketView(data[ballct]);
            });
    }
    //解析请求回来的数据
   
    
    
    function marketView(data) {
    	// 解析a链接    根据a链接地址后面拼接的  标志  给对应页面的 ul 加上 不用的样式
    	var seq = getQueryStringArgs().ball;
    	$(".index-act-wrap ul").addClass(seq); 
    	//轮播图数据
//      $(".mt img").attr("src", data.marketimg);
        var res = data.marketimg;
		for(var i = 0; i < res.length; i++) {
//			var item = $("<div class='item'></div>");
//			item.appendTo($("#show_works_content"));
			var img = $("<img/>");
			img.attr("src", res[i]);
			img.appendTo($("#show_works_content .item").eq(i));
		};
		//列表的数据
        $(data.marketinfo).each(function (index) {
        	var li = $("<li class='da'></li>");
			li.appendTo($(".a6"));
			var $_a = $("<a href='#'></a>");
			$_a.appendTo(li);
			
			var $_em = $('<em></em>');
			$_em.html(data.marketinfo[index].mc);
			$_em.appendTo($_a);
			
			var $_span = $('<span></span>');
			$_span.html(data.marketinfo[index].mcdesc);
			$_span.appendTo($_a);
			
			var bl = $("<img />");
			bl.attr("src", data.marketinfo[index].mcicon);
			bl.appendTo($_a);
		
        });
        //给每个li 添加新的  class 属性
        $('.a6 li').each( function(i,e){ 
    		$(e).addClass('sequence'+(i+1)); 
    	});
    }
    		
    
    
     $(".zz").on("click", function (e) {
        $(this).css({
            display: "none"
        });
        $(".zq").fadeOut(300);
    });
    
})
