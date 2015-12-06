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
		},1000);
		
		getMyDesc();
		getMenuShare();
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
		getMyDesc();
		getMenuShare();
	});
	/*不服再战*/
	$(".playAgain").on("click",function(){
		initialize();
	});
	/*领取奖励*/
	$(".getHbNow").on("click",function(){
		/*initialize();*/
		$(".commonPage_wrapStyle ").hide();
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
	});
	
	if(is_weixin()){
		$("#downloadA").attr("href","http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653");
	};	

	function getMyDesc(){
		if(haveScore){
			if (scoreNum<2999){
				wechatObj.desc="我在【药快到】测试了下肺活量，肺活量指数达到"+scoreNum+"，超过20%的小伙伴，你要不要也来试一下？";
			}else if(scoreNum>2999 && scoreNum<5999){
				wechatObj.desc="我在【药快到】测试了下肺活量，肺活量指数达到"+scoreNum+"，超过40%的小伙伴，你要不要也来试一下？";
			}else if(scoreNum>5999 && scoreNum<7999){
				wechatObj.desc="我在【药快到】测试了下肺活量，肺活量指数达到"+scoreNum+"，超过80%的小伙伴，你要不要也来试一下？";
			}else if(scoreNum>=7999){
				wechatObj.desc="我在【药快到】测试了下肺活量，肺活量指数达到"+scoreNum+"，经鉴定我的肺已超神，你能超过我吗？";
			}
		}else{
			wechatObj.desc="我在【药快到】参加了肺活量测试，结果超乎想象，你能超过我吗？"
		}
		$("meta[name=description]").eq(0).attr({content:wechatObj.desc}); 
	}
	
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
				}
			}
		});
})
