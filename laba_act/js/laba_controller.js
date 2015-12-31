
$(function(){
	
	/*点击START进入游戏倒计时*/	
	$("#startGameBtn").on("tap",function(){
//		haveScore=true;
		$(".Pagecontroller").hide();
		$(".start_game").show();
		/*$(".timeCountDown_wrap").show().css({transform:"scale(1)",webkitTransform:"scale(1)",opacity:"1"});*/
//		$(".timeCountDown_wrap").show();
//		$("#TimeCountDown").html("3");
//		var countDownTime=3;
//		playGCDTime=setInterval(function(){
//			countDownTime--;
//			if(countDownTime<=0){
//				$("#TimeCountDown").html("Go");
//				clearInterval(playGCDTime);
//				setTimeout(function(){
//					$(".timeCountDown_wrap").animate({scale:"2",opacity:"0"},200,function(){
//						$(".timeCountDown_wrap").hide();
//						$(".timeCountDown_wrap").animate({scale:"1",opacity:"1"});
//						scoreTime();
//					});
//				},200)
//				return false;
//			}
//			$("#TimeCountDown").html(countDownTime);
//		},1000);
//		getMenuShare();
	});
	
	/*翻牌动画*/
	$(function(){
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
			$(this).click(selectCard);
		});
		
		
		settime('#gameTimeShow') ;
	});
	
	
	var countdown=60; 
	function settime(obj) { 
	    if (countdown == 0) { 
	        countdown = 60; 
			$(obj).text("0"); 
			// 统计结果			
			statisticsResult() ;
	        return;
	    } else { 
		var text = countdown ;
		if(countdown < 10)
			text= '0'+text ;
	        $(obj).text(text); 
	        countdown--; 
	    } 
		setTimeout(function() { 
		    settime(obj) }
		    ,1000) 
	}
	
	function statisticsResult(){
		var card_correct_count = $('div.playGame_imgBack>img.card-active').length ;
			alert('时间到了 , 您猜对了' + card_correct_count +" 个") ;
			$('div.card').unbind("click"); 
	}
})