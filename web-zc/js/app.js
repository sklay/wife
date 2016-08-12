/**
 * Created by Administrator on 2016/7/8.
 */

$(function() {

	/*
	 * 定义公共方法
	 * */

	var log = console.log.bind(console);
	var addIndex = 0;

	/*
	 * 倒计时6月16日讲课内容
	 * */
	(function() {
		function refresh() {
			var endTime = new Date("june 18,2017 00:00:00");
			var nowTime = new Date();
			var leftsecond = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
			if(leftsecond < 0) {
				leftsecond = 0;
			}
			day = parseInt(leftsecond / 3600 / 24);
			hour = parseInt((leftsecond / 3600) % 24);
			minute = parseInt((leftsecond / 60) % 60);
			second = parseInt(leftsecond % 60);

			$(".sktime>i:nth-child(1)").html(hour);
			$(".sktime>i:nth-child(2)").html(minute);
			if(second < 10) {
				$(".sktime>i:nth-child(3)").html("0" + second);
			} else {
				$(".sktime>i:nth-child(3)").html(second);
			}
		}

		refresh();
		setInterval(refresh, 1000);
	})();

	/*
	 * 倒计时下的商品
	 * */

	(function() {
		var i = 0;
		setInterval(function() {
			if(i == 3) {
				i = 0;
			}
			$(".sks>img").eq(i).css({
				"opacity": 1
			}).siblings().css({
				"opacity": 0
			});
			i++;
		}, 3000);
	})();

	/*
	 * 替换轮播图top
	 * */

	//轮播图接口

	$.ajax({
		type: "post",
		url: "http://localhost/zc/php/banner.php",
		dataType: "json",
		success: function(data) {
			var res = data.bannerimg;
			for(var i = 0; i < res.length; i++) {
				var img = $("<img/>");
				img.attr("src", res[i]);
				img.appendTo($("#swiper-container1 .swiper-slide").eq(i));

			};

			var ball = data.ballNum4;
			for(var j = 0; j < ball.length; j++) {

				var img = $("<img/>");
				img.attr("src", ball[j]);
				img.appendTo($(".ballNum4 a").eq(j));

			}

			var sks = data.sksImg;
			for(var m = 0; m < sks.length; m++) {

				var img = $("<img/>");
				img.attr("src", sks[m]);
				img.appendTo($(".sks"));
			}

		}

	});

	//附近商家数据交互
	
	getShopData();
	
	function getShopData(){
		
			$.ajax({

		type: "post",
		url: "http://localhost/zc/php/shop.php",
		dataType: "json",
		success: function(data) {

			for(var i = 0; i < data.length; i++) {

				var li = $("<li class='shopli'></li>");
				li.attr("data-shopid",data[i].shopId)
				li.appendTo($(".shoplist"));
				var br = $("<div class='br'></div>");
				br.appendTo(li);
				var bl = $("<img class='bl'/>");
				bl.attr("src", data[i].shopicon);
				bl.appendTo(br);
				var bm = $("<div class='bm'></div>");
				bm.appendTo(br);
				var h2 = $("<h2></h2>");
				h2.html(data[i].shopname);
				h2.appendTo(bm);
				var div = $("<div></div>");
				div.appendTo(bm);
				var p = $("<p class='bn'></p>");

				var starNum = data[i].start;
				for(var j = 0; j < starNum; j++) {

					var starI = $("<i></i>");
					starI.appendTo(p);
				}

				p.appendTo(div);

				var cb = $("<p class='cb'></P");
				var shopNum = data[i].shopnum;
				cb.html(shopNum + "件商品|月销售" + data[i].sell + "单");
				cb.appendTo(bm);
				var bs = $("<div class='bs'></div>");
				bs.appendTo(br);
				var span = $("<span class='d4'></span>");
				span.appendTo(bs);

			}

		},

		error: function(errordata) {
			log(errordata);
		}

	})
		
	}


	
	//附近商家代码优化
	
	
	//轮播图
//	  $.ajax({
//      type: "get",
//      url: "http://iwen.wiki/zhichenshop/banner.php",
//      dataType: "json",
//      success: function (data) {
//          bannerViewAdapter(data);
//      },
//      error: function (errordata) {
//          log(errordata);
//      }
//  });
	
	

	//  function bannerViewAdapter(data) {
	//      $("#swiper-container1 .swiper-slide>img").each(function (index, ele) {
	//          $(ele).attr("src", data.bannerimg[index]);
	//      });
	//
	//      $(".sks>img").each(function (index, ele) {
	//          $(ele).attr("src", data.qgimg[index]);
	//      });
	//  }

	/*
	 * shoplist
	 * */
	//	getShopData();

//		function getShopData() {
//			$.ajax({
//				type: "get",
//				url: "http://iwen.wiki/zhichenshop/shop.php",
//				dataType: "json",
//				success: function(data) {
//					shoplistViewAdapter(data, shopView);
//	
//				},
//				error: function(errordata) {
//					log(errordata);
//				}
//			});
//		}

	//	function shoplistViewAdapter(data, callback) {
	//		for(var i = 1; i < data.length; i++) {
	//			var cloneli = $(".shopli").eq(0).clone();
	//			$(".shoplist").append(cloneli);
	//			callback(data);
	//		}
	//	}

	//	function shopView(data) {
	//		$(".shopli").each(function(index, ele) {
	//			$(".bl").eq(index).attr('src', data[index % 5].shopicon);
	//			$(".bm>h2").eq(index).text(data[index % 5].shopname);
	//			$(".cb").eq(index).text(data[index % 5].shopnum + "件商品" + " | " + "月售" + data[index % 5].sell + "单");
	//		})
	//	}

		$(window).scroll(function() {
			var lastShop = $(".shopli:last").offset().top;
			var scrollHeight = $(window).scrollTop();
			var winHeight = $(window).height();
			if(lastShop < scrollHeight + winHeight) {
				getShopData();
				addIndex += 5;
			}
	
		})

    $(".shoplist").on("click",".shopli",function(){
        /*
        取出商品id
        * */

        var myshopid = $(this).attr("data-shopid");
        window.location.href = "shopdetails.html?shopid="+myshopid;

    });



});

