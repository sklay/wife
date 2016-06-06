/*页面 的动画*/

$(function() {
//	 playFlower();
		 	 function playFlower(){
		 	 	$(".wrap_index_title_wrap").addClass("firAni");
		 	 	setTimeout(function(){
					 $(".firAni .flowerTit").animate({"-webkit-transform":"scale(1)","transform":"scale(1)"},1000)
				 	 	},1500);
		 	 	}

});