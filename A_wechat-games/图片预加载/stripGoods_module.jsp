<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html lang="en">
<html>
<head>
<meta charset="UTF-8">
<title>药快到组合商品优惠</title>
<meta name="description" content="药快到一小时送药上门随叫随到！即日起，北京线下药房全线开幕，众多商品仅售0.1元，数量有限，先到先得！">
<meta id="device" name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<meta name="format-detection" content="telephone=no, email=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="stylesheet" href="css/stripGoods_module.css" />
<link rel="stylesheet" type="text/css" href="css/swiper-3.3.1.min.css" />
<script src="http://ys1000.oss-cn-beijing.aliyuncs.com/js/jquery-1.9.0.min.js"></script>
<script src="js/swiper-3.3.1.jquery.min.js" type="text/javascript" charset="utf-8"></script>
<script>
			 setSize();
			/* $(function() {
				$(window).resize(setSize);
			}) */

			function setSize() {
				var pixelRatio = 1 / window.devicePixelRatio;
				//$("#device").attr("content", "width=device-width,initial-scale=" + pixelRatio + ",maximum-scale=" + pixelRatio + "");
				var html = document.getElementsByTagName("html")[0];
				var pageWidth = html.getBoundingClientRect().width;
				console.debug(pageWidth);
				html.style.fontSize = pageWidth / 10 + "px";
				//alert($("#device").attr("content"));
			} 
			
</script>
<style>
* {
	margin: 0px;
	padding: 0px;
}

.content .head {
	border-bottom: 1px solid #cdcdcd;
}

.content .topWrap .nav {
	border-right: 1px solid #cdcdcd;
}

a {
	text-decoration: none;
	color: #cd3636;
}

.content .navWrap .hideText {
	height: auto;
}

.content .navWrap .hideText ul li {
	width: auto;
	padding: 0 .6rem;
	box-sizing: border-box;
}
/* .content .contentBody .promoItemList .pItem .itemDiv .drugInfo .itemPrice p {
    font-size: .380145rem;
}
.content .contentBody .promoItemList .pItem .itemDiv .drugInfo .itemPrice p.standard {
    margin-top: -0.1610306rem;
} */
</style>
</head>

<body>
	<div class="content clearfix">
		<div class="topWrap">
			<div class="headCon">
				<!-- 搜索区域 -->
				<div class="head">
					<div class="head-l clearfix">
						<div class="homePage ">
							<a href="" class="house"></a> <span>首页</span>
						</div>
						<div class="search" onclick="tosearch()">
							<a href="#"> </a> 搜全类商品
						</div>
					</div>
					<div class="address clearfix">
						<span></span> <img alt="" src="images/20161102_sortImg.png">
					</div>
				</div>
			</div>

			<!--导航区域-->
			<div class="navWrap clearfix">
				<div class="navContent clearfix">
					<div class="swiper-container nav clearfix" id="swiper-container1">
						<ul class="swiper-wrapper ul1">
							<li class="swiper-slide"><i></i><a href="#ALL_F">全部</a></li>
							<c:forEach items="${subList }" var="actiObj" varStatus="status">
								<%-- <c:if test="${status.index < 3 }"> --%>
								<li class="swiper-slide" data="${actiObj.dirId}" id="tab_${actiObj.dirId}"><i></i> <a href="#tabView_${actiObj.dirId}">${actiObj.dirName}</a></li>
								<%-- </c:if> --%>
							</c:forEach>
						</ul>
						<!-- <ul class="ul2" style="display: none;">
						<li class="">切换楼层</li>
					</ul> -->
					</div>
					<p class="showDir pDown">
						<i></i>
					</p>
				</div>
				<div class="hideText">
					<ul>
						<li><i></i><a href="#ALL_F">全部</a></li>
						<c:forEach items="${subList }" var="actiObj" varStatus="status">
							<%-- <c:if test="${status.index >= 3 }"> --%>
							<li data="${actiObj.dirId}" id="tab_${actiObj.dirId}"><i></i> <a href="#tabView_${actiObj.dirId}">${actiObj.dirName}</a></li>
							<%-- </c:if> --%>
						</c:forEach>
					</ul>
				</div>
			</div>
		</div>

		<!--内容-->
		<div class="contentBody">
			<!--标题-->
			<div class="topArea ">
				<a href="javascript:void(0)" name="ALL_F" id="ALL_F" onclick="showDrugList('${current.dirId}', '${current.dirName}')"> <img alt="" src="${current.imgUrl }@!ys600" onclick="showDrugList('${current.dirId}', '${current.dirName}')" />
				</a>
			</div>

			<!--商品详情-->
			<div class="promoContent">
				<!-- 抽出共同的地方 -->
				<c:forEach items="${subList }" var="actiObj" varStatus="status">
					<div class="promoList clearfix" id="tabView_${actiObj.dirId}">
						<!-- 标题部分 -->
						<div class="promoTitle">
							<c:if test="${not empty actiObj.imgUrl}">
								<a name="tab_${actiObj.dirId}"> <img src="${actiObj.imgUrl}">
								</a>
							</c:if>
							<div class="showProdImg clearfix"></div>
						</div>
						<!-- 各类商品列表 -->
						<div class="promoItemList clearfix">
							<c:forEach items="${actiObj.arr }" var="actiItem" varStatus="st">
								<c:choose>
									<c:when test="${st.last && st.index % 2 == 0  }"></c:when>
									<c:otherwise>
										<div class="pItem">
											<c:choose>
												<c:when test="${actiItem.stockRemain > 0  }">
													<a href="javascript:void(0)" onclick="showDrugDetails('${actiItem.skuId }')"> 
														<img class="itemIcon" alt="" src="http://imgstore.camore.cn/icon/act/prod/${actiItem.prodId}.jpg@!ys100" data-changeimg="http://imgstore.camore.cn/icon/act/prod/${actiItem.prodId}.jpg" > 
														<!-- <img class="itemIcon" alt="" src="images/02.jpg" /> -->
													</a>
													<div class="itemDiv_icon">
														<%-- <c:if test="${not empty actiItem.actList}">
															<img style="" src="http://imgstore.camore.cn/medstore/images/ic_activity_zhe_new.png" />
														</c:if> --%>
														
													</div>
													<div class="itemDiv">
														<div class="drugInfo clearfix">
															<div class="itemPrice">
																<%-- <p class="itemName">${actiItem.prodName }</p>
																<p class="standard">${actiItem.standard }</p> --%>
																<div class="priceWrap">
																	<c:if test="${actiItem.price == 100 || actiItem.price == 10}">
																		<span class="tj_price"></span>
																	</c:if>
																	<c:if test="${actiItem.price != 100 && actiItem.price != 10}">
																		<span class="tj_price">原价:${actiItem.price/100}</span>
																	</c:if>
																	<span class="yj_price">促销价:${actiItem.costPrice/100 }</span>
																</div>
															</div>

															<%-- <div class="remindImg gwc" onclick="addShopping(${actiItem.skuId })">
																<c:if test="${actiItem.price == 100}">
																	<img src="http://imgstore.camore.cn/icon/act_dir/20161102_oneYuan0.png">
																</c:if>
																<c:if test="${actiItem.price == 10}">
																	<img src="http://imgstore.camore.cn/icon/act/logo/yj.png">
																</c:if>
																<c:if test="${actiItem.price != 100 && actiItem.price != 10}">
																	<img style="width: 1.18864734rem; margin: .1rem 0 0 .2rem;" src="http://imgstore.camore.cn/icon/act_dir/gouwuche.png">
																</c:if>
															</div> --%>
														</div>
													</div>
												</c:when>
												<c:otherwise>
													<a href="javascript:void(0)"> 
														<img class="itemIcon" alt="" src="http://imgstore.camore.cn/icon/act/prod/${actiItem.prodId}.jpg@!ys100" data-changeimg="http://imgstore.camore.cn/icon/act/prod/${actiItem.prodId}.jpg" >
													</a>
													<div class="itemDiv_icon">
														<%-- <c:if test="${not empty actiItem.actList}">
															<img style="" src="http://imgstore.camore.cn/medstore/images/ic_activity_zhe_new.png" />
														</c:if> --%>
														
													</div>
													<div class="itemDiv">
														<div class="drugInfo clearfix">
															<div class="itemPrice">
																<%-- <p class="itemName">${actiItem.prodName }</p>
																<p class="standard">${actiItem.standard }</p> --%>
																<div class="priceWrap">
																	<c:if test="${actiItem.price == 100 || actiItem.price == 10}">
																		<span class="tj_price"></span>
																	</c:if>
																	<c:if test="${actiItem.price != 100 && actiItem.price != 10}">
																		<span class="tj_price">原价:${actiItem.price/100}</span>
																	</c:if>
																	<span class="yj_price">促销价:${actiItem.costPrice/100 }</span>

																</div>
															</div>
															<!-- <div class="remindImg gwc">
																<img src="http://imgstore.camore.cn/icon/act_dir/yishouwan.png">
															</div> -->
														</div>
													</div>
												</c:otherwise>
											</c:choose>
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
<script>
		var subDirId = "${subDirId}";
		$(function(){
			/* var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
	        for(var i = 0;i<imgeles.length;i++){
	            loadImg(imgeles[i],scrollHeight);
	        }
			 */
			
			var mySwiper1 = new Swiper('#swiper-container1', {
				slidesPerView: 4,
				pagination: '.swiper-pagination',
				speed: 1000,
				autoplayDisableOnInteraction: true,

			});
			
			
			$('.navContent .pDown').on('click', function() {
				var close = $(this).is('.close');
				var hideText = $('.hideText');
				var innerLayer = $('.innerLayer');
				if(!close) {
					hideText.css({}).slideDown();
					innerLayer.css({
						top: $('.promoContent').offset().top
					}).show();
					/* $(".navContent .ul1").hide();
					$(".navContent .ul2").show(); */
				} else {
					hideText.slideUp();
					innerLayer.hide();
					/* $(".navContent .ul1").show();
					$(".navContent .ul2").hide(); */
				}

				$(this).toggleClass('close');
			});

			$('.navContent li').on('click', function() {
				$(this).addClass('selected').siblings().removeClass('selected');
				var index = $(this).index();
				mySwiper1.slideTo(Math.floor(index / 2), 1000, false);
				console.debug("navContent " + Math.floor((index + 1) / 2));
				var index = $(this).index();
				$('.hideText li').eq(index).addClass('selected').siblings().removeClass('selected');
				/* 数据 */
				//				var dirId = $(this).attr("data");
				//				showItem(dirId);
			});

			$('.hideText li').on('click', function() {
				$(".navContent .ul1").show();
				$(this).addClass('selected').siblings().removeClass('selected');
				var index = jQuery(this).index();
				$('.navContent li').eq(index).addClass('selected').siblings().removeClass('selected');
				var width = $('.navContent .nav ').width();
				var li = $('.navContent li').eq(index);

				var index = $(this).index();

				mySwiper1.slideTo(Math.floor((index + 1) / 2), 1000, false);
				console.debug("hideText " + Math.floor((index + 1) / 2));

				$('.hideText').slideUp();
				$('.navContent .pDown').toggleClass('close');
				var innerLayer = $('.innerLayer');
				innerLayer.hide();
				/* 数据 */
				//				var dirId = $(this).attr("data");
				//				showItem(dirId);
			});

			if(subDirId && subDirId.length > 0) {
				$("#tab_" + subDirId).click();
			}
			//			else {
			//				showItem(dirId);
			//			}
			
			
			$(".topArea ").css("marginTop",$('.topWrap').height());
			$(".hideText ").css("top",$('.topWrap').height());
			
			$(".contentBody").css("background","${current.remark}");
			/* document.title = '${current.dirName }'; */
		})
		
		/* function showItem(dirId) {
			if (!dirId || dirId < 1) {
				$(".promoContent .promoList").show();
			} else {
				$(".promoContent .promoList").hide();
				$("#dirItem_"+dirId).show();
			}
		} */
		
		function is_weixin(){
		    var ua = navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i)=="micromessenger") {
		        return true;
		    } else {
		        return false;
		    }
		}
		
		(function() {
			 if (is_weixin()) {
			 	$(".headCon").hide();
			 }else{ 
			 	$(".headCon").show();
			 } 
			 })(); 
		
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
					
				}
				
			}
		}

		$('li a').on('click',function(e){
		//	e.preventDefault ;
			
			var href = $(this).attr("href");
    		var pos = $(href).offset().top - $('.topWrap').height();
    		$("html,body").animate({scrollTop: pos}, 500);	
//    		return false;
		})

		
		var showCity = getShowName("showName");
		$('.head .address >span').html(showCity);

		function getShowName(name){
			var href = window.location.search;  
            var url = decodeURI(href);  
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = url.match(reg)
            if(r!=null)return  unescape(r[2]); return null;
		} 
		
		
		function offSet(ele) {
	        var l = ele.offsetLeft;
	        var t = ele.offsetTop;
	        var div = ele.offsetParent;//获取
	        l += div.offsetLeft;
	        t += div.offsetTop;
	        return {
	            left: l,
	            top: t
	        }
	    }
		var imgeles = document.getElementsByClassName("itemIcon");
	    var docHeight = document.documentElement.clientHeight || document.body.clientHeight;

	    window.onscroll = function(){
	        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
	        for(var i = 0;i<imgeles.length;i++){
	            loadImg(imgeles[i],scrollHeight);
	        }
	    };

	    function loadImg(ele,scrollHeight){
	        //获取图片的高度
	        var imgHeight = offSet(ele).top+ele.offsetHeight;
	        if(!ele.loaded){
	            if(imgHeight < scrollHeight+docHeight){
	                //获取要加载的图片资源
	                var imgsrc = ele.getAttribute("data-changeimg");
//	              ele.src = "images/loading.jpg";
	                ele.src = "";
	                var wiatingImg = new Image();
	                wiatingImg.src = imgsrc;
	                wiatingImg.onload = function(){
	                    ele.src = wiatingImg.src;  //
	                    ele.loaded = true;
	                }
	            }
	        }
	    }
	    
	    function loadFirst(){
	    	$('div.pItem img.itemIcon').each(function(i , node){
	    		if(i < 4 && $(node).attr("data-changeimg")){
	    			console.debug('old -> '+ $(node).attr('src')) ;
	    			$(node).attr('src',$(node).attr("data-changeimg"));
	    			console.debug('new -> '+ $(node).attr('src')) ;
	    		} 
	    	});
	    }
		$(function(){
			setTimeout( loadFirst(), 500) ;
		});
	</script>
</html>
