/**
 * Created by Administrator on 2016/7/11.
 */
/*
 * 分类
 * */

$(function () {

    /*
    * 解析URL
    * */

    function getQueryStringArgs() {
        var qs = location.search.length > 0 ? location.search.substring(1) : "";
        var args = {};
        var item = [];
        var name = null;
        var value = null;
        var items = qs.length ? qs.split("&") : [];
        for (var i = 0; i < items.length; i++) {
            item = items[i].split("=");
            name = item[0];
            value = item[1];

            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    }

    if(getQueryStringArgs().rightnav){
        $(".ud").focus();
        getFocusHandler();
    }


    getCategoryData("水果蔬菜");
    $(".uj").on("click", "li", function (e) {
        $(this).addClass("um").siblings().removeClass("um");
        $(".uk").html("");
        getCategoryData(e.target.innerHTML);
    });


    function getCategoryData(cat) {
        $.ajax({
            type: "get",
            url: "php/category.php",
            data: {
                category: cat
            },
            dataType: "jsonp",
            success: function (data) {
                categoryView(data);
            },
            error: function (dataerror) {
                console.log(dataerror);
            }
        })
    }

    function categoryView(data) {
        $(data).each(function (index) {
            $(".uk").append("<dl class='un'><dt class='uo'>" + data[index].fruit + "</dt><dd class='uq'></dd></dl>");
            $(data[index].fruitimg).each(function (sonindex) {
                $(".uq").eq(index).append("<a href='#' class='ur'><img class='us' src='" + data[index].fruitimg[sonindex] + "'><span class='ut'>" + data[index].fruitdesc[sonindex] + "</span></a>");
            })
        });

    }

    /*
     * 自动补全
     * */

    var autoData = ["哈哈","嘿嘿","嘿哈","呵呵"];


    $(".ud").on("focus",getFocusHandler);

    function getFocusHandler(){

        $(".leftMenu").css({
            display:"none"
        });

        $(".scrolling").css({
            display:"none"
        });

        $(".ua").css({
            display:"block"
        });

        $(".uaclear").css({
            display:"block"
        });

        $(".u8").addClass("hasCancel");
        $(".u4").css({
            display:"block"
        });
        getSearchData();
    }


    $(".u4").on("click",function(){
        $(".leftMenu").css({
            display:"block"
        });

        $(".scrolling").css({
            display:"block"
        });

        $(".ua").css({
            display:"none"
        });

        $(".uaclear").css({
            display:"none"
        });

        $(".u8").removeClass("hasCancel");
        $(".u4").css({
            display:"none"
        });
        $(".ud").val("");

    });

    /*
    * 减少ajax请求是一种优化方式
    * */

    function getSearchData(){
        $.ajax({
            type:"get",
            url:"http://iwen.wiki/zhichenshop/tuijian.php",
            dataType:"json",
            success:function(data){
                searchHotView(data);
            },
            error:function(){

            }
        });
    }

    function searchHotView(data){
        $(".tv").html("");
        $(data).each(function(index){
            $(".tv").append("<a class='js-hot-search'>"+data[index]+"</a>");
        });

        $(".js-hot-search").on("click",function(){
            $(".ud").val($(this).html());
        })
    }

    $(".ud").on("keyup",function(){
        if($(".ud").val().length > 0 ){
            $(".uaclear").css({
                display:"none"
            });

            $(".tz").css({
                display:"block"
            })

            var val = this.value;
            var srdata = [];
            for(var i = 0;i<autoData.length;i++){
                if(val.trim().length>0 && autoData[i].indexOf(val)>-1){
                    srdata.push(autoData[i]);
                }
            }

            var self = this;
            $(".tz").html("");
            for(var i = 0;i<srdata.length;i++){
                $(".tz").append("<li class='r'><a class='js-hot-search'>"+srdata[i]+"</a></li>");
                $(".js-hot-search").on("click",function(){
                    self.value = this.textContent;
                    $(".tz").html("");
                })
            }

        }else{
            $(".uaclear").css({
                display:"block"
            });
            $(".tz").css({
                display:"none"
            })
        }
    })

});