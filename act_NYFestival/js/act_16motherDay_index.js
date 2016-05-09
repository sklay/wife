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
	
	/*如果没有版本号  或者是在微信打开    音乐制动播放*/
	if(!version || is_weixin()){
		activity.musicCtrl();
		/**自动播放*/
		$(".music_close").trigger('tap');
	}else{
		
		//  否则不是在微信打开 且有 版本号  
		// 判断版本号 >= 208 并且不是安卓 
		//   音乐自动播放   
		if(!(version < 208 && (/android/.test(a)))){
			activity.musicCtrl();
			
			// app 进来 音乐不能自动播放  ，(可能是app内部 做了限制，不让  加载音乐，防止浪费流量)
			//  用户在 首页任意位置  触碰都会 触发音乐播放
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
	
};

activity.swipe = function() {
	//   向下滑动
	$(document).on('swipeDown', function() {
		$nowPage = $('.page-current');
		
		// prev()获得匹配元素集合中每个元素紧邻的前一个同辈元素，由选择器筛选（可选）。
		$nextPage = $nowPage.prev('.common_wrap');
		console.debug("swipeDown ", $nextPage.length);
		/*==================定义css代表的 滑动方向==============================*/
		var css = {
			outClass: 'pt-page-moveToBottom',//上一页
			inClass: 'pt-page-moveFromTop'//下一页
		};
		activity.showPage($nowPage, $nextPage, css);
		$('.slide_up').show();
	});

	//  向上滑动
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
