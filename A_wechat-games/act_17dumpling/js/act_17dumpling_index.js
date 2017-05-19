/**
 * 
 */
$(function() {
	var gameConfig = {
		time:90
	}
	var toR = true;
	var clickBoo = false;
	var countDownNum = gameConfig.time; //倒计时初始值；
	var countDownTime = null; //倒计时计时器;

	var scoreNum = 0; //得分记录；
	var haveScore = false;
	//	预加载图片
	var clock;
	var audio_music = document.getElementById('audioBackMusic');

	/**音乐图标*/
	$('.gameMusic_wrap').on('tap', function() {

		if(audio_music.paused) {
			$(this).show().find('img').removeClass('musicPause').addClass('musicPlay');
			audio_music.play();
		} else {
			$(this).find('img').removeClass('musicPlay').addClass('musicPause');
			audio_music.pause();
		}
	});

	
	function move() {
		var $left = $('#top').width() - $('.top-line').width();
		var left = $('.top-jia').offset().left;
		var offset = $('.top-line').width()+($left / 2)-$('.top-jia').width();
		var liw = 5;
				  		
		if(toR) {
			var _offset = liw + left;
			if(_offset >= offset) {
				_offset = offset ;
				toR = false;
			}

			//					$(".top-jia").animate({left: _offset}, "300");
			$(".top-jia").css("left", _offset);
		} else {
			var _offset = left - liw;
			if(_offset <= $left / 2) {
				_offset = $left / 2;
				toR = true;
			}
			$(".top-jia").css("left", _offset);
		}
	}
	
	var dataList = {
		"list": ""
	}
	var html = template('test', dataList);
	$("#top").append(html);

	
	/*游戏页面出现*/
	$("#startGame").on("click", function() {
		$(".startGameBtnWrap").hide();
		console.debug("game start");
		gameStart();

	});

	function gameStart() {
		if(clock)
			clearInterval(clock) ;
			
		clock = setInterval(function() {
			move();
		}, 100);
		var doit = false;
		while(doit) {
			move();
		}

		$("#timeControl").html("90");
		$("#scoreControl").html("0");
		
		countDownFun();

		if(playMusic) {
			$('.gameMusic_wrap').show().find('img').removeClass('musicPause').addClass('musicPlay');
			audio_music.play();
		}
	}

	var btnClick = false ;
	function specialClick() {
		//游戏点击事件
		$(".btn").off('click').on("click", function() {
			if(btnClick)
				return ;
			//按钮点击动画	
			$(".btn .playGameBtn_move1").animate({top:"2.3rem"},100,function(){
				$(".btn .playGameBtn_move1").animate({top:"2.1rem"},100);
			});
//			$(this).animate({ textIndent: 0 }, { 
//				step: function(){ 
//					$(".btn").css('-webkit-transform','translateY(.16rem)'); 
//				}, 
//				duration:'slow' 
//			},
//			'linear');
			
			
			
			btnClick = true ;
			var $height = $("#top").height();
			if(clock)
				clearInterval(clock) ;
			
			var moveleft = $(".top-jia").offset().left;
			var clientWidth = $(window).width();
			var _moveleft = (moveleft / clientWidth) * 70;
			//判断夹中的 几种状态
			if(_moveleft > 6 && _moveleft < 9) {
				scoreNum +=10;
				console.log("夹中了第一层");
				$(".top-jia-move").animate({
					height: ($height / 2) + ($height / 4)
				}, 300, function() {
					$(".top-jia-img").attr("src", "images/act_17dumpling_jia-5.png");
					$(".top-jia-move").animate({
						height: ($height / 4)
					}, 300, function() {
						$(".top-jia-img").attr("src", "images/act_17dumpling_jia-3.png");

						/**恢复按钮点击*/
						btnClick = false;
					});
					$(".game_img1").fadeOut(300, function() {
						$(".game_img1").fadeToggle(300);
					});
				});

				clock = setInterval(function() {
					move();
				}, 100); //重新开始定时器

			} else if(_moveleft > 26 && _moveleft < 29) {
				scoreNum +=10;
				console.log("scoreNum的值是" + scoreNum);
				console.log("夹中了第一层");
				$(".top-jia-move").animate({
					height: ($height / 2) + ($height / 4)
				}, 300, function() {
					$(".top-jia-img").attr("src", "images/act_17dumpling_jia-4.png");
					$(".top-jia-move").animate({
						height: ($height / 4)
					}, 300, function() {
						$(".top-jia-img").attr("src", "images/act_17dumpling_jia-3.png");
						
						/**恢复按钮点击*/
						btnClick = false;
					});
					$(".game_img2").fadeOut(300, function() {
						$(".game_img2").fadeToggle(300);
					});

				});

				clock = setInterval(function() {
					move();
				}, 100); //重新开始定时器

			} else if(_moveleft > 46 && _moveleft < 49) {
				scoreNum +=10;
				console.log("scoreNum的值是" + scoreNum);
				console.log("夹中了第一层");
				$(".top-jia-move").animate({
					height: ($height / 2) + ($height / 4)
				}, 300, function() {
					$(".top-jia-img").attr("src", "images/act_17dumpling_jia-5.png");
					$(".top-jia-move").animate({
						height: ($height / 4)
					}, 300, function() {
						$(".top-jia-img").attr("src", "images/act_17dumpling_jia-3.png");
						/**恢复按钮点击*/
						btnClick = false;
					});
					$(".game_img3").fadeOut(300, function() {
						$(".game_img3").fadeToggle(300);
					});
				});

				clock = setInterval(function() {
					move();
				}, 100); //重新开始定时器

			} else if(_moveleft > 1 && _moveleft < 4) {
				scoreNum +=10;
				console.log("scoreNum的值是" + scoreNum);
				console.log("夹中了第二层");
				$(".top-jia-move").animate({
					height: $height
				}, 300, function() {
					$(".top-jia-img").attr("src", "images/act_17dumpling_jia-4.png");
					$(".top-jia-move").animate({
						height: ($height / 4)
					}, "300", function() {
						$(".top-jia-img").attr("src", "images/act_17dumpling_jia-3.png");

						/**恢复按钮点击*/
						btnClick = false;
					});
					$(".game_img1-1").fadeOut(300, function() {
						$(".game_img1-1").fadeToggle(300);
					});
				});

				clock = setInterval(function() {
					move();
				}, 100); //重新开始定时器

			} else if(_moveleft > 17 && _moveleft < 21) {
				scoreNum +=10;
				console.log("scoreNum的值是" + scoreNum);
				console.log("夹中了第二层");
				$(".top-jia-move").animate({
					height: $height
				}, 300, function() {
					$(".top-jia-img").attr("src", "images/act_17dumpling_jia-4.png");
					$(".top-jia-move").animate({
						height: ($height / 4)
					}, "300", function() {
						$(".top-jia-img").attr("src", "images/act_17dumpling_jia-3.png");
						
						/**恢复按钮点击*/
						btnClick = false;
					});
					$(".game_img1-2").fadeOut(300, function() {
						$(".game_img1-2").fadeToggle(300);
					});
				});

				clock = setInterval(function() {
					move();
				}, 100); //重新开始定时器

			} else if(_moveleft > 35 && _moveleft < 38) {
				scoreNum +=10;
				console.log("scoreNum的值是" + scoreNum);
				console.log("夹中了第二层");
				$(".top-jia-move").animate({
					height: $height
				}, 300, function() {
					$(".top-jia-img").attr("src", "images/act_17dumpling_jia-4.png");
					$(".top-jia-move").animate({
						height: ($height / 4)
					}, "300", function() {
						$(".top-jia-img").attr("src", "images/act_17dumpling_jia-3.png");
						
						/**恢复按钮点击*/
						btnClick = false;

					});
					$(".game_img1-3").fadeOut(300, function() {
						$(".game_img1-3").fadeToggle(300);
					});
				});

				clock = setInterval(function() {
					move();
				}, 100); //重新开始定时器

			} else if(moveleft > 53 && moveleft < 56) {
				scoreNum +=10;
				console.log("scoreNum的值是" + scoreNum);
				console.log("夹中了第二层");
				$(".top-jia-move").animate({
					height: $height
				}, 300, function() {
					$(".top-jia-img").attr("src", "images/act_17dumpling_jia-4.png");
					$(".top-jia-move").animate({
						height: ($height / 4)
					}, "300", function() {
						$(".top-jia-img").attr("src", "images/act_17dumpling_jia-3.png");
						
						/**恢复按钮点击*/
						btnClick = false;

					});
					$(".game_img1-4").fadeOut(300, function() {
						$(".game_img1-4").fadeToggle(300);
					});
				});

				clock = setInterval(function() {
					move();
				}, 100); //重新开始定时器

			} else {
				//没有夹中
				console.log("没有夹中");
				//先暂停定时器，执行动画 然后开启定时器
				$(".top-jia-move").animate({
					height: $height
				}, 300, function() {
					$(".top-jia-img").attr("src", "images/act_17dumpling_jia-6.png");
					$(".top-jia-move").animate({
						height: ($height / 4)
					}, "300", function() {
						$(".top-jia-img").attr("src", "images/act_17dumpling_jia-3.png");
						
						/**恢复按钮点击*/
						btnClick = false;
					});
				});
				clock = setInterval(function() {
					move();
				}, 100); //重新开始定时器
			}
			$("#scoreControl").html(scoreNum);

		});

	}

	/*倒计时函数*/
	function countDownFun() {
		specialClick();
		//调用分数函数，获得最终的分数情况
		if(countDownTime)
			clearInterval(countDownTime) ;
			
		countDownTime = setInterval(function() {
			$("#timeControl").html(countDownNum);
			countDownNum--;

			if(countDownNum < 1) {
				//90秒时间内分数小于50 失败  
				if(scoreNum < 50) {
					if(null != clock) {
						clearInterval(clock);
					}
					gameContinue = false;
					$("#timeControl").html(0);
					if(countDownTime)
						clearInterval(countDownTime);
					countDownNum = 0;
					$(".gameFailTitle .gameFailScore").html(scoreNum);
					clickBoo = false;
					$(".gameResultPage ").show();
					$(".gameFailWrap ").show();
					if(playMusic) {
						$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause');
						audio_music.pause();
					}
				} else {
					if(null != clock) {
						clearInterval(clock);
					}
					gameContinue = false;
					$("#timeControl").html(0);
					if(countDownTime)
						clearInterval(countDownTime);
					countDownNum = 0;
					$(".gameSuccTitle .gameSuccScore").html(scoreNum);
					clickBoo = false;
					$(".gameResultPage").show();
					$(".gameSuccWrap").show();
					if(playMusic) {
						$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause');
						audio_music.pause();
					}
				}

			};
			var countDownShowW = Math.ceil(countDownNum / gameConfig.time * 100);
			$("#timeControl").html(countDownNum);
			$("#gameCountDownColor").css({
				"width": countDownShowW + "%"
			});
			var scoreDownShowW = Math.ceil(scoreNum / 50 * 100);
			$("#scoreControl").html(scoreNum);
			if(scoreDownShowW < 111){
				$("#gameScore").css({
					"width": scoreDownShowW + "%"
				});
			}else{
				$("#gameScore").css({
					"width": 100 + "%"
				});
			}
			
		}, 1000)
		

	};
	
	/*重新再来*/
	$(".butWrap").on("click", "#playAgain", function() {

		if(!clickBoo) {
			clickBoo = true;

			if(countDownTime)
				clearInterval(countDownTime);
			
			/*状态值回复初始*/
			scoreNum = 0;
			countDownNum = gameConfig.time;

			$(".gameResultPage").hide();
			$(".gameFailWrap ").hide();
			$(".gameSuccWrap ").hide();
			$(".startGameBtnWrap").show();
		}

	})

	// 分享按钮
	$(".shareFri").on("tap", function(e) {
		var event = e || window.event;
		event.stopPropagation();
		if(is_weixin()) {
			$("#shareFriSha").show();
		} else {
			if(isLogin()) {
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

	// app分享点击
	$("#shareAppPage_shareFir").on("tap", function() {
		if(isLogin()) {
			s(0);
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
		toReward();
	});
	$("#shareAppPage_friRound").on("tap", function() {
		if(isLogin()) {
			s(1)
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
		toReward();
	});

	//去使用跳转页面
	$(".goForUse").on("click", function() {
		var target_href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653';
		window.location.href = target_href;
	});

})