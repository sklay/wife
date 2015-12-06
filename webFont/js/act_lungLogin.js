   $(function(){
		 /*领取事件  */
		/*$("#receive_page").on("click","#commomLogin_getcodeBtn",function(){
			getCodeCommon("comValCodeAjax");
		});
		$("#receive_page").on("click","#loginsumbit",function(){
			submitPhoneCodeCommon("receiveELReward",function(){
				$(".controlAlertPage").hide();
			  	$(".receive_success").show();
			},function(){
				$(".controlAlertPage").hide();
			  	$(".have_received").show(); 
			});
		});*/
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
		$("#commomLogin_getcode").removeAttr("noclick").css('background','#F7F40A');
		$("#commomLogin_loginwarn").html("为保证您能成功领取奖品，请如实填写");
		$(".commomLogin_getcode").show();
		$(".commomLogin_getcodeagain").hide();
		$(".commomLogin_getcodeagain var").html('60');
	}
 }) 
