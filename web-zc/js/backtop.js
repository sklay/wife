/**
 * Created by Administrator on 2016/7/12.
 */


//回到顶端

$(function(){
    var winHeight = $(window).height();
    $(window).scroll(function(){
        var myTop = $(window).scrollTop();
        if(myTop > winHeight){
            $(".zy").fadeIn(500,function(){
                $(this).clearQueue();
            });
        }else{
            $(".zy").fadeOut(500,function(){
                $(this).clearQueue();
            });
        }
    });

    $(".zy").on("click",function(){
        $("body,html").animate({
            scrollTop:0
        },200);
    })
})