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
    var app_version = 262;
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
    //当前没有定位到药店 获取 定位地点
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
                
                //TODO  首页 定位栏 地址填充  （没有新建地址或者默认地址情况下），
                //新建地址时  地址为空 显示此地址，否则显示 新建地址或者默认地址
                
                //TODO  骑手在途，5.28接口  有就显示，并且半分钟或者一分钟刷新一次
                //（一进页面就创建个定时器，请求接口的时候还会创建，并且创建的时候都把之前的清掉）
                }
            });
            var pos_index = r.point.lng+","+ r.point.lat;
            
            var message_name = "default_address";//看接口文档 9.5（获取药店id 地区id）
            var pharmacy_id = "";//
            var str = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
            var toStr=md5(str+key);
            $.ajax({
                type:"POST",
                contentType:"application/json;charset=utf-8",
                url:"http://' + location.host + '/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toStr,
                dataType:"json",
                success:function(data){
                    localStorage.setItem("area_id",data.result_json.area_id);
                    localStorage.setItem("pharmacy_id",data.result_json.pharmacy_id);
                    //首页接口
                    //TODO 药店不在配送范围内 加判断提示（当前没有药店在配送范围内）
                    var pharmacy_id = "1620";
                    var message_name = "first_page_new";
                    var str1 = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
                    var toStr=md5(str1+key);
                    $.ajax({
                        type:"POST",
                        contentType:"application/json;charset=utf-8",
                        url:"http://' + location.host + '/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toStr,
                        dataType:"json",
                        success:function(data){
                            if(data.result_code==100){
                                /*按钮和焦点图板块 start*/
                                var home_button = data.result_json.home_button;
                                if(home_button!="" && home_button!=undefined){
                                    var banner_button = "<div class='banner_button' style='background:url("+home_button.home_button_image+") no-repeat;background-size:cover;'><ul>";
                                    $.each(home_button.home_button_arr,function(index,value){
                                        console.log(value);
                                        if(value.home_button_web!="" && value.home_button_web!="undefined"){
                                            banner_button += "<li url='"+value.home_button_web+"' type='"+value.home_button_type+"'><div class='li_img'><img src='"+value.home_button_image+"' alt=''></div><div class='li_title'><span>"+value.home_button_title+"</span></div></li>";
                                        }else{
                                            banner_button += "<li type='"+value.home_button_type+"'><div class='li_img'><img src='"+value.home_button_image+"' alt=''></div><div class='li_title'><span>"+value.home_button_title+"</span></div></li>";
                                        }
                                    });
                                }
                                $(".banner").append(banner_button);
                                $(".banner_button ul li").bind("click",function(){
                                    var _type = $(this).attr("type");
                                    if(_type=="dir"){
                                        window.location.href="souyao_index.html";
                                    }else if(_type=="bz"){
                                        window.location.href="rapid_drug.html";
                                    }else if(_type=="web2"){
                                        var _url = $(this).attr("url");
                                        window.location.href=_url;
                                    }else if(_type=="web"){
                                        window.location.href="yaoqing.html";
                                    }
                                });
                                var banner = data.result_json.banner_link_list;
                                if(banner!="" && banner!=undefined){
                                    var point = "<div class='point'>";
                                    for(var i=0;i<banner.first_advertisement_arr.length;i++){
                                        point += "<a></a>";
                                    }
                                    $(".img_gallery").append(point);
                                    var marginLeft = $(".container .banner .point").width()/2;
                                    $(".container .banner .point").css("margin-left",-marginLeft);
                                    $(".img_gallery .point a:first-child").addClass("on");
                                    var main_img = "<div class='main_img'><ul>"
                                    $.each(banner.first_advertisement_arr,function(index,value){
                                        main_img += "<li advertisement_name='"+value.advertisement_name+"' advertisement_type='"+value.advertisement_type+"' advertisement_id='"+value.advertisement_id+"' advertisement_url='"+value.advertisement_url+"'><img src='"+value.advertisement_img+"' alt=''></li>";
                                    });
                                    $(".img_gallery").append(main_img);
                                    $(".main_img").append("<a id='btn_prev'></a><a id='btn_next'></a>");
                                    $(".main_img ul li").bind("click",function(){
                                        var url = $(this).attr("advertisement_url");
                                        if(url.indexOf("robot-html")>=0){
                                            var urls = url;
                                            var to_urls = urls;
                                            window.location.href=to_urls;
                                        }else{
                                            var _url = url.replace(/(^.{32})/gm, 'wechart/');
                                            var to_url = "http://' + location.host + '/medstore/"+_url;
                                            window.location.href=to_url;
                                        }
                                    });
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
                                    }).bind("touchend",function(){
                                        timer = setInterval(function(){
                                            $("#btn_next").click();
                                        },2000)
                                    });
                                }
                                /*按钮和焦点图板块 end*/
                                /*药店信息板块 start*/
                                var pharmacy_info = data.result_json.pharmacy_info;
                                if(pharmacy_info!="" && pharmacy_info!=undefined){
                                    var message_img = "<div class='message_img'><img src='"+pharmacy_info.pharmacy_logo_img+"'></div>";
                                    $(".pharmacy_message").append(message_img);
                                    var message_title = "<div class='message_title'><div class='title_top'><span>"+pharmacy_info.pharmacy_name+"</span></div><div class='title_bottom'><span>"+pharmacy_info.pharmacy_add+"</span></div></div>";
                                    $(".pharmacy_message").append(message_title);
                                }
                                /*药店信息板块 end*/
                                /*九宫格板块 start*/
                                var essence_centre = data.result_json.essence_centre;
                                console.log(essence_centre);
                                var width = $(".activity").width();
                                var activity = "";
                                console.log(width);
                                if(essence_centre!="" && essence_centre!=undefined){
                                    $.each(essence_centre.group_item_arr,function(index,value){
                                        console.log(value.tr_arr);
                                        for(var i=0;i<value.h_count;i++){
                                            var li = "";
                                            console.log(value.tr_arr[i].aspectRadio);
                                            var _height = width/(value.tr_arr[i].aspectRadio/100);
                                            console.log(_height);
                                            $(".activity").append("<ul style='width:position:absolute;top:0;z-index:9998;height:"+_height+"px;'></ul>");
                                            for(var j=0;j<value.tr_arr[i].td_arr.length;j++){
                                                console.log(value.tr_arr[i].td_arr[j].value.link_type);
                                                li += "<li sales_url='"+value.tr_arr[i].td_arr[j].value.sales_url+"' link_type='"+value.tr_arr[i].td_arr[j].value.link_type+"' width='"+value.tr_arr[i].td_arr[j].width+"' colspan='"+value.tr_arr[i].td_arr[j].colspan+"' rowspan='"+value.tr_arr[i].td_arr[j].rowspan+"'></li>";
                                            }
                                            $(".activity ul").eq(i).append(li);
                                        }
                                        if(value.group_background_image!="" && value.group_background_image!=undefined){
                                            activity += "<img src='"+value.group_background_image+"' style='position:absolute;top:0;left:0;z-index:9997;width:6rem;'>";
                                            $(".activity").append(activity);
                                        }else{
                                            for(var i=0;i<value.tr_arr.length;i++){
                                                console.log(value.tr_arr[i].td_arr);
                                                for(var j=0;j<value.tr_arr[i].td_arr.length;j++){
                                                    activity = "<img style='float:left;width:100%;height:100%;' src='"+value.tr_arr[i].td_arr[j].value.img_url+"'>";
                                                    console.log(value.tr_arr[i].td_arr[j].value.img_url);
                                                    $(".activity ul").eq(i).children("li").eq(j).append(activity);
                                                }
                                            }
                                        }
                                    });
                                    for(var i=0;i<$(".activity ul").length;i++){
                                        for(var j=0;j<$(".activity ul").eq(i).children().length;j++){
                                            var _width = $(".activity ul").eq(i).children("li").eq(j).attr("width");
                                            var row = $(".activity ul").eq(i).children("li").eq(j).attr("rowspan");
                                            var height = $(".activity ul").eq(i).height();
                                            $(".activity ul").eq(i).children("li").eq(j).css({"width":(_width/100)*width,"height":height*row});
                                        }
                                    }
                                }
                                /*九宫格板块 end*/
                            }
                        }
                    })
                }
            })
        })
    }else if(pharmacyId!=null && pos!=null && user!=null){
        var message_name = "first_page_new";
        var pharmacy_id = "1620";
        var pos_index = pos;
        var str = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
        var toStr=md5(str+key);
        $.ajax({
            type:"POST",
            contentType:"application/json;charset=utf-8",
            url:"http://' + location.host + '/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toStr,
            dataType:"json",
            success:function(data){
                console.log(data);
                if(data.result_code==100){
                    /*按钮和焦点图板块 start*/
                    var home_button = data.result_json.home_button;
                    if(home_button!="" && home_button!=undefined){
                        var banner_button = "<div class='banner_button' style='background:url("+home_button.home_button_image+") no-repeat;background-size:cover;'><ul>";
                        $.each(home_button.home_button_arr,function(index,value){
                            if(value.home_button_web!="" && value.home_button_web!="undefined"){
                                banner_button += "<li url='"+value.home_button_web+"' type='"+value.home_button_type+"'><div class='li_img'><img src='"+value.home_button_image+"' alt=''></div><div class='li_title'><span>"+value.home_button_title+"</span></div></li>";
                            }else{
                                banner_button += "<li type='"+value.home_button_type+"'><div class='li_img'><img src='"+value.home_button_image+"' alt=''></div><div class='li_title'><span>"+value.home_button_title+"</span></div></li>";
                            }
                        });
                    }
                    $(".banner").append(banner_button);
                    $(".banner_button ul li").bind("click",function(){
                        var _type = $(this).attr("type");
                        if(_type=="dir"){
                            window.location.href="souyao_index.html";
                        }else if(_type=="bz"){
                            window.location.href="rapid_drug.html";
                        }else if(_type=="chat"){
                            var _url = "http://' + location.host + '/robot-html/index.html";
                            window.location.href=_url;
                        }else if(_type=="web"){
                            window.location.href="yaoqing.html";
                        }
                    });
                    var banner = data.result_json.banner_link_list;
                    if(banner!="" && banner!=undefined){
                        var point = "<div class='point'>";
                        for(var i=0;i<banner.first_advertisement_arr.length;i++){
                            point += "<a></a>";
                        }
                        $(".img_gallery").append(point);
                        var marginLeft = $(".container .banner .point").width()/2;
                        $(".container .banner .point").css("margin-left",-marginLeft);
                        $(".img_gallery .point a:first-child").addClass("on");
                        var main_img = "<div class='main_img'><ul>"
                        $.each(banner.first_advertisement_arr,function(index,value){
                            main_img += "<li advertisement_name='"+value.advertisement_name+"' advertisement_type='"+value.advertisement_type+"' advertisement_id='"+value.advertisement_id+"' advertisement_url='"+value.advertisement_url+"'><img src='"+value.advertisement_img+"' alt=''></li>";
                        });
                        $(".img_gallery").append(main_img);
                        $(".main_img").append("<a id='btn_prev'></a><a id='btn_next'></a>");
                        $(".main_img ul li").bind("click",function(){
                            var url = $(this).attr("advertisement_url");
                            if(url.indexOf("robot-html")>=0){
                                var urls = url;
                                var to_urls = urls;
                                window.location.href=to_urls;
                            }else{
                                var _url = url.replace(/(^.{32})/gm, 'wechart/');
                                var to_url = "http://' + location.host + '/medstore/"+_url;
                                window.location.href=to_url;
                            }
                        });
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
                        }).bind("touchend",function(){
                            timer = setInterval(function(){
                                $("#btn_next").click();
                            },2000)
                        });
                    }
                    /*按钮和焦点图板块 end*/
                    /*药店信息板块 start*/
                    var pharmacy_info = data.result_json.pharmacy_info;
                    if(pharmacy_info!="" && pharmacy_info!=undefined){
                        var message_img = "<div class='message_img'><img src='"+pharmacy_info.pharmacy_logo_img+"'></div>";
                        $(".pharmacy_message").append(message_img);
                        var message_title = "<div class='message_title'><div class='title_top'><span>"+pharmacy_info.pharmacy_name+"</span></div><div class='title_bottom'><span>"+pharmacy_info.pharmacy_add+"</span></div></div>";
                        $(".pharmacy_message").append(message_title);
                    }
                    /*药店信息板块 end*/
                    /*九宫格板块 start*/
                    var essence_centre = data.result_json.essence_centre;
                    var width = $(".activity").width();
                    var activity = "";
                    if(essence_centre!="" && essence_centre!=undefined){
                        $.each(essence_centre.group_item_arr,function(index,value){
                            for(var i=0;i<value.h_count;i++){
                                var _height = width/(value.tr_arr[i].aspectRadio/100);
                                var li = "";
                                var time = "<div class='timeFix'>";
                                $(".activity").append("<ul style='position:relative;z-index:9997;height:"+_height+"px;'></ul>");
                                for(var j=0;j<value.tr_arr[i].td_arr.length;j++){
                                    if(value.tr_arr[i].td_arr[j].value.value_time!="" && value.tr_arr[i].td_arr[j].value.value_time!=undefined){
                                        var colspan = value.tr_arr[i].td_arr[j].colspan;
                                        var rowspan = value.tr_arr[i].td_arr[j].rowspan;
                                        var time_title = value.tr_arr[i].td_arr[j].value.value_title;
                                        var str = value.tr_arr[i].td_arr[j].value.value_time;
                                        var reg=/-/g;
                                        str = str.replace(reg,"/");
                                        li += "<li sales_url='"+value.tr_arr[i].td_arr[j].value.sales_url+"' link_type='"+value.tr_arr[i].td_arr[j].value.link_type+"' width='"+value.tr_arr[i].td_arr[j].width+"' colspan='"+value.tr_arr[i].td_arr[j].colspan+"' rowspan='"+value.tr_arr[i].td_arr[j].rowspan+"'></li><div class='time'><div class='time_title'><span>"+time_title+"</span></div><div class='timeFix'><div class='daojishi' id='"+str+"'></div>";
                                    }else{
                                        li += "<li sales_url='"+value.tr_arr[i].td_arr[j].value.sales_url+"' link_type='"+value.tr_arr[i].td_arr[j].value.link_type+"' width='"+value.tr_arr[i].td_arr[j].width+"' colspan='"+value.tr_arr[i].td_arr[j].colspan+"' rowspan='"+value.tr_arr[i].td_arr[j].rowspan+"'></li>";
                                    }
                                }
                                $(".time").attr({"col":colspan,"row":rowspan});
                                $(".activity ul").eq(i).append(li);
                                var top = $(".time").attr("col");
                                var left = $(".time").attr("row");

                            }
                            var height = 0;
                            for(var i=0;i<$(".activity ul").length;i++){
                                height += $(".activity ul").eq(i).height();
                            }
                            $(".activity").css("height",height);
                            if(value.group_background_image!="" && value.group_background_image!=undefined){
                                activity += "<img src='"+value.group_background_image+"' style='position:absolute;top:0;left:0;z-index:9996;width:6rem;'>";
                                $(".activity").append(activity);
                            }else{
                                for(var i=0;i<value.tr_arr.length;i++){
                                    for(var j=0;j<value.tr_arr[i].td_arr.length;j++){
                                        activity = "<img style='float:left;width:100%;height:100%;' src='"+value.tr_arr[i].td_arr[j].value.img_url+"'>";
                                        console.log(value.tr_arr[i].td_arr[j].value.img_url);
                                        $(".activity ul").eq(i).children("li").eq(j).append(activity);
                                    }
                                }
                            }
                        });
                        for(var i=0;i<$(".activity ul").length;i++){
                            for(var j=0;j<$(".activity ul").eq(i).children().length;j++){
                                var _width = $(".activity ul").eq(i).children("li").eq(j).attr("width");
                                var row = $(".activity ul").eq(i).children("li").eq(j).attr("rowspan");
                                var height = $(".activity ul").eq(i).height();
                                $(".activity ul").eq(i).children("li").eq(j).css({"width":(_width/100)*width,"height":height*row});
                            }
                        }
                        $(".activity ul li").bind("click",function(){
                            var url = $(this).attr("sales_url");
                            var _url = url.replace(/(^.{32})/gm, 'wechart/');
                            var to_url = "http://' + location.host + '/medstore/"+_url;
                            window.location.href=to_url;
                        });
                    }
                    /*九宫格板块 end*/
                    /*品牌墙 start*/
                    var brand_dic = data.result_json.brand_dic;
                    var brand_content = "<div class='brand_content'><ul>";
                    $(".brand").prepend("<div class='brand_header'><img src='"+brand_dic.brand_top_url+"' alt=''></div>");
                    $.each(brand_dic.brand_arr,function(index,value){
                        console.log(value);
                        brand_content+="<li category_url='"+value.category_url+"' category_type='"+value.category_type+"' category_id='"+value.category_id+"' category_name='"+value.category_name+"' category_title='"+value.category_title+"'><img class='img' src='"+value.category_img+"' alt=''></li>";
                    });
                    $(".brand").append(brand_content);
                    $(".img").load(function(){
                        for(var x=0;x<$(".brand_content ul li").length;x++){
                            console.log(x);
                            var _height = $(".brand_content ul li").eq(x).children(".img").height();
                            console.log(_height);
                            $(".brand_content ul li").eq(x).children(".img").css("margin-top",-_height/2);
                        }
                    });
                    $(".brand ul").append("<li><div class='li_top'><span>"+brand_dic.brand_count+"+</span></div><div class='li_bottom'><div class='bottom_title'><span>更多品牌</span></div><div class='bottom_img'><img src='images/sort_right.png'></div></div></li>");
                    /*品牌墙 end*/
                }
            }
        })
    }else if(pharmacyId==null && user!=null && pos!=null || pharmacyId==null && user==null && pos!=null){
        var pos_index = localStorage.getItem("pos_index");
        var message_name = "default_address";
        var pharmacy_id = "";
        var user_token = "";
        var str1 = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
        var toStr1=md5(str1+key);
        $.ajax({
            type:"POST",
            contentType:"application/json;charset=utf-8",
            url:"http://' + location.host + '/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toStr1,
            dataType:"json",
            success:function(data) {
                localStorage.setItem("area_id", data.result_json.area_id);
                localStorage.setItem("pharmacy_id", data.result_json.pharmacy_id);
                var pharmacy_id = data.result_json.pharmacy_id;
                var message_name = "first_page_new";
                var user_token = user;
                var str1 = app_version + app_system + app_model + os_version + device_id + pos_index + pos_time + ispos + user_token + pos_mode + request_num + message_name + pharmacy_id;
                var toStr = md5(str1 + key);
                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    url: "http://' + location.host + '/medstore/appReq?app_version=" + app_version + "&app_system=" + app_system + "&app_model=" + app_model + "&os_version=" + os_version + "&device_id=" + device_id + "&pos_index=" + pos_index + "&pos_time=" + pos_time + "&ispos=" + ispos + "&user_token=" + user_token + "&pos_mode=" + pos_mode + "&request_num=" + request_num + "&message_name=" + message_name + "&pharmacy_id=" + pharmacy_id + "&wirelesscode=" + toStr,
                    dataType: "json",
                    success: function (result) {

                    }
                })
            }
        })
    }else if(pharmacyId!=null && pos!=null && user==null){
        var message_name = "first_page_new";
        var pharmacy_id = "1620";
        var pos_index = pos;
        var str = app_version+app_system+app_model+os_version+device_id+pos_index+pos_time+ispos+user_token+pos_mode+request_num+message_name+pharmacy_id;
        var toStr=md5(str+key);
        $.ajax({
            type:"POST",
            contentType:"application/json;charset=utf-8",
            url:"http://' + location.host + '/medstore/appReq?app_version="+app_version+"&app_system="+app_system+"&app_model="+app_model+"&os_version="+os_version+"&device_id="+device_id+"&pos_index="+pos_index+"&pos_time="+pos_time+"&ispos="+ispos+"&user_token="+user_token+"&pos_mode="+pos_mode+"&request_num="+request_num+"&message_name="+message_name+"&pharmacy_id="+pharmacy_id+"&wirelesscode="+toStr,
            dataType:"json",
            success:function(data){
                if(data.result_code==100){
                    /*按钮和焦点图板块 start*/
                    var home_button = data.result_json.home_button;
                    if(home_button!="" && home_button!=undefined){
                        var banner_button = "<div class='banner_button' style='background:url("+home_button.home_button_image+") no-repeat;background-size:cover;'><ul>";
                        $.each(home_button.home_button_arr,function(index,value){
                            if(value.home_button_web!="" && value.home_button_web!="undefined"){
                                banner_button += "<li url='"+value.home_button_web+"' type='"+value.home_button_type+"'><div class='li_img'><img src='"+value.home_button_image+"' alt=''></div><div class='li_title'><span>"+value.home_button_title+"</span></div></li>";
                            }else{
                                banner_button += "<li type='"+value.home_button_type+"'><div class='li_img'><img src='"+value.home_button_image+"' alt=''></div><div class='li_title'><span>"+value.home_button_title+"</span></div></li>";
                            }
                        });
                    }
                    $(".banner").append(banner_button);
                    $(".banner_button ul li").bind("click",function(){
                        var _type = $(this).attr("type");
                        if(_type=="dir"){
                            window.location.href="souyao_index.html";
                        }else if(_type=="bz"){
                            window.location.href="rapid_drug.html";
                        }else if(_type=="chat"){
                            var _url = "http://' + location.host + '/robot-html/index.html";
                            window.location.href=_url;
                        }else if(_type=="web"){
                            window.location.href="yaoqing.html";
                        }
                    });
                    var banner = data.result_json.banner_link_list;
                    if(banner!="" && banner!=undefined){
                        var point = "<div class='point'>";
                        for(var i=0;i<banner.first_advertisement_arr.length;i++){
                            point += "<a></a>";
                        }
                        $(".img_gallery").append(point);
                        var marginLeft = $(".container .banner .point").width()/2;
                        $(".container .banner .point").css("margin-left",-marginLeft);
                        $(".img_gallery .point a:first-child").addClass("on");
                        var main_img = "<div class='main_img'><ul>"
                        $.each(banner.first_advertisement_arr,function(index,value){
                            main_img += "<li advertisement_name='"+value.advertisement_name+"' advertisement_type='"+value.advertisement_type+"' advertisement_id='"+value.advertisement_id+"' advertisement_url='"+value.advertisement_url+"'><img src='"+value.advertisement_img+"' alt=''></li>";
                        });
                        $(".img_gallery").append(main_img);
                        $(".main_img").append("<a id='btn_prev'></a><a id='btn_next'></a>");
                        $(".main_img ul li").bind("click",function(){
                            var url = $(this).attr("advertisement_url");
                            if(url.indexOf("robot-html")>=0){
                                var urls = url;
                                var to_urls = urls;
                                window.location.href=to_urls;
                            }else{
                                var _url = url.replace(/(^.{32})/gm, 'wechart/');
                                var to_url = "http://' + location.host + '/medstore/"+_url;
                                window.location.href=to_url;
                            }
                        });
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
                        }).bind("touchend",function(){
                            timer = setInterval(function(){
                                $("#btn_next").click();
                            },2000)
                        });
                    }
                    /*按钮和焦点图板块 end*/
                    /*药店信息板块 start*/
                    var pharmacy_info = data.result_json.pharmacy_info;
                    if(pharmacy_info!="" && pharmacy_info!=undefined){
                        var message_img = "<div class='message_img'><img src='"+pharmacy_info.pharmacy_logo_img+"'></div>";
                        $(".pharmacy_message").append(message_img);
                        var message_title = "<div class='message_title'><div class='title_top'><span>"+pharmacy_info.pharmacy_name+"</span></div><div class='title_bottom'><span>"+pharmacy_info.pharmacy_add+"</span></div></div>";
                        $(".pharmacy_message").append(message_title);
                    }
                    /*药店信息板块 end*/
                    /*九宫格板块 start*/
                    var essence_centre = data.result_json.essence_centre;
                    var width = $(".activity").width();
                    var activity = "";
                    if(essence_centre!="" && essence_centre!=undefined){
                        $.each(essence_centre.group_item_arr,function(index,value){
                            for(var i=0;i<value.h_count;i++){
                                var _height = width/(value.tr_arr[i].aspectRadio/100);
                                var li = "";
                                var time = "<div class='timeFix'>";
                                $(".activity").append("<ul style='position:relative;z-index:9997;height:"+_height+"px;'></ul>");
                                for(var j=0;j<value.tr_arr[i].td_arr.length;j++){
                                    if(value.tr_arr[i].td_arr[j].value.value_time!="" && value.tr_arr[i].td_arr[j].value.value_time!=undefined){
                                        var colspan = value.tr_arr[i].td_arr[j].colspan;
                                        var rowspan = value.tr_arr[i].td_arr[j].rowspan;
                                        var time_title = value.tr_arr[i].td_arr[j].value.value_title;
                                        var str = value.tr_arr[i].td_arr[j].value.value_time;
                                        var reg=/-/g;
                                        str = str.replace(reg,"/");
                                        li += "<li sales_url='"+value.tr_arr[i].td_arr[j].value.sales_url+"' link_type='"+value.tr_arr[i].td_arr[j].value.link_type+"' width='"+value.tr_arr[i].td_arr[j].width+"' colspan='"+value.tr_arr[i].td_arr[j].colspan+"' rowspan='"+value.tr_arr[i].td_arr[j].rowspan+"'></li><div class='time'><div class='time_title'><span>"+time_title+"</span></div><div class='timeFix'><div class='daojishi' id='"+str+"'></div>";
                                    }else{
                                        li += "<li sales_url='"+value.tr_arr[i].td_arr[j].value.sales_url+"' link_type='"+value.tr_arr[i].td_arr[j].value.link_type+"' width='"+value.tr_arr[i].td_arr[j].width+"' colspan='"+value.tr_arr[i].td_arr[j].colspan+"' rowspan='"+value.tr_arr[i].td_arr[j].rowspan+"'></li>";
                                    }
                                }
                                $(".time").attr({"col":colspan,"row":rowspan});
                                $(".activity ul").eq(i).append(li);
                                var top = $(".time").attr("col");
                                var left = $(".time").attr("row");

                            }
                            var height = 0;
                            for(var i=0;i<$(".activity ul").length;i++){
                                height += $(".activity ul").eq(i).height();
                            }
                            $(".activity").css("height",height);
                            if(value.group_background_image!="" && value.group_background_image!=undefined){
                                activity += "<img src='"+value.group_background_image+"' style='position:absolute;top:0;left:0;z-index:9996;width:6rem;'>";
                                $(".activity").append(activity);
                            }else{
                                for(var i=0;i<value.tr_arr.length;i++){
                                    for(var j=0;j<value.tr_arr[i].td_arr.length;j++){
                                        activity = "<img style='float:left;width:100%;height:100%;' src='"+value.tr_arr[i].td_arr[j].value.img_url+"'>";
                                        console.log(value.tr_arr[i].td_arr[j].value.img_url);
                                        $(".activity ul").eq(i).children("li").eq(j).append(activity);
                                    }
                                }
                            }
                        });
                        for(var i=0;i<$(".activity ul").length;i++){
                            for(var j=0;j<$(".activity ul").eq(i).children().length;j++){
                                var _width = $(".activity ul").eq(i).children("li").eq(j).attr("width");
                                var row = $(".activity ul").eq(i).children("li").eq(j).attr("rowspan");
                                var height = $(".activity ul").eq(i).height();
                                $(".activity ul").eq(i).children("li").eq(j).css({"width":(_width/100)*width,"height":height*row});
                            }
                        }
                        $(".activity ul li").bind("click",function(){
                            var url = $(this).attr("sales_url");
                            var _url = url.replace(/(^.{32})/gm, 'wechart/');
                            var to_url = "http://' + location.host + '/medstore/"+_url;
                            window.location.href=to_url;
                        });
                    }
                    /*九宫格板块 end*/
                    /*品牌墙 start*/
                    var brand_dic = data.result_json.brand_dic;
                    var brand_content = "<div class='brand_content'><ul>";
                    $(".brand").prepend("<div class='brand_header'><img src='"+brand_dic.brand_top_url+"' alt=''></div>");
                    $.each(brand_dic.brand_arr,function(index,value){
                        console.log(value);
                        brand_content+="<li category_url='"+value.category_url+"' category_type='"+value.category_type+"' category_id='"+value.category_id+"' category_name='"+value.category_name+"' category_title='"+value.category_title+"'><img class='img' src='"+value.category_img+"' alt=''></li>";
                    });
                    $(".brand").append(brand_content);
                    $(".img").load(function(){
                        for(var x=0;x<$(".brand_content ul li").length;x++){
                            console.log(x);
                            var _height = $(".brand_content ul li").eq(x).children(".img").height();
                            console.log(_height);
                            $(".brand_content ul li").eq(x).children(".img").css("margin-top",-_height/2);
                        }
                    });
                    $(".brand ul").append("<li><div class='li_top'><span>"+brand_dic.brand_count+"+</span></div><div class='li_bottom'><div class='bottom_title'><span>更多品牌</span></div><div class='bottom_img'><img src='images/sort_right.png'></div></div></li>");
                    /*品牌墙 end*/
                }
            }
        })
    }
});