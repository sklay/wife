<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title></title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<meta content="telephone=no" name="format-detection" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<style>
html, body {
	width: 100%;
	height: 100%;
}
</style>
<script>
	function is_weixin() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	};
	function getUrlEle() {
		var urldec = location.href.split("?")[1].split("&");
		var urlQuery = {};
		var a, b;
		for (var i = 0, j = urldec.length; i < j; i++) {
			a = urldec[i].split("=")[0];
			b = urldec[i].split("=")[1];
			c = urldec[i].split("=")[2];
			console.log(a.split("%EF%BC%9D"))
			if (b == undefined) {
				a = urldec[i].split("=")[0].split("%EF%BC%9D")[0];
				b = urldec[i].split("=")[0].split("%EF%BC%9D")[1];
				c = urldec[i].split("=")[0].split("%EF%BC%9D")[2];
			};
			urlQuery[a] = b;
		};
		return urlQuery;
	};
	//var resultValue = getUrlEle().resultValue || '';
	/** 默认是生产APPID*/
	var appid = 'wxade8c5e473c645e9';
	if (location.host.indexOf('deve') >= 0) {
		/** 准生产APPID*/
		appid = 'wx697be0ec43c8cafa';
	}
	var codeActId = '${codeActId}' || '';
	var locaAddr = "${method }";
	//var redirect_uri = 'http%3a%2f%2f' + location.host + '%2fmedhtml%2fcommon%2factivity%2f'+codeActId+'%3fact_url=' + locaAddr + '%26resultValue=' + resultValue;
      var redirect_uri = 'http%3a%2f%2f' + 'deve.ykd365.com' + '%2fmedhtml%2fcommon%2factivity%2f'+codeActId+'%3fact_url=' + locaAddr;
	if (is_weixin()) {
		location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
	} else {
		var token = getUrlEle().user_token || '';
		var version = getUrlEle().version_code || '';

		locaAddr = 'activity?act_url=' +locaAddr + '&codeActId=' + codeActId + '&token=' + token + '&version=' + version; 
		//locaAddr = 'activity/'+codeActId+'?act_url=' +locaAddr + '&token=' + token + '&version=' + version + '&resultValue=' + resultValue;
		
		/*此处是准生产和生产环境  */
		location.href = 'http://' + location.host + '/medhtml/common/' + locaAddr;
		/* 此处是测试app的，页面修改后，可以直接看到效果，不用一直重新打包测试 */
	// location.href='http://' + location.host + '/medstore-html/common/'+locaAddr;
	};
</script>
</head>
<body>

</body>
</html>