$(function(){
    var user = localStorage.getItem("user_token");
    var pharmacyId = localStorage.getItem("pharmacy_id");
    var pos = localStorage.getItem("pos_index");
    var wechatuuid = localStorage.getItem("uuid");
    if(wechatuuid!=null){
        device_id = wechatuuid;
    }else{
        device_id = "EFCGRGDGDFSSA";
    }
    var data = new Date();
    var datas = data.getTime();
    /*应用版本号*/
    var app_version = 250;
    /*手机系统类型*/
    var app_system = "wechat";
    /*手机型号*/
    var app_model = "oppoR9s";
    /*手机系统版本*/
    var os_version = 10.1;
    /*设备号*/
    var device_id = device_id;
    /*当前经纬度获取时间戳*/
    var pos_time = datas;
    /*定位是否成功（1成功，0失败）*/
    var ispos = 1;
    /*[首次不填写该内容]登录的随机数（0-1000）踢人.BASE64.encode(时间戳+0到1000随机数字符串)*/
    if(user==null){
        var user_token = "";
    }else{
        var user_token = user;
    }
    /*联网方式（gps、wifi、3G、4G、2G）*/
    var pos_mode = "4G";
    /*当前时间new Date(),结果是Long*/
    var request_num = datas;
    var key="ykd";
    if(pharmacyId==null && user==null && pos==null){
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            console.log(r.point.lng);
            console.log(r.point.lat);
            var pos = r.point.lng+","+ r.point.lat;
            localStorage.setItem("pos_index",pos);
            $.ajax({
                type:"get",
                url:"http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location="+r.point.lat+","+ r.point.lng+"&output=json&pois=1&ak=nHd5rVGqkOdfofrjY4HXQXCW",
                dataType:"jsonp",
                callback:"jsoncallback",
                success:function(data){
                    console.log(data);
                    localStorage.setItem("formatted_address",data.result.formatted_address);
                }
            });
            var pos_index = r.point.lng+","+ r.point.lat;
            var message_name = "default_address";
            var pharmacy_id = "";
            var str = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
            var toStr=md5(str+key);
            $.ajax({
                type:"POST",
                contentType:"application/json;charset=utf-8",
                url:"http://deve.ykd365.com/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toStr,
                dataType:"json",
                success:function(data){
                    localStorage.setItem("area_id",data.result_json.area_id);
                    localStorage.setItem("pharmacy_id",data.result_json.pharmacy_id);
                    var pharmacy_id = data.result_json.pharmacy_id;
                    var message_name = "first_page";
                    var str1 = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
                    var toStr=md5(str1+key);
                    $.ajax({
                        type:"POST",
                        contentType:"application/json;charset=utf-8",
                        url:"http://deve.ykd365.com/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toStr,
                        dataType:"json",
                        success:function(result){
                            console.log(result);
                            if(result.result_code==100){
                                $(".bar_img").hide();
                                var banner = result.result_json.banner_link_list.first_advertisement_arr;
                                var ul = "<ul>";
                                $.each(banner,function(index,value){
                                    ul += "<li url='"+value.advertisement_url+"'><img src='"+value.advertisement_img+"'></li>";
                                });
                                $(".header .main_img").prepend(ul);
                                $(".main_img ul li").bind("click",function(){
                                    var _url = $(this).attr("url");
                                    console.log(_url);
                                    var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                                    var name = "OneYuan_module_1804";
                                    var name1 = "promoinfo_1804";
                                    var r = url.match(name);  //匹配目标参数
                                    var r1 = url.match(name1);
                                    if (r != null){
                                        var title = $(this).attr("title");
                                        var urls = url.replace(/(^.{33})/gm, 'wechart/');
                                        var arrUrl = "http://deve.ykd365.com/medstore/"+urls;
                                        localStorage.setItem("url",arrUrl);
                                        localStorage.setItem("title",title);
                                        window.parent.location.href="promoinfo.html?title="+title;
                                    }else if(r1 != null){
                                        var title1 = $(this).attr("title");
                                        var arrUrls = url.replace(/(^.{33})/gm, 'wechart/');
                                        if(user!=null){
                                            var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token="+user+"&pharmacy_id="+pharmacyId;
                                        }else{
                                            var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token=&pharmacy_id="+pharmacy_id;
                                        }
                                        localStorage.setItem("url",_arrUrls);
                                        window.parent.location.href="promoinfo.html?title="+title1;
                                    }
                                });
                                var length = $(".img_gallery ul li").length;
                                for(var i=0;i<length;i++){
                                    $(".img_gallery .point").prepend("<a href='javascript:;'></a>");
                                }
                                $dragBln = false;
                                $(".main_img").touchSlider({
                                    flexible : true,
                                    speed : 200,
                                    btn_prev : $("#btn_prev"),
                                    btn_next : $("#btn_next"),
                                    paging : $(".point a"),
                                    counter : function(e){
                                        $(".point a").removeClass("on").eq(e.current-1).addClass("on");//图片顺序点切换
                                    }
                                });
                                timer = setInterval(function(){
                                    $("#btn_next").click();
                                },3000);
                                $(".main_img").bind("touchstart",function(){
                                    clearInterval(timer);
                                }).bind("touched",function(){
                                    timer = setInterval(function(){
                                        $("#btn_next").click();
                                    },3000)
                                });
                                /*定位按钮板块 start*/
                                var formatted_address = localStorage.getItem("formatted_address");
                                var detail_add=localStorage.getItem("detail_add");
                                if(detail_add!=null){
                                    $(".location .span1").text(detail_add);
                                }else{
                                    $(".location .span1").text(formatted_address);
                                }
                                /*定位按钮板块 end*/
                                /*八个按钮板块 start*/
                                var nav = result.result_json.new_pharmacy_info.home_button_list_arr;
                                if(nav!="" && nav!=undefined){
                                    var oNav = "<ul>";
                                    $.each(nav,function(index,value){
                                        if(value.home_button_web!=undefined){
                                            oNav += "<li url='"+value.home_button_web+"'  id='li' type='" + value.home_button_type + "'><img src='" + value.home_button_image + "'><span>" + value.home_button_title + "</span></li>";
                                        }else{
                                            oNav += "<li id='li' type='" + value.home_button_type + "'><img src='" + value.home_button_image + "'><span>" + value.home_button_title + "</span></li>";
                                        }
                                    });
                                    $(".nav").append(oNav);
                                    if(nav.length<8){
                                        $(".nav li:gt(3)").hide();
                                    }else if(nav.length>=8){
                                        $(".nav li:gt(7)").hide();
                                    }else if(nav.length=12){
                                        $(".nav li").show();
                                    }
                                    $(".nav li").bind("click",function(){
                                        var type = $(this).attr("type");
                                        if(type=="bz") {
                                            window.parent.location.href = "rapid_drug.html";
                                        }else if(type=="dir"){
                                            window.parent.location.href="souyao_index.html";
                                        }else if(type=="brand"){
                                            window.parent.location.href="wenyao_index.html";
                                        }else if(type=="web"){
                                            if($(this).children("span").text()=="邀请好友"){
                                                var title1 = $(this).children("span").text();
                                                var message_name = "first_shared";
                                                var org = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
                                                var toOrg = md5(org+key);
                                                $.ajax({
                                                    type:"POST",
                                                    contentType:"application/json;charset=utf-8",
                                                    url:"http://deve.ykd365.com/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toOrg,
                                                    dataType:"json",
                                                    success:function(data){
                                                        var obj = JSON.stringify(data);
                                                        localStorage.setItem("json",obj);
                                                        localStorage.setItem("title",title1);
                                                        if(user==null){
                                                            window.parent.location.href=data.result_json[4].shared_url+"&user_token=&pharmacy_id="+localStorage.getItem("pharmacy_id")+"&";
                                                        }else{
                                                            window.parent.location.href=data.result_json[4].shared_url+"&user_token="+user+"&pharmacy_id="+pharmacyId;
                                                        }
                                                    }
                                                });
                                            }else{
                                                var title1 = $(this).children("span").text();
                                                localStorage.setItem("title",title1);
                                                localStorage.setItem("url","http://deve.ykd365.com/medstore/share/share_1804_1?actId=729&user_token="+user+"&pharmacy_id="+pharmacyId+"&type=category&typeId=1000035625");
                                                window.parent.location.href="promoinfo.html?title="+$(this).children("span").text();
                                            }
                                        }else if(type=="web2"){
                                            var title = $(this).children("span").text();
                                            localStorage.setItem("title",title);
                                            var _url = $(this).attr("url");
                                            if(_url.indexOf("navigationDirList")>=0){
                                                var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                                            }else{
                                                var url = _url.replace(/deve.ykd365.com/g,'deve.ykd365.com');
                                            }
                                            var arrUrl = url.replace(/common/g,"wechart");
                                            //window.parent.location.href=arrUrl;
                                            localStorage.setItem("url",arrUrl);
                                            window.parent.location.href="promoinfo.html?title="+$(this).children("span").text();
                                        }
                                    });
                                }
                                /*八个按钮板块 end*/
                                /*一元狂秒 start*/
                                	var webUrl = {} ;
									if(data.result_json.activity_image_info){
										webUrl = data.result_json.activity_image_info;
									}
				                    webUrl = data.result_json.activity_image_info;
				                    console.log(webUrl);
				                    var toWebUrl = '';
				                    var tourl = '';
				                    var title = '';
									if(webUrl.activity_image_arr){
										toWebUrl = webUrl.activity_image_arr[0].image_url;
										tourl = webUrl.activity_image_arr[0].image_go_web;
										title = webUrl.activity_image_arr[0].image_go_name;
									}
	                                $(".nav").after("<img class='weburl' src='"+toWebUrl+"' style='width:6.4rem'>");
	                                $(".weburl").bind("click",function(){
	                                    var arrUrls = tourl.replace(/(^.{33})/gm, 'wechart/');
	                                    if(user!=null){
	                                        var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token="+user+"&pharmacy_id="+pharmacyId;
	                                    }else{
	                                        var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token=&pharmacy_id="+pharmacy_id;
	                                    }
	                                    localStorage.setItem("url",_arrUrls);
	                                    window.parent.location.href="promoinfo.html?title="+title;
	                                });
                                /*一元狂秒 end*/
                                /*对应的药店信息板块 start*/
                                var sale = result.result_json.new_pharmacy_info;
                                var toUrl = sale.pharmacy_certificate_url;
                                var phone = result.result_json.new_pharmacy_info.pharmacy_phone;
                                var pharmacy_name = result.result_json.new_pharmacy_info.pharmacy_name;
                                localStorage.setItem("pharmacy_name",sale.pharmacy_name);
                                localStorage.setItem("pharmacy_add",sale.pharmacy_add);
                                localStorage.setItem("pharmacy_name",pharmacy_name);
                                localStorage.setItem("pharmacy_phone",phone);
                                if (sale != "" && sale != undefined) {
                                    var pharmacyName = localStorage.getItem("pharmacy_name");
                                    var pharmacyAdd = localStorage.getItem("pharmacy_add");
                                    var oSale = "<ul><li>"+pharmacyName+"<br>"+pharmacyAdd+"</li></ul>";
                                    $(".car_middle").append(oSale).click(function(){
                                        if(toUrl=="http://imgstore.camore.cn/licensehtml/1630_drugstore_info.html"){
                                            window.parent.location.href="1630_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1620_drugstore_info.html"){
                                            window.parent.location.href="1620_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1610_drugstore_info.html"){
                                            window.parent.location.href="1610_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1611_drugstore_info.html"){
                                            window.parent.location.href="1611_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1612_drugstore_info.html"){
                                            window.parent.location.href="1612_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1629_drugstore_info.html"){
                                            window.parent.location.href="1629_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1622_drugstore_info.html"){
                                            window.parent.location.href="1622_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1633_drugstore_info.html"){
                                            window.parent.location.href="1633_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1627_drugstore_info.html"){
                                            window.parent.location.href="1627_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1631_drugstore_info.html"){
                                            window.parent.location.href="1631_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1623_drugstore_info.html"){
                                            window.parent.location.href="1623_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1621_drugstore_info.html"){
                                            window.parent.location.href="1621_drugstore_info.html";
                                        }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1632_drugstore_info.html"){
                                            window.parent.location.href="1632_drugstore_info.html";
                                        }
                                    });
                                    $(".car_right").bind("click",function(){
                                        $(".pharmacy_phone",window.parent.document).show();
                                        $(".pharmacy_phone .phone_middle span",window.parent.document).text(phone);
                                    });
                                    $(".pharmacy_phone .phone_bot .left",window.parent.document).click(function(){
                                        window.parent.location.href="Tel:"+phone;
                                        $(".pharmacy_phone",window.parent.document).hide();
                                    });
                                    var _height = $(".container .carousel .car_middle li").height();
                                    var num1 = $(".container .carousel .car_middle li").length;
                                    var number1 = 0;
                                    setInterval(function () {
                                        $(".car_middle").animate({
                                            "marginTop": -_height * number1 + "px"
                                        }, 1000);
                                        number1++;
                                        if (number1 == num1) {
                                            number1 = 0;
                                        }
                                    }, 2000);
                                } else {
                                    $(".carousel").remove();
                                }
                                /*对应的药店信息板块 end*/
                                /*九宫格板块 start*/
                                //var essence = result.result_json.new_essence_centre;
                                //var toArr = essence.group_item_arr;
                                //var $width = $(".container").width();
                                //console.log($width);
                                //var tr = "<tr class='class_tr'></tr>";
                                //var td = "<td class='class_td'></td>";
                                //if(toArr!=""){
                                //    $.each(toArr,function(index,value){
                                //        console.log(value);
                                //        if(value.group_background_image==undefined){
                                //            for(var i=0;i<value.h_count;i++){
                                //                $(".xttblog").append(tr);
                                //                $(".class_tr").hide();
                                //            }
                                //            for(var j=0;j<value.w_count;j++){
                                //                $(".class_tr").append(td);
                                //                $(".class_td").hide();
                                //            }
                                //            $.each(value.tr_arr,function(index1,value1){
                                //                console.log(value1);
                                //                for(var i=0;i<value1.td_arr.length;i++){
                                //                    console.log(value1.td_arr[i].width);
                                //                    var _width = $(window).width();
                                //                    $(".xttblog").append("<img title='"+value1.td_arr[i].value.sale_name+"' class='td_img' style='width:"+value1.td_arr[i].width/100*_width+"px;height:3rem;' src='"+value1.td_arr[i].value.img_url+"' url='"+value1.td_arr[i].value.sales_url+"'>").css("position","relative");
                                //                }
                                //            });
                                //        }else{
                                //            $(".xttblog").append("<img class='td_img1' src='"+value.group_background_image+"'>");
                                //            var oDiv = "<div class='div_bar' style='width:6.4rem;height:3.4rem;position:absolute;top:0;'>";
                                //            $.each(value.tr_arr,function(index1,value1){
                                //                console.log(value1);
                                //                for(var i=0;i<value1.td_arr.length;i++){
                                //                    console.log(value1.td_arr[i].width);
                                //                    var _width = $(window).width();
                                //                    oDiv += "<div title='"+value1.td_arr[i].value.sale_name+"' class='td_img' style='float:left;width:33.33%;height:3.4rem;' src='"+value1.td_arr[i].value.img_url+"' url='"+value1.td_arr[i].value.sales_url+"'></div>";
                                //                }
                                //            });
                                //            $(".td_img1").after(oDiv);
                                //        }
                                //    });
                                //    $(".td_img").bind("click",function(){
                                //        var title = $(this).attr("title");
                                //        localStorage.setItem("title",title);
                                //        var _url = $(this).attr("url");
                                //        var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                                //        var url1 = url.replace(/(^.{33})/gm, 'wechart/');
                                //        var arrUrl = "http://deve.ykd365.com/medstore/"+url1;
                                //        console.log(arrUrl);
                                //        localStorage.setItem("url",arrUrl);
                                //        window.parent.location.href="promoinfo.html?title="+title;
                                //    });
                                //}else{
                                //
                                //}
                                /*九宫格板块 end*/
                                /*品牌找药板块 start*/
                                var brand = result.result_json.brand_dic.brand_arr;
                                if(brand!="" && brand!=undefined){
                                    var toBrand = "<ul>";
                                    $.each(brand,function(index,value){
                                        toBrand += "<li id='"+value.category_id+"' name='"+value.category_name+"'><img src='"+value.category_img+"'></li>";
                                    });
                                    $(".brand_content").append(toBrand);
                                    $(".brand_header").click(function(){
                                        window.parent.location.href="wenyao_index.html";
                                    });
                                    $(".brand_content ul li").bind("click",function(){
                                        var query = $(this).attr("name");
                                        window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                                    });
                                }else{
                                    $(".brand").remove();
                                }
                                /*品牌找药板块 end*/
                                /*对症找药板块 start*/
                                if ( data.result_json.symptom_dic != "" &&  data.result_json.symptom_dic != undefined) {
                                    var sort = data.result_json.symptom_dic.symptom_arr;
                                    for (i in sort) {
                                        var sorts = "<div class='content'><div class='content_header'>" + sort[i].sort_name + "</div><div class='content_content'><ul>";
                                        for (j in sort[i].sorts[0].categorys) {
                                            sorts += "<li id='" + sort[i].sorts[0].categorys[j].category_id + "'><img src='" + sort[i].sorts[0].categorys[j].category_icon_url + "'><span>" + sort[i].sorts[0].categorys[j].category_name + "</span>";
                                        }
                                        $("._nav .nav_content").append(sorts);
                                    }
                                    $("._nav li").bind("click",function(){
                                        var query=$(this).children("span").text();
                                        window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                                    });
                                    $("#ho1").mCustomScrollbar({
                                        axis: "x",
                                        advanced: {autoExpandHorizontalScroll: true}
                                    });
                                    for (var i = 0; i < $(".content").length; i++) {
                                        if ($(".content").eq(i).find("li").length > 8) {
                                            $(".content").eq(i).find("li:gt(6)").remove();
                                            $(".content").eq(i).children(".content_content").children().append("<li><span class='span1'>更多<img class='img1' src='images/sort_right.png'></span></li>");
                                        }
                                    }
                                    $(".content_content .span1").bind("click",function(){
                                        window.parent.location.href="rapid_drug.html";
                                    });
                                } else {
                                    $("._nav").remove();
                                }
                                /*对症找药板块 end*/
                                /*专场板块*/
                                var sales = result.result_json.new_sale_info.sale_list;
                                if(sales.drug_sales_list_arr!="" && sales.drug_sales_list_arr!="undefined"){
                                    $.each(sales,function(index,value){
                                        for(var i=0;i<value.length;i++){
                                            var div = "<div class='madegame'><ul class='clearfix ho'>";
                                            $(".made_top img").eq(i).attr("src",value[i].drug_hot_url);
                                            $(".made_top").eq(i).attr("drug_hot_name",value[i].drug_hot_name);
                                            if(value[i].drug_hot_arr!=[]){
                                                for(var j=0;j<value[i].drug_hot_arr.length;j++){
                                                    div += "<li drug_id='"+value[i].drug_hot_arr[j].drug_id+"'><img src='"+value[i].drug_hot_arr[j].pic_path+"'><br><span>"+value[i].drug_hot_arr[j].show_name+"<br><p>￥"+(value[i].drug_hot_arr[j].price / 100).toFixed(2)+"</p></span></li>";
                                                }
                                            }
                                            $(".made_top").eq(i).after(div);
                                            div = "<div class='madegame'><ul class='clearfix ho'>";
                                            $.mCustomScrollbar.defaults.theme="light-2";
                                            $(".ho").mCustomScrollbar({
                                                axis:"x",
                                                advanced:{autoExpandHorizontalScroll:true}
                                            });
                                        }
                                    });
                                }else{
                                    $(".made").remove();
                                }
                                $(".made .made_top").bind("click",function(){
                                    var query=$(this).attr("drug_hot_name");
                                    window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                                });
                                $(".made .madegame li").bind("click",function(){
                                    var drug_id=$(this).attr("drug_id");
                                    window.parent.location.href="1_commodity_details.html?drug_id="+drug_id;
                                });
                                /*专场板块 end*/
                                /*商品列表板块 start*/
                                var drug_hot = result.result_json.new_sale_info.hot_list;
                                if (drug_hot!=undefined) {
                                    $.each(drug_hot, function (index, value) {
                                        for (var i = 0; i < value.length; i++) {
                                            $(".list_header").eq(i).find(".header_left").children().append(value[i].drug_hot_name);
                                            $(".list_header").eq(i).find(".header_left").css("background", value[i].drug_hot_color);
                                        }
                                    });
                                    var drug_hot1 = result.result_json.new_sale_info.hot_list.drug_sales_list_arr;
                                    var drug = "<ul>";
                                    var drug1 = "<ul>";
                                    var drug2 = "<ul>";
                                    var drug3 = "<ul>";
                                    var drug4 = "<ul>";
                                    for (var i = 0; i < drug_hot1[0].drug_hot_arr.length; i++) {
                                        drug += "<li drug_id='"+drug_hot1[0].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[0].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[0].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[0].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                    }
                                    $(".list_content").prepend(drug);
                                    for (var i = 0; i < drug_hot1[1].drug_hot_arr.length; i++) {
                                        if (drug_hot1[1].drug_hot_arr.length > 3) {
                                            drug_hot1[1].drug_hot_arr.length = 3;
                                            drug1 += "<li drug_id='"+drug_hot1[1].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[1].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[1].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[1].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                        } else {
                                            drug1 += "<li drug_id='"+drug_hot1[1].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[1].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[1].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[1].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                        }
                                    }
                                    $(".list_content1").prepend(drug1);
                                    for (var i = 0; i < drug_hot1[2].drug_hot_arr.length; i++) {
                                        drug2 += "<li drug_id='"+drug_hot1[2].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[2].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[2].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[2].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                    }
                                    $(".list_content2").prepend(drug2);
                                    for (var i = 0; i < drug_hot1[3].drug_hot_arr.length; i++) {
                                        drug3 += "<li drug_id='"+drug_hot1[3].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[3].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[3].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[3].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                    }
                                    $(".list_content3").prepend(drug3);
                                    if(drug_hot1[4].drug_hot_arr!="undefined"){
                                        for (var i = 0; i < drug_hot1[4].drug_hot_arr.length; i++) {
                                            drug4 += "<li drug_id='"+drug_hot1[4].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[4].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[4].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[4].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                        }
                                        $(".list_content4").prepend(drug4);
                                    }else{
                                        $(".list_content4").parent(".list").hide();
                                    }
                                    $(".list .header_right").bind("click",function(){
                                        var query=$(this).prev().children().text();
                                        window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                                    });
                                    $(".list div ul li").bind("click",function(){
                                        var drug_id=$(this).attr("drug_id");
                                        window.parent.location.href="1_commodity_details.html?drug_id="+drug_id;
                                    });
                                } else {
                                    $(".container .list").remove();
                                }
                                /*商品列表板块 end*/
                            }else if(result.result_code==102){
                                $("body").css("background","#fff");
                                $(".container").html("").append("<img class='bg' src='images/bg.png'>");
                                $(".bg").bind("click",function(){
                                    window.parent.location.href="1_location_page.html";
                                });
                            }
                        }
                    })
                }
            })
        })
    }else if(pharmacyId!=null && pos!=null && user!=null){
        var message_name = "first_page";
        var pharmacy_id = pharmacyId;
        var pos_index = pos;
        var str = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
        var toStr=md5(str+key);
        $.ajax({
            type:"POST",
            contentType:"application/json;charset=utf-8",
            url:"http://deve.ykd365.com/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toStr,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(data.result_code==100){
                    $(".bar_img").hide();
                    var banner = data.result_json.banner_link_list.first_advertisement_arr;
                    var ul = "<ul>";
                    $.each(banner,function(index,value){
                        ul += "<li title='"+value.advertisement_name+"' url='"+value.advertisement_url+"'><img src='"+value.advertisement_img+"'></li>";
                    });
                    $(".header .main_img").prepend(ul);
                    $(".main_img ul li").bind("click",function(){
                        var _url = $(this).attr("url");
                        var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                        var name = "OneYuan_module_1804";
                        var name1 = "promoinfo_1804";
                        var r = url.match(name);  //匹配目标参数
                        var r1 = url.match(name1);
                        if (r != null){
                            var title = $(this).attr("title");
                            var urls = url.replace(/(^.{33})/gm, 'wechart/');
                            var arrUrl = "http://deve.ykd365.com/medstore/"+urls;
                            localStorage.setItem("url",arrUrl);
                            localStorage.setItem("title",title);
                            window.parent.location.href="promoinfo.html?title="+title;
                        }else if(r1 != null){
                            var title1 = $(this).attr("title");
                            var arrUrls = url.replace(/(^.{33})/gm, 'wechart/');
                            if(user!=null){
                                var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token="+user+"&pharmacy_id="+pharmacyId;
                            }else{
                                var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token=&pharmacy_id="+pharmacy_id;
                            }
                            localStorage.setItem("url",_arrUrls);
                            window.parent.location.href="promoinfo.html?title="+title1;
                        }
                    });
                    var length = $(".img_gallery ul li").length;
                    for(var i=0;i<length;i++){
                        $(".img_gallery .point").prepend("<a href='javascript:;'></a>");
                    }
                    $dragBln = false;
                    $(".main_img").touchSlider({
                        flexible : true,
                        speed : 200,
                        btn_prev : $("#btn_prev"),
                        btn_next : $("#btn_next"),
                        paging : $(".point a"),
                        counter : function(e){
                            $(".point a").removeClass("on").eq(e.current-1).addClass("on");//图片顺序点切换
                        }
                    });
                    timer = setInterval(function(){
                        $("#btn_next").click();
                    },3000);
                    $(".main_img").bind("touchstart",function(){
                        clearInterval(timer);
                    }).bind("touched",function(){
                        timer = setInterval(function(){
                            $("#btn_next").click();
                        },3000)
                    });

                    /*定位按钮板块 start*/
                    var detail_add=localStorage.getItem("detail_add");
                    var formatted_address = localStorage.getItem("formatted_address");
                    if(detail_add!=null){
                        $(".location .span1").text(detail_add);
                    }else{
                        $(".location .span1").text(formatted_address);
                    }
                    /*定位按钮板块 end*/
                    /*八个按钮板块 start*/
                    var nav = data.result_json.new_pharmacy_info.home_button_list_arr;
                    if(nav!="" && nav!=undefined){
                        var oNav = "<ul>";
                        $.each(nav,function(index,value){
                            if(value.home_button_web!=undefined){
                                oNav += "<li url='"+value.home_button_web+"' id='li' type='" + value.home_button_type + "'><img src='" + value.home_button_image + "'><span>" + value.home_button_title + "</span></li>";
                            }else{
                                oNav += "<li id='li' type='" + value.home_button_type + "'><img src='" + value.home_button_image + "'><span>" + value.home_button_title + "</span></li>";
                            }
                        });
                        $(".nav").append(oNav);
                        if(nav.length<8){
                            $(".nav li:gt(3)").hide();
                        }else if(nav.length>=8){
                            $(".nav li:gt(7)").hide();
                        }else if(nav.length=12){
                            $(".nav li").show();
                        }
                        $(".nav li").bind("click",function(){
                            var val = $(this).children("span").text();
                            var type = $(this).attr("type");
                            if(type=="bz") {
                                window.parent.location.href = "rapid_drug.html";
                            }else if(type=="dir"){
                                window.parent.location.href="souyao_index.html";
                            }else if(type=="brand"){
                                window.parent.location.href="wenyao_index.html";
                            }else if(type=="web"){
                                if($(this).children("span").text()=="邀请好友"){
                                    var title1 = $(this).children("span").text();
                                    var message_name = "first_shared";
                                    var org = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
                                    var toOrg = md5(org+key);
                                    $.ajax({
                                        type:"POST",
                                        contentType:"application/json;charset=utf-8",
                                        url:"http://deve.ykd365.com/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toOrg,
                                        dataType:"json",
                                        success:function(data){
                                            var obj = JSON.stringify(data);
                                            localStorage.setItem("json",obj);
                                            localStorage.setItem("title",title1);
                                            if(user==null){
                                                window.parent.location.href=data.result_json[4].shared_url+"&user_token=&pharmacy_id="+localStorage.getItem("pharmacy_id");
                                            }else{
                                                window.parent.location.href=data.result_json[4].shared_url+"&user_token="+user+"&pharmacy_id="+pharmacyId;
                                            }
                                        }
                                    });
                                }else{
                                    var title1 = $(this).children("span").text();
                                    localStorage.setItem("title",title1);
                                    localStorage.setItem("url","http://deve.ykd365.com/medstore/share/share_1804_1?actId=729&user_token="+user+"&pharmacy_id="+pharmacyId+"&type=category&typeId=1000035625");
                                    window.parent.location.href="promoinfo.html?title="+$(this).children("span").text();
                                }
                            }else if(type=="web2"){
                                var title = $(this).children("span").text();
                                localStorage.setItem("title",title);
                                var _url = $(this).attr("url");
                                if(_url.indexOf("navigationDirList")>=0){
                                    var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                                    var arrUrl = url.replace(/common/g,"wechart");
                                    //window.parent.location.href=arrUrl;
                                    localStorage.setItem("url",arrUrl);
                                    window.parent.location.href="promoinfo1.html?title="+$(this).children("span").text();
                                }else{
                                    var url = _url.replace(/deve.ykd365.com/g,'deve.ykd365.com');
                                    var arrUrl = url.replace(/common/g,"wechart");
                                    //window.parent.location.href=arrUrl;
                                    localStorage.setItem("url",arrUrl);
                                    window.parent.location.href="promoinfo.html?title="+$(this).children("span").text();
                                }
                            }
                        });
                    }
                    /*八个按钮板块 end*/
                    /*一元狂秒 start*/
                    var webUrl = {} ;
					if(data.result_json.activity_image_info){
						webUrl = data.result_json.activity_image_info;
					}
                    webUrl = data.result_json.activity_image_info;
                    console.log(webUrl);
                    var toWebUrl = '';
                    var tourl = '';
                    var title = '';
					if(webUrl.activity_image_arr){
						toWebUrl = webUrl.activity_image_arr[0].image_url;
						tourl = webUrl.activity_image_arr[0].image_go_web;
						title = webUrl.activity_image_arr[0].image_go_name;
					}
                    $(".nav").after("<img class='weburl' src='"+toWebUrl+"' style='width:6.4rem'>");
                    $(".weburl").bind("click",function(){
                        var arrUrls = tourl.replace(/(^.{33})/gm, 'wechart/');
                        if(user!=null){
                            var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token="+user+"&pharmacy_id="+pharmacyId;
                        }else{
                            var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token=&pharmacy_id="+pharmacy_id;
                        }
                        localStorage.setItem("url",_arrUrls);
                        window.parent.location.href="promoinfo.html?title="+title;
                    });
                    /*一元狂秒 end*/
                    /*对应的药店信息板块 start*/
                    var sale = data.result_json.new_pharmacy_info;
                    var toUrl = sale.pharmacy_certificate_url;
                    console.log(toUrl);
                    var phone = data.result_json.new_pharmacy_info.pharmacy_phone;
                    var pharmacy_name = data.result_json.new_pharmacy_info.pharmacy_name;
                    localStorage.setItem("pharmacy_name",sale.pharmacy_name);
                    localStorage.setItem("pharmacy_add",sale.pharmacy_add);
                    localStorage.setItem("pharmacy_name",pharmacy_name);
                    localStorage.setItem("pharmacy_phone",phone);
                    if (sale != "" && sale != undefined) {
                        var pharmacyName = localStorage.getItem("pharmacy_name");
                        var pharmacyAdd = localStorage.getItem("pharmacy_add");
                        var oSale = "<ul><li>"+pharmacyName+"<br>"+pharmacyAdd+"</li></ul>";
                        $(".car_middle").append(oSale).click(function(){
                            if(toUrl=="http://imgstore.camore.cn/licensehtml/1630_drugstore_info.html"){
                                window.parent.location.href="1630_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1620_drugstore_info.html"){
                                window.parent.location.href="1620_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1610_drugstore_info.html"){
                                window.parent.location.href="1610_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1611_drugstore_info.html"){
                                window.parent.location.href="1611_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1612_drugstore_info.html"){
                                window.parent.location.href="1612_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1629_drugstore_info.html"){
                                window.parent.location.href="1629_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1622_drugstore_info.html"){
                                window.parent.location.href="1622_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1633_drugstore_info.html"){
                                window.parent.location.href="1633_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1627_drugstore_info.html"){
                                window.parent.location.href="1627_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1631_drugstore_info.html"){
                                window.parent.location.href="1631_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1623_drugstore_info.html"){
                                window.parent.location.href="1623_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1621_drugstore_info.html"){
                                window.parent.location.href="1621_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1632_drugstore_info.html"){
                                window.parent.location.href="1632_drugstore_info.html";
                            }
                        });
                        $(".car_right").bind("click",function(){
                            $(".pharmacy_phone",window.parent.document).show();
                            $(".pharmacy_phone .phone_middle span",window.parent.document).text(phone);
                        });
                        $(".pharmacy_phone .phone_bot .left",window.parent.document).click(function(){
                            window.parent.location.href="Tel:"+phone;
                            $(".pharmacy_phone",window.parent.document).hide();
                        });
                        var _height = $(".container .carousel .car_middle li").height();
                        var num1 = $(".container .carousel .car_middle li").length;
                        var number1 = 0;
                        setInterval(function () {
                            $(".car_middle").animate({
                                "marginTop": -_height * number1 + "px"
                            }, 1000);
                            number1++;
                            if (number1 == num1) {
                                number1 = 0;
                            }
                        }, 2000);
                    } else {
                        $(".carousel").remove();
                    }
                    /*对应的药店信息板块 end*/
                    /*九宫格板块 start*/
                    //var essence = data.result_json.new_essence_centre;
                    //var toArr = essence.group_item_arr;
                    //var $width = $(".container").width();
                    //console.log($width);
                    //var tr = "<tr class='class_tr'></tr>";
                    //var td = "<td class='class_td'></td>";
                    //if(toArr!=""){
                    //    $.each(toArr,function(index,value){
                    //        console.log(value);
                    //        if(value.group_background_image==undefined){
                    //            for(var i=0;i<value.h_count;i++){
                    //                $(".xttblog").append(tr);
                    //                $(".class_tr").hide();
                    //            }
                    //            for(var j=0;j<value.w_count;j++){
                    //                $(".class_tr").append(td);
                    //                $(".class_td").hide();
                    //            }
                    //            $.each(value.tr_arr,function(index1,value1){
                    //                console.log(value1);
                    //                for(var i=0;i<value1.td_arr.length;i++){
                    //                    console.log(value1.td_arr[i].width);
                    //                    var _width = $(window).width();
                    //                    $(".xttblog").append("<img title='"+value1.td_arr[i].value.sale_name+"' class='td_img' style='width:"+value1.td_arr[i].width/100*_width+"px;height:3rem;' src='"+value1.td_arr[i].value.img_url+"' url='"+value1.td_arr[i].value.sales_url+"'>").css("position","relative");
                    //                }
                    //            });
                    //        }else{
                    //            $(".xttblog").append("<img class='td_img1' src='"+value.group_background_image+"'>");
                    //            var oDiv = "<div class='div_bar' style='width:6.4rem;height:3.4rem;position:absolute;top:0;'>";
                    //            $.each(value.tr_arr,function(index1,value1){
                    //                console.log(value1);
                    //                for(var i=0;i<value1.td_arr.length;i++){
                    //                    console.log(value1.td_arr[i].width);
                    //                    var _width = $(window).width();
                    //                    oDiv += "<div title='"+value1.td_arr[i].value.sale_name+"' class='td_img' style='float:left;width:33.33%;height:3.4rem;' src='"+value1.td_arr[i].value.img_url+"' url='"+value1.td_arr[i].value.sales_url+"'></div>";
                    //                }
                    //            });
                    //            $(".td_img1").after(oDiv);
                    //        }
                    //    });
                    //    $(".td_img").bind("click",function(){
                    //        var title = $(this).attr("title");
                    //        localStorage.setItem("title",title);
                    //        var _url = $(this).attr("url");
                    //        var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                    //        var url1 = url.replace(/(^.{33})/gm, 'wechart/');
                    //        var arrUrl = "http://deve.ykd365.com/medstore/"+url1;
                    //        console.log(arrUrl);
                    //        localStorage.setItem("url",arrUrl);
                    //        window.parent.location.href="promoinfo.html?title="+title;
                    //    });
                    //}else{
                    //
                    //}
                    /*九宫格板块 end*/
                    /*品牌找药板块 start*/
                    var brand = data.result_json.brand_dic.brand_arr;
                    if(brand!="" && brand!=undefined){
                        var toBrand = "<ul>";
                        $.each(brand,function(index,value){
                            toBrand += "<li id='"+value.category_id+"' name='"+value.category_name+"'><img src='"+value.category_img+"'></li>";
                        });
                        $(".brand_content").append(toBrand);
                        $(".brand_header").click(function(){
                            window.parent.location.href="wenyao_index.html";
                        });
                        $(".brand_content ul li").bind("click",function(){
                            var query = $(this).attr("name");
                            window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                        });
                    }else{
                        $(".brand").remove();
                    }
                    /*品牌找药板块 end*/
                    /*对症找药板块 start*/
                    //var sort = data.result_json.symptom_dic.symptom_arr;
                    if ( data.result_json.symptom_dic != "" &&  data.result_json.symptom_dic != undefined) {
                        var sort = data.result_json.symptom_dic.symptom_arr;
                        for (i in sort) {
                            var sorts = "<div class='content'><div class='content_header'>" + sort[i].sort_name + "</div><div class='content_content'><ul>";
                            for (j in sort[i].sorts[0].categorys) {
                                sorts += "<li id='" + sort[i].sorts[0].categorys[j].category_id + "'><img src='" + sort[i].sorts[0].categorys[j].category_icon_url + "'><span>" + sort[i].sorts[0].categorys[j].category_name + "</span>";
                            }
                            $("._nav .nav_content").append(sorts);
                        }
                        $("._nav li").bind("click",function(){
                            var query=$(this).children("span").text();
                            window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                        });
                        $("#ho1").mCustomScrollbar({
                            axis: "x",
                            advanced: {autoExpandHorizontalScroll: true}
                        });
                        for (var i = 0; i < $(".content").length; i++) {
                            if ($(".content").eq(i).find("li").length > 8) {
                                $(".content").eq(i).find("li:gt(6)").remove();
                                $(".content").eq(i).children(".content_content").children().append("<li><span class='span1'>更多<img class='img1' src='images/sort_right.png'></span></li>");
                            }
                        }
                        $(".content_content .span1").bind("click",function(){
                            window.parent.location.href="rapid_drug.html";
                        });
                    } else {
                        $("._nav").remove();
                    }
                    /*对症找药板块 end*/
                    /*专场板块*/
                    var sales = data.result_json.new_sale_info.sale_list;
                    if(sales.drug_sales_list_arr!="" && sales.drug_sales_list_arr!="undefined"){
                        $.each(sales,function(index,value){
                            console.log(value);
                            for(var i=0;i<value.length;i++){
                                var div = "<div class='madegame'><ul class='clearfix ho'>";
                                $(".made_top img").eq(i).attr("src",value[i].drug_hot_url);
                                $(".made_top").eq(i).attr("drug_hot_name",value[i].drug_hot_name);
                                if(value[i].drug_hot_arr!=[]){
                                    for(var j=0;j<value[i].drug_hot_arr.length;j++){
                                        div += "<li drug_id='"+value[i].drug_hot_arr[j].drug_id+"'><img src='"+value[i].drug_hot_arr[j].pic_path+"'><br><span>"+value[i].drug_hot_arr[j].show_name+"<br><p>￥"+(value[i].drug_hot_arr[j].price / 100).toFixed(2)+"</p></span></li>";
                                    }
                                }
                                $(".made_top").eq(i).after(div);
                                div = "<div class='madegame'><ul class='clearfix ho'>";
                                $.mCustomScrollbar.defaults.theme="light-2";
                                $(".ho").mCustomScrollbar({
                                    axis:"x",
                                    advanced:{autoExpandHorizontalScroll:true}
                                });
                            }
                        });
                    }else{
                        $(".made").remove();
                    }
                    $(".made .made_top").bind("click",function(){
                        var query=$(this).attr("drug_hot_name");
                        window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                    });
                    $(".made .madegame li").bind("click",function(){
                        var drug_id=$(this).attr("drug_id");
                        window.parent.location.href="1_commodity_details.html?drug_id="+drug_id;
                    });
                    /*专场板块 end*/
                    /*商品列表板块 start*/
                    var drug_hot = data.result_json.new_sale_info.hot_list;
                    if (drug_hot!=undefined) {
                        $.each(drug_hot, function (index, value) {
                            for (var i = 0; i < value.length; i++) {
                                $(".list_header").eq(i).find(".header_left").children().append(value[i].drug_hot_name);
                                $(".list_header").eq(i).find(".header_left").css("background", value[i].drug_hot_color);
                            }
                        });
                        var drug_hot1 = data.result_json.new_sale_info.hot_list.drug_sales_list_arr;
                        var drug = "<ul>";
                        var drug1 = "<ul>";
                        var drug2 = "<ul>";
                        var drug3 = "<ul>";
                        var drug4 = "<ul>";
                        for (var i = 0; i < drug_hot1[0].drug_hot_arr.length; i++) {
                            drug += "<li drug_id='"+drug_hot1[0].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[0].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[0].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[0].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                        }
                        $(".list_content").prepend(drug);
                        for (var i = 0; i < drug_hot1[1].drug_hot_arr.length; i++) {
                            if (drug_hot1[1].drug_hot_arr.length > 3) {
                                drug_hot1[1].drug_hot_arr.length = 3;
                                drug1 += "<li drug_id='"+drug_hot1[1].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[1].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[1].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[1].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                            } else {
                                drug1 += "<li drug_id='"+drug_hot1[1].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[1].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[1].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[1].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                            }
                        }
                        $(".list_content1").prepend(drug1);
                        for (var i = 0; i < drug_hot1[2].drug_hot_arr.length; i++) {
                            drug2 += "<li drug_id='"+drug_hot1[2].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[2].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[2].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[2].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                        }
                        $(".list_content2").prepend(drug2);
                        for (var i = 0; i < drug_hot1[3].drug_hot_arr.length; i++) {
                            drug3 += "<li drug_id='"+drug_hot1[3].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[3].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[3].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[3].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                        }
                        $(".list_content3").prepend(drug3);
                        if(drug_hot1[4].drug_hot_arr!="undefined"){
                            for (var i = 0; i < drug_hot1[4].drug_hot_arr.length; i++) {
                                drug4 += "<li drug_id='"+drug_hot1[4].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[4].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[4].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[4].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                            }
                            $(".list_content4").prepend(drug4);
                        }else{
                            $(".list_content4").parent(".list").hide();
                        }
                        $(".list .header_right").bind("click",function(){
                            var query=$(this).prev().children().text();
                            window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                        });
                        $(".list div ul li").bind("click",function(){
                            var drug_id=$(this).attr("drug_id");
                            window.parent.location.href="1_commodity_details.html?drug_id="+drug_id;
                        });
                    } else {
                        $(".container .list").remove();
                    }
                    /*商品列表板块 end*/
                }else if(data.result_code==102){
                    $("body").css("background","#fff");
                    $(".container").html("").append("<img class='bg' src='images/bg.png'>");
                    $(".bg").bind("click",function(){
                        window.parent.location.href="1_location_page.html";
                    });
                }
            }
        })
    }else if(pharmacyId==null && user!=null && pos!=null){
        var pos_index = localStorage.getItem("pos_index");
        var message_name = "default_address";
        var pharmacy_id = "";
        var user_token = "";
        var str1 = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
        var toStr1=md5(str1+key);
        $.ajax({
            type:"POST",
            contentType:"application/json;charset=utf-8",
            url:"http://deve.ykd365.com/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toStr1,
            dataType:"json",
            success:function(data){
                localStorage.setItem("area_id",data.result_json.area_id);
                localStorage.setItem("pharmacy_id",data.result_json.pharmacy_id);
                var pharmacy_id = data.result_json.pharmacy_id;
                var message_name = "first_page";
                var user_token = user;
                var str1 = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
                var toStr=md5(str1+key);
                $.ajax({
                    type:"POST",
                    contentType:"application/json;charset=utf-8",
                    url:"http://deve.ykd365.com/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toStr,
                    dataType:"json",
                    success:function(result){
                        console.log(result);
                        if(result.result_code==100){
                            $(".bar_img").hide();
                            var banner = result.result_json.banner_link_list.first_advertisement_arr;
                            var ul = "<ul>";
                            $.each(banner,function(index,value){
                                ul += "<li url='"+value.advertisement_url+"'><img src='"+value.advertisement_img+"'></li>";
                            });
                            $(".header .main_img").prepend(ul);
                            $(".main_img ul li").bind("click",function(){
                                var _url = $(this).attr("url");
                                console.log(_url);
                                var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                                var name = "OneYuan_module_1804";
                                var name1 = "promoinfo_1804";
                                var r = url.match(name);  //匹配目标参数
                                var r1 = url.match(name1);
                                if (r != null){
                                    var title = $(this).attr("title");
                                    var urls = url.replace(/(^.{33})/gm, 'wechart/');
                                    var arrUrl = "http://deve.ykd365.com/medstore/"+urls;
                                    localStorage.setItem("url",arrUrl);
                                    localStorage.setItem("title",title);
                                    window.parent.location.href="promoinfo.html?title="+title;
                                }else if(r1 != null){
                                    var title1 = $(this).attr("title");
                                    var arrUrls = url.replace(/(^.{33})/gm, 'wechart/');
                                    if(user!=null){
                                        var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token="+user+"&pharmacy_id="+pharmacyId;
                                    }else{
                                        var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token=&pharmacy_id="+pharmacy_id;
                                    }
                                    localStorage.setItem("url",_arrUrls);
                                    window.parent.location.href="promoinfo.html?title="+title1;
                                }
                            });
                            var length = $(".img_gallery ul li").length;
                            for(var i=0;i<length;i++){
                                $(".img_gallery .point").prepend("<a href='javascript:;'></a>");
                            }
                            $dragBln = false;
                            $(".main_img").touchSlider({
                                flexible : true,
                                speed : 200,
                                btn_prev : $("#btn_prev"),
                                btn_next : $("#btn_next"),
                                paging : $(".point a"),
                                counter : function(e){
                                    $(".point a").removeClass("on").eq(e.current-1).addClass("on");//图片顺序点切换
                                }
                            });
                            timer = setInterval(function(){
                                $("#btn_next").click();
                            },3000);
                            $(".main_img").bind("touchstart",function(){
                                clearInterval(timer);
                            }).bind("touched",function(){
                                timer = setInterval(function(){
                                    $("#btn_next").click();
                                },3000)
                            });
                            /*定位按钮板块 start*/
                            var formatted_address = localStorage.getItem("formatted_address");
                            var detail_add=localStorage.getItem("detail_add");
                            if(detail_add!=null){
                                $(".location .span1").text(detail_add);
                            }else{
                                $(".location .span1").text(formatted_address);
                            }
                            /*定位按钮板块 end*/
                            /*八个按钮板块 start*/
                            var nav = result.result_json.new_pharmacy_info.home_button_list_arr;
                            if(nav!="" && nav!=undefined){
                                var oNav = "<ul>";
                                $.each(nav,function(index,value){
                                    if(value.home_button_web!=undefined){
                                        oNav += "<li url='"+value.home_button_web+"'  id='li' type='" + value.home_button_type + "'><img src='" + value.home_button_image + "'><span>" + value.home_button_title + "</span></li>";
                                    }else{
                                        oNav += "<li id='li' type='" + value.home_button_type + "'><img src='" + value.home_button_image + "'><span>" + value.home_button_title + "</span></li>";
                                    }
                                });
                                $(".nav").append(oNav);
                                if(nav.length<8){
                                    $(".nav li:gt(3)").hide();
                                }else if(nav.length>=8){
                                    $(".nav li:gt(7)").hide();
                                }else if(nav.length=12){
                                    $(".nav li").show();
                                }
                                $(".nav li").bind("click",function(){
                                    var type = $(this).attr("type");
                                    if(type=="bz") {
                                        window.parent.location.href = "rapid_drug.html";
                                    }else if(type=="dir"){
                                        window.parent.location.href="souyao_index.html";
                                    }else if(type=="brand"){
                                        window.parent.location.href="wenyao_index.html";
                                    }else if(type=="web"){
                                        if($(this).children("span").text()=="邀请好友"){
                                            var title1 = $(this).children("span").text();
                                            var message_name = "first_shared";
                                            var org = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
                                            var toOrg = md5(org+key);
                                            $.ajax({
                                                type:"POST",
                                                contentType:"application/json;charset=utf-8",
                                                url:"http://deve.ykd365.com/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toOrg,
                                                dataType:"json",
                                                success:function(data){
                                                    var obj = JSON.stringify(data);
                                                    localStorage.setItem("json",obj);
                                                    localStorage.setItem("title",title1);
                                                    if(user==null){
                                                        window.parent.location.href=data.result_json[4].shared_url+"&user_token=&pharmacy_id="+localStorage.getItem("pharmacy_id");
                                                    }else{
                                                        window.parent.location.href=data.result_json[4].shared_url+"&user_token="+user+"&pharmacy_id="+pharmacyId;
                                                    }
                                                }
                                            });
                                        }else{
                                            var title1 = $(this).children("span").text();
                                            localStorage.setItem("title",title1);
                                            localStorage.setItem("url","http://deve.ykd365.com/medstore/share/share_1804_1?actId=729&user_token="+user+"&pharmacy_id="+pharmacyId+"&type=category&typeId=1000035625");
                                            window.parent.location.href="promoinfo.html?title="+$(this).children("span").text();
                                        }
                                    }else if(type=="web2"){
                                        var title = $(this).children("span").text();
                                        localStorage.setItem("title",title);
                                        var _url = $(this).attr("url");
                                        if(_url.indexOf("navigationDirList")>=0){
                                            var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                                        }else{
                                            var url = _url.replace(/deve.ykd365.com/g,'deve.ykd365.com');
                                        }
                                        var arrUrl = url.replace(/common/g,"wechart");
                                        //window.parent.location.href=arrUrl;
                                        localStorage.setItem("url",arrUrl);
                                        window.parent.location.href="promoinfo.html?title="+$(this).children("span").text();
                                    }
                                });
                            }
                            /*八个按钮板块 end*/
                            /*一元狂秒 start*/
                            var webUrl = {} ;
							if(data.result_json.activity_image_info){
								webUrl = data.result_json.activity_image_info;
							}
		                    webUrl = data.result_json.activity_image_info;
		                    console.log(webUrl);
		                    var toWebUrl = '';
		                    var tourl = '';
		                    var title = '';
							if(webUrl.activity_image_arr){
								toWebUrl = webUrl.activity_image_arr[0].image_url;
								tourl = webUrl.activity_image_arr[0].image_go_web;
								title = webUrl.activity_image_arr[0].image_go_name;
							}
                            $(".nav").after("<img class='weburl' src='"+toWebUrl+"' style='width:6.4rem'>");
                            $(".weburl").bind("click",function(){
                                var arrUrls = tourl.replace(/(^.{33})/gm, 'wechart/');
                                if(user!=null){
                                    var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token="+user+"&pharmacy_id="+pharmacyId;
                                }else{
                                    var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token=&pharmacy_id="+pharmacy_id;
                                }
                                localStorage.setItem("url",_arrUrls);
                                window.parent.location.href="promoinfo.html?title="+title;
                            });
                            /*一元狂秒 end*/
                            /*对应的药店信息板块 start*/
                            var sale = result.result_json.new_pharmacy_info;
                            var toUrl = sale.pharmacy_certificate_url;
                            var phone = result.result_json.new_pharmacy_info.pharmacy_phone;
                            var pharmacy_name = result.result_json.new_pharmacy_info.pharmacy_name;
                            localStorage.setItem("pharmacy_name",sale.pharmacy_name);
                            localStorage.setItem("pharmacy_add",sale.pharmacy_add);
                            localStorage.setItem("pharmacy_name",pharmacy_name);
                            localStorage.setItem("pharmacy_phone",phone);
                            if (sale != "" && sale != undefined) {
                                var pharmacyName = localStorage.getItem("pharmacy_name");
                                var pharmacyAdd = localStorage.getItem("pharmacy_add");
                                var oSale = "<ul><li>"+pharmacyName+"<br>"+pharmacyAdd+"</li></ul>";
                                $(".car_middle").append(oSale).click(function(){
                                    if(toUrl=="http://imgstore.camore.cn/licensehtml/1630_drugstore_info.html"){
                                        window.parent.location.href="1630_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1620_drugstore_info.html"){
                                        window.parent.location.href="1620_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1610_drugstore_info.html"){
                                        window.parent.location.href="1610_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1611_drugstore_info.html"){
                                        window.parent.location.href="1611_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1612_drugstore_info.html"){
                                        window.parent.location.href="1612_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1629_drugstore_info.html"){
                                        window.parent.location.href="1629_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1622_drugstore_info.html"){
                                        window.parent.location.href="1622_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1633_drugstore_info.html"){
                                        window.parent.location.href="1633_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1627_drugstore_info.html"){
                                        window.parent.location.href="1627_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1631_drugstore_info.html"){
                                        window.parent.location.href="1631_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1623_drugstore_info.html"){
                                        window.parent.location.href="1623_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1621_drugstore_info.html"){
                                        window.parent.location.href="1621_drugstore_info.html";
                                    }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1632_drugstore_info.html"){
                                        window.parent.location.href="1632_drugstore_info.html";
                                    }
                                });
                                $(".car_right").bind("click",function(){
                                    $(".pharmacy_phone",window.parent.document).show();
                                    $(".pharmacy_phone .phone_middle span",window.parent.document).text(phone);
                                });
                                $(".pharmacy_phone .phone_bot .left",window.parent.document).click(function(){
                                    window.parent.location.href="Tel:"+phone;
                                    $(".pharmacy_phone",window.parent.document).hide();
                                });
                                var _height = $(".container .carousel .car_middle li").height();
                                var num1 = $(".container .carousel .car_middle li").length;
                                var number1 = 0;
                                setInterval(function () {
                                    $(".car_middle").animate({
                                        "marginTop": -_height * number1 + "px"
                                    }, 1000);
                                    number1++;
                                    if (number1 == num1) {
                                        number1 = 0;
                                    }
                                }, 2000);
                            } else {
                                $(".carousel").remove();
                            }
                            /*对应的药店信息板块 end*/
                            /*九宫格板块 start*/
                            //var essence = result.result_json.new_essence_centre;
                            //console.log(essence);
                            //var toArr = essence.group_item_arr;
                            //var $width = $(".container").width();
                            //console.log($width);
                            //var tr = "<tr class='class_tr'></tr>";
                            //var td = "<td class='class_td'></td>";
                            //if(toArr!=""){
                            //    $.each(toArr,function(index,value){
                            //        console.log(value);
                            //        if(value.group_background_image==undefined){
                            //            for(var i=0;i<value.h_count;i++){
                            //                $(".xttblog").append(tr);
                            //                $(".class_tr").hide();
                            //            }
                            //            for(var j=0;j<value.w_count;j++){
                            //                $(".class_tr").append(td);
                            //                $(".class_td").hide();
                            //            }
                            //            $.each(value.tr_arr,function(index1,value1){
                            //                console.log(value1);
                            //                for(var i=0;i<value1.td_arr.length;i++){
                            //                    console.log(value1.td_arr[i].width);
                            //                    var _width = $(window).width();
                            //                    $(".xttblog").append("<img title='"+value1.td_arr[i].value.sale_name+"' class='td_img' style='width:"+value1.td_arr[i].width/100*_width+"px;height:3rem;' src='"+value1.td_arr[i].value.img_url+"' url='"+value1.td_arr[i].value.sales_url+"'>").css("position","relative");
                            //                }
                            //            });
                            //        }else{
                            //            $(".xttblog").append("<img class='td_img1' src='"+value.group_background_image+"'>");
                            //            var oDiv = "<div class='div_bar' style='width:6.4rem;height:3.4rem;position:absolute;top:0;'>";
                            //            $.each(value.tr_arr,function(index1,value1){
                            //                console.log(value1);
                            //                for(var i=0;i<value1.td_arr.length;i++){
                            //                    console.log(value1.td_arr[i].width);
                            //                    var _width = $(window).width();
                            //                    oDiv += "<div title='"+value1.td_arr[i].value.sale_name+"' class='td_img' style='float:left;width:33.33%;height:3.4rem;' src='"+value1.td_arr[i].value.img_url+"' url='"+value1.td_arr[i].value.sales_url+"'></div>";
                            //                }
                            //            });
                            //            $(".td_img1").after(oDiv);
                            //        }
                            //    });
                            //    $(".td_img").bind("click",function(){
                            //        var title = $(this).attr("title");
                            //        localStorage.setItem("title",title);
                            //        var _url = $(this).attr("url");
                            //        var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                            //        var url1 = url.replace(/(^.{33})/gm, 'wechart/');
                            //        var arrUrl = "http://deve.ykd365.com/medstore/"+url1;
                            //        console.log(arrUrl);
                            //        localStorage.setItem("url",arrUrl);
                            //        window.parent.location.href="promoinfo.html?title="+title;
                            //    });
                            //}else{
                            //
                            //}
                            /*九宫格板块 end*/
                            /*品牌找药板块 start*/
                            var brand = result.result_json.brand_dic.brand_arr;
                            if(brand!="" && brand!=undefined){
                                var toBrand = "<ul>";
                                $.each(brand,function(index,value){
                                    toBrand += "<li id='"+value.category_id+"' name='"+value.category_name+"'><img src='"+value.category_img+"'></li>";
                                });
                                $(".brand_content").append(toBrand);
                                $(".brand_header").click(function(){
                                    window.parent.location.href="wenyao_index.html";
                                });
                                $(".brand_content ul li").bind("click",function(){
                                    var query = $(this).attr("name");
                                    window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                                });
                            }else{
                                $(".brand").remove();
                            }
                            /*品牌找药板块 end*/
                            /*对症找药板块 start*/
                            if ( data.result_json.symptom_dic != "" &&  data.result_json.symptom_dic != undefined) {
                                var sort = data.result_json.symptom_dic.symptom_arr;
                                for (i in sort) {
                                    var sorts = "<div class='content'><div class='content_header'>" + sort[i].sort_name + "</div><div class='content_content'><ul>";
                                    for (j in sort[i].sorts[0].categorys) {
                                        sorts += "<li id='" + sort[i].sorts[0].categorys[j].category_id + "'><img src='" + sort[i].sorts[0].categorys[j].category_icon_url + "'><span>" + sort[i].sorts[0].categorys[j].category_name + "</span>";
                                    }
                                    $("._nav .nav_content").append(sorts);
                                }
                                $("._nav li").bind("click",function(){
                                    var query=$(this).children("span").text();
                                    window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                                });
                                $("#ho1").mCustomScrollbar({
                                    axis: "x",
                                    advanced: {autoExpandHorizontalScroll: true}
                                });
                                for (var i = 0; i < $(".content").length; i++) {
                                    if ($(".content").eq(i).find("li").length > 8) {
                                        $(".content").eq(i).find("li:gt(6)").remove();
                                        $(".content").eq(i).children(".content_content").children().append("<li><span class='span1'>更多<img class='img1' src='images/sort_right.png'></span></li>");
                                    }
                                }
                                $(".content_content .span1").bind("click",function(){
                                    window.parent.location.href="rapid_drug.html";
                                });
                            } else {
                                $("._nav").remove();
                            }
                            /*对症找药板块 end*/
                            /*专场板块*/
                            var sales = result.result_json.new_sale_info.sale_list;
                            if(sales.drug_sales_list_arr!="" && sales.drug_sales_list_arr!="undefined"){
                                $.each(sales,function(index,value){
                                    for(var i=0;i<value.length;i++){
                                        var div = "<div class='madegame'><ul class='clearfix ho'>";
                                        $(".made_top img").eq(i).attr("src",value[i].drug_hot_url);
                                        $(".made_top").eq(i).attr("drug_hot_name",value[i].drug_hot_name);
                                        if(value[i].drug_hot_arr!=[]){
                                            for(var j=0;j<value[i].drug_hot_arr.length;j++){
                                                div += "<li drug_id='"+value[i].drug_hot_arr[j].drug_id+"'><img src='"+value[i].drug_hot_arr[j].pic_path+"'><br><span>"+value[i].drug_hot_arr[j].show_name+"<br><p>￥"+(value[i].drug_hot_arr[j].price / 100).toFixed(2)+"</p></span></li>";
                                            }
                                        }
                                        $(".made_top").eq(i).after(div);
                                        div = "<div class='madegame'><ul class='clearfix ho'>";
                                        $.mCustomScrollbar.defaults.theme="light-2";
                                        $(".ho").mCustomScrollbar({
                                            axis:"x",
                                            advanced:{autoExpandHorizontalScroll:true}
                                        });
                                    }
                                });
                            }else{
                                $(".made").remove();
                            }
                            $(".made .made_top").bind("click",function(){
                                var query=$(this).attr("drug_hot_name");
                                window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                            });
                            $(".made .madegame li").bind("click",function(){
                                var drug_id=$(this).attr("drug_id");
                                window.parent.location.href="1_commodity_details.html?drug_id="+drug_id;
                            });
                            /*专场板块 end*/
                            /*商品列表板块 start*/
                            var drug_hot = result.result_json.new_sale_info.hot_list;
                            if (drug_hot!=undefined) {
                                $.each(drug_hot, function (index, value) {
                                    for (var i = 0; i < value.length; i++) {
                                        $(".list_header").eq(i).find(".header_left").children().append(value[i].drug_hot_name);
                                        $(".list_header").eq(i).find(".header_left").css("background", value[i].drug_hot_color);
                                    }
                                });
                                var drug_hot1 = result.result_json.new_sale_info.hot_list.drug_sales_list_arr;
                                var drug = "<ul>";
                                var drug1 = "<ul>";
                                var drug2 = "<ul>";
                                var drug3 = "<ul>";
                                var drug4 = "<ul>";
                                for (var i = 0; i < drug_hot1[0].drug_hot_arr.length; i++) {
                                    drug += "<li drug_id='"+drug_hot1[0].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[0].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[0].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[0].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                }
                                $(".list_content").prepend(drug);
                                for (var i = 0; i < drug_hot1[1].drug_hot_arr.length; i++) {
                                    if (drug_hot1[1].drug_hot_arr.length > 3) {
                                        drug_hot1[1].drug_hot_arr.length = 3;
                                        drug1 += "<li drug_id='"+drug_hot1[1].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[1].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[1].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[1].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                    } else {
                                        drug1 += "<li drug_id='"+drug_hot1[1].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[1].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[1].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[1].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                    }
                                }
                                $(".list_content1").prepend(drug1);
                                for (var i = 0; i < drug_hot1[2].drug_hot_arr.length; i++) {
                                    drug2 += "<li drug_id='"+drug_hot1[2].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[2].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[2].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[2].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                }
                                $(".list_content2").prepend(drug2);
                                for (var i = 0; i < drug_hot1[3].drug_hot_arr.length; i++) {
                                    drug3 += "<li drug_id='"+drug_hot1[3].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[3].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[3].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[3].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                }
                                $(".list_content3").prepend(drug3);
                                if(drug_hot1[4].drug_hot_arr!="undefined"){
                                    for (var i = 0; i < drug_hot1[4].drug_hot_arr.length; i++) {
                                        drug4 += "<li drug_id='"+drug_hot1[4].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[4].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[4].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[4].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                                    }
                                    $(".list_content4").prepend(drug4);
                                }else{
                                    $(".list_content4").parent(".list").hide();
                                }
                                $(".list .header_right").bind("click",function(){
                                    var query=$(this).prev().children().text();
                                    window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                                });
                                $(".list div ul li").bind("click",function(){
                                    var drug_id=$(this).attr("drug_id");
                                    window.parent.location.href="1_commodity_details.html?drug_id="+drug_id;
                                });
                            } else {
                                $(".container .list").remove();
                            }
                            /*商品列表板块 end*/
                        }else if(result.result_code==102){
                            $("body").css("background","#fff");
                            $(".container").html("").append("<img class='bg' src='images/bg.png'>");
                            $(".bg").bind("click",function(){
                                window.parent.location.href="1_location_page.html";
                            });
                        }
                    }
                })
            }
        })
    }else if(pharmacyId!=null && pos!=null && user==null){
        var message_name = "first_page";
        var pharmacy_id = pharmacyId;
        var pos_index = pos;
        var str = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
        var toStr=md5(str+key);
        $.ajax({
            type:"POST",
            contentType:"application/json;charset=utf-8",
            url:"http://deve.ykd365.com/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toStr,
            dataType:"json",
            success:function(data){
                if(data.result_code==100){
                    $(".bar_img").hide();
                    var banner = data.result_json.banner_link_list.first_advertisement_arr;
                    var ul = "<ul>";
                    $.each(banner,function(index,value){
                        ul += "<li title='"+value.advertisement_name+"' url='"+value.advertisement_url+"'><img src='"+value.advertisement_img+"'></li>";
                    });
                    $(".header .main_img").prepend(ul);
                    $(".main_img ul li").bind("click",function(){
                        var _url = $(this).attr("url");
                        console.log(_url);
                        var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                        var name = "OneYuan_module_1804";
                        var name1 = "promoinfo_1804";
                        var r = url.match(name);  //匹配目标参数
                        var r1 = url.match(name1);
                        if (r != null){
                            var title = $(this).attr("title");
                            var urls = url.replace(/(^.{33})/gm, 'wechart/');
                            var arrUrl = "http://deve.ykd365.com/medstore/"+urls;
                            localStorage.setItem("url",arrUrl);
                            localStorage.setItem("title",title);
                            window.parent.location.href="promoinfo.html?title="+title;
                        }else if(r1 != null){
                            var title1 = $(this).attr("title");
                            var arrUrls = url.replace(/(^.{33})/gm, 'wechart/');
                            if(user!=null){
                                var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token="+user+"&pharmacy_id="+pharmacyId;
                            }else{
                                var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token=&pharmacy_id="+pharmacy_id;
                            }
                            localStorage.setItem("url",_arrUrls);
                            window.parent.location.href="promoinfo.html?title="+title1;
                        }
                    });
                    var length = $(".img_gallery ul li").length;
                    for(var i=0;i<length;i++){
                        $(".img_gallery .point").prepend("<a href='javascript:;'></a>");
                    }
                    $dragBln = false;
                    $(".main_img").touchSlider({
                        flexible : true,
                        speed : 200,
                        btn_prev : $("#btn_prev"),
                        btn_next : $("#btn_next"),
                        paging : $(".point a"),
                        counter : function(e){
                            $(".point a").removeClass("on").eq(e.current-1).addClass("on");//图片顺序点切换
                        }
                    });
                    timer = setInterval(function(){
                        $("#btn_next").click();
                    },3000);
                    $(".main_img").bind("touchstart",function(){
                        clearInterval(timer);
                    }).bind("touched",function(){
                        timer = setInterval(function(){
                            $("#btn_next").click();
                        },3000)
                    });

                    /*定位按钮板块 start*/
                    var detail_add=localStorage.getItem("detail_add");
                    var formatted_address = localStorage.getItem("formatted_address");
                    if(detail_add!=null){
                        $(".location .span1").text(detail_add);
                    }else{
                        $(".location .span1").text(formatted_address);
                    }
                    /*定位按钮板块 end*/
                    /*八个按钮板块 start*/
                    var nav = data.result_json.new_pharmacy_info.home_button_list_arr;
                    if(nav!="" && nav!=undefined){
                        var oNav = "<ul>";
                        $.each(nav,function(index,value){
                            if(value.home_button_web!=undefined){
                                oNav += "<li url='"+value.home_button_web+"' id='li' type='" + value.home_button_type + "'><img src='" + value.home_button_image + "'><span>" + value.home_button_title + "</span></li>";
                            }else{
                                oNav += "<li id='li' type='" + value.home_button_type + "'><img src='" + value.home_button_image + "'><span>" + value.home_button_title + "</span></li>";
                            }
                        });
                        $(".nav").append(oNav);
                        if(nav.length<8){
                            $(".nav li:gt(3)").hide();
                        }else if(nav.length>=8){
                            $(".nav li:gt(7)").hide();
                        }else if(nav.length=12){
                            $(".nav li").show();
                        }
                        $(".nav li").bind("click",function(){
                            var val = $(this).children("span").text();
                            var type = $(this).attr("type");
                            if(type=="bz") {
                                window.parent.location.href = "rapid_drug.html";
                            }else if(type=="dir"){
                                window.parent.location.href="souyao_index.html";
                            }else if(type=="brand"){
                                window.parent.location.href="wenyao_index.html";
                            }else if(type=="web"){
                                if($(this).children("span").text()=="邀请好友"){
                                    var title1 = $(this).children("span").text();
                                    var message_name = "first_shared";
                                    var org = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
                                    var toOrg = md5(org+key);
                                    $.ajax({
                                        type:"POST",
                                        contentType:"application/json;charset=utf-8",
                                        url:"http://deve.ykd365.com/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toOrg,
                                        dataType:"json",
                                        success:function(data){
                                            var obj = JSON.stringify(data);
                                            localStorage.setItem("json",obj);
                                            localStorage.setItem("title",title1);
                                            if(user==null){
                                                window.parent.location.href=data.result_json[4].shared_url+"&user_token=&pharmacy_id="+localStorage.getItem("pharmacy_id");
                                            }else{
                                                window.parent.location.href=data.result_json[4].shared_url+"&user_token="+user+"&pharmacy_id="+pharmacyId;
                                            }
                                        }
                                    });
                                }else{
                                    var title1 = $(this).children("span").text();
                                    localStorage.setItem("title",title1);
                                    localStorage.setItem("url","http://deve.ykd365.com/medstore/share/share_1804_1?actId=729&user_token="+user+"&pharmacy_id="+pharmacyId+"&type=category&typeId=1000035625");
                                    window.parent.location.href="promoinfo.html?title="+$(this).children("span").text();
                                }
                            }else if(type=="web2"){
                                var title = $(this).children("span").text();
                                localStorage.setItem("title",title);
                                var _url = $(this).attr("url");
                                if(_url.indexOf("navigationDirList")>=0){
                                    var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                                    var arrUrl = url.replace(/common/g,"wechart");
                                    //window.parent.location.href=arrUrl;
                                    localStorage.setItem("url",arrUrl);
                                    window.parent.location.href="promoinfo1.html?title="+$(this).children("span").text();
                                }else{
                                    var url = _url.replace(/deve.ykd365.com/g,'deve.ykd365.com');
                                    var arrUrl = url.replace(/common/g,"wechart");
                                    //window.parent.location.href=arrUrl;
                                    localStorage.setItem("url",arrUrl);
                                    window.parent.location.href="promoinfo.html?title="+$(this).children("span").text();
                                }
                            }
                        });
                    }
                    /*八个按钮板块 end*/
                    /*一元狂秒 start*/
                    var webUrl = {} ;
					if(data.result_json.activity_image_info){
						webUrl = data.result_json.activity_image_info;
					}
                    webUrl = data.result_json.activity_image_info;
                    console.log(webUrl);
                    var toWebUrl = '';
                    var tourl = '';
                    var title = '';
					if(webUrl.activity_image_arr){
						toWebUrl = webUrl.activity_image_arr[0].image_url;
						tourl = webUrl.activity_image_arr[0].image_go_web;
						title = webUrl.activity_image_arr[0].image_go_name;
					}
                    $(".nav").after("<img class='weburl' src='"+toWebUrl+"' style='width:6.4rem'>");
                    $(".weburl").bind("click",function(){
                        var arrUrls = tourl.replace(/(^.{33})/gm, 'wechart/');
                        if(user!=null){
                            var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token="+user+"&pharmacy_id="+pharmacyId;
                        }else{
                            var _arrUrls = "http://deve.ykd365.com/medstore/"+arrUrls+"&user_token=&pharmacy_id="+pharmacy_id;
                        }
                        localStorage.setItem("url",_arrUrls);
                        window.parent.location.href="promoinfo.html?title="+title;
                    });
                    /*一元狂秒 end*/
                    /*对应的药店信息板块 start*/
                    var sale = data.result_json.new_pharmacy_info;
                    var toUrl = sale.pharmacy_certificate_url;
                    var phone = data.result_json.new_pharmacy_info.pharmacy_phone;
                    var pharmacy_name = data.result_json.new_pharmacy_info.pharmacy_name;
                    localStorage.setItem("pharmacy_name",sale.pharmacy_name);
                    localStorage.setItem("pharmacy_add",sale.pharmacy_add);
                    localStorage.setItem("pharmacy_name",pharmacy_name);
                    localStorage.setItem("pharmacy_phone",phone);
                    if (sale != "" && sale != undefined) {
                        var pharmacyName = localStorage.getItem("pharmacy_name");
                        var pharmacyAdd = localStorage.getItem("pharmacy_add");
                        var oSale = "<ul><li>"+pharmacyName+"<br>"+pharmacyAdd+"</li></ul>";
                        $(".car_middle").append(oSale).click(function(){
                            if(toUrl=="http://imgstore.camore.cn/licensehtml/1630_drugstore_info.html"){
                                window.parent.location.href="1630_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1620_drugstore_info.html"){
                                window.parent.location.href="1620_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1610_drugstore_info.html"){
                                window.parent.location.href="1610_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1611_drugstore_info.html"){
                                window.parent.location.href="1611_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1612_drugstore_info.html"){
                                window.parent.location.href="1612_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1629_drugstore_info.html"){
                                window.parent.location.href="1629_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1622_drugstore_info.html"){
                                window.parent.location.href="1622_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1633_drugstore_info.html"){
                                window.parent.location.href="1633_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1627_drugstore_info.html"){
                                window.parent.location.href="1627_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1631_drugstore_info.html"){
                                window.parent.location.href="1631_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1623_drugstore_info.html"){
                                window.parent.location.href="1623_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1621_drugstore_info.html"){
                                window.parent.location.href="1621_drugstore_info.html";
                            }else if(toUrl=="http://imgstore.camore.cn/licensehtml/1632_drugstore_info.html"){
                                window.parent.location.href="1632_drugstore_info.html";
                            }
                        });
                        $(".car_right").bind("click",function(){
                            $(".pharmacy_phone",window.parent.document).show();
                            $(".pharmacy_phone .phone_middle span",window.parent.document).text(phone);
                        });
                        $(".pharmacy_phone .phone_bot .left",window.parent.document).click(function(){
                            window.parent.location.href="Tel:"+phone;
                            $(".pharmacy_phone",window.parent.document).hide();
                        });
                        var _height = $(".container .carousel .car_middle li").height();
                        var num1 = $(".container .carousel .car_middle li").length;
                        var number1 = 0;
                        setInterval(function () {
                            $(".car_middle").animate({
                                "marginTop": -_height * number1 + "px"
                            }, 1000);
                            number1++;
                            if (number1 == num1) {
                                number1 = 0;
                            }
                        }, 2000);
                    } else {
                        $(".carousel").remove();
                    }
                    /*对应的药店信息板块 end*/
                    /*九宫格板块 start*/
                    //var essence = data.result_json.new_essence_centre;
                    //var toArr = essence.group_item_arr;
                    //var $width = $(".container").width();
                    //console.log($width);
                    //var tr = "<tr class='class_tr'></tr>";
                    //var td = "<td class='class_td'></td>";
                    //if(toArr!=""){
                    //    $.each(toArr,function(index,value){
                    //        console.log(value);
                    //        if(value.group_background_image==undefined){
                    //            for(var i=0;i<value.h_count;i++){
                    //                $(".xttblog").append(tr);
                    //                $(".class_tr").hide();
                    //            }
                    //            for(var j=0;j<value.w_count;j++){
                    //                $(".class_tr").append(td);
                    //                $(".class_td").hide();
                    //            }
                    //            $.each(value.tr_arr,function(index1,value1){
                    //                console.log(value1);
                    //                for(var i=0;i<value1.td_arr.length;i++){
                    //                    console.log(value1.td_arr[i].width);
                    //                    var _width = $(window).width();
                    //                    $(".xttblog").append("<img title='"+value1.td_arr[i].value.sale_name+"' class='td_img' style='width:"+value1.td_arr[i].width/100*_width+"px;height:3rem;' src='"+value1.td_arr[i].value.img_url+"' url='"+value1.td_arr[i].value.sales_url+"'>").css("position","relative");
                    //                }
                    //            });
                    //        }else{
                    //            $(".xttblog").append("<img class='td_img1' src='"+value.group_background_image+"'>");
                    //            var oDiv = "<div class='div_bar' style='width:6.4rem;height:3.4rem;position:absolute;top:0;'>";
                    //            $.each(value.tr_arr,function(index1,value1){
                    //                console.log(value1);
                    //                for(var i=0;i<value1.td_arr.length;i++){
                    //                    console.log(value1.td_arr[i].width);
                    //                    var _width = $(window).width();
                    //                    oDiv += "<div title='"+value1.td_arr[i].value.sale_name+"' class='td_img' style='float:left;width:33.33%;height:3.4rem;' src='"+value1.td_arr[i].value.img_url+"' url='"+value1.td_arr[i].value.sales_url+"'></div>";
                    //                }
                    //            });
                    //            $(".td_img1").after(oDiv);
                    //        }
                    //    });
                    //    $(".td_img").bind("click",function(){
                    //        var title = $(this).attr("title");
                    //        localStorage.setItem("title",title);
                    //        var _url = $(this).attr("url");
                    //        var url = _url.replace(/deve.ykd365.com/g,"deve.ykd365.com");
                    //        var url1 = url.replace(/(^.{33})/gm, 'wechart/');
                    //        var arrUrl = "http://deve.ykd365.com/medstore/"+url1;
                    //        console.log(arrUrl);
                    //        localStorage.setItem("url",arrUrl);
                    //        window.parent.location.href="promoinfo.html?title="+title;
                    //    });
                    //}else{
                    //
                    //}
                    /*九宫格板块 end*/
                    /*品牌找药板块 start*/
                    var brand = data.result_json.brand_dic.brand_arr;
                    if(brand!="" && brand!=undefined){
                        var toBrand = "<ul>";
                        $.each(brand,function(index,value){
                            toBrand += "<li id='"+value.category_id+"' name='"+value.category_name+"'><img src='"+value.category_img+"'></li>";
                        });
                        $(".brand_content").append(toBrand);
                        $(".brand_header").click(function(){
                            window.parent.location.href="wenyao_index.html";
                        });
                        $(".brand_content ul li").bind("click",function(){
                            var query = $(this).attr("name");
                            window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                        });
                    }else{
                        $(".brand").remove();
                    }
                    /*品牌找药板块 end*/
                    /*对症找药板块 start*/
                    if ( data.result_json.symptom_dic != "" &&  data.result_json.symptom_dic != undefined) {
                        var sort = data.result_json.symptom_dic.symptom_arr;
                        for (i in sort) {
                            var sorts = "<div class='content'><div class='content_header'>" + sort[i].sort_name + "</div><div class='content_content'><ul>";
                            for (j in sort[i].sorts[0].categorys) {
                                sorts += "<li id='" + sort[i].sorts[0].categorys[j].category_id + "'><img src='" + sort[i].sorts[0].categorys[j].category_icon_url + "'><span>" + sort[i].sorts[0].categorys[j].category_name + "</span>";
                            }
                            $("._nav .nav_content").append(sorts);
                        }
                        $("._nav li").bind("click",function(){
                            var query=$(this).children("span").text();
                            window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                        });
                        $("#ho1").mCustomScrollbar({
                            axis: "x",
                            advanced: {autoExpandHorizontalScroll: true}
                        });
                        for (var i = 0; i < $(".content").length; i++) {
                            if ($(".content").eq(i).find("li").length > 8) {
                                $(".content").eq(i).find("li:gt(6)").remove();
                                $(".content").eq(i).children(".content_content").children().append("<li><span class='span1'>更多<img class='img1' src='images/sort_right.png'></span></li>");
                            }
                        }
                        $(".content_content .span1").bind("click",function(){
                            window.parent.location.href="rapid_drug.html";
                        });
                    } else {
                        $("._nav").remove();
                    }
                    /*对症找药板块 end*/
                    /*专场板块*/
                    var sales = data.result_json.new_sale_info.sale_list;
                    if(sales.drug_sales_list_arr!="" && sales.drug_sales_list_arr!="undefined"){
                        $.each(sales,function(index,value){
                            for(var i=0;i<value.length;i++){
                                var div = "<div class='madegame'><ul class='clearfix ho'>";
                                $(".made_top img").eq(i).attr("src",value[i].drug_hot_url);
                                $(".made_top").eq(i).attr("drug_hot_name",value[i].drug_hot_name);
                                if(value[i].drug_hot_arr!=[]){
                                    for(var j=0;j<value[i].drug_hot_arr.length;j++){
                                        div += "<li drug_id='"+value[i].drug_hot_arr[j].drug_id+"'><img src='"+value[i].drug_hot_arr[j].pic_path+"'><br><span>"+value[i].drug_hot_arr[j].show_name+"<br><p>￥"+(value[i].drug_hot_arr[j].price / 100).toFixed(2)+"</p></span></li>";
                                    }
                                }
                                $(".made_top").eq(i).after(div);
                                div = "<div class='madegame'><ul class='clearfix ho'>";
                                $.mCustomScrollbar.defaults.theme="light-2";
                                $(".ho").mCustomScrollbar({
                                    axis:"x",
                                    advanced:{autoExpandHorizontalScroll:true}
                                });
                            }
                        });
                    }else{
                        $(".made").remove();
                    }
                    $(".made .made_top").bind("click",function(){
                        var query=$(this).attr("drug_hot_name");
                        window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                    });
                    $(".made .madegame li").bind("click",function(){
                        var drug_id=$(this).attr("drug_id");
                        window.parent.location.href="1_commodity_details.html?drug_id="+drug_id;
                    });
                    /*专场板块 end*/
                    /*商品列表板块 start*/
                    var drug_hot = data.result_json.new_sale_info.hot_list;
                    if (drug_hot!=undefined) {
                        $.each(drug_hot, function (index, value) {
                            for (var i = 0; i < value.length; i++) {
                                $(".list_header").eq(i).find(".header_left").children().append(value[i].drug_hot_name);
                                $(".list_header").eq(i).find(".header_left").css("background", value[i].drug_hot_color);
                            }
                        });
                        var drug_hot1 = data.result_json.new_sale_info.hot_list.drug_sales_list_arr;
                        var drug = "<ul>";
                        var drug1 = "<ul>";
                        var drug2 = "<ul>";
                        var drug3 = "<ul>";
                        var drug4 = "<ul>";
                        for (var i = 0; i < drug_hot1[0].drug_hot_arr.length; i++) {
                            drug += "<li drug_id='"+drug_hot1[0].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[0].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[0].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[0].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                        }
                        $(".list_content").prepend(drug);
                        for (var i = 0; i < drug_hot1[1].drug_hot_arr.length; i++) {
                            if (drug_hot1[1].drug_hot_arr.length > 3) {
                                drug_hot1[1].drug_hot_arr.length = 3;
                                drug1 += "<li drug_id='"+drug_hot1[1].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[1].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[1].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[1].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                            } else {
                                drug1 += "<li drug_id='"+drug_hot1[1].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[1].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[1].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[1].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                            }
                        }
                        $(".list_content1").prepend(drug1);
                        for (var i = 0; i < drug_hot1[2].drug_hot_arr.length; i++) {
                            drug2 += "<li drug_id='"+drug_hot1[2].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[2].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[2].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[2].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                        }
                        $(".list_content2").prepend(drug2);
                        for (var i = 0; i < drug_hot1[3].drug_hot_arr.length; i++) {
                            drug3 += "<li drug_id='"+drug_hot1[3].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[3].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[3].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[3].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                        }
                        $(".list_content3").prepend(drug3);
                        if(drug_hot1[4].drug_hot_arr!="undefined"){
                            for (var i = 0; i < drug_hot1[4].drug_hot_arr.length; i++) {
                                drug4 += "<li drug_id='"+drug_hot1[4].drug_hot_arr[i].drug_id+"'><img src='" + drug_hot1[4].drug_hot_arr[i].pic_path + "'><br><span class='span1'>" + drug_hot1[4].drug_hot_arr[i].show_name + "<br><p>￥" + (drug_hot1[4].drug_hot_arr[i].price / 100).toFixed(2) + "</p></span></li>";
                            }
                            $(".list_content4").prepend(drug4);
                        }else{
                            $(".list_content4").parent(".list").hide();
                        }
                        $(".list .header_right").bind("click",function(){
                            var query=$(this).prev().children().text();
                            window.parent.location.href="1_commodity_list.html?category=search&query="+query;
                        });
                        $(".list div ul li").bind("click",function(){
                            var drug_id=$(this).attr("drug_id");
                            window.parent.location.href="1_commodity_details.html?drug_id="+drug_id;
                        });
                    } else {
                        $(".container .list").remove();
                    }
                    /*商品列表板块 end*/
                }else if(data.result_code==102){
                    $("body").css("background","#fff");
                    $(".container").html("").append("<img class='bg' src='images/bg.png'>");
                    $(".bg").bind("click",function(){
                        window.parent.location.href="1_location_page.html";
                    });
                }
            }
        })
    }
});