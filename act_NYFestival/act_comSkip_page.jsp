<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	 <meta charset="UTF-8">
	 <title></title>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <meta content="telephone=no" name="format-detection" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <style>
    html,body{
    width:100%;height:100%;}
    </style>
     <script>
    function is_weixin(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    };
    function getUrlEle(){
	 var urldec=location.href.split("?")[1].split("&"); 
	 var urlQuery={};
	  var a,b;
	 for(var i=0,j=urldec.length;i<j;i++){
	 	 a=urldec[i].split("=")[0];
	 	 b=urldec[i].split("=")[1];
	 	 console.log(a.split("%EF%BC%9D"))
	 	  if(b==undefined ){
	 		 a=urldec[i].split("=")[0].split("%EF%BC%9D")[0];
	 		 b=urldec[i].split("=")[0].split("%EF%BC%9D")[1];
	 	 }; 
	 		 urlQuery[a]=b;
	 }; 
	 return urlQuery;
 };
    //var locaAddr=location.href.split("?")[1].split("&")[0].split("=")[1];
    var locaAddr="${method }";
    if(is_weixin()){
    	location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxade8c5e473c645e9&redirect_uri=http%3a%2f%2fstore.ykd365.com%2fmedhtml%2fcommon%2f'+locaAddr+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
    	//location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx697be0ec43c8cafa&redirect_uri=http%3a%2f%2fdeve.ykd365.com%2fmedhtml%2fcommon%2f'+locaAddr+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
    }else{
//  	var loca = location.href.split('?')[1] || '' ;
    	locaAddr = locaAddr + '?' + token=getUrlEle().user_token&version=token=getUrlEle().version_code;
    	location.href='http://store.ykd365.com/medhtml/common/'+locaAddr;
    	//location.href='http://deve.ykd365.com/medhtml/common/'+locaAddr;
    }; 
  
    </script>
</head>
<body>

</body>
</html>