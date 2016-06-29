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
    /*游戏主函数*/
    function gameStart(){
           windowAniUp();
    };
    /*窗口开启*/
    function windowAniUp(){
        num=Math.floor(Math.random()*6);
       childChoNum=Math.ceil(Math.random()*3);
//      var childImg='<img src="images/act_16womenday_children'+childChoNum+'.png" id="gamePlayChilren" alt="">';
        var childImg='<img src="images/0715_images/act_16coolIceBucket_game_hotPeople.png" id="gamePlayChilren" alt="">';
        var bucketImg='<img src="images/0715_images/act_16coolIceBucket_game_IceBucket.png" id="gamebucket" alt="">';
        var windowAniDownTime=null;
        var clickTime=null;

        $(".gameWin").eq(num).find(".gameWinMainWrap").append(childImg);
         
//      $(".gameWin").eq(num).find(".gameWinPinkMask").animate({"transform":"translateY(-100%)","-webkit-transform":"translateY(-100%)"},300);

        $("#gamePlayChilren").on("tap",function(){
            windowAniDownTimeBoo=false;
            scoreCountFun(num,childChoNum);
            $(".gameWin").eq(num).find(".gameWinMainWrap").append(bucketImg);
          /*  $("#gamePlayChilren").off();*/
        });
//      $("#gamePlayChilren").animate({"transform":"scale(.8)","-webkit-transform":"scale(.8)"},300,function(){
       	$("#gamePlayChilren").animate({"transform":"translateY(-100%)","-webkit-transform":"translateY(-100%)"},500,function(){
            if(windowAniDownTimeBoo){
                clearTimeout(windowAniDownTime);
                clearTimeout(clickTime);
                windowAniDownTime=setTimeout(function(){
                    windowAniDown(num);
                },300)
            }else{
                clearTimeout(windowAniDownTime);
                clearTimeout(clickTime);
                clickTime=setTimeout(function(){
                    windowAniDown(num);
                    windowAniDownTimeBoo=true;
                },800)
            }


        });


    };
    /*窗口关闭*/
    function windowAniDown(i){
//      $(".gameWin").eq(i).find(".gameWinPinkMask").animate({"transform":"translateY(0)","-webkit-transform":"translateY(0)"},100);
        $("#gamePlayChilren").animate({"transform":"scale(0)","-webkit-transform":"scale(0)"},100,function(){
            $("#gamePlayChilren").remove();
            $("#scoreShowImg").remove();
             setTimeout(function(){
                windowAniUp();
              },200)
        });
    };
    /*分数计算函数*/
    function scoreCountFun(wrapNum,scoreNum){
//      var ScoreShow='<img src="images/act_16womenday_game_score'+scoreNum+'.png" id="scoreShowImg" alt="">';
        var ScoreShow='<img src="images/0715_images/act_16coolIceBucket_game_score.png" id="scoreShowImg" alt="">';
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
        $("#gameScore").html(gameScore)
    }


})