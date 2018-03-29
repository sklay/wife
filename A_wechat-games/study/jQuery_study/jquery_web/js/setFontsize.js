$(function() {

	var screen = window.screen.width;

	if(screen > 1440) {

		$("body").css("font-size","16px");
		$("pre.demo").css("font-size","16px");
		$(".container .content .maincontent .brednavigation").css("font-size","14px");

		$(".navbar-inverse .navbar-nav>li>a").css("font-size","18px");
//		$(".container .content .maincontent .skip ul li a").css("font-size","18px");

		$(".container .content .left ul li ul li a").css("font-size","14px");

		$(".container .content .left h2").css("font-size","16px");
	}

});