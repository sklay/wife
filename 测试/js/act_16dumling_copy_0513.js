var B = 0.56;
var canvasW = window.innerWidth;
var canvasH = window.innerHeight;
if (canvasH > window.innerHeight) canvasH = window.innerHeight;

/*给画布 设置宽高*/
var canvasObj = $('#stage');
canvasObj.css('margin-top', (window.innerHeight - canvasH) / 2);
canvasObj.attr('width', canvasW);
canvasObj.attr('height', canvasH);


//创建  图片数组    存放  四种图片
var tu = new Array();
var h = 20;
/* 不同图片出现的  基数*/
var zl = 100;
var chi = 0;
var shi = 0;

function object() {
	this.x = 0;
	this.y = 0;
	this.image = new Image();
}
var range = canvasW - 100 * B;







function Ship(ctx) {
	gameMonitor.im.loadImage(['images/act_16dumpling_happymoon.png']);
	this.width = 180;
	this.height = 180;
	this.left = gameMonitor.w / 2 - this.width / 2;
	this.top = gameMonitor.h - this.height;
	this.player = gameMonitor.im.createImage('images/act_16dumpling_happymoon.png');

	this.paint = function() {
		ctx.drawImage(this.player, this.left, this.top, this.width, this.height);
	}

	this.setPosition = function(event) {
		if (gameMonitor.isMobile()) {
			var tarL = event.changedTouches[0].clientX; //控制 人物的左右移动
		} else {
			var tarL = event.offsetX; //控制 人物的 左右移动
		}

		this.left = tarL - this.width / 2 - 16;
		if (this.left < 0) {
			this.left = 0;
		}
		if (this.left > 320 - this.width) {
			this.left = 320 - this.width;
		}
		if (this.top < 0) {
			this.top = 0;
		}
		if (this.top > gameMonitor.h - this.height) {
			this.top = gameMonitor.h - this.height;
		}
		this.paint();
	}

	this.controll = function() {
		var _this = this;
		/*游戏舞台区*/
		var stage = $('#gamepanel');

		var currentX = this.left,
			currentY = this.top,
			move = false;

		stage.on(gameMonitor.eventType.start, function(event) {
			_this.setPosition(event);
			move = true;
		}).on(gameMonitor.eventType.end, function() {
			move = false;
		}).on(gameMonitor.eventType.move, function(event) {
			event.preventDefault();
			if (move) {
				_this.setPosition(event);
			}

		});
	}





	/* 遇到不同的   下落物体的 处理
	 * 	0 粽子    直接统计结果
	 * 	1 时钟     加1秒
	 * 	2乌云     减2秒
	 * 	3炸弹      直接结束游戏    
	 * */
	this.eat = function(foodlist) {
		for (var i = foodlist.length - 1; i >= 0; i--) {
			var f = foodlist[i];
			if (f) {
				var l1 = this.top + this.height / 2 - (f.top + f.height / 2);
				var l2 = this.left + this.width / 2 - (f.left + f.width / 2);
				var l3 = Math.sqrt(l1 * l1 + l2 * l2);
				if (l3 <= this.height / 2 + f.height / 2) {
					foodlist[f.id] = null;
					if (f.type == 0) {
						gameMonitor.stop();
						//	$('#gameoverPanel').show();
						setTimeout(function() {
							//$('#gameoverPanel').hide();
							$('#resultPanel_two').show();
//							gameMonitor.getScore();
						}, 2000);
						//$('#score').text(++gameMonitor.score);
						//$('.heart').removeClass('hearthot').addClass('hearthot');
						//	setTimeout(function() {
						//	$('.heart').removeClass('hearthot')
						//	}, 200);

					} else if (f.type == 1) {
						//加一秒
					} else if (f.type == 2) {
						//减2秒
					} else {
						//alert('游戏结束');
						gameMonitor.stop();
						//$('#gameoverPanel').show();
						setTimeout(function() {
							//	$('#gameoverPanel').hide();
							$('#resultPanel').show();
//							gameMonitor.getScore();
						}, 2000);
					}


				}
			}

		}
	}
}






/*该函数   规定  两种类型的  物品的  属性     如果实物的   类型是0   就是food1.png     否则是food2.png */
function Food(type, left, id) {
	this.speedUpTime = 300;
	this.id = id;
	this.type = type;
	this.width = 50;
	this.height = 50;
	this.left = left;
	this.top = -50; //  各种物体出现的  位置    Y轴
	//	this.speed = 0.04 * Math.pow(1.2, Math.floor(gameMonitor.time/this.speedUpTime));
	this.speed = .06; // 控制下落的速度
	this.loop = 0;

	var p = this.type == 0 ? 'images/loading_dumpling.png' : ((this.type == 1) ? 'images/act_16dumpling_clockIcon.png' : ((this.type == 2) ? 'images/act_16dumpling_cloudIcon.png' : 'images/act_16dumpling_boomIcon.png'));
	this.pic = gameMonitor.im.createImage(p);
}

//用原型    增加绘图的   方法
Food.prototype.paint = function(ctx) {
		ctx.drawImage(this.pic, this.left, this.top, this.width, this.height);
	}
	//用原型的方式扩展   画布的  运动 方式
Food.prototype.move = function(ctx) {
	//	if(gameMonitor.time % this.speedUpTime == 0){
	//		this.speed *= 1.2;
	//	}
	this.top += ++this.loop * this.speed;
	if (this.top > gameMonitor.h) {
		gameMonitor.foodList[this.id] = null;
	} else {
		this.paint(ctx);
	}
}


function ImageMonitor() {
	var imgArray = [];
	return {
		createImage: function(src) {
			return typeof imgArray[src] != 'undefined' ? imgArray[src] : (imgArray[src] = new Image(), imgArray[src].src = src, imgArray[src])
		},
		loadImage: function(arr, callback) {
			for (var i = 0, l = arr.length; i < l; i++) {
				var img = arr[i];
				imgArray[img] = new Image();
				imgArray[img].onload = function() {
					if (i == l - 1 && typeof callback == 'function') {
						callback();
					}
				}
				imgArray[img].src = img
			}
		}
	}
}






var gameMonitor = {
	w: 320,
	h: 568,
	bgWidth: 320,
	bgHeight: 1126,
	time: 0,
	timmer: null,
	//	bgSpeed : 2,
	//	bgloop : 0,
	score: 0,
	im: new ImageMonitor(),
	foodList: [],
	bgDistance: 0, //背景位置
	eventType: {
		start: 'touchstart',
		move: 'touchmove',
		end: 'touchend'
	},
	init: function() {
		var _this = this;
		var canvas = document.getElementById('stage');
		var ctx = canvas.getContext('2d');

		//		//绘制背景
		var bg = new Image();
		_this.bg = bg;


		bg.onload = function() {
//				        	ctx.drawImage(bg, 0, 0, _this.bgWidth, _this.bgHeight);          	
//				ctx.drawImage();
			}
//					bg.src = 'images/act_16dumpling_geme_bottomIcon.png';

		_this.initListener(ctx);


	},
	initListener: function(ctx) {
		var _this = this;
		var body = $(document.body);
		$(document).on(gameMonitor.eventType.move, function(event) {
			event.preventDefault();
		});
		//		body.on(gameMonitor.eventType.start, '.replay, .playagain', function(){
		//			$('#resultPanel').hide();
		//			var canvas = document.getElementById('stage');
		//			var ctx = canvas.getContext('2d');
		//			_this.ship = new Ship(ctx);
		//    		_this.ship.controll();
		//    		_this.reset();
		//			_this.run(ctx);
		//		});

		body.on(gameMonitor.eventType.start, '#frontpage', function() {
			$('#frontpage').css('left', '-100%');
		});

		body.on(gameMonitor.eventType.start, '#guidePanel', function() {
			$(this).hide();
			_this.ship = new Ship(ctx);
			_this.ship.paint();
			_this.ship.controll();
			gameMonitor.run(ctx);
		});

		//		body.on(gameMonitor.eventType.start, '.share', function(){
		//			$('.weixin-share').show().on(gameMonitor.eventType.start, function(){
		//				$(this).hide();
		//			});
		//		});

	},
	/*
	 * 去除该方法
	 * rollBg : function(ctx){
		if(this.bgDistance>=this.bgHeight){
			this.bgloop = 0;
		}
		this.bgDistance = ++this.bgloop * this.bgSpeed;
		
		ctx.drawImage(this.bg, 0, this.bgDistance-this.bgHeight, this.bgWidth, this.bgHeight);
		ctx.drawImage(this.bg, 0, this.bgDistance, this.bgWidth, this.bgHeight);
	},*/
	run: function(ctx) {
		var _this = gameMonitor;
		ctx.clearRect(0, 0, _this.bgWidth, _this.bgHeight);
		//		_this.rollBg(ctx);

		//绘制   人物
		_this.ship.paint();
		_this.ship.eat(_this.foodList);

		//产生各种  物体
		_this.genorateFood();

		//绘制   下落物体
		for (i = _this.foodList.length - 1; i >= 0; i--) {
			var f = _this.foodList[i];
			if (f) {
				f.paint(ctx);
				f.move(ctx);
			}

		}
		_this.timmer = setTimeout(function() {
			gameMonitor.run(ctx);
		}, Math.round(1000 / 60));

		_this.time++;
	},
	stop: function() {
		var _this = this
		$('#stage').off(gameMonitor.eventType.start + ' ' + gameMonitor.eventType.move);
		setTimeout(function() {
			clearTimeout(_this.timmer);
		}, 0);

	},
	/*不同 物体随机产生*/
	genorateFood: function() {
		var genRate = 25; // 
		var random = Math.random() + 0.5;
		//		var rr = genRate - 1;
		//		console.info('random* genRate ========='+random* genRate);
		//		console.info(' rr ========='+ rr);
		if (random * genRate > genRate - 1) {

			//			var left = Math.random()*(this.w - 30);
			//			var moonType = Math.floor(left)/3 ;
			//			var type = moonType < 50 ? 0 : ((moonType < 75) ? 1 : (moonType < 90) ? 2 : 3);


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
						var type = tu[j].image.src = "images/loading_dumpling.png";
						var type = tu[j].q = 0; // 图片标示    =====粽子
					} else if (k < 75) {
						var type = tu[j].image.src = "images/act_16dumpling_clockIcon.png";
						var type = tu[j].q = 1; // 图片标示   =====时钟
					} else if (k < 90) {
						var type = tu[j].image.src = "images/act_16dumpling_cloudIcon.png";
						var type = tu[j].q = 2; // 图片标示 	=========乌云
					} else {
						var type = tu[j].image.src = "images/act_16dumpling_boomIcon.png";
						var type = tu[j].q = 3; // 图片标示	======炸弹
					}

					var left = tu[j].x = i; //图片的   X 轴坐标
					//				tu[j].y = -Math.round(Math.random() * 300);  //图片的  Y轴坐标


					//				console.info('X=========='+tu[j].x+','+'Y=========='+tu[j].y)
				}
				chi++;
				if (chi == 10) {
					chi = 0;
				}

				console.info(k);
			}
			shi++;


			var id = this.foodList.length;

			var f = new Food(type, left, id);


			this.foodList.push(f);
		}

	},
	//	reset : function(){
	//		this.foodList = [];
	//		this.bgloop = 0;
	//		this.score = 0;
	//		this.timmer = null;
	//		this.time = 0;
	//		$('#score').text(this.score);
	//	},
	//	getScore : function(){
	//		var time = Math.floor(this.time/60);
	//		var score = this.score;
	//		var user = 1;
	//		if(score==0){
	//			$('#scorecontent').html('真遗憾，您竟然<span class="lighttext">一个</span>月饼都没有抢到！');
	//			$('.btn1').text('大侠请重新来过').removeClass('share').addClass('playagain');
	//			$('#fenghao').removeClass('geili yinhen').addClass('yinhen');
	//			return;
	//		}
	//		else if(score<10){
	//			user = 2;
	//		}
	//		else if(score>10 && score<=20){
	//			user = 10;
	//		}
	//		else if(score>20 && score<=40){
	//			user = 40;
	//		}
	//		else if(score>40 && score<=60){
	//			user = 80;
	//		}
	//		else if(score>60 && score<=80){
	//			user = 92;
	//		}
	//		else if(score>80){
	//			user = 99;
	//		}
	//		$('#fenghao').removeClass('geili yinhen').addClass('geili');
	//		$('#scorecontent').html('您在<span id="stime" class="lighttext">2378</span>秒内抢到了<span id="sscore" class="lighttext">21341</span>个月饼<br>超过了<span id="suser" class="lighttext">31%</span>的用户！');
	//		$('#stime').text(time);
	//		$('#sscore').text(score);
	//		$('#suser').text(user+'%');
	//		$('.btn1').text('请小伙伴吃月饼').removeClass('playagain').addClass('share');
	//	},
	isMobile: function() {
		var sUserAgent = navigator.userAgent.toLowerCase(),
			bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
			bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
			bIsMidp = sUserAgent.match(/midp/i) == "midp",
			bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
			bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
			bIsAndroid = sUserAgent.match(/android/i) == "android",
			bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
			bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
			bIsWebview = sUserAgent.match(/webview/i) == "webview";
		return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
	}
}
if (!gameMonitor.isMobile()) {
	gameMonitor.eventType.start = 'mousedown';
	gameMonitor.eventType.move = 'mousemove';
	gameMonitor.eventType.end = 'mouseup';
}

gameMonitor.init();