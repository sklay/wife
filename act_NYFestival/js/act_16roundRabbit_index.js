$(function() {

	var audio_music = document.getElementById('audioBackMusic');

	/**音乐图标*/
	$('.gameMusic_wrap').on('tap', function() {

		if(audio_music.paused) {
			$(this).show().find('img').removeClass('musicPause').addClass('musicPlay');
			audio_music.play();
		} else {
			$(this).find('img').removeClass('musicPlay').addClass('musicPause');
			audio_music.pause();
		}
	});

	/* 开始 */
	$("#goToGamePage").on("tap", function() {
		$(".startGameBtnWrap").hide();
		console.debug("game start");
		gameStart();

	});

	/* 游戏主函数 */
	function gameStart() {
		//	timeCountDownFun();
		//游戏真正的 结束了  才 开始游戏
		this.isOver = 0;
		games();
		
		if(playMusic) {
			$('.gameMusic_wrap').show().find('img').removeClass('musicPause').addClass('musicPlay');
			audio_music.play();
		}

	};

	function games() {
		speller = {
			init: function() {
				//当前猫的位置
				this.people_x = 4;
				this.people_y = 5;
				this.isOver = 0;
				//二维数组
				this.tArray = [
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[],
					[]
				];

				//  九个格子的位置
				this.positions = [];

				this.step = 0; //记录 移动的步 数
				this.blank = 8;
				//				this.useTime = 180;
				this.tag = 'li';
				this.content = 'ul.box';
				this.lastIndex = this.blank;
				//初始化 布局
				this.creatMax();
				//				if(this.timer)
				//					clearInterval(this.timer);
				//				this.timer = setInterval(function() {
				//					speller.useTime--; /* 累加时间并格式化显示 */
				//
				//					if(speller.useTime < 1) {
				//						console.debug("clear")
				//						clearInterval(speller.timer);
				//
				//						clickBoo = false;
				//					};
				//					$("#gameCountDownTime").html(speller.useTime);
				//
				//				}, 1000);
			},

			// 调用模版  构建 初始化数据 
			creatMax: function() {
				var dot_num = [];
				for(var i = 0; i < 81; i++) {
					dot_num.push(i);
					//   i/9  和行 取商  表示横坐标
					var si = parseInt(i / 9);
					// i%9  和 列 取余  表示纵坐标
					var sj = i % 9;
					//二维数组中的 值为0
					this.tArray[si][sj] = 0;
					this.tArray[4][5] = 2;
				}

				//随机出 7个数作为 障碍区
				for(var i = 0; i < 7; i++) { //这种算法叫做“洗牌算法”
					//找到某个随机数 作为下标
					var index = Math.floor(Math.random() * (dot_num.length - i));
					//如果下标是 41 表示该位置   是  猫的 位置   不参与 交换
					if(index == 41) {
						i--;
						continue;
					}
					console.log('index-->' + index);
					//交换  根据上面找到的下标   和 最后一个数 做交换     
					var t = dot_num[index];
					dot_num[index] = dot_num[dot_num.length - 1 - i];
					dot_num[dot_num.length - 1 - i] = t;

					//t/9 表示行   9  表示列    t%9 表示列  最后找到的  7的  数    ，把这七个 坐标中的 值 改为1
					this.tArray[parseInt(t / 9)][t % 9] = 1;
				}

				//按9* 9  排列  
				for(var i = 0; i < 9; i++) {
					for(var j = 0; j < 9; j++) {
						var posData = {};
						posData.pos = "img" + (i * 9 + j);
						if(this.tArray[i][j] == 0) {
							posData.css = "normal";
						} else if(this.tArray[i][j] == 2) {
							posData.css = "styleCat";
//							posData.css = "normal";
						} else {
							posData.css = "freak";
						}

						console.log("二维数组的值" + this.tArray[i][j])
						this.positions.push(posData);
					}
				}
				
				
				var gridRows = template('game-tpl', {
					'rows': this.positions || []
				});
				$(this.content).html(gridRows);

				$(this.content + ' li').on('tap', function() {
					
					//从0到81 的任何一个数 在2维数组中的 位置 表示pos/8  i的位置  ,pos%8  j的位置
					var pos = $(this).attr('data-pos') * 1;
					//当前点击的  点
					var curi = parseInt(pos / 9);
					var curj = pos % 9;
					//如果不是0 的  不可以走
					if(speller.tArray[curi][curj] != 0) {
						return;
					}
					//把当前点击的 位置变成障碍物
					$(this).find("a").css("background", "#ffc222");
					//并且改变里面的数据
					speller.tArray[curi][curj] = 2;
					//					speller.onClickByIndex(curi,curi);
					speller.onClickByIndex();
				});
				//所有偶数行 向左偏移半个 圈
				for(var i = 0; i < 9; i++) {
					for(var j = 0; j < 9; j++) {
						//表示偶数行
						if(j % 2 == 0) {
							$("#img" + (((i * 2) + 1) * 9)).css({
								marginLeft: ".32rem"
							});
						}
					}
				}
			},

			//			onClickByIndex: function() {
			//猫 走的 路线
			onClickByIndex: function() {
				// -1:游戏胜利，-2：游戏失败，其他数：交换
				//index 即是返回的  猫  能走货不能走的 数
				var index = this.getMoveCat(this.people_x, this.people_y);

				console.log("点击时index是    " + index);
				if(index == -2) { //不能移动
					this.isFail();
					//						alert("猫跑了，游戏失败");
					//						$(speller.content + ' li').unbind("tap"); 

				} else if(index == -1) {
					this.isSuccess();
					//						alert("赢了，"+"你用了"+(this.step+1)+"步。");
					//						$(speller.content + ' li').unbind("tap"); 
				} else {
					//能交换的数 的坐标 和 猫的位置交换
					this.changeImgAndData(parseInt(index / 9), index % 9, this.people_x, this.people_y); //交换
				}

				/*设置猫的当前位置*/
				this.people_x = parseInt(index / 9);
				this.people_y = index % 9;
				//统计步数
				stepNum = ++this.step;
			},

			//根据下标交换图片与数据
			changeImgAndData: function(i1, j1, i2, j2) {
				/*1、交换图片，其中数据为0的图片是秀明的*/
				//图片的交换
				var imgId1 = i1 * 9 + j1;
				var imgId2 = i2 * 9 + j2;
				//	var imgori;

				//图片的位置
				var $blank = $(this.content).find(this.tag).eq(imgId1);
				//图片2位置
				var $nBlank = $(this.content).find(this.tag).eq(imgId2);
				//  获取 黑块中的 内容  clone(false)  此方法表示只复制 内容  不复制 方法
				var $blankA = $blank.children().clone(false);
				var $nBlankA = $nBlank.children().clone(false);

				$nBlank.html($blankA);
				$blank.html($nBlankA);

				/*2、交换数据*/
				//				alert(i1+","+j1);
				var t = this.tArray[i1][j1];
				this.tArray[i1][j1] = this.tArray[i2][j2];
				this.tArray[i2][j2] = t;
			},
			//猫可以移动的 方向    传进猫的 坐标
			getMoveCat: function(i, j) {
				/*2、判断奇数偶数决定两个可不可以走*/
				//不要的变量i,j位置1
				//不要的变量i,j位置2
				var shu_arr_9 = []; //能走的位置
				for(var k_1 = i - 1; k_1 <= i + 1; k_1++) {
					for(var k_2 = j - 1; k_2 <= j + 1; k_2++) {
						if(k_1 == i && k_2 == j) { //中间位置不要
							continue;
						}
						//位置超出边界不要  输了
						if(k_1 < 0 || k_1 > 8 || k_2 < 0 || k_2 > 8) {
							return -2;
						}
						//有两个不可能
						if(i % 2 == 0) {
							if(k_1 == i - 1 && k_2 == j + 1) { //右上不要
								continue;
							} else if(k_1 == i + 1 && k_2 == j + 1) { //右下不要
								continue;
							}
						} else {
							if(k_1 == i - 1 && k_2 == j - 1) { //左上不要
								continue;
							} else if(k_1 == i + 1 && k_2 == j - 1) { //左下不要
								continue;
							}
						}
						//如果是障碍物  也不添加到 可能 移动的 随机的数里去
						if(this.tArray[k_1][k_2] != 0) {
							continue;
						}
						shu_arr_9.push(k_1 * 9 + k_2);
					}
				}
				/*3、得到一个可以走的数组，如果这个数组长度为0  没有可以走 的就 胜利了*/
				if(shu_arr_9.length == 0) {
					return -1;
				}
				//从能走的  数里  随机出一个数 返回
				var index_shu_arr = parseInt(shu_arr_9.length * Math.random());
				return shu_arr_9[index_shu_arr];
			},

			isSuccess: function() {
				$(speller.content + ' li').unbind("tap");
				//挑战成功显示
				$(".gameSuccWrap").fadeIn(500);
				$(".gameSuccWrap .pText").html("花了" + stepNum + "步");
				speller.isOver = 1;
			},
			isFail: function() {
				$(speller.content + ' li').unbind("tap");
				$(".gameFailWrap").fadeIn(500);
				speller.isOver = 1;
			},
			timeFun:function(){
				setTimeout(function(){
						var dataNum = $(".styleCat #imgSty").attr('data-s');
						if(dataNum == 1){
							$(".styleCat #imgSty").attr('src','images/act_16roundRabbit_index_rabbit2.png');
						}else{
							$(".styleCat #imgSty").attr('src','images/act_16roundRabbit_index_rabbit1.png');
						}
						dataNum=dataNum* (-1);
						 $(".styleCat #imgSty").attr('data-s',dataNum);
						 console.log("dataNum    ",dataNum);
						 if(speller.isOver == 0){
						 	speller.timeFun();
						 }
						 
					},500)
			}
		}
		speller.init();
		speller.timeFun();
	}

	//点击查看显示原图
	$(".showOriginBtn").on("click", function(e) {
		var event = e || window.event;
		event.stopPropagation();
		$(".game_origin").show();
	});
	$(".game_origin").on("tap", function(e) {
		var event = e || window.event;
		event.stopPropagation();
		$(".game_origin").hide();
	});

	/* 再次游戏 */
//	clickBoo = false;
	$("#playAgain").on("tap", function(e) {
		if(speller.isOver == 1) {
//			clickBoo = true;
			$(".gameFailWrap").fadeOut();
			gameStart();
		}
	});
	//去使用跳转页面
	$(".goForUse").on("click", function() {
		var target_href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653';
		window.location.href = target_href;
	});
	// 分享按钮
	$(".shareFri").on("tap", function(e) {
		var event = e || window.event;
		event.stopPropagation();
		if(is_weixin()) {
			$("#shareFriSha").show();
		} else {
			if(isLogin()) {
				$(".butWrap").hide();
				$(".shareAppPage").show();
			}
		}
	});

	$("#shareFriSha").on("tap", function(e) {
		event.stopPropagation();
		e.preventDefault();
		$("#shareFriSha").hide();
	});

	// app分享点击
	$("#shareAppPage_shareFir").on("tap", function() {
		if(isLogin()) {
			s(0);
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});
	$("#shareAppPage_friRound").on("tap", function() {
		if(isLogin()) {
			s(1)
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});
	//	document.addEventListener("touchmove", function(b) {
	//		b.preventDefault();
	//	}, false);
	//	$('.gameWinMainWrap').on('tap', function() {
	//		var $this = $(this);
	//		var $childImg = $this.find('[name=gamePlayChilren]');
	//		var isTouched = $childImg.length;
	//		if(!isTouched) {
	//			return;
	//		}
	//		console.debug();
	//		$childImg.remove();
	//
	//		if(playMusic) {
	//			sound_music.currentTime = 0;
	//			sound_music.play();
	//		}
	//
	//		scoreCountFun($this);
	//	})

})