function games(){

var B = 0.56;
/*设置画布的 高度和宽度*/
var canvasW = window.innerWidth;
//var canvasH = canvasW / B;
var canvasH= window.innerHeight;
if (canvasH > window.innerHeight) canvasH = window.innerHeight;
//
//var box = $('#container');
//box.css('width', window.innerWidth);
//box.css('height', window.innerHeight);
//	
//	
var canvasObj = $('#stage');
canvasObj.css('margin-top', (window.innerHeight - canvasH) / 2);
canvasObj.attr('width', canvasW);
canvasObj.attr('height', canvasH);

var ca = document.getElementById("stage");

var ctx = ca.getContext("2d");
var bj1 = new Image();

var player = new Image();
var tu = new Array();

bj1.src = "images/act_16dumpling_indexBj.jpg";
player.src = "images/act_16dumpling_happymoon.png";
//var playerWidth = 250 * B;
//var playerHeight = 250 * B;

var playerWidth = 200;
var playerHeight = 140;


var h = 20;
var gk = 1;
var sudu = 15;
var zl = 50;
var chi = 0;
var shi = 0;
var fs = 0;
var sm = 1;
var bj = bj1;

function object() {
	this.x = 0;
	this.y = 0;
	this.l = 11;
	this.image = new Image();
}

var sprite = new object();
//sprite.x=(canvasW - playerWidth)/2;
sprite.x = 0;
sprite.y = canvasH - playerHeight;
//sprite.y=canvasH-playerHeight;

sprite.image = player;

//addListener(ca, "touchmove", move);
addListener(ca, "mousemove", move);

var beginTime = new Date();
var gameTime = 30;
var remainTime;

function checkTime() {
	var nowTime = new Date();
	remainTime = gameTime - parseInt((nowTime.getTime() - beginTime.getTime()) / 1000);
	$('.timeup').html(remainTime);
}
var range = canvasW - 60 * B;

function chansheng() {
	console.debug(shi, " ， ", h);
	if (shi % h == 0) {
		for (var j = 2 * chi; j < 2 * (chi + 1); j++) {
			tu[j] = new object();
			var i = Math.round(Math.random() * range);
			if (j == 2 * chi + 1) {
				while (Math.abs(i - tu[2 * chi].x) < 30) {
					i = Math.round(Math.random() * range);
				}
			}
			var k = Math.round(Math.random() * zl);

			if (k < 30) {
				tu[j].image.src = "images/act_16dumpling_zongziIcon.png";
				tu[j].q = 0; // 图片标示    =====粽子
			} else if (k < 40) {
				tu[j].image.src = "images/act_16dumpling_clockIcon.png";
				tu[j].q = 1; // 图片标示   =====时钟
			} else if (k < 45) {
				tu[j].image.src = "images/act_16dumpling_cloudIcon.png";
				tu[j].q = 2; // 图片标示 	=========乌云
			} else {
				tu[j].image.src = "images/act_16dumpling_boomIcon.png";
				tu[j].q = 3; // 图片标示	======炸弹
			}

			tu[j].x = i;
			tu[j].y = -Math.round(Math.random() * 300);
		}
		chi++;
		if (chi == 10) chi = 0;
	}
	shi++;
}

/**速度控制**/
//function sudukongzhi() {
//	console.debug("remainTime ,", remainTime);
//	if (remainTime > 10) {
//		h = 5;
//		sudu = 10;
//	} else if (remainTime > 5) {
//		h = 5;
//		sudu = 15;
//	} else {
//		h = 5;
//		sudu = 20;
//	}
//}

function draw() {
//	sudukongzhi();
	chansheng();
	/**计算得分*/
	for (var i = 0; i < tu.length; i++) {
		if (jianche(sprite, tu[i])) {
			//0： 图片标示    =====粽子
			if (tu[i].q == 0) {
				fs += 1;
				console.debug('粽子');
				
				var happyPlayer = new Image();
				happyPlayer.src = "images/act_16dumpling_happymoon.png";
				sprite.image = happyPlayer;
				happyPlayer.onload = function() {
					ctx.drawImage(sprite.image, sprite.x, sprite.y, playerWidth, playerHeight)
				}
			}
			//1： 图片标示   =====时钟
			else if (tu[i].q == 1) {
				//    fs+=5;
				//碰到时钟增加1秒
				gameTime += 1;
				console.debug('时钟');
				
				var happyPlayer = new Image();
				happyPlayer.src = "images/act_16dumpling_happymoon.png";
				sprite.image = happyPlayer;
				happyPlayer.onload = function() {
					ctx.drawImage(sprite.image, sprite.x, sprite.y, playerWidth, playerHeight)
				}
			}
			//2： 图片标示 	=========乌云
			else if (tu[i].q == 2) {
				//    fs+=10;
				//碰到时钟减加2秒
				gameTime -= 2;

				var cryPlayer = new Image();
				cryPlayer.src = "images/act_16dumpling_crymoon.png";
				sprite.image = cryPlayer;
				cryPlayer.onload = function() {
					ctx.drawImage(sprite.image, sprite.x, sprite.y, playerWidth, playerHeight)
				}

				if (gameTime < 0) {
					$('.timeup').html(0);
					gameTime = 0;
					stop();
				}
				console.debug('乌云');
			}
			//3： 图片标示	======炸弹
			else {
				// 碰到炸弹 终止游戏
				var bombPlayer = new Image();
				bombPlayer.src = "images/act_16dumpling_diemoon.png";
				sprite.image = bombPlayer;
				bombPlayer.onload = function() {
					ctx.drawImage(sprite.image, sprite.x, sprite.y, playerWidth, playerHeight)
				}

				stop();
				$('.result_controllerP').hide() ;
				$('#resultPanel_two').show() ;
				console.debug('炸弹', tu[i].q, " , ", tu[i].image.src);
			}

			tu[i].y += 200;
		} else if (!jianche(sprite, tu[i])) {
			//ctx.drawImage(tu[i].image,tu[i].x,tu[i].y,60*B,60*B);
			tu[i].y += sudu;
		}
		ctx.drawImage(tu[i].image, tu[i].x, tu[i].y, 80 * B, 80 * B);
	}
}
/**检测两物体之间的距离 来判断是否接触*/
function jianche(a, b) {
	var c = a.x - b.x;
	var d = a.y - b.y;
	if (c < b.image.width * B && c > -a.image.width * B && d < b.image.height * B && d > -a.image.height * B) {
		return true;
	} else {
		return false;
	}
}

function addListener(element, e, fn) {
	if (element.addEventListener) {
		element.addEventListener(e, fn, false);
	} else {
		element.attachEvent("on" + e, fn);
	}
}

function move(event) {
	sprite.x = event.clientX - playerWidth / 2;
	if (sprite.x + playerWidth >= canvasW) sprite.x = canvasW - playerWidth;
	else if (sprite.x <= playerWidth / 2) sprite.x = 0;
}

function stop() {
	clearInterval(interval);
	$('.result_controllerP').hide() ;
	$('.lighttext').html(fs) ;
	$('#resultPanel').show() ;
}

interval = setInterval(function() {
	ctx.clearRect(0, 0, canvasW, canvasH);
	ctx.drawImage(bj, 0, 0, canvasW, canvasH);
	ctx.drawImage(sprite.image, sprite.x, sprite.y, playerWidth, playerHeight);
	draw();
	//document.getElementById("f").innerHTML = fs;
	checkTime();
	if (remainTime <= 0) {
		stop();
		console.debug("游戏结束");
	}
}, 100);

}

$(function(){
//	games() ;
//	$('div#container').show() ;
	/**显示首页*/
//	$('div.index_wrap').show() ;
	/**规则按钮*/
	$('.rule_btn').on('click' ,function(){
		$('div.actRule').hide() ;
		
		/*指示图标显示*/
		$('div.slide_icon').show() ;
		/*控制图标显示  3秒后消失   ，点击按钮显示*/
		setTimeout(function(){
           $(".slide_icon").fadeOut("fast");
           $(".index_clickBtn").fadeIn(2000);
        },3000);
	});
	
	
	
	/**游戏开始*/
	$('.index_clickBtn').on('click' ,function(){
		$('div.index_wrap').hide() ;
		/**显示游戏区域*/
		$('div#container').show() ;
		/**初始化游戏*/
		games() ;
	});
	
	/**不服再战*/
	$('.playAgain').on('click' ,function(){
		$('#stage').remove() ;
		$('#gamepanel').append('<canvas id="stage"></canvas>') ;
		$('.result_controllerP').hide() ;
		games() ;
	});
	
	
	
	//分享按钮
    $(".shareFri").on("tap",function(e){
    	var event=e ||window.event;
    	event.stopPropagation();
    	if(is_weixin()){
    		$("#shareFriSha").show();
    	}else{
    		if(appShareFun()){
    			$(".butWrap").hide();
        		$(".shareAppPage").show();
    		}
    	}
    });
  
    $("#shareFriSha").on("tap",function(e){
    	event.stopPropagation();
    	e.preventDefault();
    	 $("#shareFriSha").hide();
    });
    //app分享点击
    $("#shareAppPage_shareFir").on("tap",function(){
    	if(appShareFun()){
    		s(0);
    	}
    	$(".butWrap").show();
		$(".shareAppPage").hide();
    });
    $("#shareAppPage_friRound").on("tap",function(){
    	if(appShareFun()){
    		s(1)
    	}
    	$(".butWrap").show();
		$(".shareAppPage").hide();
    });
});
