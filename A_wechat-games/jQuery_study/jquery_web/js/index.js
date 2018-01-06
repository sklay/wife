$(function() {

	var lis = $(".skip").find("ul li");

	$(lis).click(function() {

		var skipElement = $(this).find("a").attr("data-value");

		var skipLoaction = $("." + skipElement).position().top + $("." + skipElement).offsetParent().offset().top;

		getLocation(skipLoaction - 50)
	});

	//左边导航栏

	var hs = $(".container>.content>.left>ul>li>h2");
	$(hs).click(function() {

		var currentUl = $(this).siblings("ul");
		var currentlis = currentUl.find("li");
		if(currentUl.attr("class").indexOf("in")>-1) {

			for(var i = 0; i < currentlis.length; i++) {

				if($(currentlis).eq(i).attr("class") == "currentLink") {

					$(this).attr("class", "currentCategory");
				};

			};

		}else{
			
			$(this).removeClass("currentCategory");
		}

	});
	
	
	

});

function getLocation(skipLoaction) {

	$("body,html").animate({
		scrollTop: skipLoaction
	}, 500);

}



