/*页面活动 的显示和影藏*/
var activity = {};

activity.showPage = function(nextpage) {
	var outClass = 'pt-page-moveToTop';
	var inClass = 'pt-page-moveFromBottom';
	$nowPage = $('.page-current');

	$nextPage = $(nextpage);

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
	//	$(".music_close").trigger("tap") ;
};

$(function() {


	//	activity.showPage(".con_wrap_index", ".game_show");
	//	$('.common_wrap').hide() ;
	//	$('.game_show_moduel_seven').show() ;

	/*$(document).on('swipeUp', function() {
		$nowPage = $('.page-current');
		console.debug("$nowPage length " , $nowPage.length) ;
		var nextPage = ".game_show_moduel_one" ;
		if($nowPage.length > 0){
			nextPage = $nowPage.attr('data-next');;
		}
		
		activity.showPage(nextPage);
		console.debug("swipeUp  nextPage page is " ,nextPage) ;
		if('.game_show_moduel_one' == nextPage){
			console.debug("显示游戏页面的第一页的时候 game_show 地显示 ") ;
			$('.game_show').show() ;
		}
	});
*/
	/*	$('.game_show .slide_up').on('click', function() {
			var curPage = $(this).attr('data-cur');
			var nextPage = $(this).attr('data-next');
			activity.showPage(curPage, nextPage);
		});*/


	/*$(document).on('swipeDown', function() {
			$nowPage = $('.page-current');
			var beforePage = $nowPage.attr('data-before');
			console.debug("swipeDown  " ,beforePage) ;
			if (beforePage){
				activity.showPage(beforePage);
				// 下划如果包含 con_wrap_index 则是首页跳转到 game 否则是在game也内切换
				if($nowPage.hasClass('game_show_moduel_one')){
					$('.con_wrap_index').show() ;
					$('.game_show').hide() ;
				};
			}
		})*/
		/*$('.common_wrap').on("swipeDown", function(e) {
			var curPage = $(this).attr('data-cur');
			var nextPage = $(this).attr('data-next');
			if (curPage && nextPage) {
				activity.showPage(curPage, nextPage);
			}
		})*/

	/**音乐控制*/
//	activity.musicCtrl();


});