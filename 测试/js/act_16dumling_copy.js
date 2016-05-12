//<script type="text/javascript">

$(function() {


	var B = 0.56;
	var canvasW = window.innerWidth;
//	var canvasH = canvasW / B;
	var canvasH = window.innerHeight;
	if (canvasH > window.innerHeight) canvasH = window.innerHeight;
	
	/*给画布 设置宽高*/
	var canvasObj = $('#canvas');
	canvasObj.css('margin-top', (window.innerHeight - canvasH) / 2);
	canvasObj.attr('width', canvasW);
	canvasObj.attr('height', canvasH);
	
	/*声明canvas 对象*/
	var ca = document.getElementById("canvas");
	
	/*getContext() 方法返回一个用于在画布上绘图的环境。
	 
	 * 创建画布 ctx
	 * */
	var ctx = ca.getContext("2d");
	
	
//	var bj1 = new Image();
	
	/*创建接物品的对象*/
	var player = new Image();
	
	//创建  图片数组    存放  四种图片
	var tu = new Array();

	//bj1.src="images/bj.jpg";
	
	
	/*接物品人物图片大小*/
	player.src = "images/act_16dumpling_happymoon.png";
	var playerWidth = 270 * B;
	var playerHeight = 180 * B;
	/*以上是  canvas 对象 */
	

	var h = 20;
//	var gk = 1    无用的变量;
	var sudu = 30;
	
	/* 不同图片出现的  基数*/
	var zl = 100;
	
	var chi = 0;
	var shi = 0;
	var count = 0;  //  接到的粽子的数量
//	var sm = 1  无用的  变量 ;

//	var bj = bj1;
	var test = 5;
	function object() {
		this.x = 0;
		this.y = 0;
//		this.l = 11    暂时不知道作用    TODO;
//       if(sprite!=null){
//       	sprite.x=40+(test+=5);
//       }
//       
         
		this.image = new Image();
	}
	var sprite = new object();
	//sprite.x=(canvasW - playerWidth)/2;
	sprite.x = 30;
	sprite.y = canvasH - playerHeight;
	
	//sprite.y=canvasH-playerHeight;

	/*不知道作用    TODO*/
	sprite.image = player;


/*
 *  addListener是用于鼠标，键盘等特殊元素的一些监听
	addEventListener是对组件监听的
	
	* */
	
	
	/*canvas 兼容手机端*/
	if(isMobile()){
		addListener(ca, "touchstart", m);
	}else{
		addListener(ca, "mousemove", m);
	}
	 function isMobile(){
		var sUserAgent= navigator.userAgent.toLowerCase(),
		bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
		bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
		bIsMidp= sUserAgent.match(/midp/i) == "midp",
		bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
		bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
		bIsAndroid= sUserAgent.match(/android/i) == "android",
		bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
		bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
		bIsWebview = sUserAgent.match(/webview/i) == "webview";
		return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
    };
	
	

	//              var beginTime = new Date();
	//              var gameTime = 30;
	//              var remainTime;
	//              function checkTime()
	//              {
	//                  var nowTime = new Date();
	//                  remainTime = gameTime-parseInt((nowTime.getTime()-beginTime.getTime())/1000);
	//                  document.getElementById('m').innerHTML = remainTime;
	//              }
	
	
	var range = canvasW - 60 * B;
	
	
	console.info("range"+ range);
	/* */
	function chansheng() {
		if (shi % h == 0) {
			for (var j = 2 * chi; j < 2 * (chi + 1); j++) {
				
				tu[j] = new object();
				
				
				/* 图片的范围   随机数   */
				var i = Math.round(Math.random() * range);
				
				if (j == 2 * chi + 1) {
					
					//Math.abs 返回x的绝对值
					while (Math.abs(i - tu[2 * chi].x) < 30) {
						i = Math.round(Math.random() * range);
					}
				}
				
				
				/* 随机数的  范围 是  0-100*/
				var k = Math.round(Math.random() * zl);
				
				if (k < 50) {
					tu[j].image.src = "images/loading_dumpling.png";
					tu[j].q = 1;  // 图片标示    =====粽子
				} else if (k < 75) {
					tu[j].image.src = "images/act_16dumpling_clockIcon.png";
					tu[j].q = 2;    // 图片标示   =====时钟
				} else if (k < 90) {
					tu[j].image.src = "images/act_16dumpling_cloudIcon.png";
					tu[j].q = 3;    // 图片标示 	=========乌云
				} else {
					tu[j].image.src = "images/act_16dumpling_boomIcon.png";
					tu[j].q = 4;     // 图片标示	======炸弹
				}
				
				tu[j].x = i;  //图片的   X 轴坐标
				tu[j].y = -Math.round(Math.random() * 300);  //图片的  Y轴坐标
				
				
				console.info('X=========='+tu[j].x+','+'Y=========='+tu[j].y)
			}
			chi++;
//			console.info('chi'+chi);
			
			if (chi == 10) chi = 0;
		}
		shi++;
//		console.info("shi"+shi);
	}

	/*控制下落的速度*/
	//              function sudukongzhi(){
	//                  if(remainTime > 10){
	//                      h=5;
	//                      sudu=30;
	//                  }else if(remainTime > 5){
	//                      h=5;
	//                      sudu=50;
	//                  }else{
	//                      h=5;
	//                      sudu=60;
	//                  }
	//              }
	function draw() {
		// sudukongzhi();
		chansheng();
		for (var i = 0; i < tu.length; i++) {
			if (jianche(sprite, tu[i])) {
				if (tu[i].q == 1) {
					count += 1;
				} else if (tu[i].q == 2) {
					/*时间增加1秒*/
					
				//	TODO
					
				} else if (tu[i].q == 3) {
					/*时间减少2秒*/
					
				//	TODO
	
				} else {
					/*游戏结束      结果页面显示*/
					
				//	TODO
				}
				tu[i].y += 200;
			} else if (!jianche(sprite, tu[i])) {
				tu[i].y += sudu;
			}
			
			/*drawImage()    向画布上绘制图片tu[i].image  tu[i].x, tu[i].y  图片的 x轴坐标   图片的y轴坐标     100 * B, 100 * B 图片的宽高*/
			ctx.drawImage(tu[i].image, tu[i].x, tu[i].y, 100 * B, 100 * B);
		}
	}
	
	/*   */
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
//		alert(sprite.x+","+sprite.y+","+element+","+e+","+fn);
		
		if (element.addEventListener) {
			
			element.addEventListener(e, fn, false);
			
		} else {
			
			element.attachEvent("on" + e, fn);
			
		}
		
	}
	
	function canClick(){
		alert(sprite.x+","+sprite.y);
//		var mycan = document.getElementById("canvas");
//		mycan.('click',function(){
//			
//		});
	}

	function m(event) {
		sprite.x = event.clientX - playerWidth / 2;
		
		if (sprite.x + playerWidth >= canvasW) {
			sprite.x = canvasW - playerWidth;
		}else if (sprite.x <= playerWidth / 2) {
			sprite.x = 0;
		}
	}

//	function stop() {
//		clearInterval(interval);
//	}
	
	
	
	interval = setInterval(function() {
		/* clearRect() 方法清空给定矩形内的指定像素。   x  要清除的矩形左上角的 x 坐标   y  要清除的矩形左上角的 y 坐标    
		 * width  	要清除的矩形的宽度，以像素计      height	要清除的矩形的高度，以像素计*/
		ctx.clearRect(0, 0, canvasW, canvasH);
//		ctx.drawImage(bj, 0, 0, canvasW, canvasH);
		
		ctx.drawImage(sprite.image, sprite.x, sprite.y, playerWidth, playerHeight);
		
		draw();
		document.getElementById("f").innerHTML = count;
		//                  checkTime();
		//                  if(remainTime==0) {stop()}
	}, 100);
	//          </script>

})