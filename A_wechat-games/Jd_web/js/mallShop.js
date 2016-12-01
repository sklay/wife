$(function() {
	getShopData();
//	getShopData0();

	function getShopData() {
		$.ajax({
			type: "post",
			url: "http://localhost/A_wechat-games/Jd_web/php/shop2.php",
			dataType: "json",
			success: function(data) {
				marketFunc(data);
			},
			error: function(errordata) {
				log(errordata);
			}
		});
	}
//	function getShopData0() {
//		$.ajax({
//			type: "post",
//			url: "http://localhost/A_wechat-games/Jd_web/php/shop.php",
//			dataType: "json",
//			success: function(data) {
//				marketFunct(data);
//			},
//			error: function(errordata) {
//				log(errordata);
//			}
//		});
//	}

	function marketFunc(data) {
		for(var i = 0; i < data.length; i++) {
			var li = $("<li class='shopli'></li>");
			//给li标签设置data-shopid  获取商品id  -->data[i].shopId
			li.attr("data-shopid", data[i].shopId)
			li.appendTo($(".shoplist"));

			var br = $("<div class='br'></div>");
			//					var br1 = $("<div class='br1'></div>");
			br.appendTo(li);
			//					br1.appendTo(li); //TODO 未完成

			var bl = $("<img class='bl'/>");
			//给bl设置src  获取图片  -->data[i].shopicon
			bl.attr("src", data[i].shopicon);
			bl.appendTo(br);

			var bm = $("<div class='bm'></div>");
			bm.appendTo(br);
			var h2 = $("<h2></h2>");
			//商品名
			h2.html(data[i].shopname);
			h2.appendTo(bm);
			var div = $("<div></div>");
			div.appendTo(bm);
			var p = $("<p class='bn'></p>");

			//获取商品的星级等级
			var starNum = data[i].start;
			for(var j = 0; j < starNum; j++) {
				var starI = $("<i></i>");
				starI.appendTo(p);
			}

			p.appendTo(div);

			var cb = $("<p class='cb'></P");
			//商品的销售单数
			var shopNum = data[i].shopnum;
			cb.html(shopNum + "件商品|月销售" + data[i].sell + "单");
			cb.appendTo(bm);
			var bs = $("<div class='bs'></div>");
			bs.appendTo(br);
			var span = $("<span class='d4'></span>");
			span.appendTo(bs);
		}
	}

	
	//滚动到最底部时每次增加六条新数据
	var addIndex = 0;
	$(window).scroll(function() {
			var lastShop = $(".shoplist .shopli:last").offset().top;
			var scrollHeight = $(window).scrollTop();
			var winHeight = $(window).height();
			if(lastShop < scrollHeight + winHeight) {
				getShopData();
				addIndex += 5;
			}
		})
		//跳转到当前点击的 商家
	$(".shoplist").on("click", ".shopli", function() {
		var myshopid = $(this).attr("data-shopid");
		window.location.href = "shopdetails.html?shopid=" + myshopid;

	});

})