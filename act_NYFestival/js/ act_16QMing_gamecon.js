/**
 * Created by gonglei.bian on 2016/2/19.
 */

var QUESTIONS = [
			{"id":10000 ,"question":"清明时节雨纷纷,","options":[{"id":10001,"option":"路上行人像断魂"},{"id":10002,"option":"路上行人欲断魂"},{"id":10003,"option":"路上行人在招魂"},{"id":10004,"option":"路上行人丢了魂"}], "answer":10002},
			{"id":20000 ,"question":"借问酒家何处有,","options":[{"id":20001,"option":"牧童遥指稻香村"},{"id":20002,"option":"酒香不怕巷子深"},{"id":20003,"option":"牧童遥指酒鬼村"},{"id":20004,"option":"牧童遥指杏花村"}], "answer":20004},
			{"id":30000 ,"question":"兴味萧然似野僧","options":[{"id":30001,"option":"无花无酒过清明"},{"id":30002,"option":"一壶好酒过清明"},{"id":30003,"option":"孤帆远影碧空尽"},{"id":30004,"option":"喝点小酒来点肉"}], "answer":30001},
			{"id":40000 ,"question":"田野荒冢只生愁","options":[{"id":40001,"option":"一骑红尘妃子笑"},{"id":40002,"option":"佳节清明桃李笑"},{"id":40003,"option":"佳节清明旧人笑"},{"id":40004,"option":"屋里对镜咧嘴笑"}], "answer":40002},
			{"id":50000 ,"question":"南北山头多墓田,","options":[{"id":50001,"option":"西北坟头多草甸"},{"id":50002,"option":"清明祭扫多泪流"},{"id":50003,"option":"清明祭扫各纷然"},{"id":50004,"option":"东西山头多坟墓"}], "answer":50003},
			{"id":60000 ,"question":"素衣莫起风尘叹,","options":[{"id":60001,"option":"犹及清明可到家"},{"id":60002,"option":"锦衣清明就回家"},{"id":60003,"option":"清明还不能回家"},{"id":60004,"option":"清明祭扫小长假"}], "answer":60001},
			{"id":70000 ,"question":"帝里重清明,",    "options":[{"id":70001,"option":"郊外重哀思"},    {"id":70002,"option":"不再忘忧思"},   {"id":70003,"option":"人心自愁思"},    {"id":70004,"option":"节过更愁思"}],     "answer":70003},
			{"id":80000 ,"question":"好风胧月清明夜,","options":[{"id":80001,"option":"大红灯笼高高挂"},{"id":80002,"option":"灯火通明官府家"},{"id":80003,"option":"关好门窗少进风"},{"id":80004,"option":"碧砌红轩刺史家"}], "answer":80004}
	]



$(function(){
	var SUCCESS = 0 ;
	var waitGame = null ;
	  $(".indexPage").on("click","#goToGamePage",function(){
            $(".gamePage").fadeIn(100);
            $(".indexPage").hide(100);
            initQuestion(0) ;
            
        });

	
	function initQuestion(index){
		
		var QNo = '<span>题目：</span>' ;
		var QSpase = '<p class="ques_userCop">&nbsp;</p>' ;//站位
		var QTitle = '<p class="ques_remind" >{title}</p>' ;//诗句提示
		/*选项*/
		var QOption = '<div class="question_queNum" data-answer="{answer}" data-index="{index}"><span class="radioBtn"></span><p class="quest_verse">{opt}</p></div>' ;
	
		var cindex = index || 0 ;
		
		if(0 == cindex){
			SUCCESS = 0 ;
			waitGame = null ;
		}
		
		if(waitGame){
			clearInterval(waitGame);
		}
		
		if(cindex >= QUESTIONS.length){
			console.debug('题目溢出了') ;
			return ;
		}
		
		var $question = QUESTIONS[cindex] ;
		
//		console.debug('cinde : ' , cindex , "  $questions : " ,$question) ;
  		/**正确答案编号*/
  		var ans = $question.answer ;
  		/**选项*/
  		$options = $question.options ;
  		
  		/**问题*/
  		$question_title = $question.question ;
  		
  		var opts = '' ;
  		$.each($options,function(opt_index,option){
  			$option = option ;
  			
  			/**标识该选项是否正确*/
  			if(ans == $option.id){
  				opts += QOption.replace('{answer}' ,true).replace('{opt}' , $option.option).replace('{index}' ,cindex) ;
  				/*正确的时候背景图片换*/
  				$('.question_queNum').css("background","url(../images/act_16QMing_puestion_rightBack.png)top center no-repeat");
				$('span').contents().unwrap().wrap('<img class="result_icon" src="images/act_16QMing_puestion_righticon.png"/>');
  			}else{
  				opts += QOption.replace('{answer}' ,false).replace('{opt}' , $option.option).replace('{index}',cindex) ;
  				
  				$('.question_queNum').css("background","url(../images/act_16QMing_puestion_errorback.png)top center no-repeat");
				$('span').contents().unwrap().wrap('<img class="result_icon" src="images/act_16QMing_puestion_erroricon.png"/>');
  			}
  		}) ;
//	  		alert('第'+(item_index+1)+'题 问题是 ，' + $question.question + '\n选项是： '+ ops + "\n答案是： " + $question.answer) ;
		 
		/**判断标识位置 是在前面还是在后面*/
	  	if($question_title.indexOf(',') > 0){
	  		QTitle = QTitle.replace('{title}' , $question_title) ;
	  		var content = QNo + QTitle + QSpase ; 
	  	}else{
	  		QTitle = QTitle.replace('{title}' , $question_title) ;
	  		var content = QNo + QSpase + QTitle ;
	  	}
	  	$(".question_numb").html('第'+(cindex+1)+'题 ');
	  	$(".question_title").html(content);
//	  	$(".quest_verse").html(opts);//
	  	$('#puestion_body').html(opts) ;
	 // 	$(".ques_userCop").html($question.question);
	  	//$(".quest_verse").html($question.answer);//此处是答案
		  	
		$('.question_queNum').unbind('tap') ;
	
		$(".question_queNum").on("tap",function(){
			var $this = $(this) ;
			
			/**防止重复点击*/
			$('.question_queNum').unbind('tap') ;
			
			var nextIndex = parseInt($this.attr('data-index')) + 1 ;
				var clickCont = $('.quest_verse').html();
//				alert(clickCont);
				$(".ques_userCop").html(clickCont);
				
//				if(ans == $option.id){
//	  				$('.question_queNum').css("background","url(../images/act_16QMing_puestion_rightBack.png)top center no-repeat");
//					$('span').contents().unwrap().wrap('<img class="result_icon" src="images/act_16QMing_puestion_righticon.png"/>');
//	  			}else{
//	  				$('.question_queNum').css("background","url(../images/act_16QMing_puestion_errorback.png)top center no-repeat");
//					$('span').contents().unwrap().wrap('<img class="result_icon" src="images/act_16QMing_puestion_erroricon.png"/>');
//	  			}
//				
				
			if(nextIndex >= 8){
//				alert("已经是最后一题了哦，您答对了 , " + SUCCESS) ;
//				return  ;
				$("#startGameBtnWrap").remove();
				gameResult();
			}
			
			
			if($this.attr('data-answer') == 'true'){
				++ SUCCESS ;
				$this.removeClass('question_queNum').addClass('result_right_icon') ;
			}else{
				$this.removeClass('question_queNum').addClass('result_error_icon') ;
			}
			
			$this.attr("data-once","true") ;
			gameScore = SUCCESS+1; 
	        console.log(gameScore);
	        
	        
	        /**显示下一题*/
	        waitGame=setInterval(function(){
            	initQuestion(nextIndex) ;
            },500);
	        
	    });
	}
    
        /*游戏结果*/
    function gameResult(){
    	alert(gameScore);
                if(gameScore<=3){
                    var finalTextShow="看来吟诗作对你并不在行啊……";
                }else if(gameScore>3 && gameScore <=5){
                    var finalTextShow="小学体育老师说，你语文学得不错~";
                }else if(gameScore>5 && gameScore<=7){
                    var finalTextShow="没有想到当代还有你这样满腹经纶的诗人！";
                }else if(gameScore=8){
                    var finalTextShow="您共答对了"+gameScore+"题，超过100%的小伙伴。";
                    var finalTextShow_p="清明诗神非你莫属！";
                };
//              wechatObj.title = '【药快到】提高颜值大作战';
//              wechatObj.desc ='我刚刚在【药快到】美丽大作战中测了一下颜值，快来和我比比谁更美！';
//              getWechatObj();
                $("#gameScoreDesText").html(finalTextShow);
                $("#gameScoreDesText2").html(finalTextShow_p);
                $(".gameOverWrap").show();
        }
  
   /*初始化*/
    function initFun(){
    	SUCCESS = 0;
    	cindex = 0;
    	$(".ques_userCop").html();
        $(".gamePage").hide();
         $(".gameOverWrap").hide();
        $(".indexPage").show();
    }
    
    /*不服再战*/
    $("#playAgain").on("click",function(){
        initFun();
    });
   
  	//成绩页面关闭按钮
	$(".closeAndBackClick").on("tap",function(){
		initFun();
	}) ;
  
 
    
    
//分享按钮
    $(".shareFri").on("tap",function(e){
    	var event=e ||window.event;
    	event.stopPropagation();
    	if(is_weixin()){
    		$("#shareFriSha").show();
    	}else{
    		if(appShareFun()){
    			$(".butWrap").hide();
        		$(".shareAppPage").show();
    		}
    	}
    });
  
    $("#shareFriSha").on("tap",function(e){
    	event.stopPropagation();
    	e.preventDefault();
    	 $("#shareFriSha").hide();
    });
	
    //app分享点击
    $("#shareAppPage_shareFir").on("tap",function(){
    	if(appShareFun()){
    		s(0);
    	}
    	$(".butWrap").show();
		$(".shareAppPage").hide();
    });
    $("#shareAppPage_friRound").on("tap",function(){
    	if(appShareFun()){
    		s(1)
    	}
    	$(".butWrap").show();
		$(".shareAppPage").hide();
    });
  

});
