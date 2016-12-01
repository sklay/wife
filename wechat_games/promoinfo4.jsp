<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1" />  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/promoinfo4.css" media="screen and (min-width:320px)">
<title>Insert title here</title>
<script src="js/jquery-1.10.2.js" type="text/javascript"></script>
<script src="js/jquery.nicescroll.min.js" type="text/javascript"></script>
<script type="text/javascript">
jQuery(function(){
	/* jQuery('body').niceScroll({cursorborder: '',cursorcolor: '#999'}); */
	
	/* jQuery(window).bind('resize scroll',function(){
		jQuery('.navigation').trigger('adapter');
		jQuery('.promotions .promotion_img').trigger('adapter');
		jQuery('.promotions .scroll_wrapper .wrapper').trigger('adapter');
	}).trigger('resize'); */
	
	jQuery('.category .arrow').bind('click',function(){
		var close=jQuery(this).is('.close');
		var mask=jQuery('.mask');
		var innerLayer=jQuery('.innerLayer');
		if(!close){
			mask.css({
				left:0,
				top:jQuery(this).offset().top+jQuery(this).height()
			}).slideDown();
			innerLayer.css({
				height:jQuery('.promotion').outerHeight(),
				top:jQuery('.promotion').offset().top
			}).show();
		}else{
			mask.slideUp();
			innerLayer.hide();
		}
		
		jQuery(this).toggleClass('close');
	})
	
	jQuery('.category li').bind('click',function(){
		jQuery(this).addClass('selected').siblings().removeClass('selected');
		var left=jQuery(this).position().left;
		if(left>jQuery(window).width()/2){
			left=jQuery(this).prev().position().left;
			jQuery('.category ul').animate({left:-left+'px'});
		}else{
		    jQuery('.category ul').animate({left:'0px'});
		}
		var index=jQuery(this).index();
		jQuery('.mask li').eq(index).addClass('selected').siblings().removeClass('selected');
		
		/* 数据 */
		var dirId = jQuery(this).attr("data");
		showItem(dirId);
		
	})
	
	jQuery('.mask li').bind('click',function(){
		jQuery(this).addClass('selected').siblings().removeClass('selected');
		var index=jQuery(this).index();
		jQuery('.category li').eq(index).addClass('selected').siblings().removeClass('selected');
		var width=jQuery('.category .left').width();
		var li=jQuery('.category li').eq(index);
		var left=li.position().left;
		if(left>jQuery(window).width()/2){
			left=jQuery('.category ul li').eq(index-1).position().left;
			jQuery('.category ul').animate({left:-left+'px'});
		}else{
		   jQuery('.category ul').animate({left:'0px'});
		}
		jQuery('.mask').slideUp();
		jQuery('.category .arrow').toggleClass('close');
		var innerLayer=jQuery('.innerLayer');
		innerLayer.hide();
		/* 数据 */
		var dirId = jQuery(this).attr("data");
		showItem(dirId);
	})
	
	jQuery('.input :text').bind('focus',function(){
		jQuery(this).val('').removeClass('empty');
	}).bind('blur',function(){
		var val=jQuery.trim(jQuery(this).val());
		if(!val || val==jQuery(this).attr('empty')){
			jQuery(this).val(jQuery(this).attr('empty')).addClass('empty');
		}
		
	})
});


function showItem(dirId) {
	if (!dirId || dirId < 1) {
		$(".promotion .promoList").show();
	} else {
		$(".promotion .promoList").hide();
		$("#dirItem_"+dirId).show();
	}
}



function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

/*跳转到商品列表页*/
function showDrugList(category_id, category_name){
	if (is_weixin()) {
		location.href="/weixin/wechat/products?categoryId=" + category_id;
	} else {
		camore.showDrugList(category_id, category_name);
	}
}

/*跳转到商品详情页*/
function showDrugDetails(drug_id){
	if (is_weixin()) {
		location.href="/weixin/wechat/details?skuId=" + drug_id;
	} else {
		camore.showDrugDetails(drug_id);
	}
}

/*加入购物车*/
function addShopping(drug_id){
	if (is_weixin()) {
		location.href="/weixin/wechat/details?skuId=" + drug_id;
	} else {
		camore.addShopping(drug_id);
	}
}


function tosearch() {
	gotoPage({"message":"搜索", "type": "5"});
}

/*跳转到搜索页*/
function gotoPage(json){
	if (is_weixin()) {
		
	} else {
		try {
			var s = JSON.stringify(json);
			camore.gotoPage(s);
		} catch (e) {
			console.log(e);
		}
		
	}
}



</script>
<style>
.contentBody{overflow:hidden;padding-bottom:25px; background-color: #876590}
.contentBody .topArea{width:100%;padding:0;}
.contentBody .topArea img{width:100%;display:block;}
.contentBody .promotion{width:100%;height:100%;font-size:12px;}
.contentBody .promotion .promoList{width:100%;height:100%;}
.contentBody .promotion .promoList .promoTitle{width:100%; margin-bottom: -2px;}
.contentBody .promotion .promoList .promoTitle img{width:100%;float: left;}
.contentBody .promotion .promoList .promoItemList{/* width:100%; */font-size:0; padding: 0px 3px;}
.contentBody .promotion .promoList .promoItemList .pItem{width:50%;/* height:4.3rem; */overflow:hidden;margin-bottom:6px;display:inline-block;font-size:0;float:left;}
.contentBody .promotion .promoList .promoItemList .pItem .itemDiv{/* width:90%; */margin:0 3px;background:#fff;padding:10px 0px 2px;/* border-radius:5px; */}
.contentBody .promotion .promoList .promoItemList .pItem .itemDiv .itemIcon{display:block;width:80%;/* height:2.3rem; */margin:0 auto;}
.contentBody .promotion .promoList .promoItemList .pItem .itemDiv .itemName{display:block;line-height:18px;height:18px;width:85%;margin:10px auto 0px auto;font-size:14px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
.contentBody .promotion .promoList .promoItemList .pItem .itemDiv .standard{display:block;width:85%;margin:0px auto 0px auto;height:18px;line-height:18px;font-size:12px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
.contentBody .promotion .promoList .promoItemList .pItem .itemDiv .itemPrice{display:block;width:85%;height:46px;margin:0 auto;}
.contentBody .promotion .promoList .promoItemList .pItem .itemDiv .itemPrice .tj_price{font-size:14px;line-height:20px;height:20px;font-weight:bold; color:red;margin-right:15px;}
.contentBody .promotion .promoList .promoItemList .pItem .itemDiv .itemPrice .yj_price{font-size:12px;line-height:16px;height:16px;color:#ddd;text-decoration: line-through;}
.contentBody .promotion .promoList .promoItemList .pItem .gwc{position: absolute;width: 49%; margin-top: 20px;}
.contentBody .promotion .promoList .promoItemList .pItem .gwc img{width: 38px;float: right;margin-right: 10px;}

    
</style>
</head>
<body>
   <div class="container">
      <div class="title">
        <div class="left"></div>
        <div class="center">促销活动</div>
        <div class="car"></div>
      </div>
      
      <div class="navigation">
        <div class="home">
        	<img alt="首页" src="images/home.png" style="width:24px;">
           <div class="text">首页</div>
        </div>
        <div class="input" onclick="tosearch()">
           <!-- <div class="search"></div> -->
           <img alt="搜商品" src="images/search.png" style="position: absolute;top: 6px;left: 6px;width: 20px">
           <input type="text" value="搜索商品" class="empty" empty="搜索商品" disabled="disabled"/>
        </div>
        <div class="city">
           <div class="city_address">北京</div> <div class="city_open"></div>
        </div>
      </div>
      
      <div class="category">
         <div class="left" style="position: relative;">
           <ul style="position: absolute;">
             <!-- <li class="selected"><div class="mark"></div><div class="text">视力保护</div></li>
             <li><div class="mark"></div><div class="text">视力保护</div></li>
             <li><div class="mark"></div><div class="text">脑力智力</div></li>
             <li><div class="mark"></div><div class="text">脑力智力</div></li>
             <li><div class="mark"></div><div class="text">健康好活力</div></li>
             <li><div class="mark"></div><div class="text">健康好活力</div></li> -->
             
             <li class="selected"><div class="mark"></div><div class="text">全部</div></li>
             <c:forEach items="${subList }" var="actiObj" varStatus="status">
				<li data="${actiObj.dirId}">
					<div class="mark"></div><div class="text">${actiObj.dirName}</div>
				</li>
			  </c:forEach>
             
           </ul>
         </div>
         <div class="arrow"></div>
      </div>

	  <div class="mask">
	      <ul>
	         <li class="selected"><div class="mark"></div><div class="text" id="dir_all">全部</div></li>
	         <c:forEach items="${subList }" var="actiObj" varStatus="status">
				<li data="${actiObj.dirId}">
					<div class="mark"></div><div class="text">${actiObj.dirName}</div>
				</li>
			 </c:forEach>
	      </ul>
	   </div>
      
      <div class="contentBody">
	      	<div class="topArea">
				<a href="javascript:void(0)" onclick="showDrugList('${current.dirId}', '${current.dirName}')">
				<img alt="" src="${current.imgUrl }" onclick="showDrugList('${current.dirId}', '${current.dirName}')">
				</a>
			</div>
         	<div class="promotion">
			<c:forEach items="${subList }" var="actiObj">
				<div class="promoList" id="dirItem_${actiObj.dirId}">
					<div class="promoTitle">
						<c:if test="${not empty actiObj.imgUrl}">
							<img src="${actiObj.imgUrl}">
						</c:if>
					</div>
					<div class="promoItemList">
						<c:forEach items="${actiObj.arr }" var="actiItem" varStatus="st">
						<c:choose><c:when test="${st.last && st.index % 2 == 0  }"></c:when>
						<c:otherwise>
							<div class="pItem">
								
								<div class="itemDiv">
									<a href="javascript:void(0)" onclick="showDrugDetails(${actiItem.skuId })">
									<img class="itemIcon" alt="" src="${actiItem.picPath}@!ys300">
									</a>
									<div class="gwc" onclick="addShopping(${actiItem.skuId })">
									  	<img src="http://imgstore.camore.cn/icon/act_dir/20161102_oneYuan0.png" style="width: 78px;">
									</div>
									<div class="itemName">${actiItem.prodName }</div>
									<div class="standard">${actiItem.standard }</div>
									
									<div class="itemPrice">
										<span class="tj_price"></span><br>
										<span class="yj_price" >原价：${actiItem.costPrice/100 }</span>
									</div>
								</div>
								
							</div>
						</c:otherwise>
						</c:choose>
						</c:forEach> 
					</div>
				</div>
			</c:forEach>
		</div>
         
      </div>
      
      
   
      <div class="innerLayer"></div>
   </div>
   
   
</body>
</html>