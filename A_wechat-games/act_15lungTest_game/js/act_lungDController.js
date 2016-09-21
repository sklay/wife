
$(function(){
	
	/*点击START进入游戏倒计时*/	
	$("#startGameBtn").on("tap",function(){
		haveScore=true;
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
						$(".timeCountDown_wrap").animate({scale:"1",opacity:"1"});
						scoreTime();
					});
				},200)
				return false;
			}
			$("#TimeCountDown").html(countDownTime);
		},1000);
		getMenuShare();
	});
	var playGCDTime=null;
	
	/*点击自增分数事件*/
	function scoreNumPlus(){
		scoreNum+=100;
		$("#scoreCount").html(scoreNum);
		btnAnim();
		getMenuShare();
	};
	/*点击按钮动画*/
	function btnAnim(){
		$("#playGameBtn_move1").animate({translateY:".15rem"},10,function(){
			$("#playGameBtn_move1").animate({translateY:"0rem"},10);
		})
	};
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
		haveScore=false;
		$(".commonPage_wrapStyle").hide();
		$("#startPage").show();
		scoreNum=0;
		$("#scoreCount").html("0");
		$("#playGameBtn").on("tap",scoreNumPlus);
		$(".receivePageCont").hide();
		$("#receive_page").show();
		
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
	$(".commonPage_wrapStyle").on("click",".closeAndBackClick",function(){
		initialize();
		getMenuShare();
	});
	/*不服再战*/
	$(".commonPage_wrapStyle").on("click",".playAgain",function(){
		initialize();
		getMenuShare();
	});
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
		$("#downloadA").attr("href","http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653");
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
	 		$.ajax({
	 			type:"post",
	 			url:_url,
	 			//data:"phone="+$_phoneno+"&code="+$_code+"&"+_otherInfoSubmit,
	 			data:"phone="+$_phoneno+"&code="+$_code,
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
			$("#commomLogin_getcode").removeAttr("noclick").css('background','#a7e3ff');
			$("#commomLogin_loginwarn").html("为保证您能成功领取奖品，请如实填写");
			$(".commomLogin_getcode").show();
			$(".commomLogin_getcodeagain").hide();
			$(".commomLogin_getcodeagain var").html('60');
		};
		
		$("#receive_page").on("click","#commomLogin_getcode",function(){
			getCodeCommon("comValCodeAjax");
		});
		$("#receive_page").on("click","#loginsumbit",function(){
			submitPhoneCodeCommon("receiveLungReward",function(){
				$(".receive_code").hide();
			  	$(".receive_success_box").show();
			  	
			},function(){
				$(".receive_code").hide();
			  	$(".have_received_box").show(); 
			});
		});
		(function(){
			if(!state){
				 $(".commonPage_wrapStyle .getHbNow").find("img").attr({src:"images/act_lung_actEndReveiveBtn.png"});
				 $(".commonPage_wrapStyle .getHbNow").off("click",function(){
						gethbFun()
					}); 
			}
		})();
})
