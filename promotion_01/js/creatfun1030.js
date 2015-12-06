$(function(){
	var indexSub			= 0 ;
	var path 			= "../images/" ;
	var colorList 		= ["#017fe2","#fff103","#ffcc1b","#acff0b","#00fff6","#fc397e","#c000f0"] ;
	var normalImgPrefix = "act_game_" ;
	var badImgPrefix 	= "act_game_bad_" ;
	var imgSuffix 		= ".png" ;
	var color			= "" ;
	var img 			= '<img class="image" src="{imgName}" />' ;
	var maxImgList		= ["77_1.png","77_2.png","77_3.png","77_4.png","77_5.png","77_6.png","77_7.png","77_8.png","77_9.png","77_10.png","77_11.png","77_12.png","77_13.png","77_14.png","77_15.png"] ;
	var imgName			= "" ;
	var imgBadName		= "" ;
	var imgMaxLength	= 0 ;
	var totalScore		= 0 ;
	var answertime		= 60;
	var timenum			= 0 ;

	var questions = ["1、请找出已过期的食品标签:","2、请找出工业酒精勾兑的假酒:","3、请找出含有三聚氰胺的毒奶粉:",
		"4、请找出含有苏丹红的毒辣椒酱:","5、请找出含有苏丹红的红心鸭蛋:", "6、请找出打过催红素的西红柿:",
		"7、请找出染过色的黄瓜:","8、请找出打过工业蜡的苹果:","9、请找出用地沟油炸出来的油条:",
		"10、请找出用双氧水漂白过的椰果:","11、请找出注过水的猪肉:","12、请找出用化学药品人工合成的鸡蛋:",
		"13、请找出使用碱性橙染料浸染过的小黄鱼:","14、请找出用硫磺熏蒸过的馒头:","15、请找出用玫瑰精染色过的虾:",
		"16、请找出加入工业染料的豆腐干:","17、请找出使用过工业用油喷洒的大米:","18、请找出使用工业硫酸铜炮制皮蛋:",
		"19、请找出使用福尔马林浸泡过的鱿鱼:","20、请找出注射过瘦肉精的猪肉:"] ;
	var question = "" ;
	/**
	 * 获取
	 * @param colorList
	 * @returns {*}
	 */

	/*var loadingTime=0;
	var loadingTimer=null;
	loadingTimer=setInterval(function(){
		loadingTime++;
	},1000);
	(function preload() {
		for (var i = 0; i < preLoadImgList.length; i++) {
			images[i] = new Image();
			images[i].src = path+preLoadImgList[i]+imgSuffix;
		};
		images[preLoadImgList.length-1].onload=function(){
			if(loadingTime<=2){
				clearInterval(loadingTimer);
				setTimeout(function(){
					$("#loading_wrap").remove();
					$("#index").show();
					loadingTime=null;
				},2000);
			}else{
				clearInterval(loadingTimer);
				$("#loading_wrap").remove();
				loadingTime=null;
				$("#index").show();
			};
		}
	})();*/


	function getNodeByRandom(nodeList){
		var index = Math.floor(Math.random()*nodeList.length);
		var node = nodeList[index];
		nodeList.splice(index,1);
		return node;
	}
	/*根据下标得到不同的图片*/
	function getImg(){
		var name = maxImgList[indexSub] ;
		console.debug("indexSub is " + indexSub) ;
		imgName = path + normalImgPrefix + name ;
		imgBadName = path + badImgPrefix + name ;
		indexSub++ ;
	}
	/*点击生成主函数*/
	function creatFunction(){
		$(".cavwrap").empty();
		if(boxNum >= 7){
			if(indexSub >= maxImgList.length){
				return ;
		}
			boxNum=7;
			colorList = ["#017fe2","#fff103","#ffcc1b","#acff0b","#00fff6","#fc397e","#c000f0"] ;
			question = questions[indexSub+5] ;
			getImg();

		}else{
			imgName    =  path + normalImgPrefix + boxNum + "" + boxNum + imgSuffix;
			imgBadName =  path + badImgPrefix + boxNum + "" + boxNum + imgSuffix;
			question = questions[boxNum - 2] ;
		}
		color = getNodeByRandom(colorList) ;
		console.debug(color) ;
		creatbox();
		/*specialSty();*/
		norStyleCount();
		specialClick();

		$('#question-info').html(question) ;
		boxNum++;
	}
	/*生成内容*/
	function creatbox(){
		var _html="<div>";
		var cImg = img.replace("{imgName}",imgName) ;
		for(var i=0,j=boxNum;i<j;i++){
			_html+='<span class="normalStyle">'+cImg+'</span>';
			for (var m=0,k=boxNum-1;m<k;m++) {
				_html+='<span class="normalStyle">'+cImg+'</span>';
			}
		};
		_html+="</div>" ;
		$(".cavwrap").append(_html);
	}
	/*设置box宽高*/
	function norStyleCount(){
		/*
		var r=Math.floor(Math.random()*255);
		var g=Math.floor(Math.random()*255);
		var b=Math.floor(Math.random()*255);
		$(".normalStyle").css({backgroundColor:"rgb("+r+","+g+","+b+")"});
		*/
		$(".normalStyle").css({backgroundColor:color});
		$(".normalStyle").width((cavwrap.offsetWidth-10-2*boxNum)/boxNum);
		$(".normalStyle").height((cavwrap.offsetHeight-10-2*boxNum)/boxNum);
		$(".normalStyle .image").width((cavwrap.offsetWidth-10-2*boxNum)/boxNum);
		$(".normalStyle .image").height((cavwrap.offsetHeight-10-2*boxNum)/boxNum);
		//specialSty(r,g,b);
		specialImg() ;
	}

	/*随机特殊图片*/
	function specialImg(){
		var num1=Math.floor(Math.random()*(boxNum*boxNum));
		for(var i=0,j=$(".normalStyle").length;i<j;i++){
			if(i==num1){
				$this = $(".normalStyle").eq(i).addClass("specialStyle");
				$(".specialStyle").css({backgroundColor:color});
				$(".specialStyle .image").attr('src' ,imgBadName);
			}
		}
	}

	var cavwrap=document.querySelectorAll(".cavwrap")[0];
	cavwrap.style.width=document.documentElement.clientWidth+"px";
	cavwrap.style.height=document.documentElement.clientHeight/2+"px";
	/*cavwrap.style.marginTop="2.8rem";*/
	//cavwrap.style.backgroundColor="#eee"
	var btn=document.querySelectorAll("button")[0];
	var boxNum=2;
	var norStyle=document.querySelector(".normalStyle");
	/*游戏页面出现*/
	$("#start").on("click",function(){
		$("#gameTimeShow").html("60");
		$("#scoreCountShow").html("0")
		$('.index').hide() ;
		$('.start_game').show();
		/*$('.start_top').show();*/
		answertime = setInterval(answerdjs,1000);
		creatFunction();
	});

	/*活动规则*/
	$(".index").on("click","#activeRule_key",function(){
		$(".index_activeRule").show();
	});
	$(".index").on("click",".index_activeRule",function(){
		$(".index_activeRule").hide();
	});

	/*点击暂停按钮*/
	$("#stop_btn").on("click", function () {
		$(".pause_page ").show();
		clearInterval(answertime);
		$(".food_img ").hide();
	});

	/*点击X跳到首页*/
	$(".wrap").on("click", ".close_btn",function(){
		alert(1);
		clearInterval(answertime);
		totalScore= 0;
		boxNum=2;
		indexSub=0;
		$(".controlAlertPage ").hide();
		$("#food_img").show();
		$("#start_game").hide();
		$(".index").show();

	});

	/*继续游戏*/
	$("#continue").on("click", function () {
		$(".pause_page ").hide();
		$(".food_img ").show();
		answertime=setInterval(answerdjs,1000);
	});
	/*点击一次对的加一分，分数到20时题目答完*/
	function specialClick(){
		$(".specialStyle").on("click",function(){
			totalScore++ ;
			if(totalScore>=20){
				clearInterval(totalScore);
				$(".controlAlertPage").hide();
				$(".question_end").show();
				return false;
			}
			$("#scoreCountShow").html(totalScore);
			creatFunction();
			/*scoredjs() ;*/
		});
	}

	/*随机特殊样式*/
	function specialSty(r,g,b){
		var num1=Math.floor(Math.random()*(boxNum*boxNum));
		if(r>=225){
			var d=r-35
		}else{
			var d=r+35
		}
		if(g>=255){
			var e=g-15
		}else{
			var e=g+15
		}
		if(b>=255){
			var f=b-15
		}else{
			var f=b+15
		}
		for(var i=0,j=$(".normalStyle").length;i<j;i++){
			if(i==num1){
				$(".normalStyle").eq(i).addClass("specialStyle");
				$(".specialStyle").css({backgroundColor:"rgb("+d+","+g+","+b+")"});
			}
		}
	}

	/*不同分数情况描述*/
	function differdesc(){
		if ( totalScore <= 5) {
			$(".searchText").html("吃东西这么百无禁忌真的好吗？");
		} else if (totalScore >= 6 && totalScore <11) {
			$(".searchText").html("以后吃东西不怕中毒了哦~");
		} else if (totalScore >= 11 && totalScore <16) {
			$(".searchText").html("再小的危机都逃不出你的视线！");
		} else if (totalScore >= 16 && totalScore <20) {
			$(".searchText").html("你的眼睛难道就是传说中的危机扫描仪？！");
		}
	}

	/* 计时器 */
	function answerdjs() {
		var time = $("#gameTimeShow").html();
		timenum = parseInt(time);
		timenum--;
		if (timenum <= 0) {
			clearInterval(answertime);
			$(".searchNum").html(totalScore);
			$(".food_img ").hide();
			$(".time_over ").show();
			$(".alertpage_out ").show();
			differdesc();
		}
		$("#gameTimeShow").html(timenum);
	}


});


