/**
 * takeorder专用js
 */
	var map = new BMap.Map("allmap");
	map.centerAndZoom(local,12);
	var ac = new BMap.Autocomplete({"input" : "autoStreet","location" : local});
	ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
		var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
	var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
	});
	var ac = new BMap.Autocomplete({"input" : "updateStreet","location" : local});
	ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
		var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});
	
	var myValue;
	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
		var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
	});

	
	function toUpdateAdd(){
		shadeAll();
		$.ajax({url:'tupdateAddr',type:'post',
			data:{
			"pharmacyId" : _saveAddObj.pharmacyId,
			"addrIdStr" : _saveAddObj._aId,
			"addrInfo" : _saveAddObj._info,
			"phoneNum" : _saveAddObj._pnum,
			"houseNumber" : _saveAddObj._hm,
			"addrPos" : _saveAddObj.addrPos
			},
			success:function(respon){
				closeShade();
				if (respon.result == "succ") {
					refrechAdd(respon.data);
					$(".t_a_d").hide();
					$(".t_a_d").find("input").val("");
					if (respon.message!="" && respon.message!=null) {
						showResult("remind",respon.message);
						$("#tonewAdd").attr("checked",false);
					}
				}else{
			    	showResult("error",respon.message);
				}
				_saveAddObj = new Object();
				$("#allmap").hide();
				$("#sureyouA").hide();
				$(".left").show();
				$(".content").show();
		    },error:function(e){
		    	closeShade();
		    	showResult("error","新建地址失败！");
		    }
		});
	}
	
	var secondSaveOutPosi;
	var curCreatedId;
	function toSaveAdd(){
		secondSaveOutPosi = _saveAddObj;
		shadeAll();
		$.ajax({url:'taddAddr',type:'post',
			data:{
			"addrInfo" : _saveAddObj._info,
			"phoneNum" : _saveAddObj._pnum,
			"houseNumber" : _saveAddObj._hm,
			"addrPos" : _saveAddObj.addrPos,
			"pharmacyId" : _saveAddObj.pharmacyId
			},
			success:function(respon){
				closeShade();
				if (respon.result == "succ") {
					var _currAddId = respon.addrId;
					refrechAdd(respon.data);
					$(".t_a_n").find(".tan_new_area").hide();
					$(".t_a_n").find(".tan_new_area").find(".add_input,.add_r_p").val("");
					/**当message不为空，证明药店不支持当前地址配送**/
					if (respon.message!="" && respon.message!=null) {
						$("#tonewAdd").attr("checked",false);
						notsupportAdd();
//						curCreatedId = _currAddId;//保存当前创建ID
					}else{
						$("#pharmacyDiv").hide();
						$(".takeNav_n").find(".tn_checked").removeClass("tn_checked");
						$(".takeNav_n").find(".tn_li").eq(1).addClass("tn_checked");
						$(".takeAdd_n").hide();
						$(".tobuy_new").show();
						$("#addrId_n").val(_currAddId);
						$(".ra_box[value="+_currAddId+"]").attr("checked",true);
						isConti = true;
						loadCart();
						refrechAct();
					}
				}else{
			    	showResult("error",respon.message);
				}
				_saveAddObj = new Object();
				$("#allmap").hide();
				$("#sureyouA").hide();
				$(".left").show();
				$(".content").show();
				$(".t_a_n .use_phone").html("");
		    },error:function(e){
		    	closeShade();
		    	showResult("error","新建地址失败！");
		    }
		});
	}
	
	function refrechAct(){
		$.ajax({url:'tqueryActItem',type:'post',
			success:function(respon){
				if (respon.result == "succ") {
		    		closeShade();
		    		assortment = respon.data;
		    		$("#actiNum").html(assortment.act.length);
		    		makeAssortment.speedy(assortment.sy,"快速");
		    		
				}
		    },error:function(e){
		    	closeShade();
		    	showResult("error","查询优惠券信息失败！");
		    }
		});
	}
	
	function notsupportAdd(){
		shadeAll();
		letDivCenter("showfaild");
		$("#pharmacyDiv").find(".tmaddtitle").text("距离");
		$("#showfaild").find(".faildtitle").text("该地址不在药店的配送范围").css("color","#0000FF");
		$("#showfaild").find(".f_cancel").text("返回");
		$("#showfaild").find(".f_yes").addClass("outPosi");
		$("#showfaild").show();
	}

	var areaCallback = function(param){
		var _pn = param.province;
		var _cn = param.cityname;
		$("#callCity").text(_pn+"-"+_cn);
		_prov = param.province;
	}

	function mapPoint(_addObj){
		var map = new BMap.Map("allmap");
		map.centerAndZoom("${pcity}",15);
		var myGeo = new BMap.Geocoder();
		myGeo.getPoint(_addObj._info, function(point){
			if (point) {
//				$(".left").hide();
//				$(".content").hide();
//				$("#allmap").css("left",0);
//				$("#allmap").css("top",0);
//				$("#allmap").css("width",$(window).width());
//				$("#allmap").css("height",$(window).height());
//				$("body").scrollTop(0);
//				$("#allmap").show();
//				$("#sureyouA").show();
//				var map = new BMap.Map();
//				map.centerAndZoom(point, 15);
//				var marker = new BMap.Marker(point);// 创建标注
//				map.addOverlay(marker);             // 将标注添加到地图中
//				marker.enableDragging();           // 可拖拽
//				map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
//				var top_left_navigation = new BMap.NavigationControl();
//				map.addControl(top_left_navigation);
//				marker.addEventListener("dragend", function(e){   
//		        	_saveAddObj.addrPos = e.point.lng + "," + e.point.lat;
//		        });
				
				_saveAddObj = _addObj;
				_saveAddObj.addrPos = point.lng+","+point.lat;
				if (isCreate==true) {
					toSaveAdd();
				}else{
					toUpdateAdd();
				}
			}else{
				_saveAddObj = _addObj;
				posiFaild();
			}
			
			
		}, _prov);
	}
	
	function posiFaild(){
		shadeAll();
		letDivCenter("showfaild");
		$("#pharmacyDiv").find(".tmaddtitle").text("地址");
		$("#showfaild").find(".faildtitle").text("无法定位送货地址").css("color","#FF0000");
		$("#showfaild").find(".f_cancel").text("重新填写");
		$("#showfaild").show();
	}
	
	function getAllPharmacy(isOut){
		$.ajax({url:'tqueryAllPharmacy',type:'post',
			success:function(respon){
				if (respon.result == "succ") {
					var _plist = respon.data;
					var _html = "";
					if (_plist=="" || _plist == null || _plist.length<=0) {
						_html += '<tr><td clospan="3" style="text-align:center;font-size:14px;color:#ccc;">药店列表为空</td></tr>';
					}else{
						for (var i = 0 , n = _plist.length; i < n; i++) {
							if (i%2==0) {
								if (isOut) {
									_html += '<tr class="allpline" data="'+_plist[i].pharmacyId+'"><td style="text-indent:12px;">'+(i+1)+'</td><td>'+_plist[i].pharmacyName+'</td><td>'+_plist[i].pharmacyAddr+'</td></tr>';
								}else{
									_html += '<tr class="allpline" data="'+_plist[i].pharmacyId+'"><td style="text-indent:12px;">'+(i+1)+'</td><td>'+_plist[i].pharmacyName+'</td><td>'+_plist[i].pharmacyAddr+'</td></tr>';
								}
								
							}else{
								if (isOut) {
									_html += '<tr class="allpline bgc" data="'+_plist[i].pharmacyId+'"><td style="text-indent:12px;">'+(i+1)+'</td><td>'+_plist[i].pharmacyName+'</td><td>'+_plist[i].pharmacyAddr+'</td></tr>';
								}else{
									_html += '<tr class="allpline bgc" data="'+_plist[i].pharmacyId+'"><td style="text-indent:12px;">'+(i+1)+'</td><td>'+_plist[i].pharmacyName+'</td><td>'+_plist[i].pharmacyAddr+'</td></tr>';	
								}
							}
						}
					}
					if (isOut) {
						$(".pmtable").find("tbody").attr("data","outPosi");
					}
					$(".pmtable").find("tbody").html(_html);
					letDivCenter("pharmacyDiv");
					$("#pharmacyDiv").show();
				}else{
					showResult("error","查询要点列表失败！");
				}
		    },error:function(e){
		    	showResult("error","查询要点列表失败！");
		    }
		});
	}
	
	$("#pharmacyDiv").delegate(".allpline","click",function(){
		var _pId = $(this).attr("data");
		if (!_pId) {
			alert("获取药店信息失败");
			return false;
		}
		if ($("#pharmacyDiv").find("tbody").attr("data")=="outPosi") {
//			saveOutPosi(_pId);
			_saveAddObj = secondSaveOutPosi;
			_saveAddObj.pharmacyId = _pId;
			toSaveAdd();
		}else{
			$("#pharmacyDiv").hide();
			_saveAddObj.pharmacyId = _pId;
			if (isCreate==true) {
				toSaveAdd();
			}else{
				//修改地址并且绑定药店
				toUpdateAdd();
			}
		}
	});
	
	function saveOutPosi(pharmacyId){
		$.ajax({url:'tconfirmPharmacyId',type:'post',data:{"pharmacyId":pharmacyId,"addrId":curCreatedId},
			success:function(respon){
				if (respon.result == "succ") {
					refrechAdd(respon.data);
					$(".t_a_n").find(".tan_new_area").hide();
					$(".t_a_n").find(".tan_new_area").find(".add_input,.add_r_p").val("");
					$("#pharmacyDiv").hide();
					closeShade();
					/**切换标签页到购买页**/
					$(".takeNav_n").find(".tn_checked").removeClass("tn_checked");
					$(".takeNav_n").find(".tn_li").eq(1).addClass("tn_checked");
					$(".takeAdd_n").hide();
					$(".tobuy_new").show();
					$("#addrId_n").val(curCreatedId);
					$(".ra_box[value="+curCreatedId+"]").attr("checked",true);
					isConti = true;
					loadCart();
					refrechAct();
				}else{
					showResult("error","保存当前地址失败");
				}
		    },error:function(e){
		    	showResult("error","保存当前地址失败");
		    }
		});
	}
	
	$("#pharmacyDiv").delegate(".cal_cho_pha","click",function(){
		$("#pharmacyDiv").hide();
		closeShade();
	});
	
	$("#showfaild").delegate(".faildBut","click",function(){
		if ($(this).hasClass("f_yes")) {
			var isOutPosi = false;
			if ($(this).hasClass("outPosi")) {
				isOutPosi = true;
			}
			$("#showfaild").hide();
			getAllPharmacy(isOutPosi);
		}else{
			closeShade();
			$("#showfaild").hide();
		}
	});
	
	function G(id) {
		return document.getElementById(id);
	}

	function showuInfo(isNew){
		shaDiv();
		var JSONP=document.createElement("script");  
	    JSONP.type="text/javascript";  
	    JSONP.src="http://virtual.paipai.com/extinfo/GetMobileProductInfo?mobile="+callNum+"&amount=10000&callname=areaCallback";  
	    document.getElementsByTagName("head")[0].appendChild(JSONP);  
		var _old = '<p>1、产品个性化推荐</p><p>2、个性化提醒和增值服务：优惠券到期、药品续买、照顾案</p><p>3、通用促销活动简介</p><button class="gotoPage">确定</button>';
		var _new = '<p>1、此处添加新客迎接话术，邀请首次打进电话的用户加入药快到</p><p>2、简介药快到，提示用户加入药快到的权益</p><p>3、介绍近期活动和优惠促销</p><button class="gotoPage">确定</button>';
		if (isNew=="true" ||isNew==true ) {
			$("#userTemp").find(".utitle").html('新顾客<span style="float:right;margin-right:20px;font-size:20px;color:#fff;" id="callArea">来自：<span id="callCity"></span></span>');
			$("#userTemp").find(".utitle").removeClass("uold").addClass("unew");
			$("#userTemp").find(".utext").html(_new);
		}else{
			$("#userTemp").find(".utitle").html('老顾客：<span id="uName">'+callNum+'</span><span style="float:right;margin-right:20px;color:#fff;" id="callArea">来自：<span id="callCity"></span></span>');
			$("#userTemp").find(".utitle").removeClass("unew").addClass("uold");
			$("#userTemp").find(".utext").html(_old);
		}
		letDivCenter("userTemp");
		$("#userTemp").show();
		
	}
	
	function showQuickFind(dirId,pageI,pageS){
		shadeAll();
		$.ajax({url:'tquerySkuByDir',type:'post',data:{"dirId":dirId,"pageIndex":pageI,"pageSize":pageS},
			success:function(reData){
				closeShade();
				if (reData.result == "succ") {
					var list = reData.data;
					if (!list || list.length==0) {
						$(".searResult tbody").html('<tr><td colspan="5" style="font-size:18px;color:#bdbdbb;text-align: center;padding-top:30px;padding-bottom:30px;">无搜索结果，请尝试换关键字搜索</td></tr>');
						return false;
					}
					for (var i = 0; i < list.length; i++) {
						var tr;
						if (i%2==0) {
							tr = $('<tr class="trline"></tr>');
						}else{
							tr = $('<tr class="trline bgc"></tr>');
						}
						
						var actText = list[i].actName==""?"":list[i].actName.split("#");
						var _at = "";
						if (actText) {
							for (var j = 0,k = actText.length; j < k; j++) {
								if (actText[j]) {
									_at += '<span class="actSpan" data='+list[i].remark+'>  【'+actText[j]+'】  </span>';
								}
							}
						}
						if(reData.hasQuota == true && actText[0] != '限购'){//添加限购活动 相关的信息 注意去重：之前有单个限购的情况 
							_at += '<span class="actSpan" data=' +reData.quotaContent+ '>  【限购】  </span>';
						}
						var td = $('<td class="yname">'+list[i].prodName+'<input type="hidden" class="yid" value="'+list[i].skuId+'"></td>'
								+'<td class="ygg">'+filterNull(list[i].prodForm)+'</td>'
								+'<td class="ycj">'+filterNull(list[i].prodCompany)+'</td>'
								+'<td class="yprice">￥'+list[i].price/100+'</td><td class="activity">'+_at+'</td>');
						tr.append(td);
						$(".searResult tbody").append(tr);
						
						
					}
					/**分页**/
					page_i = reData.pageIndex;
					page_total = Math.ceil(reData.total/10);
					var _temp = page_i==page_total?"没有更多了":"显示下一页";
					$("#prod_page").text(_temp+'( '+page_i+' / '+page_total+' )');
					$(".tobuy_new .result_page").show();
				}else{
					closeShade();
			    	showResult("error","查询商品失败！");
				}
		    },error:function(e){
		    	closeShade();
		    	showResult("error","查询商品失败！");
		    }
		});
	}

	function showActi(actId,pageI,pageS){
		shadeAll();
		$.ajax({url:'tquerySkuByAct',type:'post',data:{"actItemId":actId,"pageIndex":pageI,"pageSize":pageS},
			success:function(reData){
				closeShade();
				if (reData.result == "succ") {
					var list = reData.data;
					if (!list || list.length==0) {
						$(".searResult tbody").html('<tr><td colspan="5" style="font-size:18px;color:#bdbdbb;text-align: center;padding-top:30px;padding-bottom:30px;">无搜索结果，请尝试换关键字搜索</td></tr>');
						return false;
					}
					for (var i = 0; i < list.length; i++) {
						var tr;
						if (i%2==0) {
							tr = $('<tr class="trline"></tr>');
						}else{
							tr = $('<tr class="trline bgc"></tr>');
						}
						
						var actText = list[i].actName==""?"":list[i].actName.split("#");
						var _at = "";
						if (actText) {
							for (var j = 0,k = actText.length; j < k; j++) {
								if (actText[j]) {
									_at += '<span class="actSpan" data='+list[i].remark+'>  【'+actText[j]+'】  </span>';
								}
							}
						}
						var td = $('<td class="yname">'+list[i].prodName+'<input type="hidden" class="yid" value="'+list[i].skuId+'"></td>'
								+'<td class="ygg">'+filterNull(list[i].prodForm)+'</td>'
								+'<td class="ycj">'+filterNull(list[i].prodCompany)+'</td>'
								+'<td class="yprice">￥'+list[i].price/100+'</td><td class="activity">'+_at+'</td>');
						tr.append(td);
						$(".searResult tbody").append(tr);
						
						
					}
					/**分页**/
					page_i = reData.pageIndex;
					page_total = Math.ceil(reData.total/10);
					var _temp = page_i==page_total?"没有更多了":"显示下一页";
					$("#prod_page").text(_temp+'( '+page_i+' / '+page_total+' )');
					$(".tobuy_new .result_page").show();
				}else{
					closeShade();
			    	showResult("error","查询活动商品失败！");
				}
		    },error:function(e){
		    	closeShade();
		    	showResult("error","查询活动商品失败！");
		    }
		});
	}

	function loadCart(couponId){
		var _pn = $("#phoneNo_n").val();
		if (!_pn || isNaN(_pn)) {
			$(".phoneNo_desc").html("请先输入正确的手机号码").css("color","red").show();
			return false;
		}
		shadeAll();
		$.ajax({url:'tqueryCartSku',type:'post',data:{"phoneNo":_pn,"couponId":couponId},
			success:function(reData){
				closeShade();
				if (reData.result=="succ") {
					$("#coupId_n").val(couponId);
					var _tempData = reData.data;
					changeCart(_tempData.cartList);
					changeCount(_tempData.totalCost,_tempData.cutFee,_tempData.totalFee,_tempData.toPay,_tempData.deliverFee,_tempData.couponId,_tempData.couponFee,_tempData.coupon);
				}else{
					closeShade();
					showResult("error","查询购物车失败！");
					return false;
				}
		    },error:function(e){
		    	closeShade();
		    	showResult("error","查询购物车失败！");
		    }
		});
	}

	function changeCart(_cartList){
		var _html = '';
		if (_cartList.length<=0) {
			_html +=  '<div id="noResultDiv"><img src="images/w_shopcart_null.png"></div>';
			$(".shopcart .cartlist").html(_html);
			return false;
		}
		$.each(_cartList,function(cartIndex,cartObj){
			_html += '<div class="cartItem">';
			/**购物车活动标题**/
			if (cartObj.actFitType!="" && cartObj.actFitType!='none') {
				_html += '<div class="acti">';
				var _con = typeof(cartObj.content)=="undefined"?"":cartObj.content;
				_html += '<span class="actiType">'+cartObj.actItemName+'</span><span class="actiDesc">'+_con+'</span>';
				if (cartObj.actFitType == 'suit') {
					_html += '<div class="editPackNum collCount">x <span>'+cartObj.actSkuList[0].amount+'</span></div>';
				}
				_html += '</div>';
			}
			
			/**购物车商品**/
			if (typeof(cartObj.skuList) != 'undefined') {
				$.each(cartObj.skuList, function (skuIndex, skuObj) {
					
					var descript = eval('(' + skuObj.extend + ')');//添加对于限购商品的详细信息
					//console.log(descript);
					_html += '<div class="proLine clearfix"><input type="hidden" class="s_Id" value="'+skuObj.skuRecord.skuId+'"><input type="hidden" class="ciId" value="'+skuObj.cartItemId+'">';
					_html += '<div class="proInfo">';
					_html += '<div class="name">'+Number(skuIndex+1)+".&nbsp;&nbsp;"+skuObj.skuRecord.prodName+'</div>';
					_html += '<div class="norms">规格：'+skuObj.skuRecord.prodForm+'</div>';
					_html += '<div class="price">￥'+skuObj.price/100+'</div></div>';
					//判断是否限购 如果为限购 添加限购描述 添加限购图标
					//if(cartObj.actItemName=="限购"){
					if(descript.quotaContent){//限购描述
						_html += '<div class="descript">'+descript.quotaContent+'</div>';
					}
					if(descript.quotaContent && cartObj.actItemName != "限购"){//限购图标
						_html += '<div class="quotaIcon clearfix">限购</div>';
					}
					//}
					_html += '<div class="numedit clearfix"><span><img alt="" src="images/shop_reduce.png" class="sc_edit reduce"></span><span class="itemnum">'+skuObj.amount+'</span><span><img alt="" src="images/shop_add.png" class="sc_edit add"> </span></div></div>';
				});
			}
			
			if (cartObj.actFitType != "suit") {
				if (typeof(cartObj.actSkuList) != 'undefined' && cartObj.actSkuList.length > 0) {
					_html += '<div class="activity ">';
					$.each(cartObj.actSkuList, function (actIndex, actObj) {
						_html += '<div class="">';
						_html += '<div class="acInfo"><div class="name">'+actObj.skuRecord.prodName+'</div><div class="norms">规格：'+actObj.skuRecord.prodForm+'</div><div class="norms">￥0</div></div></div>';
					});
					_html += '</div>';
				}
			}
				
			if (typeof(cartObj.actSkuList) != 'undefined' && cartObj.actSkuList.length > 0 && cartObj.actFitType == 'suit') {
				_html += '<div class="proLine isPack clearfix">';
				_html += '<div class="lineList">';
				$.each(cartObj.actSkuList, function (packIndex, packObj) {
					_html += '<div class="packLine">';
					_html += '<div class="packIcon"></div>';
					_html += '<div class="packInfo">';
					_html += '<div class="name">'+packObj.skuRecord.prodName+'    <span class="norms">'+packObj.skuRecord.prodForm+'</span></div>';
					_html += '<div class="packPrice">￥'+packObj.price/100+' }</div></div></div>';
				});
				_html += '</div></div>';
			}
			
			if (cartObj.actFitType == 'cut' || cartObj.actFitType == 'discount' || cartObj.actFitType == 'buy' || cartObj.actFitType == 'suit') {
				_html += '<div class="subtotal"><span>小计：￥<span class="xjPrice">'+cartObj.totalFee/100+'</span></span>';
				if (cartObj.cutFee>0) {
					_html += '<span class="yprice">优惠：￥'+cartObj.cutFee/100+'</span>';
				}
				if (cartObj.actFitType == 'buy') {
					_html += '<div class="swop">换购';
					$.each(cartObj.detailsIdList, function (dIndex, dObj) {
						_html += '<input type="hidden" class="detailsItem" value="'+dObj+'">';
					});
					_html += '</div>';
				}
				_html += '</div>';
			}
			_html += '</div>';
		});
		_html += '</div>';
		
		$(".shopcart .cartlist").html(_html);
	}
	
	function changeCount(totalCost,cutFee,totalFee,toPay,deliverFee,couponId,couponFee,coupon){
		$("#tlf").val(totalFee);
		$(".shopcart #gwcprice").text("￥"+(totalFee/100));
		if (couponFee) {
			$(".shopcart #djqprice").text("￥"+couponFee/100);
		}else{
			$(".shopcart #djqprice").text("￥0");
		}
		
		$(".shopcart #yfprice").text("￥"+deliverFee/100);
		$(".shopcart #totalprice").text("￥"+toPay/100);
		$(".shopcart #yjsText").text("  (已节省￥"+cutFee/100+")");
		if (coupon) {
			$("#djqDesc").text("（"+coupon.couponDesc+"）");
			$("#coupId_n").val(coupon.couponId);
		}
		
	}

	function refrechAdd(dataList){
		var _html = '';
		for (var i = 0, n = dataList.length; i < n; i++) {
			var _temp = dataList[i].addrInfo+','+dataList[i].houseNumber+','+dataList[i].phoneNum+','+dataList[i].addrId;
			var pmName = typeof(dataList[i].pharmacyName)=="undefined"?"":"【"+dataList[i].pharmacyName+"】";
			_html += '<li class="tali" data="'+dataList[i].addrId+'">';
			_html += '<input type="radio" name="taItem" id="tai'+i+'" class="ta_radio ra_box" value="'+dataList[i].addrId+'"  data="'+dataList[i].pharmacyId+'">';
			_html += '<label for="tai'+i+'" class="ra_label">'+dataList[i].addrInfo+filterNull(dataList[i].houseNumber)+'&nbsp;&nbsp;&nbsp;&nbsp;'+pmName+'</label><span class="ta_edit" data='+_temp+'>修改</span></li>';
			
		}
		$(".ta_list").find(".taul").html(_html);
		$(".ta_list").show();
		var _AddId = $("#addrId_n").val();
		if (_AddId) {
			$(".ta_list").find(".ta_radio[value='"+_AddId+"']").prop('checked', true);
		}
	}

	function filterNull(str) {
		if (!str) {
			return "";
		}
		return str;
	}
	
	function searlistFun(){
		var _searVal = $("#searText").val();
		if (_searVal == "" || _searVal == null) {
			showResult("remind","请输入要查询的关键字");
			return false;
		}
		if (page_total==1 || page_i==page_total) {
			return false;
		}

		if (k_word != _searVal && k_word!="") {
			$(".searResult tbody").html('');
			page_i = 1;
			page_total = 0;
		}
		
		if (page_i<page_total && page_total>0) {
			page_i += 1;
		}
		shadeAll();
		$.post("tqueryProd",{keyword:_searVal,pageIndex:page_i,pageSize:10},function(resObj){
			closeShade();
			if (resObj.result == "succ") {
				k_word = resObj.kword;
				var list = resObj.data;
				if (!list || list.length==0) {
					$(".searResult tbody").html('<tr><td colspan="5" style="font-size:18px;color:#bdbdbb;text-align: center;padding-top:30px;padding-bottom:30px;">无搜索结果，请尝试换关键字搜索</td></tr>');
					return false;
				}
				for (var i = 0; i < list.length; i++) {
					var tr;
					if (i%2==0) {
						tr = $('<tr class="trline"></tr>');
					}else{
						tr = $('<tr class="trline bgc"></tr>');
					}
					var actText = list[i].actName==""?"":list[i].actName.split("#");
					var _at = "";
					if (actText) {
						for (var j = 0,k = actText.length; j < k; j++) {
							if (actText[j]) {
								_at += '<span class="actSpan" data='+list[i].remark+'>  【'+actText[j]+'】  </span>';
							}
						}
					}
					
					var td = $('<td class="yname">'+list[i].prodName+'<input type="hidden" class="yid" value="'+list[i].skuId+'"></td>'
							+'<td class="ygg">'+filterNull(list[i].prodForm)+'</td><td class="yprice">￥'+list[i].price/100+'</td><td class="activity">'+_at+'</td>');
					tr.append(td);
					$(".searResult tbody").append(tr);
					
					/**分页**/
					page_i = resObj.pageIndex;
					page_total = Math.ceil(resObj.total/10);
					var _temp = page_i==page_total?"没有更多了":"显示下一页";
					$("#prod_page").text(_temp+'( '+page_i+' / '+page_total+' )');
					$(".tobuy_new .result_page").show();
				}
			}
		});
	}