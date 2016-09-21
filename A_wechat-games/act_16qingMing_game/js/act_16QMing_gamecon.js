
var QUESTIONS = [
		{"id":10000 ,"question":"清明时节雨纷纷,", "options":[{"id":10001,"option":"路上行人像断魂。"},{"id":10002,"option":"路上行人欲断魂。"},{"id":10003,"option":"路上行人在招魂。"},{"id":10004,"option":"路上行人丢了魂。"}], "answer":10002},
		{"id":20000 ,"question":"春眠不觉晓,",    "options":[{"id":20001,"option":"处处蚊子咬。"},{"id":20002,"option":"今宵从来早。"},{"id":20003,"option":"只怕老婆找。"},{"id":20004,"option":"处处闻啼鸟。"}], "answer":20004},
		{"id":30000 ,"question":"春江水暖鸭先知。", "options":[{"id":30001,"option":"竹外桃花三两枝,"},{"id":30002,"option":"小荷才露尖尖角,"},{"id":30003,"option":"孤帆远影碧空尽,"},{"id":30004,"option":"喝点小酒来点肉,"}], "answer":30001},
		{"id":40000 ,"question":"浅草才能没马蹄。", "options":[{"id":40001,"option":"闲看庭前看落花,"},{"id":40002,"option":"乱花渐欲迷人眼,"},{"id":40003,"option":"唯见长江天际流,"},{"id":40004,"option":"柳暗花明又一村,"}], "answer":40002},
		{"id":50000 ,"question":"好雨知时节,",    "options":[{"id":50001,"option":"走路会湿鞋。"},{"id":50002,"option":"润物细无声。"},{"id":50003,"option":"当春乃发生。"},{"id":50004,"option":"随风潜入夜。"}], "answer":50003},
		{"id":60000 ,"question":"碧玉妆成一树高,", "options":[{"id":60001,"option":"万条垂下绿丝绦。"},{"id":60002,"option":"不知细叶谁裁出。"},{"id":60003,"option":"早有蜻蜓立上头。"},{"id":60004,"option":"忽闻岸上踏歌声。"}], "answer":60001},
		{"id":70000 ,"question":"离离原上草,",    "options":[{"id":70001,"option":"一回一枯荣。"},    {"id":70002,"option":"春风吹又生。"},   {"id":70003,"option":"一岁一枯荣。"},    {"id":70004,"option":"明月来相照。"}], "answer":70003},
		{"id":80000 ,"question":"人间四月芳菲尽,", "options":[{"id":80001,"option":"长恨春归无觅处。"},{"id":80002,"option":"日照香炉生紫烟。"},{"id":80003,"option":"轻舟已过万重山。"},{"id":80004,"option":"山寺桃花始盛开。"}], "answer":80004}
	]

$(function(){
	var gameScore = 0 ;
	var waitGame = null ;
	var loadmove = true;
	
		  function loadMove(){
			$(".startGameBtnWrap .startGame_topImgWrap").fadeIn(100,function(){
		        $(".startGameBtnWrap .startGameBtnWrap_top").fadeIn(100);
		        $(".startGameBtnWrap .startGame_bodypage").fadeIn("fast",function(){
		            $(".startGameBtnWrap").find(".startGame_page").animate({"-webkit-transform":"translateY(0)","transform":"translateY(0)"},500)
		           $("#quest_text").fadeIn(2000);
		        })
		     });
		   }
		  
		  var resetMove = function(){
				$(".startGameBtnWrap .startGame_topImgWrap").hide();
			    $(".startGameBtnWrap .startGameBtnWrap_top").hide();
			    $(".startGameBtnWrap .startGame_bodypage").hide() ;
		//	    $(".startGameBtnWrap").find(".startGame_page").unbind('animate');
			    $(".startGameBtnWrap").find(".startGame_page").attr("style","");
			    $("#quest_text").hide();
			}
		  
		$(".indexPage").on("click","#goToGamePage",function(){
			
            $(".gamePage").fadeIn(100);
            $(".indexPage").hide(100);
            loadMove() ;
            initQuestion(0) ;
        });
	

	  /*答题逻辑部分*/
	function initQuestion(index){
		var QNo = '<span>题目：</span>' ;
		var QSpase = '<p class="ques_userCop"></p>' ;//选中答案  回填部分
		var QTitle = '<p class="ques_remind" >{title}</p>' ;//诗句提示
		/*选项*/
		var QOption = '<div class="question_queNum" data-answer="{answer}" data-index="{index}"><p class="quest_verse">{opt}</p></div>' ;
		var cindex = index || 0 ;
		if(0 == cindex){
			gameScore = 0 ;
		}
		if(waitGame){
			clearInterval(waitGame);
		}
		if(cindex >= QUESTIONS.length){
			console.debug('题目溢出了') ;
			return ;
		}
		var $question = QUESTIONS[cindex] ;
		
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
  			}else{
  				opts += QOption.replace('{answer}' ,false).replace('{opt}' , $option.option).replace('{index}',cindex) ;
  			}
  		}) ;
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
		  	$('#puestion_body').html(opts) ;
			$('.question_queNum').unbind('tap') ;
			/**点击选项，进入下一题*/
			$(".question_queNum").on("tap",function(){
			var $this = $(this) ;
			/**防止重复点击*/
			$('.question_queNum').unbind('tap') ;
			/**当点击某个选项时，获得当前选项的值，并填在横线的地方*/
			var nextIndex = parseInt($this.attr('data-index')) ;
				var clickCont = $this.html();
				$(".ques_userCop").html(clickCont);
				/**判断是正确的选项还是错误的选项，更换背景图*/
			if($this.attr('data-answer') == 'true'){
				gameScore = gameScore+1; 
				$this.removeClass('question_queNum').addClass('result_right_icon') ;
			}else{
				$this.removeClass('question_queNum').addClass('result_error_icon') ;
			}
			$this.attr("data-once","true") ;
	        console.log("打对的" +gameScore);
	        nextIndex += 1 ;//题目的下标递增
	        if(nextIndex >=  QUESTIONS.length){
				waitGame=setInterval(function(){
					$("#startGameBtnWrap").fadeOut();
            		gameResult();
            		if(waitGame){
						clearInterval(waitGame);
					}
            	},500);
			}else{
				/**显示下一题*/
		        waitGame=setInterval(function(){
	            	initQuestion(nextIndex) ;
	            },500);
			}
	    });
	}
        /*游戏结果*/
    function gameResult(){
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
              wechatObj.title = '【药快到】寻找清明诗人';
              wechatObj.desc ='我刚刚参加了【药快到】清明诗人挑战，你比我更有学问吗？';
              getWechatObj();
                $("#gameScoreDesText").html(finalTextShow);
                $("#gameScoreDesText2").html(finalTextShow_p);
                $(".gameOverWrap").show();
                $(".butWrap").show();
                $("#shareFriSha").hide();
        		$(".shareAppPage").hide();
        }
   /*初始化*/
    function initFun(){
    	 $(".gamePage").hide();
         $(".gameOverWrap").hide();
         resetMove() ;
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
