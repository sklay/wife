/**
 * 
 */
$(function(){
	
	/*答题函数*/
//	var indexSub		= 0 ;
	var img 			= '<img class="image" src="{imgName}" />' ;
	var maxImgList		= "gemeCH.png" ;//act_17lunarYear_gemeCH,act_17lunarYear_spec_gemeCH
	var imgName			= "" ;					  
	var imgBadName		= "" ;
	var countDownNum=30;//倒计时初始值；
	var countDownTime=null;//倒计时计时器;
	
	
	var scoreNum = 0; //得分记录；
	var haveScore = false;
	//	预加载图片
	var images = new Array();
	var path = "images/";
	var normalImgPrefix = "act_17lunarYear_";
	var badImgPrefix = "act_17lunarYear_spec_";
	var boxNum=3;

	/**
	 * 获取
	 * @param colorList
	 * @returns {*}
	 */
	
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
	
	
	//记录从8*8时  游戏还可以继续玩直到游戏完满10关，
	//这个值 有待调整
	var stepNum = 0;
	/*点击生成主函数*/
	function creatFunction(){
		$(".cavwrap").empty();
		if(boxNum > 9 ){
//			stepNum++;
//			console.log(stepNum);
			boxNum=8;
			imgName = path + normalImgPrefix + maxImgList ;
			imgBadName = path + badImgPrefix + maxImgList ;
//			indexSub++ ;
		}else{
			imgName = path + normalImgPrefix +maxImgList;
			imgBadName =  path + badImgPrefix +maxImgList ;
		}
		creatbox();
		
		norStyleCount();
		specialClick();

		boxNum++;
		
	}
	/*生成内容*/
	function creatbox(){
		var _html="<div class='clearFix'>";
		var cImg = img.replace("{imgName}",imgName) ;
		for(var i=0,j=boxNum;i<j;i++){
			_html+='<span class="normalStyle">'+cImg+'</span>';
			for (var m=0,k=boxNum-1;m<k;m++) {
				_html+='<span class="normalStyle">'+cImg+'</span>';
			}
		};
		_html+="</div>";
		$(".cavwrap").append(_html);
	}
	/*设置box宽高*/
	function norStyleCount(){
//		alert(cavwrap.offsetWidth);
		$(".normalStyle").width((cavwrap.offsetWidth-10-3*boxNum)/boxNum);
		$(".normalStyle").height((cavwrap.offsetHeight-10-3*boxNum)/boxNum);
		$(".normalStyle .image").width((cavwrap.offsetWidth-10-3*boxNum)/boxNum);
		$(".normalStyle .image").height((cavwrap.offsetHeight-10-3*boxNum)/boxNum);
		specialImg() ;
	}

	/*随机特殊图片*/
	function specialImg(){
		var num1=Math.floor(Math.random()*(boxNum*boxNum));
		//给随机出来的 图片加上特殊的样式specialStyle
		$(".normalStyle").eq(num1).addClass("specialStyle");
//		$(".specialStyle").css({backgroundColor:color});
		$(".specialStyle .image").attr('src' ,imgBadName);
	}
	
	var cavwrap=document.querySelectorAll(".cavwrap")[0];
	//设置画布的 宽高
	cavwrap.style.width=document.documentElement.clientWidth+"px";
	cavwrap.style.height=document.documentElement.clientHeight/1.4+"px";


	//cavwrap.style.backgroundColor="#eee"
	//var btn=document.querySelectorAll("button")[0];
	
	//var norStyle=document.querySelector(".normalStyle");
	
	
	/*游戏页面出现*/
	$("#startGame").on("tap", function() {
		$(".startGameBtnWrap").hide();
		console.debug("game start") ;
		gameStart();
	});
	
	function gameStart(){
		$("#gameCountDownTime").html("30");
		$("#gameScore").html("0");
//		$('.index').hide();
//		$('.start_game').show();
//		haveScore=true;
		$(".controlAlertPage").show();
		creatFunction();
		countDownFun();
		
		if(playMusic) {
			$('.gameMusic_wrap').show().find('img').removeClass('musicPause').addClass('musicPlay');
			audio_music.play();
		}
	}
	
	function specialClick(){
		$(".specialStyle").on("click",function(){
			scoreNum = (scoreNum+10);
			
			if(scoreNum>=100){
				 clearInterval(countDownTime);
				$(".controlAlertPage").hide();
				$(".gameResultPage ").show();
				$(".gameSuccWrap ").show();
				$("#gameScore").html("100");
				$(".gameFailTitle p").html("恭喜您，一共获得" + scoreNum + "积分！ 拿着红包喜迎新年吧!");
				if(playMusic) {
					$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause');
					audio_music.pause();
				}
				return false;
			}
			$("#gameScore").html(scoreNum);
			creatFunction();
		});
	}
	/*暂停*/
	$("#stop_btn").on("click",function(){
		var scoreNum=$("#gameScore").html();
		var pauseTime=$("#gameCountDownTime").html();
		scoreNum=scoreNum;//保存得分记录；
		countDownNum=pauseTime;//保存倒计时时间；
		clearInterval(countDownTime);
		$(".controlAlertPage").hide();
		$(".pauseGameBtnWrap").show();
	});
   /*暂停结束，继续游戏*/
	  $("#pauseGame").on("click",function(){
	  	$("#gameScore").html(scoreNum);
	  	$(".controlAlertPage").show();
	  	$(".pauseGameBtnWrap").hide();
	  	countDownFun()
	  });
	
	
	/*倒计时函数*/
	function countDownFun(){
		countDownTime = setInterval(function() {
			$("#gameCountDownTime").html(countDownNum);
			countDownNum--;
			if (countDownNum < 1) {
				gameContinue = false;
				$("#gameCountDownTime").html(0);
				clearInterval(countDownTime);
				countDownNum = 0;
				$(".gameFailTitle p").html("恭喜您，一共获得" + scoreNum + "积分！ 拿着红包喜迎新年吧!");
				clickBoo = false;
				$(".controlAlertPage").hide();
				$(".gameResultPage ").show();
				$(".gameFailWrap ").show();
				if(playMusic) {
					$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause');
					audio_music.pause();
				}
			};
			var countDownShowW = Math.ceil(countDownNum / 30 * 100);
			$("#gameCountDownTime").html(countDownNum);
			$("#gameCountDownColor").css({
				"width" : countDownShowW + "%"
			});
		}, 1000)
	};
	/*重新再来*/
	clickBoo = false;
	$(".butWrap").on("click","#playAgain",function(){
		if(!clickBoo) {
			clickBoo = true;
			
			clearInterval(countDownTime);
			/*状态值回复初始*/
			scoreNum=0;
			countDownNum=30;
			boxNum=3;
	//		indexSub=0;
			
			$(".gameResultPage").hide();
			$(".gameFailWrap ").hide();
			$(".gameSuccWrap ").hide();
			$(".startGameBtnWrap").show();
//			$(".controlAlertPage").show();
		}
		
	})
	
	/*倒计时结束函数*/
	function timeOutFun(){
		clearInterval(countDownTime);
		$("#finalScoreNum").html(scoreNum);
		$(".controlAlertPage").hide();
	  	$(".time_over").show();
	  	$("#shareshade").hide();
//	  	showResultFun();
	};

	
	
	
	
	
	
	
	
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
	
	//去使用跳转页面
	$(".goForUse").on("click", function() {
		var target_href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653';
		window.location.href = target_href;
	});



})

