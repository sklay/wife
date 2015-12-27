$(function(){
		//查询活动的两个侧边线长度设定
		function getlineWidth(textClass,lineClass){
			var ttxw=$("."+textClass).outerWidth();
			var tpxw=$("."+textClass).parent().width();
			var lcw=Math.floor((tpxw-ttxw)/2);
			$("."+lineClass).css({width:lcw});
		};
		getlineWidth("main_header .tit_text","main_header .titline");
		getlineWidth("result_linesty .tit_text","result_linesty .titline");
		getlineWidth("innerresultline .tit_text","innerresultline .titline");
		window.onresize=function(){
			getlineWidth("main_header .tit_text","main_header .titline");
			getlineWidth("result_linesty .tit_text","result_linesty .titline");
			getlineWidth("innerresultline .tit_text","innerresultline .titline");
		}
		//时间控件
		$('.timePlu').appendDtpicker({
		"locale": "cn",
		"dateOnly": true,
		"dateFormat": "YYYY-MM-DD",
		"timelistScroll": false,
		"autodateOnStart": false,
		"calendarMouseScroll": false,
		"animation": false,
		"closeOnSelected":true
		})
		
		var timbew=$("#timeBegin").innerWidth();
		$(".datepicker_inner_container").css({width:timbew})
		
		//	点击添加按钮部分样式设置
		function getAddlistHeight(){
			var objhei=$(".goodslist_searesult_list").outerHeight();
			var addbo=objhei/2-60
			$(".goodslist_searesult_controllbtn").outerHeight(objhei);
			$(".goodslist_searesult_controllbtn_add").css({bottom:addbo})
			
		}
		getAddlistHeight()

		
		//----------------------------新增优惠所需JS START-------------------------------------------
		
		/*当前被选中的大类导航条具有类名：discount_selectpage，默认第一个有此类名  ,
		以下所有方法都是要在具有discount_selectpage类名的框架内才能执行*/
		/* 大类导航条切换 */
		$(".discount_list_tit").on("click","li",function(){
			$(".discount_list_tit li").removeClass("discount_list_tit_sel");
			$(this).addClass("discount_list_tit_sel");
			var $_index=$(this).index();
			$(".result_linesty").removeClass("discount_selectpage").hide();
			$(".result_linesty").eq($_index).addClass("discount_selectpage").show();
		})


		/*新建子类的tab切换 ，当前被选中的子类具有类名：showlist，在点击新建时，新建的子类自带此类名*/
		$(".goodslist_tit").on("click",".listyle",function(){
			var $_index=$(this).index();
			$(".discount_selectpage .listyle").removeClass("discount_details_tit_sel");
			$(this).addClass("discount_details_tit_sel");
			$(".discount_selectpage .goodslist_details_wrap").hide().removeClass("showlist");
			$(".discount_selectpage .goodslist_details_wrap").eq($_index-1).show().addClass("showlist");
				 
		})

		/* 全选按钮 */
			$(".goodslist_details_wrap .goodslist_searesult_selall").on("click",function(){
				var selAllbtn=$(this).attr("checked")
				if(selAllbtn=="checked"){
					$(".discount_selectpage .showlist .goodslist_searesult_list .checkboxsty").attr({checked:"checked"});
					$(".discount_selectpage .showlist .goodslist_searesult_show tr").attr("add","true");
				}else{
					$(".discount_selectpage .showlist .goodslist_searesult_list .checkboxsty").removeAttr("checked");
					$(".discount_selectpage .showlist .goodslist_searesult_show tr").removeAttr("add");
				}
			})
				/* 当所有checkbox被选中，全选按钮同时被选中 */	 		
		 	$(".goodslist_searesult_show .checkboxsty").on("click",function(){
		 			var a=0;
		 			$(".discount_selectpage .goodslist_searesult_show .checkboxsty").each(function(x){
		 				var chec=$(".discount_selectpage .showlist .goodslist_searesult_show .checkboxsty").eq(x).attr("checked");
		 				if(chec=="checked"){
		 					a++;
		 					$(".discount_selectpage .showlist .goodslist_searesult_show tr").eq(x).attr("add","true")
		 				}else{
		 					$(".discount_selectpage .showlist .goodslist_searesult_show tr").eq(x).removeAttr("add")
		 				}
		 			 })
		 			 if(a==$(".discount_selectpage .showlist .goodslist_searesult_show .checkboxsty").length){
		 				 $(".discount_selectpage .showlist .goodslist_searesult_selall").attr({checked:"checked"})
		 			 }else{
		 				 $(".discount_selectpage .showlist .goodslist_searesult_selall").removeAttr("checked")
		 			 }
		 		}) 
					  

					 	/* 点击添加搜索结果到选中商品事件 */
			 	$(".goodslist_searesult_controllbtn_add").on("click",function(ev){
			 		ev.preventDefault();
			 		 var removeshow=null;
			 		 var $_html=null;
			 		 var a= $(".discount_selectpage .showlist .goodslist_searesult_show tr").length;
			 		 for(var i=0;i<a;i++){
			 			 var show=$(".discount_selectpage .showlist .goodslist_searesult_show tr");
			 			if(show.eq(i).attr("add")){
			 				var $_this=show.eq(i)
			 				$_html="<tr>"+$_this.html()+"</tr>"
			 				$(".discount_selectpage .showlist .goodslist_searesult_add table").append($_html);
			 				$_this.remove();
			 				i--;
			 			}
			 		 }
			 		$(".discount_selectpage .showlist .goodslist_searesult_selall").removeAttr("checked");
			 		$(".discount_selectpage .showlist .goodslist_searesult_show .checkboxsty").removeAttr("checked");
			 		$(".discount_selectpage .showlist .goodslist_searesult_show tr").removeAttr("add");
			 	})
			
			 /* 点击添加新子类 */
		 $(".goodslist_tit .add_goodslist_tit").on("click",function(){
			 console.log(1)
				var newChild=$(".discount_selectpage .goodslist_details_wrap:last-child").clone(true); 
			 newChild.addClass("showlist");
				 var newli=$('<li class="discount_details_tit_sel listyle">新建子类</li>')
				 $(".discount_selectpage .discount_details_tit_sel").removeClass("discount_details_tit_sel");
				 $(".discount_selectpage .goodslist_tit").append(newli);
				 $(".discount_selectpage .goodslist_details_wrap").hide().removeClass("showlist");
				 $(".discount_selectpage .goodslist_wrap").append(newChild);
				 $(".discount_selectpage .goodslist_details_wrap:last-child").show();
		 })	 
			 
		
		//----------------------------新增优惠所需JS END-------------------------------------------
	})