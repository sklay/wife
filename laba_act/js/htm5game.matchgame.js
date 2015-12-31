/**
 * Created by zhouhaixia on 2015/10/29.
 */

var timestop = false ;
var countdown=0; 
var neusoft={};

neusoft.matchingGame={};
neusoft.matchingGame.cardWidth=1.4;//牌宽
neusoft.matchingGame.cardHeight=2;
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

//var indexSub		= 0 ;
//var img = '<img class="image" src="{imgName}" />' ;
//	var maxImgList= ["cardA.png","cardB.png","cardC.png","cardD.png","cardE.png","cardF.png","cardG.png","cardH.png",] ;
//	var imgName	= "" ;
function checkPattern(cards)
{
    var pattern1 = $(cards[0]).data("pattern");
    var pattern2 = $(cards[1]).data("pattern");
	
	console.debug('checkPattren before ' ,pattern1 , pattern2 ) ;
    $(cards).removeClass("card-flipped");
    
    if(pattern1==pattern2)
    {
	    $(cards).addClass("card-correct") ;
	    $lightImg = $('img.light-'+pattern1) ;
	    
	    var src = $lightImg.attr('src') ;
	    var dataSrc = $lightImg.attr('data-src') ;
	    
	    $lightImg.attr('src' ,dataSrc) ;
	    $lightImg.attr('data-src',src) ;
	 	$lightImg.addClass("card-active") ;
	 	
	 	var card_correct_count = $('div.playGame_imgBack>img.card-active').length ;
	 	var all_card_count = $('div.playGame_imgBack>img').length 
	 	if(all_card_count == card_correct_count){
	 		timestop = true ;
	 	}
	    
	 //   $(".card-active").attr('src','images/act_laba_positiveFace_01.png');
    	console.debug('checkPattren ' ,pattern1 , pattern2 ) ;
//        $(cards).addClass("card-removed")
//          .bind("webkitTransitionEnd",function(){
//              $(this).remove();
//  		});
    }
}


	
	function playGame(){
		//实现随机洗牌
		neusoft.matchingGame.deck.sort(shuffle);
		//alert(neusoft.matchingGame.deck);
		var $card=$(".card");
		for(var i= 0;i<15;i++)
		{
			$card.clone().appendTo($("#cards"));
		}
		//对每张牌进行设置
		$(".card").each(function(index)
		{
			//调整坐标
//			$(this).css({
//				"left":(neusoft.matchingGame.cardWidth*(index%4))+ (0.15*(index%4 + 1)) +"rem",
//				"top": (neusoft.matchingGame.cardHeight+0.2)*Math.floor(index/4)+"rem"
//			});
			//吐出一个牌号
			var pattern=neusoft.matchingGame.deck.pop();
			
			console.debug('pattern is  ' ,pattern) ;
			
			//暂存牌号
			$(this).data("pattern",pattern);
			//把其翻牌后的对应牌面附加上去
			$(this).find(".back").addClass(pattern);
		//	$(this).find(".front").addClass(pattern);
			//点击牌的功能函数挂接
			$(this).tap(selectCard);
		});
		
		
		settime('#gameTimeShow') ;
	};
	
	
	

	function settime(obj) { 
	    if (timestop) { 
	      //  countdown = 0; 
		//	$(obj).text("0"); 
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
	
//	function statisticsResult(timeused){
//		var card_correct_count = $('div.playGame_imgBack>img.card-active').length ;
//			alert('耗时'+timeused+'s, 您猜对了' + card_correct_count +" 个") ;
//			$('div.card').unbind("tap"); 
//	}