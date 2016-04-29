/*页面活动 的显示和影藏*/
var activity = {};

activity.showPage = function($nowPage, $nextPage, css) {

	if (!$nextPage.length) {
		return;
	}
	var outClass = css.outClass;
	var inClass = css.inClass;
	$nowPage.addClass(outClass);
	$nextPage.addClass(inClass);

	setTimeout(function() {
		$nowPage.removeClass('page-current');
		$nowPage.removeClass(outClass);
		$nowPage.addClass("hide");
		$nowPage.find("img").removeClass("show").addClass("hide");
		$nowPage.find("div").removeClass("show").addClass("hide");

		$nextPage.addClass('page-current');
		$nextPage.removeClass(inClass);
		$nextPage.removeClass("hide");
		$nextPage.find("img").removeClass("hide").addClass("show");
		$nextPage.find("div").removeClass("hide").addClass("show");
	}, 600);

};

activity.musicCtrl = function() {
	var audio = document.getElementById('audioCon');

	$(".music_play").on('tap', function() {
		$img = $(this);
		if (!audio.paused) {
			audio.pause();
			$img.hide();
			$(".music_close").show();
		} else {
			$(".music_close").hide();
			$img.show();
		}
	});

	$(".music_close").on('tap', function() {
		$img = $(this);
		if (audio.paused) {
			audio.play();
			$img.hide();
			$(".music_play").show();
		} else {
			$(".music_play").hide();
			$img.show();
		}
	});
	/**自动播放*/
	$(".music_close").trigger("tap");
};
activity.swipe = function() {
	$(document).on('swipeDown', function() {
		$nowPage = $('.page-current');
		$nextPage = $nowPage.prev('.common_wrap');
		console.debug("swipeDown ", $nextPage.length);
		var css = {
			outClass: 'pt-page-moveToBottom',
			inClass: 'pt-page-moveFromTop'
		};
		activity.showPage($nowPage, $nextPage, css);
		$('.slide_up').show();
	});


	$(document).on('swipeUp', function() {
		$nowPage = $('.page-current');
		$nextPage = $nowPage.next('.common_wrap');
		console.debug("swipeUp ", $nextPage.length);
		var css = {
			inClass: 'pt-page-moveFromBottom',
			outClass: 'pt-page-moveToTop'
		};
		activity.showPage($nowPage, $nextPage, css);
		/**判断是不是最后一页 是最后一页隐藏箭头*/
		var $nextAll = $nextPage.nextAll();

		if ($nextAll.length <= 1) {
			$('.slide_up').hide();
		} else {
			$('.slide_up').show();
		}

		console.debug(" nextAll ", $nextAll.length);
	})
}

$(function() {
	/**取消默认滑动事件*/
	document.addEventListener('touchmove', function(event) {
		event.preventDefault();
	}, false);

	/*如果不是安卓 就让音乐播放  ,并且判断版本号是不是206,206之前的 音乐不让播放*/
	var ua = navigator.userAgent.toLowerCase();	
		if(/android/.test(ua) && version < 206){
			return;
		}else{
			/**音乐控制*/
			activity.musicCtrl();
		}

	/**上下滑动*/
	activity.swipe() ;
});