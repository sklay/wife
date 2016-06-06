/*页面活动 的显示和影藏*/
var activity = {};

activity.showPage = function(nowPage, nextPage, css) {
	var $nowPage = nowPage ;
	var $nextPage = nextPage ;
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
			audio.play();
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
			audio.pause();
			$(".music_play").hide();
			$img.show();
		}
	});
	/**自动播放*/
//	$(".music_close").click();
	
};

activity.touchstart = function(){
	/**android版本的app的version判断 如果不是安卓 就让音乐播放  ,并且判断版本号是不是208,208之前的 音乐不让播放*/
	var a = navigator.userAgent.toLowerCase();
	
	if(!version || is_weixin()){
		activity.musicCtrl();
		/**自动播放*/
		$(".music_close").trigger('tap');
	}else{
		if(!(version < 208 && (/android/.test(a)))){
			activity.musicCtrl();
			touchFun = function(){
				console.debug("touchstart") ;
				/**自动播放*/
				$(".music_close").trigger('tap');
				/**释放绑定的touchstart 确保该事件值执行一次*/
				document.removeEventListener('touchstart',touchFun, false) ;
			};
			
			/**声明touchstart 事件当用户触屏时播放音乐*/
			document.addEventListener('touchstart',touchFun, false);  
		}
	}
	
/*	
	if (/android/.test(a)) {
		if(version >= 208){
			activity.musicCtrl();
			touchFun = function(){
				
				console.debug("touchstart") ;
				
				*//**自动播放*//*
				$(".music_close").click();
				*//**释放绑定的touchstart 确保该事件值执行一次*//*
				document.removeEventListener('touchstart',touchFun, false) ;
			};
			
			*//**声明touchstart 事件当用户触屏时播放音乐*//*
			document.addEventListener('touchstart',touchFun, false);  
		}
		if(!version){
			*//**自动播放*//*
			$(".music_close").click();
		}
	}else{
		activity.musicCtrl();
		*//**自动播放*//*
		$(".music_close").click();
	}*/
	
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
		alert(1);
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
	}) ;
} ;

activity.init = function() {
	/**取消默认滑动事件*/
	document.addEventListener("touchmove", function(b) {
		b.preventDefault();
	}, false);
	/**上下滑动*/
	activity.swipe();
	/** 利用touchstart事件触发音乐自动播放*/
	activity.touchstart() ;
};
