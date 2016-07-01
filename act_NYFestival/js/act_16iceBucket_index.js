$(function() {
	/*开始*/
	$("#startGame").on("tap", function() {
		$(".startGameBtnWrap").hide();
		gameStart();
	});

	var gameScore = 0; //分数统计
	var windowAniDownTimeBoo = true; //是否点击
	var num = 0; //指定当前窗口下标
	var childChoNum = 0; //指定当前出现分数
	var windowAniDownTime = null;
	var clickTime = null;
	var musicConSrc = document.getElementById("scorePlus");
	var scoreOnceBoo = true;
	var sound_add = document.getElementById("sound_add");
	//  var sound_cut=document.getElementById("sound_cut");
	sound_add.volume = 0.5;
	//  sound_cut.volume=1;

	/*游戏主函数*/
	function gameStart() {
		setTimeout(function() {
			windowAniUp();
			//          windowAniUpFun();
		}, 500)
		timeCountDownFun();
	};
	/*人物弹起*/
	function windowAniUpFun() {
		num = Math.floor(Math.random() * 6);

		var childImg = '<img src="images/0715_images/act_16coolIceBucket_game_hotPeople.png" id="gamePlayChilren" alt="">';

		$(".gameWin").eq(num).find(".gameWinMainWrap").append(childImg);

		$("#gamePlayChilren").one("touchstart", function(e) {
			
			windowAniDownTimeBoo = false;
			/*调用  冰桶击中 分数统计方法*/
			scoreCountFun(num);
			musicConSrc=sound_add;
			musicConSrc.currentTime = 0;
			musicConSrc.play();
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
		}, 300, function() {
			clearTimeout(windowAniDownTime);
			clearTimeout(clickTime);
			windowAniDownTime = setTimeout(function() {
				windowAniDown(num);
				//                  windowAniDownFun(num);
			}, 300)
		});
	};
	var windowAniUp = windowAniUpFun;
	/*人物消失*/
	function windowAniDownFun(i) {
		if (windowAniDownTimeBoo) {
			console.log(1)
			$("#gamePlayChilren").animate({
				"transform": "scale(0)",
				"-webkit-transform": "scale(0)"
			}, 100, function() {
				$("#gamePlayChilren").remove();
				$("#scoreShowImg").remove();
				setTimeout(function() {
					windowAniUp();
					//	                windowAniUpFun();
				}, 200);
				scoreOnceBoo = true;
			});
		} else {
			console.log(2)
			setTimeout(function() {
				$("#gamePlayChilren").animate({
					"transform": "scale(0)",
					"-webkit-transform": "scale(0)"
				}, 100, function() {
					$("#gamePlayChilren").remove();
					$("#scoreShowImg").remove();
					setTimeout(function() {
						windowAniUp();
						//  		                windowAniUpFun();
					}, 200);
					scoreOnceBoo = true;
				});
			}, 300)
		}

	};
	var windowAniDown = windowAniDownFun;
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
		var bucketImg = '<img src="images/0715_images/act_16coolIceBucket_game_IceBucket.png" id="gamebucket" alt="">';
		var nohotchild = '<img src="images/0715_images/act_16coolIceBucket_game_nohotPeople.png" id="nohotChilren" alt="">';
		var bucketImg_water = '<img src="images/0715_images/act_16coolIceBucket_game_IceWater.png" id="gamebucket_water" alt="">';

		$(".gameWin").eq(wrapNum).find(".gameWinMainWrap").append(ScoreShow);
		$(".gameWin").eq(wrapNum).find(".gameWinMainWrap").append(bucketImg);
		setTimeout(function() {
			$("#scoreShowImg").remove();
			/*先追加桶，改变人物状态*/
			$("#gamebucket").remove();
			/*重新换一个桶*/
			$(".gameWin").eq(wrapNum).find(".gameWinMainWrap").append(bucketImg_water);
			
			/*热的人物消失*/
			$("#gamebucket").remove();
			/*重新换一个人物*/
			$(".gameWin").eq(wrapNum).find(".gameWinMainWrap").append(nohotchild);

			setTimeout(function() {
				$("#nohotChilren").remove();

				$("#gamebucket_water").remove();
			}, 300)
		}, 500)

		gameScore += 1;

		$("#gameScore").html(gameScore)
	};

	/*倒计时函数*/
	function timeCountDownFun() {
		var timeCountDown = 300;
		var countDownTime = null;
		var widthWrap = document.getElementById("gameCountDownColor_wrap");
		var countDownWrapW = window.getComputedStyle(widthWrap, null).width;
		countDownTime = setInterval(function() {
			timeCountDown--;
			if (timeCountDown <= 0) {
				$("#gamePlayChilren").remove();
				$("#scoreShowImg").remove();
				clearTimeout(windowAniDownTime);
				clearTimeout(clickTime);
				windowAniUp = null;
				windowAniDown = null;
				clearInterval(countDownTime);
				timeCountDown = 0;
				//              if(gameScore<=15){
				//                  var finalTextShow="颜值太低，惨不忍睹，还是多爱惜自己一些吧！";
				//              }else if(gameScore>15 && gameScore <=30){
				//                  var finalTextShow="颜值有待提高，多保养，相信自己一定会貌美如花的！";
				//              }else if(gameScore>30 && gameScore<=45){
				//                  var finalTextShow="恭喜你，收获"+gameScore+"颜值，沉鱼落雁，闭月羞花说的就是你吧！";
				//              }else if(gameScore>45){
				//                  var finalTextShow="天啊！世间竟有如此倾国倾城的女子！天仙姐姐，约吗？";
				//              };
				//              wechatObj.title = '【药快到】提高颜值大作战';
				//              wechatObj.desc ='我刚刚在【药快到】美丽大作战中测了一下颜值，快来和我比比谁更美！';
				//              getWechatObj();
				$("#gameScoreDesText").html("恭喜您成功帮助" + gameScore + "人降温， 这个夏天我要凉爽凉爽哒");

				//              $("#gamebucket_water").remove();
				$(".gameOverWrap").show();
			};
			var countDownShowW = Math.ceil(timeCountDown / 30 * 100);
			$("#gameCountDownTime").html(timeCountDown);
			$("#gameCountDownColor").css({
				"width": countDownShowW + "%"
			});
		}, 1000)
	}

	/*初始化函数*/
	function initFun() {
		windowAniUp = windowAniUpFun;
		windowAniDown = windowAniDownFun;
		//		 windowAniUpFun();
		//       windowAniDownFun(0);
		gameScore = 0; //分数统计
		windowAniDownTimeBoo = true; //是否点击
		num = 0; //指定当前窗口下标
		childChoNum = 0; //指定当前出现分数
		windowAniDownTime = null;
		clickTime = null;
		$(".gameWinPinkMask").animate({
			"transform": "translateY(0)",
			"-webkit-transform": "translateY(0)"
		}, 100);
		$("#gamePlayChilren").remove();
		$("#scoreShowImg").remove();
		$(".gameOverWrap").fadeOut();
		$(".startGameBtnWrap").fadeIn();
		$("#gameCountDownTime").html(30);
		$("#gameScore").html(0);
		$("#gameCountDownColor").css({
			"width": "100%"
		});
	}
	$("#playAgain").on("click", function() {
		initFun();
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