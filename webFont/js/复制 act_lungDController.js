$(function(){
	/*点击START进入游戏倒计时*/	
	$("#startGameBtn").on("tap",function(){
		$(".Pagecontroller").hide();
		$(".gameConPage").show();
		/*$(".timeCountDown_wrap").show().css({transform:"scale(1)",webkitTransform:"scale(1)",opacity:"1"});*/
		$(".timeCountDown_wrap").show();
		$("#TimeCountDown").html("3");
		var countDownTime=3;
		playGCDTime=setInterval(function(){
			countDownTime--;
			if(countDownTime<=0){
				$("#TimeCountDown").html("Go");
				clearInterval(playGCDTime);
				setTimeout(function(){
					$(".timeCountDown_wrap").animate({scale:"2",opacity:"0"},200,function(){
						$(".timeCountDown_wrap").hide();
						$(".timeCountDown_wrap").animate({scale:"1",opacity:"1"})
						scoreTime();
					});
				},200)
				return false;
			}
			$("#TimeCountDown").html(countDownTime);
		},1000)
	});
	var playGCDTime=null;
	var scoreNum=0;
	/*点击自增分数事件*/
	function scoreNumPlus(){
		scoreNum+=100;
		$("#scoreCount").html(scoreNum);
		btnAnim();
	};
	/*点击按钮动画*/
	function btnAnim(){
		$("#playGameBtn_move1").animate({translateY:".15rem"},10,function(){
			$("#playGameBtn_move1").animate({translateY:"0rem"},10);
		})
	}
	/*结果展示*/
	function showResultFun(){
		$(".scoreResultShow").hide();
		if(scoreNum<2999){
			$("#scoreResult_low").show();
		}
		else if(scoreNum>2999 && scoreNum<5999){
			$("#scoreResult_md").show();
		}
		else if(scoreNum>5999 && scoreNum<7999){
			$("#scoreResult_high").show();
		}
		else if(scoreNum>7999){
			$("#scoreResult_best").show();
		}
	};
	/*初始化函数*/
	function initialize(){
		$(".commonPage_wrapStyle").hide();
		$("#startPage").show();
		scoreNum=0;
		$("#scoreCount").html("0");
		$("#playGameBtn").on("tap",scoreNumPlus);
//		$(".timeCountDown_wrap").show().css({transform:"scale(1)",webkitTransform:"scale(1)",opacity:"1"});
	};
	/*移除点击事件*/
	function scoreTime(){
		setTimeout(function(){
			$("#playGameBtn").off("tap",scoreNumPlus);
			showResultFun();
		},10000)
	};
	/*游戏点击主函数*/
	$("#playGameBtn").on("tap",scoreNumPlus);
	
	/*点击弹窗关闭按钮，返回首页*/
	$(".closeAndBack").on("click",function(){
		initialize();
	});
	/*不服再战*/
	$(".playAgain").on("click",function(){
		initialize();
	});
	/*领取奖励*/
	$(".getHbNow").on("click",function(){
		initialize();
	});
})
