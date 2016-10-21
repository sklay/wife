/**
 * 
 */
$(function(){
	/*活动规则*/
	$(".index").on("click","#activeRule_key",function(){
		$(".index_activeRule").show();
	});
	$(".index").on("click",".index_activeRule",function(){
		$(".index_activeRule").hide();
	});
	
	/*答题函数*/
	var indexSub		= 0 ;
	//var path 			= "images/" ;
	var colorList 		= ["#017fe2","#fff103","#ffcc1b","#acff0b","#00fff6","#fc397e","#c000f0"] ;
	//var normalImgPrefix = "act_game_" ;
	//var badImgPrefix 	= "act_game_bad_" ;
	//var imgSuffix 		= ".png" ;
	var color			= "" ;
	var img 			= '<img class="image" src="{imgName}" />' ;
	var maxImgList		= ["77_1.png","77_2.png","77_3.png","77_4.png","77_5.png","77_6.png","77_7.png","77_8.png","77_9.png","77_10.png","77_11.png","77_12.png","77_13.png","77_14.png","77_15.png"] ;
	var imgName			= "" ;
	var imgBadName		= "" ;
	var imgMaxLength	= 0 ;
	//var scoreNum=0;//得分记录；
	var countDownNum=60;//倒计时初始值；
	var countDownTime=null;//倒计时计时器;
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
	function getNodeByRandom(nodeList){
		var index = Math.floor(Math.random()*nodeList.length);
		var node = nodeList[index];
		nodeList.splice(index,1);
		return node;
	}
	/*点击生成主函数*/
	function creatFunction(){
		$(".cavwrap").empty();
		if(boxNum >= 7){
			if(indexSub >= maxImgList.length){
				//alert("Game Over") ;
				return ;
			}
			boxNum=7;
			colorList = ["#017fe2","#fff103","#ffcc1b","#acff0b","#00fff6","#fc397e","#c000f0"] ;
			question = questions[indexSub+5] ;
			var name = maxImgList[indexSub] ;
			imgName = path + normalImgPrefix + name ;
			imgBadName = path + badImgPrefix + name ;
			indexSub++ ;
		}else{
			imgName = path + normalImgPrefix + boxNum + "" + boxNum + imgSuffix;
			imgBadName =  path + badImgPrefix + boxNum + "" + boxNum + imgSuffix;
			question = questions[boxNum - 2] ;
		}
		color = getNodeByRandom(colorList) ;
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
		_html+="</div>";
		$(".cavwrap").append(_html);
	}
	/*设置box宽高*/
	function norStyleCount(){
		$(".normalStyle").css({backgroundColor:color});
		$(".normalStyle").width((cavwrap.offsetWidth-10-4*boxNum)/boxNum);
		$(".normalStyle").height((cavwrap.offsetHeight-10-4*boxNum)/boxNum);
		$(".normalStyle .image").width((cavwrap.offsetWidth-10-4*boxNum)/boxNum);
		$(".normalStyle .image").height((cavwrap.offsetHeight-10-4*boxNum)/boxNum);
		specialImg() ;
	}

	/*随机特殊图片*/
	function specialImg(){
		var num1=Math.floor(Math.random()*(boxNum*boxNum));
		//给随机出来的 图片加上特殊的样式specialStyle
		$(".normalStyle").eq(num1).addClass("specialStyle");
		$(".specialStyle").css({backgroundColor:color});
		$(".specialStyle .image").attr('src' ,imgBadName);
	}
	
	var cavwrap=document.querySelectorAll(".cavwrap")[0];
	//设置画布的 宽高
	cavwrap.style.width=document.documentElement.clientWidth+"px";
	cavwrap.style.height=document.documentElement.clientHeight/1.8+"px";
	//cavwrap.style.backgroundColor="#eee"
	//var btn=document.querySelectorAll("button")[0];
	var boxNum=2;
	//var norStyle=document.querySelector(".normalStyle");
	/*游戏页面出现*/
	$("#start").on("click",function(){
		$("#gameTimeShow").html("60");
		$("#scoreCountShow").html("0");
		$('.index').hide();
		$('.start_game').show();
		haveScore=true;
		creatFunction();
		countDownFun();
		getMyDesc();
		getMenuShare();
	});
	function specialClick(){
		$(".specialStyle").on("click",function(){
			scoreNum++;
			if(scoreNum>=20){
				 clearInterval(countDownTime);
				$(".controlAlertPage").hide();
				$(".question_end").show();
				$("#scoreCountShow").html("20");
				getMyDesc();
				getMenuShare();
				return false;
			}
			$("#scoreCountShow").html(scoreNum);
			creatFunction();
			getMyDesc();
			getMenuShare();
		});
	}
	/*暂停*/
	$("#stop_btn").on("click",function(){
		var pauseScore=$("#scoreCountShow").html();
		var pauseTime=$("#gameTimeShow").html();
		scoreNum=pauseScore;//保存得分记录；
		countDownNum=pauseTime;//保存倒计时时间；
		clearInterval(countDownTime);
		$(".controlAlertPage").hide();
		$(".pause_page").show();
	});
   /*暂停结束，继续游戏*/
	  $("#continue").on("click",function(){
	  	$("#scoreCountShow").html(scoreNum)
	  	$(".controlAlertPage").hide();
	  	$("#food_img").show();
	  	$(".start_game").show();
	  	countDownFun()
	  });
	
	
	/*倒计时函数*/
	function countDownFun(){
		countDownTime=setInterval(function(){
			countDownNum--;
			$("#gameTimeShow").html(countDownNum);
			if(countDownNum<=0){
				timeOutFun();
				$("#gameTimeShow").html("0");
				clearInterval(countDownTime);
				return false;
			};
		},1000)
	};
	/*点击弹窗的关闭按钮，返回首页*/
	$(".wrap").on("click",".closeShade",function(){
		clearInterval(countDownTime);
		/*状态值回复初始*/
		scoreNum=0;
		countDownNum=60;
		boxNum=2;
		indexSub=0;
		$(".controlAlertPage").hide();
		$("#food_img").show();
		$("#start_game").hide();
	  	$(".index").show();
	  	haveScore=false;
	  	getMyDesc();
	  	getMenuShare();
	})
	
	/*倒计时结束函数*/
	function timeOutFun(){
		clearInterval(countDownTime);
		$("#finalScoreNum").html(scoreNum);
		$(".controlAlertPage").hide();
	  	$(".time_over").show();
	  	$("#shareshade").hide();
	  	showResultFun();
	};
	/*不同得分的结果展示文案*/
	function showResultFun(){
		if (scoreNum<=5){
			$("#scoreLevelText").html("吃东西这么百无禁忌真的好吗？");
		}else if(scoreNum>5 && scoreNum<=10){
			$("#scoreLevelText").html("以后吃东西不怕中毒了哦~");
		}else if(scoreNum>10 && scoreNum<=15){
			$("#scoreLevelText").html("再小的危机都逃不出你的视线");
		}else if(scoreNum>15 && scoreNum<20){
			$("#scoreLevelText").html("你的眼睛难道就是<br/>传说中的危机扫描仪？");
		}
	};
	/*点击领取奖励*/
	$(".getAward").on("click",function(){
		$(".controlAlertPage").hide();
	  	$(".receive_page").show();
	});
	/*点击分享*/
	$(".shareFri").on("click",function(){
		if(is_weixin()){
			$("#shareshade").show();
		}else{
			$("#shareAppPage").show()
		}
		
	});
	$("#shareAppPage").on("click",function(e){
		var ev=e.target;
		if(ev.nodeName!="BUTTON"){
			$("#shareAppPage").hide();
		}
	})
	
	if(is_weixin()){
		$("#downloadA").attr("href","http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653");
	};	



	function getMyDesc(){
		if(haveScore){
			if (scoreNum<=5){
				wechatObj.desc="我在【药快到】活动找到了"+scoreNum+"种问题食品，快来看看自己能到哪关！";
			}else if(scoreNum>5 && scoreNum<=10){
				wechatObj.desc="我在【药快到】活动找到了"+scoreNum+"种问题食品，快来看看自己能到哪关！";
			}else if(scoreNum>10 && scoreNum<=15){
				wechatObj.desc="我在【药快到】活动找到了"+scoreNum+"种问题食品，吃饭带着我可验毒哦~";
			}else if(scoreNum>15 && scoreNum<20){
				wechatObj.desc="我在【药快到】活动找到了"+scoreNum+"种问题食品，我就不信你能找到的比我多！";
			}else if(scoreNum>=20){
				wechatObj.desc="我在【药快到】活动找到了"+scoreNum+"种问题食品，据说全世界只有0.1%的人能做到，不服来战！";
			}
		}else{
			wechatObj.desc="食品卫生，你注意过吗？快来看看自己能到哪关！"
		}
		$("meta[name=description]").eq(0).attr({content:wechatObj.desc}); 
	}
	/* if(haveScore){
			if (scoreNum<=5){
				//desDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【盲人摸象】称号,拯救我的任务就交给你了！";
				var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【盲人摸象】称号,拯救我的任务就交给你了！";
			}else if(scoreNum>5 && scoreNum<=10){
				//desDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【挑刺达人】称号,快来看看你能找到多少？";
				var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【挑刺达人】称号,快来看看你能找到多少？";
			}else if(scoreNum>10 && scoreNum<=15){
				var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【安全卫士】称号,以后吃饭带着我可验毒哦~";
			}else if(scoreNum>15 && scoreNum<20){
				var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【火眼金睛】称号,我就不信你能找到的比我多！";
			}else if(scoreNum>=20){
				var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【火眼金睛】称号,据说全世界只有0.1%的人能做到，不服来战！";
			}
		}else{*/
			//var myDesc="食品卫生，你注意过吗？快来看看自己能到哪关！" ;
		/*};*/
	
	 $.ajax({url:"/medhtml/common/getwxjssign?",data:{url: location.href.split('#')[0]},
			success:function(wechatReturn){
				if (wechatReturn) {
					wx.config({
					    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					    appId: 'wxade8c5e473c645e9', // 必填，公众号的唯一标识
					    timestamp: wechatReturn.timestamp, // 必填，生成签名的时间戳
					    nonceStr: wechatReturn.nonceStr, // 必填，生成签名的随机串
					    signature: wechatReturn.signature,// 必填，签名，见附录1
					    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					 });
					/* var wechatObj = new Object();
				 	 wechatObj.title ='【药快到】食品卫生找茬大赛';
				 	wechatObj.desc=$("#wxShareCon").val();
				    // wechatObj.link = 'http://store.ykd365.com:10080/medhtml/common/910tech_index'; 
				    wechatObj.link = 'http://test.ykd365.com:10080/medhtml/common/startFSGame';
				    wechatObj.imgUrl ='http://imgstore.camore.cn/icon/logo/act_foodSagety_weixinShare.jpg'; */
				    
				}
			}
		});
	 
	 
	/* if(haveScore){
			if (scoreNum<=5){
				var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【盲人摸象】称号,拯救我的任务就交给你了！";
			}else if(scoreNum>5 && scoreNum<=10){
				var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【挑刺达人】称号,快来看看你能找到多少？";
			}else if(scoreNum>10 && scoreNum<=15){
				var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【安全卫士】称号,以后吃饭带着我可验毒哦~";
			}else if(scoreNum>15 && scoreNum<20){
				var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【火眼金睛】称号,我就不信你能找到的比我多！";
			}else if(scoreNum>=20){
				var myDesc="我在【药快到】食品卫生找茬大赛中找到了"+scoreNum+"种有问题的食品，获得【火眼金睛】称号,据说全世界只有0.1%的人能做到，不服来战！";
			}
		}else{
			var myDesc =  "食品卫生，你注意过吗？快来看看自己能到哪关！" ;
		};*/
		/* var wechatObj ={
				 	trigger:function(){getMyDesc()},
		    		title:'【药快到】食品卫生找茬大赛', // 分享标题
		    		desc:myDesc, // 分享描述
		    	    link:'http://test.ykd365.com:10080/medhtml/common/startFSGame', // 分享链接
		    	    imgUrl:'http://imgstore.camore.cn/icon/logo/act_foodSagety_weixinShare.jpg', // 分享图标
		    	    success: function () { 
		    	    	shareSucc();
		    	    },
		    	    cancel: function () {
		    	    }	
		    };
		    /* wx.ready(function(){
		    	wx.onMenuShareTimeline(wechatObj1); 
		    	 wx.onMenuShareAppMessage(wechatObj);
		    }) ; */
	 /*document.addEventListener("wx.ready",function(){*/
		    wx.ready(function(){
		    	getMenuShare()
		    }) ; 
		    
	/*$(".shareFri").on('click',function(){
		 wx.onMenuShareAppMessage({
    		 title:wechatObj.title, // 分享标题
    		desc:wechatObj.desc, // 分享描述
    		link:wechatObj.link, // 分享链接
    	    imgUrl:wechatObj.imgUrl, // 分享图标
    	    success: function () { 
    	    	shareSucc();
    	    },
    	    cancel: function () {
    	    }	
    	});
	});*/
	
})

