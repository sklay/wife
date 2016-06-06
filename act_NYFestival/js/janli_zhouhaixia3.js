/*页面活动 的显示和影藏*/
var activity = {};


/*上滑 下滑  显示  页面  currPage  表示当前页     nextPage 表示  下一个（上一个） 要显示的页面  */
activity.showPage = function(currPage,nextPage,css){
	var $currPage = currPage ;
	var $nextPage = nextPage ;
		/*判断上一个兄弟节点是不是存在*/
		if(!nextPage || nextPage.length == 0){
			console.log('不存在 上一页');
			return ;
		}
		var outClass = css.outClass;
		var inClass = css.inClass;
		$nowPage.addClass(outClass);
		$nextPage.addClass(inClass);
		/** 存在上一个兄弟节点*/
		/*影藏当前的    div   显示 上一个*/
		currPage.hide();
		currPage.find('div').addClass('hide');
		nextPage.show();
		currPage.removeClass('page-current');
		nextPage.addClass('page-current').find('div').addClass('show');
}

activity.swipe = function() {
	
	$(document).on('swipeDown', function() {
		console.log('下滑');
		/*获取当前显示的 div*/
		$nowPage = $('.page-current');
		/*获取 上一个  兄弟div*/
		$prevPage = $nowPage.prev();
		
		var css = {
			outClass: 'pt-page-moveToBottom',
			inClass: 'pt-page-moveFromTop'
		};
		/*方法调用*/
		activity.showPage($nowPage , $prevPage,css) ;
		

	});

	$(document).on('swipeUp', function() {
		console.log('上滑');
		/*获取当前显示的 div*/
		$nowPage = $('.page-current');
		/*获取 下一个  兄弟div*/
		$nextPage = $nowPage.next();
		
		var css = {
			outClass: 'pt-page-moveToBottom',
			inClass: 'pt-page-moveFromTop'
		};
		/*方法调用*/
		activity.showPage($nowPage , $nextPage ,css) ;
		
		
	}) ;
} ;

activity.init = function() {
	/**取消默认滑动事件*/
	document.addEventListener("touchmove", function(b) {
		b.preventDefault();
	}, false);
	/**上下滑动*/
	activity.swipe();
};

