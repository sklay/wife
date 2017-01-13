/**
 * 
 */
$(function(){
	
	/*答题函数*/
	var indexSub		= 0 ;
	//var path 			= "images/" ;
	var img 			= '<img class="image" src="{imgName}" />' ;
	var maxImgList		= "gemeCH.png" ;//act_17lunarYear_gemeCH,act_17lunarYear_spec_gemeCH
	var imgName			= "" ;					  
	var imgBadName		= "" ;
//	var imgMaxLength	= 0 ;
	//var scoreNum=0;//得分记录；
	var countDownNum=30;//倒计时初始值；
	var countDownTime=null;//倒计时计时器;
	
	
	
	var scoreNum = 0; //得分记录；
	var haveScore = false;
	//	预加载图片
	var images = new Array();
	var path = "images/";
	var normalImgPrefix = "act_17lunarYear_";
	var badImgPrefix = "act_17lunarYear_spec_";
//		var imgSuffix = ".png";

//		var preLoadImgList = ["act_game_22", "act_game_bad_22", "act_game_33", "act_game_bad_33", "act_game_44", "act_game_bad_44", "act_game_55", "act_game_bad_55", "act_game_66", "act_game_bad_66", "act_game_77_1", "act_game_bad_77_1", "act_game_77_2", "act_game_bad_77_2", "act_game_77_3", "act_game_bad_77_3", "act_game_77_4", "act_game_bad_77_4", "act_game_77_5", "act_game_bad_77_5",
//			"act_game_77_6", "act_game_bad_77_6", "act_game_77_7", "act_game_bad_77_7", "act_game_77_8", "act_game_bad_77_8", "act_game_77_9", "act_game_bad_77_9", "act_game_77_10", "act_game_bad_77_10", "act_game_77_11", "act_game_bad_77_11", "act_game_77_12", "act_game_bad_77_12", "act_game_77_13", "act_game_bad_77_13", "act_game_77_14", "act_game_bad_77_14", "act_game_77_15", "act_game_bad_77_15", "act_game_clock", "act_game_coupon",
//			"act_game_coupon_shine", "act_game_index_desc", "act_game_index_eye", "act_game_index_shine", "act_game_index_title", "act_game_index_start", "act_game_load_title", "act_game_load_title_1", "act_game_receive_btn", "act_game_use_btn", "act_game_index_start", "act_game_index_title", "act_game_invite_btn", "act_game_invite_sbtn"
//		];
	/**
	 * 获取
	 * @param colorList
	 * @returns {*}
	 */
	//记录从8*8时  游戏还可以继续玩直到游戏完满10关，
	//这个值 有待调整
	var stepNum = 0;
	/*点击生成主函数*/
	function creatFunction(){
		$(".cavwrap").empty();
		if(boxNum >= 8 ){
			stepNum++;
			console.log(stepNum);
			boxNum=8;
			imgName = path + normalImgPrefix + maxImgList ;
			imgBadName = path + badImgPrefix + maxImgList ;
			indexSub++ ;
			if(stepNum>=6){
				clearInterval(countDownTime);
				$(".gameFailTitle p").html("恭喜您，一共获得" + scoreNum + "积分！ 拿着红包喜迎新年吧!");
				$(".gameResultPage ").show();
				$(".gameSuccWrap ").show();
			}
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
//		alert($(".normalStyle").width());
		$(".normalStyle").width((cavwrap.offsetWidth-1*boxNum)/boxNum);
		$(".normalStyle").height((cavwrap.offsetHeight-1*boxNum)/boxNum);
		$(".normalStyle .image").width((cavwrap.offsetWidth-1*boxNum)/boxNum);
		$(".normalStyle .image").height((cavwrap.offsetHeight-1*boxNum)/boxNum);
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
//	cavwrap.style.width=document.documentElement.clientWidth+"px";
//	cavwrap.style.height=document.documentElement.clientHeight/1.8+"px";


	//cavwrap.style.backgroundColor="#eee"
	//var btn=document.querySelectorAll("button")[0];
	var boxNum=3;
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
		creatFunction();
		countDownFun();
	}
	
	function specialClick(){
		$(".specialStyle").on("click",function(){
			scoreNum++;
			if(scoreNum>=20){
				 clearInterval(countDownTime);
				$(".controlAlertPage").hide();
				$(".question_end").show();
				$("#gameScore").html("20");
//				getMyDesc();
//				getMenuShare();
				return false;
			}
			$("#gameScore").html(scoreNum);
			creatFunction();
//			getMyDesc();
//			getMenuShare();
		});
	}
	/*暂停*/
	$("#stop_btn").on("click",function(){
		var pauseScore=$("#gameScore").html();
		var pauseTime=$("#gameCountDownTime").html();
		scoreNum=pauseScore;//保存得分记录；
		countDownNum=pauseTime;//保存倒计时时间；
		clearInterval(countDownTime);
//		$(".controlAlertPage").hide();
		$(".pauseGameBtnWrap").show();
	});
   /*暂停结束，继续游戏*/
	  $("#pauseGame").on("click",function(){
	  	$("#gameScore").html(scoreNum)
	  	$(".pauseGameBtnWrap").hide();
//	  	$("#food_img").show();
//	  	$(".start_game").show();
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
				
				$(".gameResultPage ").show();
				$(".gameFailWrap ").show();
//				if(playMusic){
//					$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause') ;
//					audio_music.pause() ;
//				}
			};
			var countDownShowW = Math.ceil(countDownNum / 30 * 100);
			$("#gameCountDownTime").html(countDownNum);
			$("#gameCountDownColor").css({
				"width" : countDownShowW + "%"
			});
		}, 1000)
	};
	/*重新再来*/
	$(".butWrap").on("click","#playAgain",function(){
		clearInterval(countDownTime);
		/*状态值回复初始*/
		scoreNum=0;
		countDownNum=30;
		boxNum=3;
		stepNum=0;
//		indexSub=0;
		$(".gameResultPage").hide();
		$(".startGameBtnWrap").show();
//		$("#start_game").hide();
//	  	$(".index").show();
//	  	haveScore=false;
//	  	getMyDesc();
//	  	getMenuShare();
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



//	function getMyDesc(){
//		if(haveScore){
//			if (scoreNum<=5){
//				wechatObj.desc="我在【药快到】活动找到了"+scoreNum+"种问题食品，快来看看自己能到哪关！";
//			}else if(scoreNum>5 && scoreNum<=10){
//				wechatObj.desc="我在【药快到】活动找到了"+scoreNum+"种问题食品，快来看看自己能到哪关！";
//			}else if(scoreNum>10 && scoreNum<=15){
//				wechatObj.desc="我在【药快到】活动找到了"+scoreNum+"种问题食品，吃饭带着我可验毒哦~";
//			}else if(scoreNum>15 && scoreNum<20){
//				wechatObj.desc="我在【药快到】活动找到了"+scoreNum+"种问题食品，我就不信你能找到的比我多！";
//			}else if(scoreNum>=20){
//				wechatObj.desc="我在【药快到】活动找到了"+scoreNum+"种问题食品，据说全世界只有0.1%的人能做到，不服来战！";
//			}
//		}else{
//			wechatObj.desc="食品卫生，你注意过吗？快来看看自己能到哪关！"
//		}
//		$("meta[name=description]").eq(0).attr({content:wechatObj.desc}); 
//	}
	

})

