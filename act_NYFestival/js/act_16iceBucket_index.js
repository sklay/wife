$(function() {
	
	
	/*var gameImg = ['0','1','2','3','4','5'] ;
	var _gameImg = ['0','1','2','3','4','5'] ;*/
	var bg_music = 'http://imgstore.camore.cn/medhtml/common/images/act_16womenday_backmusic.mp3' ;
	var bg_sound = 'http://imgstore.camore.cn/medhtml/common/images/act_16womenday_music0.mp3' ;
	
	var gameScore = 0; // 分数统计
	var gameContinue = true; // 是否点击
	var num = 0; // 指定当前窗口下标
	var audio_music = document.getElementById('audioBackMusic') ;
	var sound_music = document.getElementById('sound_add') ;
	var gameView = null ;
	var scoreView = null ;
	
	/* 如果没有版本号 或者是在微信打开 音乐制动播放 */
	/* 开始 */
	$("#startGame").on("tap", function() {
		$(".startGameBtnWrap").hide();
		console.debug("game start") ;
		gameStart();
		
	});
	
	/**音乐图标*/
	$('.gameMusic_wrap').on('tap',function(){
		
		if(audio_music.paused){
			$(this).show().find('img').removeClass('musicPause').addClass('musicPlay') ;
			audio_music.play() ;
		}else{
			$(this).find('img').removeClass('musicPlay').addClass('musicPause') ;
			audio_music.pause() ;
		}
	});
	
	
	/* 游戏主函数 */
	function gameStart() {

		gameScore = 0; // 分数统计
		gameContinue = true; // 是否点击
		num = 0; // 指定当前窗口下标

		timeCountDownFun();
		console.debug("game start");
		setTimeout(function() {
			games() ;
		}, 300)
		
		if(playMusic){
			$('.gameMusic_wrap').show().find('img').removeClass('musicPause').addClass('musicPlay') ;
			audio_music.play() ;
		}
	};
var my_num_arr = [0,1,2,3,4,5];
var persion_count = 0;//小人弹出的次数
function games(){
	persion_count++;//次数
	if(persion_count%my_num_arr.length==1||persion_count%my_num_arr.length==3){//玩了一圈后，随机打乱位置
		for(var i = 0 ;i<my_num_arr.length;i++){//这种算法叫做“洗牌算法”
			//找到某个随机数
			var index = Math.floor(Math.random()*(my_num_arr.length-i));
			console.log('index-->'+index);
			//交换
			var t = my_num_arr[index];
			my_num_arr[index] = my_num_arr[my_num_arr.length-1-i];
			my_num_arr[my_num_arr.length-1-i] = t;
		}
	}
	 //当前游戏位置对应数组下标
	//循环算法
	var num = my_num_arr [ persion_count % my_num_arr.length ]; 
	
	
	//然后删掉此索引的数组元素,这时候temp_array变为新的数组 
//	gameImg.splice(num, 1); 
	console.debug("num", num);
	if (!gameContinue) {
		console.debug("游戏已经结束") ;
		return;
	}
	var $childImg = $('#gamePlayChilren').clone() ;
	var $parentNode = $(".gameWin").eq(num).find(".gameWinMainWrap") ;
	
	$(".gameWin").find('[name=gamePlayChilren]').remove() ;
	
	$(".gameWin").find('[id=scoreShowImg]').remove() ;
	$(".gameWin").find('[id=nohotChilren]').remove() ;
	$(".gameWin").find('[id=gamebucket_water]').remove() ;
	$(".gameWin").find('[id=gamebucket]').remove() ;
		
	$parentNode.append($childImg);
	
//	$childImg.one("touchstart",function(e){
//     if(playMusic){
//			sound_music.currentTime=0;
//  		sound_music.play();
//		}
//		scoreCountFun($parentNode);
//      e.preventDefault();
//  });
	
	/**定时清除*/
	if(gameView){
		clearTimeout(gameView)
	}
	gameView = setTimeout(function() {
		$childImg.remove();
		if (gameContinue) {
			games();
		}
	}, 1000);	
}

	/*
	 * 冰桶 浇中 ，分数计算函数 这个方法处理 以下事件 1、点击出现的人物 2、点击人物 ，人物被击中
	 * （1）右上角出现冰桶，冰桶换成倒水状态，原来冰桶消失 （2）人物 被换成 另一个人物 ，原来人物消失 （3）出现+1 分
	 * 
	 */
	function scoreCountFun(wrap) {
		/**+1的图标*/
		var $scoreShow = $('#scoreShowImg').clone();
		/**淋雨后的人物*/
		var $nohotchild = $('#nohotChilren').clone() ;
		/**冰桶*/
		var $bucketImg_water = $('#gamebucket_water').clone();
		/**冰桶倒下*/
		var $bucketImg = $('#gamebucket').clone();
		
		
		wrap.find('[name=gamePlayChilren]').remove() ;
		$(".gameWin").find('[id=scoreShowImg]').remove() ;
		$(".gameWin").find('[id=nohotChilren]').remove() ;
		$(".gameWin").find('[id=gamebucket_water]').remove() ;
		$(".gameWin").find('[id=gamebucket]').remove() ;
		
		wrap.append($bucketImg);
		
		$bucketImg.fadeTo(200,1 ,function(){
			/* 先追加桶，改变人物状态 */
			$bucketImg.remove();
			/* 重新换一个桶 */
			wrap.append($bucketImg_water);
			wrap.append($scoreShow);
			/* 重新换一个人物 */
			wrap.append($nohotchild);
			if(scoreView){
				clearTimeout(scoreView)
			}
			scoreView = setTimeout(function() {
				$scoreShow.remove();
				$nohotchild.remove();
				$bucketImg_water.remove();
			}, 300)
		});
		
		gameScore += 1;

		$("#gameScore").html(gameScore)
	};

	/* 倒计时函数 */
	function timeCountDownFun() {
		var timeCountDown = 30;
		var countDownTime = null;
		countDownTime = setInterval(function() {
			timeCountDown--;
			if (timeCountDown < 1) {
				
				gameContinue = false;
				clearInterval(countDownTime);
				timeCountDown = 0;

				$("#gameScoreDesText").html("恭喜您成功帮助" + gameScore + "人降温， 这个夏天我要凉爽凉爽哒");
				 
				clickBoo = false;
				$(".gameOverWrap").show();
				if(playMusic){
					$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause') ;
					audio_music.pause() ;
				}
			};
			var countDownShowW = Math.ceil(timeCountDown / 30 * 100);
			$("#gameCountDownTime").html(timeCountDown);
			$("#gameCountDownColor").css({
				"width" : countDownShowW + "%"
			});
		}, 1000)
	}

	/* 再次游戏 */
	 clickBoo = false;
	$("#playAgain").on("click", function(e) {
		if(!clickBoo){
			 clickBoo = true;
			$("#scoreShowImg").remove();
			$(".gameOverWrap").fadeOut();
			
			gameStart();
		}
		
		
	});

	// 分享按钮
	$(".shareFri").on("tap", function(e) {
		var event = e || window.event;
		event.stopPropagation();
		if (is_weixin()) {
			$("#shareFriSha").show();
		} else {
			if (isLogin()) {
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
		if (isLogin()) {
			s(0);
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});
	$("#shareAppPage_friRound").on("tap", function() {
		if (isLogin()) {
			s(1)
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});
	document.addEventListener("touchmove", function(b) {
		b.preventDefault();
	}, false);
	$('.gameWinMainWrap').on('tap',function(){
		var $this = $(this) ;
		var $childImg = $this.find('[name=gamePlayChilren]') ;
		var isTouched = $childImg.length ;
		if(!isTouched){
			return  ;
		}
		console.debug() ;
		$childImg.remove();
		
		if(playMusic){
			sound_music.currentTime=0;
    		sound_music.play();
		}
	
		scoreCountFun($this);
	})
	
})