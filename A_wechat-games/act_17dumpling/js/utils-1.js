	/**获取浏览器agent信息*/
	var agent = navigator.userAgent.toLowerCase();
	
	/**
	 * 获取url参数
	 * @param {Object} name
	 *	http://localhost:33064/WebForm2.aspx?reurl=abc
	 * getUrlParam("reurl")
	 */
	getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	};
	
	/** 是否需要播放隐音乐*/
	getAppStatus = function(){
		if (!version || is_weixin() || (!(version < 208 && (/android/.test(agent)))) ) {
			return true ;
		}else{
			return false ;
		}
	}
	
	//加载中动画
	var config = {};
	config.loadAniBoo = true;
	config.loadNum = 0;
	config.loadMax = 0 ;
	config.loadAniTime = null;
	config.manifest = [];
	config.preload = null;
	config.complete = false ;
	//定义相关JSON格式文件列表
	function setupManifest(loadConfig) {
		config.progressText = loadConfig.progressText || "#loadPer";
		config.progressBar = loadConfig.progressBar || "#loadShapePro";
		config.progressContent = loadConfig.progressContent || ".loadPage";
		config.finished = loadConfig.finished || function(){};
		
		if(loadConfig && loadConfig.image){
			var imgL = $("img").length;
			for (var i = 1; i < imgL; i++){
				var src = $("img").eq(i).attr("src") ;
				if(src){
					config.loadMax++ ;
					config.manifest.push({
						src : src
					});
				}
			}
		}
		
		if(loadConfig && loadConfig.audio){
			var audioCount = $("audio").length;
			for (var i = 1; i < audioCount; i++){
				var src = $("audio").eq(i).attr("src") ;
				if(src){
					config.loadMax++ ;
					config.manifest.push({
						src : src
					});
				}
			}
		}
		
		/** 开始加载*/
		config.preload = new createjs.LoadQueue(true);
		config.preload.on("progress", handleFileProgress);
		config.preload.on("complete", loadComplete);
		config.preload.loadManifest(config.manifest);
		
	};
	
	//	var loadPer = $("#loadPer"); //加载进度条
	function handleFileProgress(event) {
		if (config.loadAniBoo) {
			config.loadAniTime = setInterval(function() {
				/**逻辑上的加载完成 -1是为了避免两次100% 最后的100%应该由物理的加载完成来实现*/
				if (config.loadNum >= (config.loadMax - 1)) {
					if (config && config.loadAniTime) {
						clearInterval(config.loadAniTime);
					}
					return true;
				}
				config.loadNum++;
				loadStateSpe(config);
			}, 500)
			config.loadAniBoo = false;
		} else {
			return false;
		}
	}

	function loadState(config) {
//		config.progressText:"#loadPer"
		var loadPer = $(config.progressText); //加载进度条
		var percLoad = Math.ceil(config.loadNum / config.loadMax * 100) + "%"; //100%的样式
		console.log(config.loadNum, '/', config.loadMax, '  =  ', percLoad); //14
		loadPer.html(percLoad);
		//		config.progressBar:"#loadShapePro"
		$(config.progressBar).animate({
			width : percLoad
		});
	}
	function loadStateSpe(config) {
		var loadPer = $("#loadPer"); //加载进度条
		var percLoad = Math.ceil(config.loadNum / config.loadMax * 100) + "%"; //100%的样式
		console.log(config.loadNum, '/', config.loadMax, '  =  ', percLoad);
		loadPer.html(percLoad);
		var leftValue = (-100 + Math.ceil(config.loadNum / config.loadMax * 100)) + "%";
		console.log("leftValue:"+leftValue);
		$("#loadShapePro").css("left",leftValue);
	}

	//全部资源加载完毕
	/**物理的加载完成 最后的100%应该由本方法实现 （防止由于网络过慢导致上面的逻辑加载先完成，所以最后一个100%由这边控制）*/
	function loadComplete(event) {
		if (config && config.loadAniTime)
			clearInterval(config.loadAniTime);
		config.loadNum = config.loadMax;
		loadStateSpe(config);
		
		config.complete = true;
		setTimeout(function() {
			//		config.progressContent:"#loadingPage"
			$(config.progressContent).fadeOut(400, function() {
				$(config.progressContent).remove();
				if( config.finished && typeof(config.finished)=="function"){
					config.finished();
				}
			});
		}, 500);
	};

	window.addEventListener("load", function() {
		var timeOut  =	setTimeout(function() {
				if(config && config.loadAniTime)
					clearInterval(config.loadAniTime);
				$(config.progressContent).remove();
				if(!config.complete && config.finished && typeof(config.finished)=="function"){
					console.debug("window load ") ;
					config.complete = true;
					config.finished();
				}
				if(timeOut){
					clearTimeout(timeOut) ;
				}
			}, 5000);
		}, false)

	/**微信分享*/
	function shareWeiXin(wechatObj) {
		$.ajax({
			url : "/medhtml/common/getwxjssign?",
			data : {
				url : location.href.split('#')[0]
			},
			success : function(wechatReturn) {
				if (wechatReturn) {
					wx.config({
						debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId : wechatObj.appid, // 必填，公众号的唯一标识 
						/*  appId: 'wx697be0ec43c8cafa', // 必填，公众号的唯一标识 */
						timestamp : wechatReturn.timestamp, // 必填，生成签名的时间戳
						nonceStr : wechatReturn.nonceStr, // 必填，生成签名的随机串
						signature : wechatReturn.signature, // 必填，签名，见附录1
						jsApiList : [ "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo" ]
					// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
				};
				wx.ready(function() {
					wx.onMenuShareTimeline({
						title : wechatObj.desc, // 分享描述
						link : wechatObj.link, // 分享链接
						imgUrl : wechatObj.imgUrl, // 分享图标
						success : function() {
							wechatObj.shareSucc()
						},
						cancel : function() {
						}
					});
					wx.onMenuShareAppMessage({
						title : wechatObj.title, // 分享标题
						desc : wechatObj.desc, // 分享描述
						link : wechatObj.link, // 分享链接
						imgUrl : wechatObj.imgUrl, // 分享图标
						success : function() {
							wechatObj.shareSucc()
						},
						cancel : function() {
						}
					});
					wx.onMenuShareQQ({
						title : wechatObj.title, // 分享标题
						desc : wechatObj.desc, // 分享描述
						link : wechatObj.link, // 分享链接
						imgUrl : wechatObj.imgUrl, // 分享图标
						success : function() {
							wechatObj.shareSucc()
						},
						cancel : function() {
						}
					});
					wx.onMenuShareWeibo({
						title : wechatObj.title, // 分享标题
						desc : wechatObj.desc, // 分享描述
						link : wechatObj.link, // 分享链接
						imgUrl : wechatObj.imgUrl, // 分享图标
						success : function() {
							wechatObj.shareSucc()
						},
						cancel : function() {
						}
					});
				})
			}
		});
	};
