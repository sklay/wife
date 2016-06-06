//是否停止计时
var timestop = false ;
//计时器 完成游戏所消耗的时间
var countdown=0; 
var cardDom = '<div class="card"><div class="face front"></div><div class="face back"></div></div>' ;
var neusoft={};

neusoft.matchingGame={};
//neusoft.matchingGame.cardWidth=1.4;//牌宽
//neusoft.matchingGame.cardHeight=2;
//组织页面的纸牌数据
neusoft.matchingGame.deck=
    [
        "card1","card1",
        "card2","card2",
        "card3","card3",
        "card4","card4",
        "card5","card5",
        "card6","card6",
		"card7","card7",
		"card8","card8"
    ]
	
/**获取翻牌游戏结果*/
function gameFinished(timetotalused){
	var card_correct_count = $('div.playGame_imgBack>img.card-active').length ;
	timeused = timetotalused ;
	$('#timeused').text(timetotalused) ;
	$('div.card').unbind("tap"); 
	$(".start_game").hide();
	$('.scoreResultShow').show() ;
	getMenuShare();
}

//随机排序函数，返回-1或1
function shuffle(){
    //Math.random能返回0~1之间的数
    return Math.random()>0.5 ? -1 : 1
}
//  翻牌功能的实现
function selectCard() {
    var $fcard=$(".card-flipped");
    //翻了两张牌后退出翻牌
    if($fcard.length>1){
        return;
    }
   $(this).addClass("card-flipped");
//    若翻动了两张牌，检测一致性
    var $fcards=$(".card-flipped");
    if($fcards.length==2){
        setTimeout(function(){
        checkPattern($fcards);},500);
    }
}
//检测2张牌是否一致
function checkPattern(cards){
    var pattern1 = $(cards[0]).data("pattern");
    var pattern2 = $(cards[1]).data("pattern");
    $(cards).removeClass("card-flipped");
    if(pattern1==pattern2){
    	$(cards[0]).unbind("tap") ;
    	$(cards[1]).unbind("tap") ;
	    $(cards).addClass("card-correct") ;
	    $lightImg = $('img.light-'+pattern1) ;
	    var src = $lightImg.attr('src') ;
	    var dataSrc = src.replace('.','_'+pattern1+'.') ;
	    $lightImg.attr('src' ,dataSrc) ;
	    $lightImg.attr('data-src',src) ;
	 	$lightImg.addClass("card-active") ;
	 	var card_correct_count = $('div.playGame_imgBack>img.card-active').length ;
	 	var all_card_count = $('div.playGame_imgBack>img').length 
	 	if(all_card_count == card_correct_count){
	 		timestop = true ;
	 	}
    }
}
//游戏初始化
function playGame(){
	//清空子节点
	$("#cards").children().remove();
	//实现随机洗牌
	var arrayDeck = neusoft.matchingGame.deck.slice() ;
	arrayDeck = arrayDeck.sort(shuffle);
	for(var i= 0;i<16;i++){
		$(cardDom).appendTo($("#cards"));
	}
	//对每张牌进行设置
	$(".card").each(function(index){
		//吐出一个牌号
		var pattern= arrayDeck.pop();
		//暂存牌号
		$(this).data("pattern",pattern);
		//把其翻牌后的对应牌面附加上去
		$(this).find(".back").addClass(pattern);
		//点击牌的功能函数挂接
		$(this).tap(selectCard);
	});
	//计时器
	settime('#gameTimeShow') ;
	//getMenuShare();
};
//计时器方法
function settime(obj) { 
    if (timestop) { 
		// 统计结果		
		gameFinished((countdown-1)) ;
        return;
    } else { 
	var text = countdown ;
	if(countdown < 10)
		text= '0'+text ;
        $(obj).text(text); 
        countdown++; 
    };
	setTimeout(function() { 
	    settime(obj) }
	    ,1000) 
}
	
/**始游戏初 */
function initGame(){
	timestop = false ;
	//计时器 完成游戏所消耗的时间
	countdown=0; 
	$('div.playGame_imgBack>img').each(function(){
		$img = $(this);
		$img.removeClass('card-active') ;
		if($img.attr('data-src')){
			$img.attr('src' , $img.attr('data-src')) ;
		}
	});
	//初始化游戏界面
	playGame();
	getMenuShare();
}
	
	
//翻牌游戏页面初始化
$(function(){
	/*点击START进入游戏倒计时*/
	$("#startGameBtn").on("tap",function(){
		haveScore=true;
		$(".Pagecontroller").hide();
		$("#start_game").show();
		/**始游戏初 */
		initGame() ;
		getMenuShare();
	});
	
	//成绩页面关闭按钮
	$(".closeAndBackClick").on("tap",function(){
		initialize();
		getMenuShare();
	}) ;
	/*初始化函数*/
	function initialize(){
		haveScore=false;
		$(".commonPage_wrapStyle").hide();
		$(".startPage").show();
		
		$(".receivePageCont").hide();
		$("#receive_page").show();
		
//		$(".timeCountDown_wrap").show().css({transform:"scale(1)",webkitTransform:"scale(1)",opacity:"1"});
	};
	//领取奖品
	/*$('#receivePrize').on('tap',function(){
		$('.scoreResultShow').hide() ;
		$("#getHBPage").show();
	}) ;*/
	
	/*领取奖励*/
	$(".getHbNow").on("click",function(){
		gethbFun();
	});
	//领取奖励事件
	function gethbFun(){
		$(".commonPage_wrapStyle ").hide();
		$(".receive_page").show();
	};
	
	/*点击分享*/
	$(".shareFri").on("click",function(){
		if(is_weixin()){
			$("#shareshade").show();
		}else{
			$(".common_useStyle").hide();
			$("#shareAppPage").show()
		}
	});
	$("#shareAppPage").on("click",function(e){
		var ev=e.target;
		if(ev.nodeName!="BUTTON"){
			$("#shareAppPage").hide();
			$(".common_useStyle").show();
		}
	});
	
	if(is_weixin()){
		//$("#downloadA").attr("href","http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653");
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
					};
					  wx.ready(function(){
						getMenuShare();
					  });
				}
			});
	};	

	
	//领取事件
	 var time1=null;
		function getCodeCommon(url,otherInfoSubmit){
			waitShow();
			if($("#commomLogin_getcode").attr("noclick")){
				waitClose();
				return false;
			};
			var $_phoneno=$("#commomLogin_phoneNum").val();
			var regno = /1[3-8]+\d{9}/;
			if (!regno.test($_phoneno)) {
				alert("请输入正确的手机号！");
				waitClose();
				return false;
			};
			$("#commomLogin_getcode").attr("noclick",true);
			var _url=url;
			var _otherInfoSubmit=otherInfoSubmit?otherInfoSubmit : "";
			var n=60;
			$.ajax({
				type:"post",
	 			url:_url,
	 			data:"phoneNum="+$_phoneno+"&"+_otherInfoSubmit,
	 			success:function(result){
	 				waitClose();
	 				if (result.result == "succ") {
						$("#commomLogin_getcode").css('background','#ccc');
						$(".commomLogin_getcode").hide();
						$(".commomLogin_getcodeagain").show();
						$("#commomLogin_loginwarn").html("验证码短信已发送至您的手机");
						time1=setInterval(function(){
							n--;
							$(".commomLogin_getcodeagain var").html(n);
							if(n<=0){
								getedHandle();
							}
						},1000)
		    		}else{
		    			waitClose();
		    			alert(result.message);
		    			$("#commomLogin_getcode").removeAttr("noclick");
		    		}
	 			},error:function(){
	 				waitClose();
	 				alert("发送请求失败");
	 				$("#commomLogin_getcode").removeAttr("noclick");
		        }
			});
		};
		
		function submitPhoneCodeCommon(url,succFun,receivedFun,otherInfoSubmit){
			waitShow();
			var _otherInfoSubmit=otherInfoSubmit?otherInfoSubmit:"";
	 		$_phoneno=$("#commomLogin_phoneNum").val();
	 		$_code=$("#commomLogin_codeNum").val()
	 		var regno = /1[3-8]+\d{9}/;
	 		if($_phoneno==""||$_phoneno=="请输入手机号码"||!regno.test($_phoneno)){
	 			waitClose();
	 			alert("请输入正确的手机号码")
	 			return false
	 		};
	 		if($_code==""||($_code=="请输入验证码")){
	 			waitClose();
	 			alert("请输入正确的验证码")
	 			return false
	 		};
	 		var _url=url;
	 		var _otherInfoSubmit=otherInfoSubmit?otherInfoSubmit : "";
	 		var _inviteCode='hbLaba2015';
	 		var _fromChannel='fromChannel';
	 		$.ajax({
	 			type:"post",
	 			url:_url,
	 			//data:"phone="+$_phoneno+"&code="+$_code,
	 			data:"phone="+$_phoneno+"&code="+$_code+"&inviteCode="+_inviteCode+"&fromChannel="+_fromChannel,
	 			success:function(result){
	 				waitClose();
	 				$("#commomLogin_phoneNum").val("");
	 			  	$("#commomLogin_codeNum").val("")
	 				if (result.result == "succ") {
		    			succFun();
		    			getedHandle();
		    		}else if(result.result == "fail"){
		    			if(result.message=="received"){
		    				receivedFun();
		    				getedHandle();
		    			}else{
		    				alert(result.message);
		    				waitClose();
		    				getedHandle();
		    			}
		    		}
	 			},error:function(){
		        	alert("发送请求失败");
		        	waitClose();
		        	getedHandle();
	 			}
	 		});
		}
		function getedHandle(){
			clearInterval(time1);
			$("#commomLogin_getcode").removeAttr("noclick").css('background','#fffc00');
			$("#commomLogin_loginwarn").html("为保证您能成功领取奖品，请如实填写");
			$(".commomLogin_getcode").show();
			$(".commomLogin_getcodeagain").hide();
			$(".commomLogin_getcodeagain var").html('60');
		};
		
		$("#receive_page").on("click","#commomLogin_getcode",function(){
			getCodeCommon("comValCodeAjax");
		});
		$("#receive_page").on("click","#loginsumbit",function(){
			submitPhoneCodeCommon("comRecReward",function(){
				$(".receive_code").hide();
			  	$(".receive_success_box").show();
			  	
			},function(){
				$(".receive_code").hide();
			  	$(".have_received_box").show(); 
			});
		});
		//活动过期后 ，领取按钮不可用
		(function(){
			if(!state){
				 /*$(".commonPage_wrapStyle .getHbNow").find("img").attr({src:"images/act_laba_result_getBtn.png"});*/
				$(".commonPage_wrapStyle .getHbNow").hide();
				$(".commonPage_wrapStyle .getHbNow").off("click",function(){
						gethbFun()
					}); 
			}
		})();
});
