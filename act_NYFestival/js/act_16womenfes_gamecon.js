/**
 * Created by gonglei.bian on 2016/2/19.
 */
$(function(){
    /*开始*/
    $("#startGame").on("tap",function(){
        $(".startGameBtnWrap").hide();
        gameStart();
    });

    var gameScore=0;//分数统计
    var windowAniDownTimeBoo=true;//是否点击
    var num=0;//指定当前窗口下标
    var childChoNum=0;//指定当前出现分数
    var windowAniDownTime=null;
    var clickTime=null;
    var musicConSrc=document.getElementById("scorePlus");
    var scoreOnceBoo=true;
    var sound_add=document.getElementById("sound_add");
    var sound_cut=document.getElementById("sound_cut");
    sound_add.volume=0.5;
    sound_cut.volume=1;
    /*游戏主函数*/
    function gameStart(){
        setTimeout(function(){
            windowAniUp();
        },500)
         timeCountDownFun();

    };
    /*窗口开启*/
    function windowAniUpFun(){
        countWinNumFun();
        countchildChoNumFun();
        if(childChoNum<3){
            musicConSrc=sound_add;
        }else if(childChoNum==3){
             musicConSrc=sound_cut;
        };
        var childImg='<img src="images/act_16womenday_children'+childChoNum+'.png" id="gamePlayChilren" alt="">';
        $(".gameWin").eq(num).find(".gameWinMainWrap").append(childImg);
        $(".gameWin").eq(num).find(".gameWinPinkMask").animate({"-webkit-transform":"translateY(-100%)","transform":"translateY(-100%)"},300);
        $("#gamePlayChilren").one("touchstart",function(e){
                musicConSrc.currentTime=0;
                musicConSrc.play();
                windowAniDownTimeBoo=false;
                scoreCountFun(num,childChoNum);
            e.preventDefault();

        });
         var wh=$(window).height();
        if(wh<=480){
            scaleNum=.6;
        }else{
            scaleNum=.8;
        }
        $("#gamePlayChilren").animate({"transform":"scale("+scaleNum+")","-webkit-transform":"scale("+scaleNum+")"},300,function(){
                clearTimeout(windowAniDownTime);
                clearTimeout(clickTime);
                windowAniDownTime=setTimeout(function(){
                    windowAniDown(num);
                },300)
        });
    };
    var windowAniUp=windowAniUpFun;
    /*窗口关闭*/
    function windowAniDownFun(i){
    	if(windowAniDownTimeBoo){
    		console.log(1)
	        $(".gameWin").eq(i).find(".gameWinPinkMask").animate({"transform":"translateY(0)","-webkit-transform":"translateY(0)"},100);
	        $("#gamePlayChilren").animate({"transform":"scale(0)","-webkit-transform":"scale(0)"},100,function(){
	            $("#gamePlayChilren").remove();
	            $("#scoreShowImg").remove();
	             setTimeout(function(){
	                windowAniUp();
	              },200);
	            scoreOnceBoo=true;
	        });
    	}else{
    		console.log(2)
    		setTimeout(function(){
    			 $(".gameWin").eq(i).find(".gameWinPinkMask").animate({"transform":"translateY(0)","-webkit-transform":"translateY(0)"},100);
    		        $("#gamePlayChilren").animate({"transform":"scale(0)","-webkit-transform":"scale(0)"},100,function(){
    		            $("#gamePlayChilren").remove();
    		            $("#scoreShowImg").remove();
    		             setTimeout(function(){
    		                windowAniUp();
    		              },200);
    		            scoreOnceBoo=true;
    		        });
    		},300)
    	}
    };
    var windowAniDown=windowAniDownFun;
    /*分数计算函数*/
    function scoreCountFun(wrapNum,scoreNum){
        var ScoreShow='<img src="images/act_16womenday_game_score'+scoreNum+'.png" id="scoreShowImg" alt="">';
        $(".gameWin").eq(wrapNum).find(".gameWinMainWrap").append(ScoreShow);
        setTimeout(function(){
            $("#scoreShowImg").remove();
        },500)
        if(scoreNum==1){
            gameScore+=3;
        }else  if(scoreNum==2){
            gameScore+=1;
        }else  if(scoreNum==3){
            gameScore-=1;
        };
        $("#gameScore").html(gameScore);
    };
    /*计时函数*/
    function timeCountDownFun(){
        var timeCountDown=30;
        var countDownTime=null;
        var widthWrap=document.getElementById("gameCountDownColor_wrap");
        var countDownWrapW=window.getComputedStyle(widthWrap,null).width;
        countDownTime=setInterval(function(){
            timeCountDown--;
            if(timeCountDown<=0){
            	$("#gamePlayChilren").remove();
                $("#scoreShowImg").remove();
                clearTimeout(windowAniDownTime);
                clearTimeout(clickTime);
                windowAniUp=null;
                windowAniDown=null;
                clearInterval(countDownTime);
                timeCountDown=0;
                if(gameScore<=15){
                    var finalTextShow="颜值太低，惨不忍睹，还是多爱惜自己一些吧！";
                }else if(gameScore>15 && gameScore <=30){
                    var finalTextShow="颜值有待提高，多保养，相信自己一定会貌美如花的！";
                }else if(gameScore>30 && gameScore<=45){
                    var finalTextShow="恭喜你，收获"+gameScore+"颜值，沉鱼落雁，闭月羞花说的就是你吧！";
                }else if(gameScore>45){
                    var finalTextShow="天啊！世间竟有如此倾国倾城的女子！天仙姐姐，约吗？";
                };
                wechatObj.title = '【药快到】提高颜值大作战';
                wechatObj.desc ='我刚刚在【药快到】美丽大作战中测了一下颜值，快来和我比比谁更美！';
                getWechatObj();
                $("#gameScoreDesText").html(finalTextShow)
                $(".gameOverWrap").show();
            };
            var countDownShowW=Math.ceil(timeCountDown/30*100);
            $("#gameCountDownTime").html(timeCountDown);
            $("#gameCountDownColor").css({"width":countDownShowW+"%"});
        },1000)
    }
    /*初始化*/
    function initFun(){
         windowAniUp=windowAniUpFun;
         windowAniDown=windowAniDownFun;
         gameScore=0;//分数统计
         windowAniDownTimeBoo=true;//是否点击
         num=0;//指定当前窗口下标
         childChoNum=0;//指定当前出现分数
         windowAniDownTime=null;
         clickTime=null;
        $(".gameWinPinkMask").animate({"transform":"translateY(0)","-webkit-transform":"translateY(0)"},100);
        $("#gamePlayChilren").remove();
        $("#scoreShowImg").remove();
        $(".gameOverWrap").fadeOut();
        $(".startGameBtnWrap").fadeIn();
        $("#gameCountDownTime").html(30);
        $("#gameScore").html(0);
        $("#gameCountDownColor").css({"width":"100%"});
    }
    $("#playAgain").on("click",function(){
        initFun();
    });
 //窗口随机函数
    function countWinNumFun(){
   	 var numRan=Math.floor(Math.random()*12000);
   	 var numScope=[1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000]
   	 var numSort=[0,4,3,5,1,2,5,2,4,3,1,0]
   	 for(var i=0,j=numScope.length;i<j;i++){
    	 if(numRan<=numScope[i]){
    		 num=numSort[i];
    		 break;
    	 }
     }  
   };
  
//分数随机函数
  
   function countchildChoNumFun(){
  	 var childChoNumRan=Math.ceil(Math.random()*9000);
  	 var childChoScope=[1000,2000,3000,4000,5000,6000,7000,8000,9000];
  	 var childChoSort=[3,1,2,1,2,1,2,3,1];
      for(var i=1,j=childChoScope.length;i<j;i++){
    	  if(childChoNumRan<=childChoScope[i]){
    		  childChoNum=childChoSort[i];
    		  console.log(childChoNum)
    		  break;
    	  }
      }
  };
 
    
    
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
	/*$(".appShareBtn").on("tap",function(e){
		event.stopPropagation();
		e.preventDefault();
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});*/
    
   /* $("#goToGetHb").on("click",function(){
    	location.href="http://deve.ykd365.com/medhtml/common/act_comSkip_page?method=act_16womenfes_gethb"
    }) ;*/
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
