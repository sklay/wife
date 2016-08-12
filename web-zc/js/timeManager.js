/**
 * Created by Administrator on 2016/7/13.
 */


(function () {
    function refresh(hou, min, sec,myendtime) {
        var endTime = new Date(myendtime);
        var nowTime = new Date();
        var leftsecond = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
        if (leftsecond < 0) {
            leftsecond = 0;
        }
        day = parseInt(leftsecond / 3600 / 24);
        hour = parseInt((leftsecond / 3600) % 24);
        minute = parseInt((leftsecond / 60) % 60);
        second = parseInt(leftsecond % 60);

        if(hour<10){
            $(hou).html("0"+hour);
        }else{
            $(hou).html(hour);
        }

        if(minute<10){
            $(min).html("0"+minute);
        }else{
            $(min).html(minute);
        }

        if (second < 10) {
            $(sec).html("0" + second);
        } else {
            $(sec).html(second);
        }
    }
    refresh();
    //setInterval(refresh, 1000);
    window.refresh = refresh;
})();