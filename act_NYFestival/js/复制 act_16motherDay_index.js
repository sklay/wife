
/*
 * 
 * 				加载 完后  所有的初始值都影藏
 * 
 * 
 * 
				$('.content .common_wrap').find("div").addClass("hide");
				$('.content .common_wrap').find("img").addClass("hide");
				$(".index_content").find("div").removeClass('hide').addClass("show");
				$(".index_content").find("img").removeClass('hide').addClass("show");
				$('.index_content').addClass('page-current');
*/

/**
 * 实现  上下滑翻页
 * 
 * 
 */

/*定义全局的 变量*/
var  activity = {};

/*定义函数执行的 效果
 
 三个参数：nowPage: 当前页     ，nextPage: 下一页       css: 上一页  ，还是下一页
 * */
activity.showPage = function(nowPage,nextPage,css){
	
		$nowPage = nowPage;
		$nextPage = nextPage;
		
		/**
		 * 当下一页不存在时，之后函数不执行
		 * */
		if(!nextPage.length){
			return;
		}
		
		/*定义css  的具体样式*/
		var outClass = css.outClass;   //上一页
		var inClass = css.inClass;	//下一页
		 
		 /*给当前页和下一页  分别加上对应的样式*/
		$nowPage.addClass(outClass);
		$nextPage.addClass(inClass);
		
		/*给当前页 所有的  div 和  图片  都 隐藏       让动画一进页面才显示图片
		 
		 * 让下一页  图片  显示
		 * */
		setTimeout(function(){
			/*当前页 初始化样式 */
			$nowPage.removeClass('page-current');
			$nowPage.removeClass(outClass);
			$nowPage.addClass('hide');
			$nowPage.find('div').removeClass('show').addClass('hide');
			$nowPage.find('dimg').removeClass('show').addClass('hide');
			
			/*下一页初始化样式*/
			$nextPage.addClass('page-current');
			$nextPage.addClass('inClass');
			$nextPage.addClass('show');
			$nextPage().find('div').removeClass('hide').addClass('show');
			$nextPage().find('img').removeClass('hide').addClass('show');
		},600);
}


/*定义函数执行的  具体 动画
 swipe函数            jQuery  mobile   
 * 
 * */
activity.swipe = function(){
	
	/*向下滑动  显示上一页*/
	$(document).on('swipeDown',function(){
		$nowPage = $('.page-current');
		
		// prev() 获得 匹配元素集合中   每个 紧邻的 前一个  同辈元素，由选择器筛选（可选）。
		$nextPage = $nowPage.prev('.common_wrap');
		
		/*声明一个   css  对象  ，存储  向上样式 和向下样式*/
		
		 var css = {
		 	outClass: 'pt-page-moveToBottom',//上一页
			inClass: 'pt-page-moveFromTop'//下一页
		 };
		 
		 activity.showPage($nowPage,$nextPage,css);
		 
		 /*显示滑动箭头*/
		 $('.slide-up').show();
		 
	});
	
	/*向上滑动   显示下一页*/
	
	$(document).on('swipeUp',function(){
		$nowPage = $('.page-current');
		
		// next()
		$nextPage = $nowPage.next('.common_wrap');
		
		var css = {
			outClass : 'pt-page-moveToBottom',  // 向下   显示上一页
			inClass : 'pt-page-moveFromTop'  //  向上  显示下一也
		};
		
		activity.showPage($nowPage,$nextPage,css);
		
		//	nextAll() 获得匹配元素集合中每个元素的所有跟随的同胞元素，由选择器筛选是可选的。
		//如果给定一个表示 DOM 元素集合的 jQuery 对象，.nextAll() 方法允许我们搜索 DOM 树中的元素跟随的同胞元素，并用匹配元素构造新的 jQuery 对象。
		//该方法接受可选的选择器表达式，类型与我传递到 $() 函数中的相同。如果应用选择器，则将通过检测元素是否匹配来对它们进行筛选。
		
		/*如果是  最后一页  就隐藏 滑动的  图标*/
		$nextAll = $nextPage.$nextAll();
		
		if($nextAll.length <= 1){
			$('.slide-up').hide();
		}else{
			$('.slide-up').show();
		}
	});
};

/*初始化  函数*/
activity.init = function(){
	/**取消默认滑动事件*/
	document.addEventListener('touchmove',function(b){
		b.preventDefault();
	},false);
	activity.swipe();
}
