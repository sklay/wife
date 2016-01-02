//是否停止计时
var timestop = false ;
//计时器 完成游戏所消耗的时间
var countdown=0; 
var cardDom = '<div class="card"><div class="face front"></div><div class="face back"></div></div>' ;
var neusoft={};

neusoft.matchingGame={};
//neusoft.matchingGame.cardWidth=1.4;//牌宽
//neusoft.matchingGame.cardHeight=2;
//组织页面的纸牌数据
neusoft.matchingGame.deck=
    [
        "card1","card1",
        "card2","card2",
        "card3","card3",
        "card4","card4",
        "card5","card5",
        "card6","card6",
		"card7","card7",
		"card8","card8"
    ]
	
/**获取翻牌游戏结果*/
function gameFinished(timeused){
	var card_correct_count = $('div.playGame_imgBack>img.card-active').length ;
	$('#timeused').text(timeused) ;
//	$('#game_result').text('恭喜你获得了【'+card_correct_count+'】个小豆豆') ;
	
	$('div.card').unbind("tap"); 
	$(".start_game").hide();
	$('.scoreResultShow').show() ;
	
}

//随机排序函数，返回-1或1
function shuffle()
{
    //Math.random能返回0~1之间的数
    return Math.random()>0.5 ? -1 : 1
}
//  翻牌功能的实现
function selectCard() {
    var $fcard=$(".card-flipped");
    //翻了两张牌后退出翻牌
    if($fcard.length>1)
    {
        return;
    }
    
    //alert($(this).data("pattern"));
    $(this).addClass("card-flipped");
//    若翻动了两张牌，检测一致性
    var $fcards=$(".card-flipped");
    if($fcards.length==2)
    {
       // checkPattern($fcards);
        setTimeout(function(){
        checkPattern($fcards);},700);
    }
}
//检测2张牌是否一致
function checkPattern(cards)
{
    var pattern1 = $(cards[0]).data("pattern");
    var pattern2 = $(cards[1]).data("pattern");
	
    $(cards).removeClass("card-flipped");
    
    if(pattern1==pattern2)
    {
	    $(cards).addClass("card-correct") ;
	    $lightImg = $('img.light-'+pattern1) ;
	    
	    var src = $lightImg.attr('src') ;
	    var dataSrc = src.replace('.','_'+pattern1+'.') ;
	    
	    $lightImg.attr('src' ,dataSrc) ;
	    $lightImg.attr('data-src',src) ;
	 	$lightImg.addClass("card-active") ;
	 	
	 	var card_correct_count = $('div.playGame_imgBack>img.card-active').length ;
	 	var all_card_count = $('div.playGame_imgBack>img').length 
	 	if(all_card_count == card_correct_count){
	 		timestop = true ;
	 	}
	    
//        $(cards).addClass("card-removed")
//          .bind("webkitTransitionEnd",function(){
//              $(this).remove();
//  		});
    }
}


//游戏初始化
function playGame(){
	//清空子节点
	$("#cards").children().remove();
	//实现随机洗牌
	var arrayDeck = neusoft.matchingGame.deck.slice() ;
	arrayDeck = arrayDeck.sort(shuffle);
	//alert(neusoft.matchingGame.deck);
//	var $card=$(".card");
//	playDom = $card ;
	for(var i= 0;i<16;i++)
	{
//		$card.clone().appendTo($("#cards"));
		$(cardDom).appendTo($("#cards"));
	}
	//对每张牌进行设置
	$(".card").each(function(index)
	{
		//吐出一个牌号
		var pattern= arrayDeck.pop();
		//暂存牌号
		$(this).data("pattern",pattern);
		//把其翻牌后的对应牌面附加上去
		$(this).find(".back").addClass(pattern);
		//点击牌的功能函数挂接
		$(this).tap(selectCard);
	});
	//计时器
	settime('#gameTimeShow') ;
};
//计时器方法
function settime(obj) { 
    if (timestop) { 
		// 统计结果		
		gameFinished((countdown-1)) ;
        return;
    } else { 
	var text = countdown ;
	if(countdown < 10)
		text= '0'+text ;
        $(obj).text(text); 
        countdown++; 
    } 
	setTimeout(function() { 
	    settime(obj) }
	    ,1000) 
}
	
/**始游戏初 */
function initGame(){
	timestop = false ;
	//计时器 完成游戏所消耗的时间
	countdown=0; 
	
	$('div.playGame_imgBack>img').each(function(){
		$img = $(this);
		$img.removeClass('card-active') ;
		if($img.attr('data-src')){
			$img.attr('src' , $img.attr('data-src')) ;
		}
	});
	
	//初始化游戏界面
	playGame();
	
}
	
	
	
//翻牌游戏页面初始化
$(function(){
	
	/*点击START进入游戏倒计时*/	
	$("#startGameBtn").on("tap",function(){
		$(".Pagecontroller").hide();
		$("#start_game").show();
		
		/**始游戏初 */
		initGame() ;
	});
	
	//成绩页面关闭按钮
	$(".closeShade").on("tap",function(){
		$(".Pagecontroller").hide();
		$('.scoreResultShow').hide() ;
		$(".startPage").show();
	}) ;
	
	//领取奖品
	$('#receivePrize').on('tap',function(){
		$(".Pagecontroller").hide();
		$('.scoreResultShow').hide() ;
		$("#getHBPage").show();
	}) ;
});


	