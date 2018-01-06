window.onload = function() {
	var leftele = $(".container>.content>.left")[0];
	var leftHeight = offSet(leftele).top - 40;
	var scrollHeight;
	var documentWidth = $(document).width();

	window.onscroll = function() {

		scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;

		setFixed(leftHeight, scrollHeight,documentWidth);

	}

	$(window).off().one().resize(function() {

		setFixed(leftHeight, scrollHeight,documentWidth);

	});

}

function offSet(ele) {
	var l = ele.offsetLeft;
	var t = ele.offsetTop;
	var div = ele.offsetParent;
	l += div.offsetLeft;
	t += div.offsetTop;
	return {
		left : l,
		top : t
	}
}

function setFixed(leftHeight, scrollHeight,documentWidth) {
	var leftStatus = true;
	$(".container>.content>.left").removeClass("leftNav");
	$(".container>.content>.left").removeClass("middleLeft");

	if (leftHeight < scrollHeight) {

		if (leftStatus == true && documentWidth > 1200) {
			$(".container>.content>.left").addClass("leftNav");
			$(".maincontent").addClass("fright");
			$(".content").addClass("clearfix");

		} else if (leftStatus == true && documentWidth > 992) {
			$(".container>.content>.left").addClass("middleLeft");
			$(".maincontent").addClass("fright");
			$(".content").addClass("clearfix");

		}

	} else {
		$(".container>.content>.left").removeClass("leftNav");
		$(".container>.content>.left").removeClass("middleLeft");
		$(".maincontent").removeClass("fright");
		$(".content").removeClass("clearfix");
	}

}