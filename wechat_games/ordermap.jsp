<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>店铺地图范围</title>
<jsp:include  page="/include/resource"></jsp:include>
<script src="js/jquery-1.9.0.min.js"></script>
<script src="js/jquery.pagination.js"></script>
<script src="js/common.js"></script>
<script src="js/jquery.datetimepicker.js"></script>
<script src="js/artDialog6/dist/dialog-min.js"></script>
<script src="js/artDialog6/dist/dialog-plus-min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=Ct5udcV6hGRD0rGbOwo4im8P"></script>
<link rel="stylesheet" href="js/artDialog6/css/ui-dialog.css"/>
		<style>
			 *{margin:0 ;padding:0;}
			 body,html{/* width:100%;  */ height: 100%; }
			 .pharma_map_body{/* width:100%;  */ height: 100%; } 
			 
			#navigation{position:absolute; background: #f5f5f5; /* width: 100%; */height: 34px; left: 0; top: 0;z-index: 100;
				  border-bottom: 1px solid #dcdcdc; line-height: 36px;
				  overflow: hidden;  white-space: nowrap;
			}
			#pharma_map{width:100%; height:100%; margin-top:32px;overflow: hidden; position:absolute;} 
			.selectedstyle{background-position: 0 -233px;height: 34px;font-size: 14px;float: left;line-height: 34px;
				  padding: 0 7px 0 15px;white-space: nowrap;text-align: center;line-height: 24px;
				  color: #fff;  background: #7fb8ff;cursor: pointer;overflow: hidden;
			}
			.commBtnSty { font-size: 12px;text-align: center;left: 1px; width: 70px;
				  color: rgb(22, 106, 190);
				  font-weight: bold;
				  z-index: 6;
				  background: rgb(222, 237, 255);
				  cursor: pointer;
			 }
			 .userOperation{position: relative;float: left;}
		</style>
</head>
<body>
	<!--地图区域  -->
	<div class="pharma_map_body">
		<div id="navigation" >
				<select class="selectedstyle" id="storeSelect" name="storeSelect" style="display:none;" onchange="javascript:selectOption(this.value);">
					<option value="">请选择</option>
					<c:forEach  var="drugs" items="${delivers}" varStatus="drug">
						<option id="courierclick" <c:if test="${drugs.adminId eq deliverInfo.adminId}">selected</c:if>  value="${drugs.adminId}">
						${drugs.adminName}
						</option>
					</c:forEach> 
				</select >
				<div class="userOperation">
					<div class="show_over commBtnSty" style="display: none;">显示范围</div>
					<div class="hide_over commBtnSty" >隐藏范围</div>
				</div>
		</div>
		<div id="pharma_map"></div>
	</div>
</body>
<script type="text/javascript">
$("#pharma_map").css("height", $("body").height() - 32);
$(window).resize(function() {
	$("#pharma_map").css("height", $("body").height() - 32);
});

// [{marker:{}, order:{}}, ]
var orderMarkers = [];

$(function(){
	// 百度地图API功能
	var locationPoint = '${location }' ;
	var locationPoints = '${range}' ;
	var map = new BMap.Map("pharma_map");
	var point = new BMap.Point(locationPoint.split(',')[0],locationPoint.split(',')[1]);
	var label = new BMap.Label("${phaName}",{offset:new BMap.Size(20,-10)});
	map.centerAndZoom(point, 15); // 中心点
	var marker = new BMap.Marker(point); // 药店所在位置标注
	map.addOverlay(marker);
	marker.setLabel(label);
	//添加提示信息
	
	var infoWindow = new BMap.InfoWindow("${pharmacy.pharmacyAddr}", {
		width : 200,     // 信息窗口宽度
		height: 100,     // 信息窗口高度
		title : "${pharmacy.pharmacyName}" , // 信息窗口标题
		message:"${pharmacy.pharmacyAddr}"
		
	}); 
	marker.addEventListener("click", function(){          
		map.openInfoWindow(infoWindow,point); //开启信息窗口
	});
	
	// 定时查询订单信息，并标注
	
	
	function queryOrder() {
		$.ajax({
	          url: "ordermanageAjax",
	          data:{orderStatus:"32",pharmacyId:"${pharmacy.pharmacyId}"},
	          type: "POST",
	          success: function (data) {
	              if (data.result == "succ") {
	            	  var otable = data.data.orderList;
	            	  if (!otable) {
	            		  return;
	            	  }
	            	  var olist = otable.recordList;
	            	  $.each(olist, function(idx, order) {
	            		  var pos = order.orderAddr.areaPos;
	            		  if (!pos) {
	            			  return;
	            		  }
	            		  var _pos = pos.split(',');
	            		  if (_pos.length < 2) {
	            			  return;
	            		  }
	            		  console.log(order.orderAddr);
	            		  var p = new BMap.Point(_pos[0],_pos[1]);
	            		  var label = new BMap.Label(toLastTime(order.orderCreateTime)
	            				  ,{offset:new BMap.Size(10,-30)});
	            		  label.setStyle({
	            			  	color:"#ff3355",
	           					fontSize : "14px", 
	           					border :"1px solid #a1a1a1",
	           					borderRadius: '6px',
	           					padding: '4px 8px',
	           					width:'80px'
	           			 	});
	            		  
	            		  
	            		 /*  var infoWindow = new BMap.InfoWindow("${pharmacy.pharmacyAddr}", {
		           				width : 200,     // 信息窗口宽度
		           				height: 100,     // 信息窗口高度
		           				title : "订单号："+order.orderId , // 信息窗口标题 009832
		           				message:"总价："+ order.orderPayFee
		           				
		           			});  */
		           			
		           			var infoWindow = new BMap.InfoWindow(getContent(order));
		           			
		           			
	            		  var myIcon = new BMap.Icon("images/loading_Map01.png", new BMap.Size(20,40));
	            		  var marker = new BMap.Marker(p,{icon:myIcon});
	            		  marker.setLabel(label);
	            		  marker.addEventListener("click", function(){          
		           				map.openInfoWindow(infoWindow, p); //开启信息窗口
		           			});
	            		  orderMarkers.push({
	            			  order:order,
	            			  marker:marker
	            		  });
	            		  map.addOverlay(marker);
	            		  
	            	  });
	            	  
	            	  
	              } else {
	                  alert('失败!');
	              }
	          }
	      });
	}
	
	setInterval(function(){
		var now = new Date().getTime();
		var miao = parseInt(now/1000);
		if (parseInt(miao%60) == 0) { // 每分钟查询订单一次
			queryOrder();
		} else {
			$.each(orderMarkers, function(idx, obj) {
				
				var str = toLastTime(obj.order.orderCreateTime);
				obj.marker.getLabel().setContent(str);
			});
		}
	}, 1000);
	
	
	
	//双击后放大地图比例
	map.disableDoubleClickZoom(true);
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
	map.addControl(top_left_navigation); 
	
	
	/* 根据药店位置绘制药店所在的多边形区域 */
	var pointArray = new Array() ;
	if(locationPoints && locationPoints.split(';').length > 0){
		var locaPointsArray = locationPoints.split(';') ;
		for(var i = 0 ;i<locaPointsArray.length ;i++){
			var itemPoint = locaPointsArray[i] ;
			if(itemPoint && itemPoint.split(',')[0] )
				pointArray.push(new BMap.Point(itemPoint.split(',')[0] ,itemPoint.split(',')[1] ));
		}
		
		/* var polyline = new BMap.Polyline(pointArray, {strokeColor:"blue", strokeWeight:4, strokeOpacity:0.3});
		map.addOverlay(polyline);   */        //增加折线
		var polygon = new BMap.Polygon(pointArray, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.8,fillOpacity:0.4});
		map.addOverlay(polygon);   //增加多边形
	}
	/*控制多边形的显示和隐藏  */
	$('div.show_over').click(function(){
		$(this).hide();
		$('div.hide_over').show();
		if(!polygon)
		{
			alert('没有可显示的区域哦');return  ;
		}		
		/* polyline.show(); */
		polygon.show();
	});
	$('div.hide_over').click(function(){
		$(this).hide();
		$('div.show_over').show();
		if(!polygon)
		{
			alert('没有可隐藏的区域哦');return  ;
		}	
		/* polyline.hide(); */
		polygon.hide();
	});
	
	
	$("#cancel").click(function(){
		location.href="cancel";
	});
	
});

function toLastTime(str) {
	str = str.replace(/-/g,"/");
	var date = new Date(str).getTime();
	var now = new Date().getTime();
	
	var miao = parseInt(((now-date)/1000)%60);
	var fen =  parseInt((now-date)/60000);
	if (fen > 60) {
		var h = parseInt(fen/60);
		fen = parseInt(fen%60);
		return h+"时"+fen+"分"+miao+"秒";
	} else {
		return fen+"分"+miao+"秒";
	}
}

function getListContent(orderList) {
	var content ='<div class="content" style="border-radius: 2px;margin:0;padding:0;width: 360px;background: #fff;border:1px solid #eee;">';
	$.each(orderList, function(idx, order) {
		content += '<div style="overflow: hidden;width: 100%;margin:0 auto;padding:0;background: rgba(12, 135, 229, 0.67);opacity: .9;">';
		content += '<p style="float:left;margin:0;padding:10px;box-sizing:border-box;color: #fff;font-size: 14px;">订单号：'+order.orderId+'</p>';
		content += '<p style="float:right;margin:0;padding:10px;box-sizing:border-box;color: #fff;font-size: 14px;">价格：' +order.orderPayFee/100+'元</p>';
		content += '</div>';
	});
	content += '<div class="oprate"style="color:#666;width: 360px;height:40px;line-height:40px;border-top:1px solid #eee;">';
	content += '<ul style="list-style: none;overflow: hidden;margin: 0;padding: 0;text-align: center;font-weight: 600;">';
	content += '<li style="cursor:pointer;list-style: none;float: left;width: 89px;border-right:1px solid #eee;color:red">派单</li>';
	content += '<li style="cursor:pointer;list-style: none;float: left;width: 89px;border-right:1px solid #eee;">拒单</li>';
	content += '<li style="cursor:pointer;list-style: none;float: left;width: 89px;border-right:1px solid #eee;">打印贴票</li>';
	content += '<li style="cursor:pointer;list-style: none;width: 89px;float: left;">打印小票</li>';
	content += '</ul>';
	content += '</div>';
	content += '</div>';
	
	
	return content;
	
}

function getContent(order) {
	var content ='<div class="content" style="border-radius: 2px;margin:0;padding:0;width: 360px;background: #fff;border:1px solid #eee;">';
		content += '<div style="width: 100%;margin:0 auto;padding:0;background: rgba(12, 135, 229, 0.67);opacity: .9;">';
		content += '<p style="margin:0;padding:10px;box-sizing:border-box;color: #fff;font-size: 14px;">订单号：'+order.orderId+'</p>';
		content += '<p style="margin:0;padding:10px;box-sizing:border-box;color: #fff;font-size: 14px;">价格：' +order.orderPayFee/100+'元</p>';
		content += '</div>';
		content += '<div style="width: 100%;margin:0 auto;padding:0;">';
		content += '<div style="position: relative;overflow: hidden;border-bottom:1px dashed #eee;padding: 0;box-sizing: border-box;">';
		content += '<span style="display:inline-block;margin:0;padding:9px 10px;box-sizing:border-box;color: #999;font-size: 14px;">姓名：'+order.orderAddr.name+'</span>';
		content += '</div>';
		content += '<div style="position: relative;overflow: hidden;border-bottom:1px dashed #eee;padding: 0;box-sizing: border-box;">';
		content += '<span style="position:absolute;top:50%;display:inline-block;margin:-8px 3px 0 6px;width:14px;height: 16px;background-image: url(images/map-icon.png);background-repeat: no-repeat;background-position: 0 -183px;"></span>';
		content += '<span style="display:inline-block;margin:0;padding:9px 0 9px 30px;box-sizing:border-box;color: #999;font-size: 14px;">地址：'+order.orderAddr.address+'</span>';
		content += '</div>';
		content += '<div style="position: relative;overflow: hidden;padding: 0;box-sizing: border-box;">';
		content += '<span style="position:absolute;top:50%;display:inline-block;margin:-8px 3px 0 6px;width:14px;height: 16px;background-image: url(images/map-icon.png);background-repeat: no-repeat;background-position: 0 -234px;"></span>';
		content += '<span style="display:inline-block;margin:0;padding:9px 0 9px 30px;box-sizing:border-box;color: #999;font-size: 14px;">电话：'+order.orderAddr.phoneNo+'</span>';
		content += '</div>';
			
		content += '</div>';
		content += '<div class="oprate"style="color:#666;width: 360px;height:40px;line-height:40px;border-top:1px solid #eee;">';
		content += '<ul style="list-style: none;overflow: hidden;margin: 0;padding: 0;text-align: center;font-weight: 600;">';
		content += '<li style="cursor:pointer;list-style: none;float: left;width: 89px;border-right:1px solid #eee;color:red">派单</li>';
		content += '<li style="cursor:pointer;list-style: none;float: left;width: 89px;border-right:1px solid #eee;">拒单</li>';
		content += '<li style="cursor:pointer;list-style: none;float: left;width: 89px;border-right:1px solid #eee;">打印贴票</li>';
		content += '<li style="cursor:pointer;list-style: none;width: 89px;float: left;">打印小票</li>';
		content += '</ul>';
		content += '</div>';
		content += '</div>';
		
		
		
		
		return content;
}




	
</script>
</html>