/**
 * Created by Administrator on 2016/7/8.
 */


$(function () {

    /*
     * 定义公共方法
     * */

    var log = console.log.bind(console);
    var addIndex = 0;

    /*
     * 倒计时
     * */
    (function () {
        function refresh() {
            var endTime = new Date("june 18,2017 00:00:00");
            var nowTime = new Date();
            var leftsecond = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
            if (leftsecond < 0) {
                leftsecond = 0;
            }
            day = parseInt(leftsecond / 3600 / 24);
            hour = parseInt((leftsecond / 3600) % 24);
            minute = parseInt((leftsecond / 60) % 60);
            second = parseInt(leftsecond % 60);

            $(".sktime>i:nth-child(1)").html(hour);
            $(".sktime>i:nth-child(2)").html(minute);
            if (second < 10) {
                $(".sktime>i:nth-child(3)").html("0" + second);
            } else {
                $(".sktime>i:nth-child(3)").html(second);
            }
        }

        refresh();
        setInterval(refresh, 1000);
    })();

    /*
     * 倒计时下的商品
     * */

    (function () {
        var i = 0;
        setInterval(function () {
            if (i == 3) {
                i = 0;
            }
            $(".sks>img").eq(i).css({"opacity": 1}).siblings().css({"opacity": 0});
            i++;
        }, 3000);
    })();

    /*
     * 替换轮播图top
     * */

    $.ajax({
        type: "get",
        url: "php/banner.php",
        dataType: "jsonp",
        success: function (data) {
            bannerViewAdapter(data);
        },
        error: function (errordata) {
            log(errordata);
        }
    });

    function bannerViewAdapter(data) {
        $("#swiper-container1 .swiper-slide>img").each(function (index, ele) {
            $(ele).attr("src", data.bannerimg[index]);
        });

        $(".sks>img").each(function (index, ele) {
            $(ele).attr("src", data.qgimg[index]);
        });
    }

    /*
    * shoplist
    * */
    getShopData();
    function getShopData(){
        $.ajax({
            type: "get",
            url: "http://iwen.wiki/zhichenshop/shop.php",
            dataType: "jsonp",
            success: function (data) {
                shoplistViewAdapter(data,shopView);

            },
            error: function (errordata) {
                log(errordata);
            }
        });
    }

    function shoplistViewAdapter(data,callback) {
        for (var i = 1; i < data.length; i++) {
            var cloneli = $(".shopli").eq(0).clone();
            $(".shoplist").append(cloneli);
            callback(data);
        }
    }

    function shopView(data) {
        $(".shopli").each(function (index,ele) {
            $(".bl").eq(index).attr('src', data[index%5].shopicon);
            $(".bm>h2").eq(index).text(data[index%5].shopname);
            $(".cb").eq(index).text(data[index%5].shopnum + "件商品" + " | " + "月售" + data[index%5].sell + "单");
        })
    }

    $(window).scroll(function(){
        var lastShop = $(".shopli:last").offset().top;
        var scrollHeight = $(window).scrollTop();
        var winHeight = $(window).height();
        if(lastShop < scrollHeight+winHeight){
            getShopData();
            addIndex+=5;
        }

    });



});