<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>药品管理</title>
<link rel="stylesheet" href="style/manage.css" />
<link rel="stylesheet" href="style/pagination.css" />
<link rel="stylesheet" href="style/jquery.datetimepicker.css"/ >
<script src="js/jquery-1.9.0.min.js"></script>
<script src="js/jquery.pagination.js"></script>
<script src="js/common.js"></script>
<script src="js/jquery.datetimepicker.js"></script>

<style>
.content .drugInfo{width:100%;height:100%;margin-left:5%;margin-top:30px;}
.content .drugInfo .tabTitle{width:100%;font-size:0;margin-bottom: -2px;}
.content .drugInfo .tabTitle .titleItem{width:160px;height:32px;line-height:32px;background:#eee;
		border:1px solid #bbb;display:inline-block;text-align:center;
		border-radius:5px 5px 0px 0px;font-size:14px;}
.content .drugInfo .tabTitle .checked{background:#fff;padding-top:2px;border-bottom:none;}
.content .drugInfo .pageItem .baseinfo{width:100%;margin:20px 0px 15px 30px;}
.content .drugInfo  .pageItem .baseinfo input{width: 20%;padding:4px 2px;cursor: pointer;}
.content .drugInfo  .pageItem .baseinfo .basethead{  display: block;
  line-height: 35px;
 display: inline-block;
  width: 10%;
 }
 .content .drugInfo  .pageItem .baseinfo .commSty{ margin-left:10%;
 }
.pageItem {width:80%;  border: 1px solid #eee;}
.content .drugInfo .pageItem .baseinfo  .typename{display:inline-block;width:50px;height:25px;line-height:25px;text-align:center;border:1px solid #ccc;margin:1% 0;background:#A7DFE4;color:#E01067;cursor:pointer;}
.content .drugInfo  .pageItem .baseinfo .checked{background:url(images/drug_edit_type.png) 96% 50% no-repeat;background-size:16px;}
/* .content .drugInfo  .pageItem .baseinfo .starlevel{display:inline-block;width:31px;height:20px;line-height:20px;text-align:center;border:1px solid #ccc;cursor:pointer;} */
.savebut{width:80px;height:35px;border-radius:5px;font-size:22px;  margin: 2% 8%;  background:#7A93D3;}

/*
.drag_content .numOrder{display:block;float:left;margin-left:30px;width:82px;height:60px;text-align: center;color:#ddd;font-size:46px;}
.FileUpload { width: 715px; padding: 8px 0px 30px 0px; background-color: #f7f7f7; border: 1px solid #e0e0e0; margin-top:20px; } 
.FileUpload li{ width: 144px; height:144px; margin-left:30px; margin-top:20px; float:left; } 
.FUItem { width: 144px; height:144px;text-align: center; line-height: 20px; color: #cccccc; } 
.FUItem .img {width: 140px;height:140px;border: 1px solid #cccccc;background-color: #ffffff;text-align: center;position: relative;padding: 1px; } 
.FUItem .img img{width: 100%;height:100%}
.FUItem .img p {padding-top: 60px; color: #CCCCCC; font-size: 46px; } 
.FUItem .img .delThis{width:35px;height:35px;background: url(images/drug_delIcon.png) center no-repeat #fff;z-index:9;background-size: 30px;position: absolute;right: -10px;top: -10px;cursor: pointer;display:none;border:1px solid #FF0000;}
.FUItem .img .sequence{width:35px;height:35px;line-height:35px;background:#CC6600;z-index:9;position: absolute;right: -10px;top: -10px;cursor: pointer;display:none;color:#fff;font-size:30px;text-align: center;}
.FUItem .Btn {background:#7A93D3; width: 100%; height: 25px;  line-height: 25px; margin-top: 5px; font-size:14px;color:#fff; }
.FUItem .img .fileToUpload {height: 140px;z-index:3;border: 1px solid #B5B8C8;width: 140px;position: absolute;right: 0px;font-family: Arial;filter: alpha(opacity=0);opacity: 0;top: 0;}

.addone{background:url(images/m_drugedit_add.jpg) center center no-repeat;}
#saveimg{margin:15px 0px 20px 298px;}
.instrac{padding:30px 0px;} */
/* .instrac .insinput{width:220px;padding: 5px;margin-right:20px;margin-left:50px;}
.instrac .insbut{background:#fff;padding:6px 10px;border:1px solid #000;margin-right:20px;}
.addbut{width:120px;height:35px;border-radius:5px;font-size:22px;background:#fff;margin-left:270px;margin-bottom:20px;}
.prodnamestyle{width: 180px;text-align: left;padding-left: 30px;box-sizing: border-box;}
.prodtitlestyle{background: #cccccc;font-size: 18px;}
.prodinfostyle{width: 180px;text-align: left;padding-left: 30px;box-sizing: border-box;font-size: 12px;}
.oneprodinfostyle{height: 40px;}
.pagination{margin-left: 10px;width: 46%;} */
/* .selectstyle{background: #7A93D3 !important ;}
.decorate{background: #f7f7f7;}
.drugList{width: 45%;display: inline;}

.butStyle{border:2px solid #999999;padding:8px 20px;background:#fff;font-size:14px;margin-right:10px;}
 */


.basetext a{  text-decoration: underline; color: blue;font-size:15px;}

.selectedstyle{   padding: 4px 2px;
  width: 20%;
  cursor: pointer;
}

</style>
</head>
<body>
	<div class="nav_menu ">
		<%@ include  file="header.jsp"%>
	</div>
	<div class="left">
		<%@ include  file="left.jsp"%>
	</div>
	<div class="content ">
		<div class="location">
			当前位置： <a href="newquerlist">店铺管理</a> &gt <a>店铺查看</a>
		</div>
		<div class="drugInfo">
			<!--<div class="tabpage">-->
				<div class="pageItem" style="display:block;">
					<form action="">
						<div class="baseinfo">
							<h3 class="basethead">店铺查询</h3>
							<div class="">
								<div class="basetext">
									<p class="basethead">药店id</p>
										<input id="drugShopId" disabled="disabled" name="drugShopId"  value="${pInfo.pharmacyId }" />
									<p class="basethead commSty">药店code</p>
										<input id="drugShopCode" name="drugShopCode" disabled="disabled" value="${pInfo.pharmacyCode }" />
								</div>
								<div class="basetext">
									<p class="basethead">更新时间</p>
										<input id="updateTime" name="updateTime" disabled="disabled" value="${pInfo.pharmacyUpdateTime }" />
									<p class="basethead commSty">药店名称</p>
										<input id="drugShopName" name="drugShopName"  value="${pInfo.pharmacyName }" />
								</div>
								<div class="basetext">
									<p class="basethead">药店电话</p>
										<input id="drugShopPhone" name="drugShopPhone"  value="${pInfo.pharmacyPhone }" />
									<p class="basethead commSty">配送时间</p>
										<select id="drugShopSelect" name="drugShopSelect" class="selectedstyle" >
												<option   value="30" <c:if test="${pInfo.pharmacyDeliverTime==30 }"> selected </c:if>>30分钟</option>
												<option   value="40" <c:if test="${pInfo.pharmacyDeliverTime==40 }"> selected </c:if>>40分钟</option>
												<option   value="60" <c:if test="${pInfo.pharmacyDeliverTime==60 }"> selected </c:if>>60分钟</option>
										</select>
								</div>
								<div class="basetext">
									<p class="basethead">药店区域</p>
									<input name="drugShopArea" id="drugShopArea"  value="${pInfo.pharmacyArea}" />
								</div>
								<div class="basetext">
									<p class="basethead">营业时间</p>
										<input id="timeBegin" class="timePlu" name="minOrderTime" style="width: 8%; value=""  />
										<b>至</b>
										<input id="timeEnd" class="timePlu" name="maxOrderTime" style="width: 8%; value=""  />
										<span class="typename " data="1" id="drugType">24小时</span>
								</div>
								<div class="basetext">
									<p class="basethead">药店地址</p>
										<textarea name="drugShopAddr" id="drugShopAddr" style="width: 50%; cursor: pointer; vertical-align: top;" >${pInfo.pharmacyAddr }
										</textarea>
								</div>
								<div class="basetext">
									<div class="">
										<p class="basethead">药店资质</p><a target="_blank"  href="${pInfo.pharmacyRemark }">查看</a>
									</div>
									<div class="">
										<p class="basethead">药店地图</p><a target="_blank" href="pharmacyMap?pharmacyId=${pInfo.pharmacyId }">查看</a>
									</div>
								</div>
							</div>
						</div>
					</form>
					<button id="basesave" class="savebut  mdinsertAndUpdateProdBasicInfo">保 存</button>
				</div>
			<!--</div>-->
		</div>
	</div>
	<div class="clearfix"></div>
</body>
<script>
$(function(){
	
	var phaTime = "${pInfo.pharmacyTime}";
	if(phaTime=='24小时'){
		$(".typename").addClass("checked");
		$(".timePlu").attr({"disabled":true});
		$(".timePlu").val("");
	} else{
		var $_time= phaTime.split('-');
		$("#timeBegin").val($_time[0]);
		$("#timeEnd").val($_time[1]);
		$(".timePlu").removeAttr("disabled");
		$(".typename").removeClass("checked");
	}
	/* $(".baseinfo .typename").click(function(){ */
	$(".baseinfo").on("click",".typename",function(){
		console.log($(".typename").hasClass("checked"))
		
		
	/** 含有checked 说明已经选中24小时 此时则需要清除checked 并且释放disabled*/
	if ($(".typename").hasClass("checked")) {
		/* alert(1); */
		$(".timePlu").removeAttr("disabled");
		$(".typename").removeClass("checked");
		console.log("has")
	}
	/** 未含有checked 说明未选中24小时 此时则需要添加checked 并且控制disabled*/
	else{
		console.log("Nothas")
		$(".typename").addClass("checked");
		$(".timePlu").attr({"disabled":true});
		$(".timePlu").val("");

	}
});
/*时间控件*/
$("#timeBegin").datetimepicker({
	datepicker:false,
	format:'H:i',
	allowBlank:true ,
	step:30
});

$("#timeEnd").datetimepicker({
	datepicker:false,
	format:'H:i',
	allowBlank:true ,
	step:30
});
		$("#basesave").click(function(){
			var drugShopId = $("#drugShopId").val();
			var drugShopCode = $("#drugShopCode").val();
			var updateTime = $("#updateTime").val();
			var drugShopName = $("#drugShopName").val();
			var drugShopPhone = $("#drugShopPhone").val();
			var drugShopSelect = $("#drugShopSelect").val();
			var pharmacyTime = "";
			if($(".typename").hasClass("checked")){
				pharmacyTime="24小时";
			}else{
				var timeBegin = $("#timeBegin").val();
				var timeEnd = $("#timeEnd").val();
				pharmacyTime = timeBegin +"-" + timeEnd;
			}
			
			
			
			var drugShopAddr = $("#drugShopAddr").val();
			$.ajax({
				type: "post",
				url:"updatePharmacyInfo",
				data: "pharmacyId="+drugShopId +"&pharmacyCode="+drugShopCode +"&pharmacyUpdateTime="+updateTime +"&pharmacyName="+drugShopName +"&pharmacyPhone=" 
						+ drugShopPhone + "&pharmacyDeliverTime="+ drugShopSelect+"&pharmacyTime="+pharmacyTime +"&pharmacyAddr="+ drugShopAddr,
				success: function(data){
					if(data.result =="succ"){
						$("#drugShopId").val(data.data);
						alert("基本数据保存成功!");
						window.location.href='pharmacyList';
					}
				}		
			});
		});
	
});


</script>
</html>