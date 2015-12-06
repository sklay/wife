/**
 * 引用位置：aboutaddr.jsp（用户切换地址页面）
 * 用途：三级省市区搜索及滑动效果；
 * 依赖组件：swiper;
 * Create By BIAN;
 */
window.onload = function(){
	getCityFun();
	var userSelectProvince="${province }"?"${province }":"${city }";
	var userSelectCity="${city }";
	var userSelectArea="${district }";
	console.log(userSelectArea)
	var timecity=null;
	/* 三级地址查询 */
	var provinceSwiper = new Swiper('.province_wrap',{
		direction:'vertical',
		watchSlidesProgress : true,
		watchSlidesVisibility : true,
		onTouchStart:function(){
			$(".citylist_wrap").empty();
			$(".arealist_wrap").empty();
		},
		onTouchEnd: function(swiper){
			getCityFun();
		}
	});
	/*for(var i=0,j=provinceSwiper.slides.length;i<j;i++){
		provinceSwiper.slides[i].style.height="30px";
	}
*/
	var getProvincelist="${provinceList }";
	//console.log(getProvincelist)
	//根据默认地址更改初始值
	for(i=0,j=getProvincelist.length;i<j;i++){
		if($(".allareashow .province_wrap .swiper-slide").eq(i).html() == userSelectProvince){
			 $(".allareashow .province_wrap .swiper-slide").removeClass("swiper-slide-visible swiper-slide-active");
			var _province= "<li class='swiper-slide'>"+$(".allareashow .province_wrap .swiper-slide").eq(i).html()+"</li>";
			 $(".allareashow .province_wrap .swiper-slide").eq(i).remove(); 
			 $(".provincelist").insert(_province)
			  provinceSwiper.slides[i].progress; 
		}
	}
	/* 由省查市 */	
	function getCityFun(){
		clearTimeout(timecity)
		timecity=setTimeout(function(){
			var province=$(".province_wrap .swiper-slide-active").html();
			userSelectProvince=province; 
			$.ajax({
				type:"get",
	 			url:"queryCityAjax",
	 			data:"province="+province,
	 			success:function(result){
	 				var citylist=result.cityList;
	 				var _html="<ul class='swiper-wrapper citylist'>";
	 				for(i=0,j=citylist.length;i<j;i++){
	 					_html += "<li class='swiper-slide'>"+citylist[i]+"</li>";
	 				}
	 				_html+="</ul>";
	 				$(".citylist_wrap").append(_html);
	 				cityswiper();
	 				 getAreaFun();
	 			},
	 			error:function(){
	 				alert("系统异常，请重试")
	 			}
	   		 });
		},500)
	};
	
	/* 市级滑动方法 */
	function cityswiper(){
		var citySwiper = new Swiper('.citylist_wrap',{
			direction:'vertical',
			watchSlidesProgress : true,
			watchSlidesVisibility : true,
			onTouchStart:function(){
				$(".arealist_wrap").empty();
			},
			onTouchEnd: function(swiper){
				getAreaFun()
			}
		});
	};
	
/* 由省市查区 */
function getAreaFun(){
	clearTimeout(timecity)
	timecity=setTimeout(function(){
		var province=$(".province_wrap .swiper-slide-active").html();
		var city=$(".citylist_wrap .swiper-slide-active").html();
		/* userSelectCity=city; */
		$.ajax({
			type:"get",
 			url:"queryDistrictAjax",
 			data:"province="+province+"&city="+city,
 			success:function(result){
 				var _html="<ul class='swiper-wrapper arealist'>";
 				$(".arealist_wrap").empty();
 				for(i=0,j=result.beanList.length;i<j;i++){
 					_html += "<li class='swiper-slide'>"+result.beanList[i].districtName+"</li>";
 				}
 				_html+="</ul>";
 				$(".arealist_wrap").append(_html);
 				areaswiper();
 				 userSelectArea=$(".arealist_wrap .swiper-slide-active").html(); 
 			},
 			error:function(){
 				alert("系统异常，请重试")
 			}
   		 });
	},500)
};
/* 区级滑动方法 */
function areaswiper(){
	var citySwiper = new Swiper('.arealist_wrap',{
		direction:'vertical',
		watchSlidesProgress : true,
		watchSlidesVisibility : true,
		onTouchEnd: function(swiper){
			 userSelectArea=$(".arealist_wrap .swiper-slide-active").html(); 
		}
	});
};
/* 点击取消选择区域 */
$(".cancelSelectArea").on("click",function(){
	$(".allareashow_wrap").removeClass("allareashow_block")
})

/* 点击确定选择区域 */
 $(".submitSelectArea").on("click",function(){
	 /*userSelectArea=$(".arealist_wrap .swiper-slide-active").html();
	userSelectCity=$(".citylist_wrap .swiper-slide-active").html();
	userSelectProvince=$(".province_wrap .swiper-slide-active").html();*/
	$("#areaShow").html(userSelectArea);
	$(".allareashow_wrap").removeClass("allareashow_block");
 })
	
};