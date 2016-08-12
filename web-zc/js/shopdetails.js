/**
 * Created by Administrator on 2016/7/14.
 */

$(function(){
	
	
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


    $(".storeHomeNew").on("click",function(){
        $(".a2d").slideUp(200);
    });

    $(".shouqi").on("click",function(){
        $(".a2d").slideDown(200);
    });

    $.ajax({
        type:"get",
        url:"http://localhost/zc/php/shopDetail.php",
        data:{
            shopid:getQueryStringArgs().shopid
        },
        dataType:"json",
        success:function(data){
           viewData(data)
        },
        error:function(e){
            console.log(e);
        }
    })

function viewData(data){
	
	$(".a2g").attr("src",data.shopLogo);
	$(".a2i").html(data.shopName);
	var cate=data.category;
	$(cate).each(function(index){
		
	$("<li class='a2y'><strong class='a31 r s'>"+cate[index].title+"</strong></li>").appendTo($(".a2x"));
	
})  
	
$(".a2x .a2y").eq(0).addClass("a30");

	var index=$(".a2x").find("li.a30").index();
		var result=data.category[index];
        	
        	$(".a39").html(result.title);
        	var product=result.product;
        	
        	$(product).each(function(index){
        		
        		$("<li><a href='#' class='linksGoods r'></a><img class='pic' src='"+product[index].img+"'/><dl><dt>"+product[index].name+"</dt><dd></dd><dd style='color:#ff3434'><label></label><em>￥</em>"+product[index].price+"</dd></dl></li>").appendTo($(".a38"));
        		
        		
        		
        		
        	})


	
			
};



$(".a2x").on("click",".a2y",function(data){
	
	$(".a38").html("");
	
	$(this).addClass("a30").siblings().removeClass("a30");
	
	var index=$(".a2x").find("li.a30").index();
	
	    $.ajax({
        type:"get",
        url:"http://localhost/zc/php/shopDetail.php",
        data:{
            shopid:getQueryStringArgs().shopid
        },
        dataType:"json",
        success:function(data){
        	
        	
        	var result=data.category[index];
        	
        	$(".a39").html(result.title);
        	var product=result.product;
        	
        	$(product).each(function(index){
        		
        		$("<li><a href='#' class='linksGoods r'></a><img class='pic' src='"+product[index].img+"'/><dl><dt>"+product[index].name+"</dt><dd></dd><dd style='color:#ff3434'><label></label><em>￥</em>"+product[index].price+"</dd></dl></li>").appendTo($(".a38"));
        		
        		
        		
        		
        	})
        	
        	
        	
        	
        	
        	
        	
        	
        	
        	
        	
        	
      
        },
        error:function(e){
            console.log(e);
        }
    })
	
	
	
	
	
	
	
})






});