var agent = navigator.userAgent.toLowerCase();
getUrlParam = function(a) {
	var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)");
	var c = window.location.search.substr(1).match(b);
	if(c != null) {
		return unescape(c[2])
	}
	return null
};
getAppStatus = function() {
	if(!version || is_weixin() || (!(version < 208 && (/android/.test(agent))))) {
		return true
	} else {
		return false
	}
};
var config = {};
config.loadAniBoo = true;
config.loadNum = 0;
config.loadMax = 0;
config.loadAniTime = null;
config.manifest = [];
config.preload = null;
config.complete = false;

function setupManifest(c) {
	config.progressText = c.progressText || "#loadPer";
	config.progressBar = c.progressBar || "#loadShapePro";
	config.progressContent = c.progressContent || "#loadingPage";
	config.finished = c.finished || function() {};
	if(c && c.image) {
		var b = $("img").length;
		for(var a = 1; a < b; a++) {
			var e = $("img").eq(a).attr("src");
			if(e) {
				config.loadMax++;
				config.manifest.push({
					src: e
				})
			}
		}
	}
	if(c && c.audio) {
		var d = $("audio").length;
		for(var a = 1; a < d; a++) {
			var e = $("audio").eq(a).attr("src");
			if(e) {
				config.loadMax++;
				config.manifest.push({
					src: e
				})
			}
		}
	}
	config.preload = new createjs.LoadQueue(true);
	config.preload.on("progress", handleFileProgress);
	config.preload.on("complete", loadComplete);
	config.preload.loadManifest(config.manifest)
}

function handleFileProgress(a) {
	if(config.loadAniBoo) {
		config.loadAniTime = setInterval(function() {
			if(config.loadNum >= (config.loadMax - 1)) {
				if(config && config.loadAniTime) {
					clearInterval(config.loadAniTime)
				}
				return true
			}
			config.loadNum++;
			loadState(config)
		}, 500);
		config.loadAniBoo = false
	} else {
		return false
	}
}

function loadState(a) {
	var c = $(a.progressText);
	var b = Math.ceil(a.loadNum / a.loadMax * 100) + "%";
	console.log(a.loadNum, "/", a.loadMax, "  =  ", b);
	c.html(b);
	$(a.progressBar).animate({
		width: b
	})
}

function loadComplete(a) {
	if(config && config.loadAniTime) {
		clearInterval(config.loadAniTime)
	}
	config.loadNum = config.loadMax;
	loadState(config);
	config.complete = true;
	setTimeout(function() {
		$(config.progressContent).fadeOut(400, function() {
			$(config.progressContent).remove();
			if(config.finished && typeof(config.finished) == "function") {
				config.finished()
			}
		})
	}, 500)
}
window.addEventListener("load", function() {
	var a = setTimeout(function() {
		if(config && config.loadAniTime) {
			clearInterval(config.loadAniTime)
		}
		$(config.progressContent).remove();
		if(!config.complete && config.finished && typeof(config.finished) == "function") {
			console.debug("window load ");
			config.complete = true;
			config.finished()
		}
		if(a) {
			clearTimeout(a)
		}
	}, 5000)
}, false);

function shareWeiXin(a) {
	$.ajax({
		url: "/medhtml/common/getwxjssign?",
		data: {
			url: location.href.split("#")[0]
		},
		success: function(b) {
			if(b) {
				wx.config({
					debug: false,
					appId: a.appid,
					timestamp: b.timestamp,
					nonceStr: b.nonceStr,
					signature: b.signature,
					jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
				})
			}
			wx.ready(function() {
				wx.onMenuShareTimeline({
					title: a.desc,
					link: a.link,
					imgUrl: a.imgUrl,
					success: function() {
						a.shareSucc()
					},
					cancel: function() {}
				});
				wx.onMenuShareAppMessage({
					title: a.title,
					desc: a.desc,
					link: a.link,
					imgUrl: a.imgUrl,
					success: function() {
						a.shareSucc()
					},
					cancel: function() {}
				});
				wx.onMenuShareQQ({
					title: a.title,
					desc: a.desc,
					link: a.link,
					imgUrl: a.imgUrl,
					success: function() {
						a.shareSucc()
					},
					cancel: function() {}
				});
				wx.onMenuShareWeibo({
					title: a.title,
					desc: a.desc,
					link: a.link,
					imgUrl: a.imgUrl,
					success: function() {
						a.shareSucc()
					},
					cancel: function() {}
				})
			})
		}
	})
};