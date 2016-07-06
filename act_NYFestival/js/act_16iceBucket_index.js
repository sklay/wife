$(function() {
	/*开始*/
	$("#startGame").on("tap", function() {
		$(".startGameBtnWrap").hide();
		gameStart();
	});

	var gameScore = 0; //分数统计
	var gameContinue = true; //是否点击
	var num = 0; //指定当前窗口下标
//	var childChoNum = 0; //指定当前出现分数
	var windowAniDownTime = null;
	var musicConSrc = document.getElementById("scorePlus");
	console.debug("musicConSrc",musicConSrc);
//	var scoreOnceBoo = true;
	var sound_add = document.getElementById("sound_add");
	//  var sound_cut=document.getElementById("sound_cut");
	sound_add.volume = 0.5;
	//  sound_cut.volume=1;

	/*游戏主函数*/
	function gameStart() {
		
		gameScore = 0; //分数统计
		gameContinue = true; //是否点击
	 	num = 0; //指定当前窗口下标
//	 	childChoNum = 0; //指定当前出现分数
	 	windowAniDownTime = null;
//		scoreOnceBoo = true;
		
		timeCountDownFun();
		
	//	setTimeout(function() {
			windowAniUpFun();
			console.debug("game start") ;
	//	}, 500)
		
	};
	
	//窗口随机函数
    function countWinNumFun(){
   	 var numRan=Math.floor(Math.random()*12000);
   	 var numScope=[1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000]
   	 var numSort=[0,4,3,5,1,2,5,2,4,3,1,0]
   	 for(var i=0,j=numScope.length;i<j;i++){
    	 if(numRan<=numScope[i]){
    		 num=numSort[i];
    		 break;
    	 }
     }  
   };
	
	/*人物弹起*/
	function windowAniUpFun() {
		/*调用 洞口 随机数*/
		countWinNumFun();
		
		if(!gameContinue){
			return  ;
		}
//		num = Math.floor(Math.random() * 6);
		console.debug("num",num);

		var childImg = '<img src="images/0715_images/act_16coolIceBucket_game_hotPeople.png" id="gamePlayChilren" alt="">';

		$(".gameWin").eq(num).find(".gameWinMainWrap").append(childImg);

		$("#gamePlayChilren").one("touchstart", function(e) {
			if(!gameContinue){
				return  ;
			}
			$("#gamePlayChilren").remove();
			/*调用  冰桶击中 分数统计方法*/
			scoreCountFun(num);
//			musicConSrc=sound_add;
			sound_add.currentTime = 0;
			sound_add.play();
			e.preventDefault();
		});

		var wh = $(window).height();
		if (wh <= 480) {
			scaleNum = .6;
		} else {
			scaleNum = .8;
		}
		$("#gamePlayChilren").animate({
			"transform": "scale(" + scaleNum + ")",
			"-webkit-transform": "scale(" + scaleNum + ")"
		}, 500, function() {
			
			$("#gamePlayChilren").animate({
				"transform": "scale(0)",
				'opacity':0,
				"-webkit-transform": "scale(0)"
			}, 500, function() {
				setTimeout(function() {
					$("#gamePlayChilren").remove();
					$("#gamePlayChilren").unbind('touchstart') ;
					if(gameContinue){
						windowAniUpFun();
					}
				}, 200);
			});
		});
	};
	/*冰桶 浇中 ，分数计算函数
	 * 这个方法处理   以下事件
	 * 1、点击出现的人物
	 * 2、点击人物  ，人物被击中
	 * 		（1）右上角出现冰桶，冰桶换成倒水状态，原来冰桶消失
	 * 		（2）人物 被换成 另一个人物  ，原来人物消失
	 * 		（3）出现+1 分
	 * 
	 * */
	function scoreCountFun(wrapNum) {
		var ScoreShow = '<img src="images/0715_images/act_16coolIceBucket_game_score.png" id="scoreShowImg" alt="">';
		var nohotchild = '<img src="images/0715_images/act_16coolIceBucket_game_nohotPeople.png" id="nohotChilren" alt="">';
		var bucketImg_water = '<img src="images/0715_images/act_16coolIceBucket_game_IceWater.png" id="gamebucket_water" alt="">';
		var bucketImg = '<img src="images/0715_images/act_16coolIceBucket_game_IceBucket.png" id="gamebucket" alt="">';
//
		
		$(".gameWin").eq(wrapNum).find(".gameWinMainWrap").append(bucketImg);
		setTimeout(function() {
			
			/*先追加桶，改变人物状态*/
			$("#gamebucket").remove();
			/*重新换一个桶*/
			$(".gameWin").eq(wrapNum).find(".gameWinMainWrap").append(bucketImg_water);
			$(".gameWin").eq(wrapNum).find(".gameWinMainWrap").append(ScoreShow);
			/*重新换一个人物*/
			$(".gameWin").eq(wrapNum).find(".gameWinMainWrap").append(nohotchild);

			setTimeout(function() {
				$("#scoreShowImg").remove();
				$("#nohotChilren").remove();
				$("#gamebucket_water").remove();
			}, 300)
		}, 500)

		gameScore += 1;

		$("#gameScore").html(gameScore)
	};

	/*倒计时函数*/
	function timeCountDownFun() {
		var timeCountDown = 30;
		var countDownTime = null;
		var widthWrap = document.getElementById("gameCountDownColor_wrap");
		var countDownWrapW = window.getComputedStyle(widthWrap, null).width;
		countDownTime = setInterval(function() {
			timeCountDown--;
			if (timeCountDown < 1) {
				gameContinue = false;
				$("#gamePlayChilren").remove();
				$("#scoreShowImg").remove();
				windowAniDown = null;
				clearInterval(countDownTime);
				timeCountDown = 0;
			
				$("#gameScoreDesText").html("恭喜您成功帮助" + gameScore + "人降温， 这个夏天我要凉爽凉爽哒");

				$(".gameOverWrap").show();
			};
			var countDownShowW = Math.ceil(timeCountDown / 30 * 100);
			$("#gameCountDownTime").html(timeCountDown);
			$("#gameCountDownColor").css({
				"width": countDownShowW + "%"
			});
		}, 1000)
	}

	/*再次游戏*/
	$("#playAgain").on("click", function() {
		$("#scoreShowImg").remove();
		$(".gameOverWrap").fadeOut();
		gameStart() ;
	});

	//分享按钮
	$(".shareFri").on("tap", function(e) {
		var event = e || window.event;
		event.stopPropagation();
		if (is_weixin()) {
			$("#shareFriSha").show();
		} else {
			if (appShareFun()) {
				$(".butWrap").hide();
				$(".shareAppPage").show();
			}
		}
	});

	$("#shareFriSha").on("tap", function(e) {
		event.stopPropagation();
		e.preventDefault();
		$("#shareFriSha").hide();
	});

	//app分享点击
	$("#shareAppPage_shareFir").on("tap", function() {
		if (appShareFun()) {
			s(0);
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});
	$("#shareAppPage_friRound").on("tap", function() {
		if (appShareFun()) {
			s(1)
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});

})