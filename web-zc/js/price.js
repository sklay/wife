/**
 * Created by Administrator on 2016/7/13.
 */


$(function () {


    $.ajax({
        type: "get",
        url: "http://localhost/zc/php/price.php",
        dataType: "json",
        success: function (data) {
            priceView(data);
        },
        error: function (e) {

        }
    });

    function priceView(data) {
        $(data).each(function (index, ele) {
            $(".qj").append("<li><a href='#'><img src='" + data[index].priceimg + "'><span class='qk'><span class='ql'>" + data[index].pricetitle + "</span><i class='qm'>" + data[index].pricem + "</i><span class='qn'>立即购买</span></a><a href='#' class='qp'>" + data[index].priceloca + "</a></li>");
        });
    }


    /*
     * 控制导航
     * */
    $(".zp").on("click", function (e) {
        e.stopPropagation();
        $(".zp .zq").fadeToggle(300);
        var display = $(".zq").css("display");
        if (display == "block") {
            $(".zz").css({
                display: "block"
            })
        } else {
            $(".zz").css({
                display: "none"
            })
        }
    });


    $(".zz").on("click", function (e) {
        $(this).css({
            display: "none"
        });
        $(".zq").fadeOut(300);
    });

    $(".qj").on("click", function () {
       //测试蒙板
    })

})