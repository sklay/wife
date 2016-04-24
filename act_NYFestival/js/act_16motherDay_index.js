/*页面活动 的显示和影藏*/
var activity = {};

activity.showPage = function(curpage, nextpage) {
	$(curpage).hide();
	$(nextpage).show();
};
$(function() {
	activity.showPage('.controllerPage', '.con_wrap_index');

//	activity.showPage(".con_wrap_index", ".game_show");
//	$('.common_wrap').hide() ;
//	$('.game_show_moduel_seven').show() ;

	$('.con_wrap_index .slide_up').on('click', function() {
		activity.showPage(".con_wrap_index", ".game_show");
		$('.game_show_moduel_one').show() ;
	});

	$('.game_show .slide_up').on('click', function() {
		var curPage = $(this).attr('data-cur');
		var nextPage = $(this).attr('data-next');
		activity.showPage(curPage, nextPage);
	});
	

});

