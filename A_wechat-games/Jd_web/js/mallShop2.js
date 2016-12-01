$(function() {
	getShopData0();

	function getShopData0() {
		$.ajax({
			type: "post",
			url: "http://localhost/A_wechat-games/Jd_web/php/shop.php",
			dataType: "json",
			success: function(data) {
				marketFun(data);
			},
			error: function(errordata) {
				log(errordata);
			}
		});
	}

	function marketFun(data) {
		for(var i = 0; i < data.length; i++) {
			var li = $("<li class='shopli'></li>");
			//给li标签设置data-shopid  获取商品id  -->data[i].shopId
			li.attr("data-shopid", data[i].shopId);
			li.appendTo($(".shoplist0"));

			var br = $("<div class='br'></div>");
			br.appendTo(li);

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

			var by = $("<div class='by'></div>");
			by.appendTo(li);

			var br1 = $("<div class='br1'></div>");
			br1.appendTo(li);

			var c4 = $("<div class='c4'></div>");
			c4.appendTo(br1);
			var c6 = $("<div class='c6'></div>");
			var c7 = $("<div class='c7'></div>");
			c6.appendTo(c4);
			c7.appendTo(c4);
			
			c7.html(data[i].actNum);
//			alert($(".c7").html());

			
			if($(".c7").html()=="8个活动"){
				var c7i = $("<i class='cb cc'></i>");
				c7i.appendTo(c7);
				
					
		
				var mi = 0;
				$(".c7").click(function() {
					if(mi%2 == 0){
						$(this).siblings(".c6").find("li").removeClass('hide').addClass('show') ;
						$(".c7 .cb").addClass("cd");
						mi = 1 ;
					}else{
						$(this).siblings(".c6").find("li").removeClass('show').addClass('hide') ;
						$(".c7 .cb").removeClass("cd");
						mi = 0 ;
					}
					
				
				});
			}
			
			
			
			
			var ce = $("<ul class='ce'></ul>");
			ce.appendTo(c6);
			var cx = data[i].cx;
			for(var x = 0; x < cx.length; x++) {
					var c8 = $("<li class='c8 hide'></li>");
					c8.appendTo(ce);
					var c9 = $("<i class='c9'></i>");
					c9.html(cx[x].text);
					c9.appendTo(c8);
					
					$(".c9").css("background",cx[x].bg);
//					if($(".c9").html() =="满减"){
//						$(".c9").addClass("iconType6");
//						$(".c9").css("background","#5FBC65");
//					}
//					if($(".c9").html() =="领券"){
//						$(".c9").css("background","#fa3e2d");
//					}
					
//				if(cx[x].index>2) {
					$(".c8").css("dispaly","none");
//				}
				
//				if(null != cx[x].text || cx[x].text.length > 0) {
//					c8.appendTo(ce);
//					var c9 = $("<i class='c9'></i>");
//					c9.html(cx[x].text);
//					c9.appendTo(c8);
//				}

				

//				if(null != cx[x].mjdesc || cx[x].mjdesc.length > 0) {
					c8.appendTo(ce);
					var ca = $("<span class='ca'></span>");
					ca.html(cx[x].mjdesc);
//				}

//				if(null != cx[x].mjdesc || cx[x].mjdesc.length > 0) {
//					c8.appendTo(ce);
//					var ca = $("<span class='ca'></span>");
//					ca.html(cx[x].mjdesc);
//				}
				ca.appendTo(c8);

				c8.appendTo(ce);

			}
					
			var bz = $("<div class='bz'></div>");
			bz.appendTo(br1);

			var imgList = data[i].imgList;
			for(var j = 0; j < imgList.length; j++) {
				var span = $("<span class='b4'></span>");
				var dr = $("<span class='dr'></span>");
				dr.appendTo(span);
				var img = $("<img/>");
				img.attr("src", imgList[j].link);
				img.appendTo(dr);
				var dq = $("<span class='dq'></span>");
				dq.html(imgList[j].text);
				dq.appendTo(dr);
				var c1 = $("<span class='c1'></span>");
				c1.html(imgList[j].sprice);
				c1.appendTo(span);
				span.appendTo(bz);
			}
		}
		
	}

	//滚动到最底部时每次增加六条新数据
	//	var addIndex = 0;
	//	$(window).scroll(function() {
	//			var lastShop = $(".shoplist .shopli:last").offset().top;
	//			var scrollHeight = $(window).scrollTop();
	//			var winHeight = $(window).height();
	//			if(lastShop < scrollHeight + winHeight) {
	//				getShopData();
	//				addIndex += 5;
	//			}
	//		})

	//跳转到当前点击的 商家
	$(".shoplist").on("click", ".shopli", function() {
		var myshopid = $(this).attr("data-shopid");
		window.location.href = "shopdetails.html?shopid=" + myshopid;

	});
	
})