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
			games(1);
		if(playMusic) {
			$('.gameMusic_wrap').show().find('img').removeClass('musicPause').addClass('musicPlay');
			audio_music.play();
		}

	};
	var people_x = 4;
	var people_y = 4;
	//n表示 关数
	function games(n) {

		speller = {
			init: function() {
//				this.n = n;
				if(n == 1){
					//当前人物的位置
					this.people_x = 4;
					this.people_y = 4;
					//9：黑图，0：占位透明图，1：墙，2：可移动的箱子，3：可移动的小人
					this.tArray = [
						["9", "9", "1", "1", "1", "9", "9", "9"],
						["9", "9", "1", "0", "1", "9", "9", "9"],
						["9", "9", "1", "0", "1", "1", "1", "1"],
						["1", "1", "1", "2", "0", "2", "0", "1"],
						["1", "0", "0", "2", "3", "1", "1", "1"],
						["1", "1", "1", "1", "2", "1", "9", "9"],
						["9", "9", "9", "1", "0", "1", "9", "9"],
						["9", "9", "9", "1", "1", "1", "9", "9"],
					];
	
					//判断是否胜利点的坐标数组
					this.mArray = [
						[4, 1],
						[1, 3],
						[3, 6],
						[6, 4],
					];
				}else if(n == 2){
					this.people_x = 6;
					this.people_y = 4;
					//9：黑图，0：占位透明图，1：墙，2：可移动的箱子，3：可移动的小人
					this.tArray = [
						["9", "9", "1", "1", "1", "9", "9", "9"],
						["9", "1", "0", "0", "1", "1", "1", "1"],
						["9", "1", "0", "0", "0", "0", "0", "1"],
						["1", "0", "0", "0", "1", "2", "1", "9"],
						["1", "0", "2", "0", "0", "0", "1", "9"],
						["1", "0", "0", "2", "2", "0", "0", "1"],
						["9", "1", "0", "0", "3", "0", "1", "9"],
						["9", "9", "1", "1", "1", "1", "1", "9"],
					];
	
					//判断是否胜利点的坐标数组
					this.mArray = [
						[1, 2],
						[1, 3],
						[2, 4],
						[4, 5],
					];
				}

				//this.imageName = 'images/act_16seventhDay_game_pt-{index}.png';
				//  九个格子的位置
				this.positions = [];
				this.positions2 = [];
				//默认难易度    如果  n 没有传 则是5 （黑块 移动on个次数）
				//this.hard = n || 5;

				//this.step = 0;  记录 移动的步 数
				this.blank = 8;
				this.useTime = 180;
				this.tag = 'li';
				this.content = 'ul.box';
				this.content2 = 'ul.box2';
				this.lastIndex = this.blank;
				//初始化 布局
				this.creatBJ();
				this.createGrid();
				//倒计时
				this.clearShu();
			},
			
			clearShu:function(){
				if(this.timer)
					clearInterval(this.timer);
				this.timer = setInterval(function() {
					speller.useTime--; /* 累加时间并格式化显示 */

					if(speller.useTime < 1) {
						console.debug("clear")
						clearInterval(speller.timer);

						clickBoo = false;
						$(".gameFailWrap").fadeIn(500);

						if(playMusic) {
							$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause');
							audio_music.pause();
						}
					};
					$("#gameCountDownTime").html(speller.useTime);

				}, 1000);
			},
			//创建背景模板
			creatBJ:function(){
				for(var i = 0; i < 8; i++){
					for(var j = 0; j < 8; j++){
						var posData = {};
						posData.pos = i;
						console.log(i + "    " + j);
						 var isPoint = 0;//  是不是墙上带点的图片 1：是，0：不是
						 for(var i_2 = 0 ;i_2<this.mArray.length;i_2++){
						 	if(this.mArray[i_2][0]==i&&this.mArray[i_2][1]==j){
						 		isPoint = 1;
						 		break;
						 	}
						 } 
						if(isPoint == 0){
							//添加墙的图片
							posData.image = 'images/act_16pushBox_0.png';
						}else{
							//墙上带点的图片
							posData.image = 'images/act_16pushBox_qz.png';
						}
						
						this.positions2.push(posData);
					}
				}
				var gridRows = template('game-tpl2', {
					'rows': this.positions2 || []
				});
				$(this.content2).html(gridRows);
			},
			
			// 调用模版  构建 初始化数据 
			createGrid: function() {
				for(var i = 0; i < 8; i++) {
					for(var j = 0; j < 8; j++) {
						console.log(i + "    " + j);
						var m = this.tArray[i][j];
						//console.log(m);
						var posData = {};
						posData.pos = i;
						
						//9：黑图，0：占位透明图，1：白墙，2：可移动的箱子，3：可移动的小人
						if(m == 1) {
							//白色墙面区域
							posData.image = 'images/act_16pushBox_1.png';
						} else if(m == 2) {
							//箱子的 位置
							posData.image = 'images/act_16pushBox_2.png';
						} else if(m == 3) {
							//小人的位置
							posData.image = 'images/act_16pushBox_3.png';
						} 
						else if(m == 9) {
							//黑块区域
							posData.image = 'images/act_16pushBox_0.png';
						} else {
							//占位透明图
							posData.image = 'images/act_16pushBox_0.png';
						}
						
						this.positions.push(posData);
					}

				}
				var gridRows = template('game-tpl', {
					'rows': this.positions || []
				});
				$(this.content).html(gridRows);
				
				
				//点击开始
				$(this.content + ' li').on('tap', function() {

					//从0到63 的任何一个数 在2维数组中的 位置 表示pos/8  i的位置  ,pos%8  j的位置
					var pos = $(this).attr('data-pos') * 1;
					console.log(this.people_x+"，"+this.people_y);
					//		alert(pos);
					speller.onClickByIndex(parseInt(pos / 8), pos % 8);
				});

			},

			
			//点击游戏小图片时，传入相应位置。例，4，5
			onClickByIndex: function(i, j) {
                console.log("onClickByIndex-->"+i+","+j+",this.tArray[i][j]-->"+this.tArray[i][j]);
				//				alert(i+","+j);
				if(this.tArray[i][j] == 1 || this.tArray[i][j] == 3 || this.tArray[i][j] == 9) {
					//点的是强 或自己人物，或黑色区域
					console.log("点的是强 或自己人物，或黑色区域");
					return; //什么也不操作
				}
				if(this.tArray[i][j] == 2) { //点击的是箱子
					
					var index = this.getMoveBox(i, j); //0表示不能移动，1左，2上，3下，4右。
					console.log("0表示不能移动，1左，2上，3下，4右。index-->"+index);
//					alert("箱子     "+index);
					if(index == 0) { //不能移动
						return; //什么也不操作
					}
					/*（注意，顺序不能错，先交换物，再交换箱子）*/
					if(index == 1) { //箱子向左。
						/*箱子的位置向哪个方向移动*/
						this.changeImgAndData(i, j - 1, i, j); //交换
					} else if(index == 2) {
						this.changeImgAndData(i - 1, j, i, j); //交换
					} else if(index == 3) {
						this.changeImgAndData(i + 1, j, i, j); //交换
					} else if(index == 4) {
						this.changeImgAndData(i, j + 1, i, j); //交换
					}
					/*人向哪个方向移动*/
					this.changeImgAndData(i, j, this.people_x, this.people_y); //人的交换
					/*设置人的当前位置*/
					this.people_x = i;
					this.people_y = j;
					this.isGameOver(); //游戏是否结束
				} else if(this.tArray[i][j] == 0) { //点击的是空白处
					//判断点击 空位置的时  人物 是否可以和空位子交换
					var Pindex = this.getMovePeople(i, j); //0表示不能移动，1左，2上，3下，4右。
//					alert("人物     "+Pindex);
					if(Pindex == 0) { //不能移动
						return; //什么也不操作
					}
//					/*（注意，顺序不能错，先交换物，再交换箱子）*/
//					if(index == 1) { //箱子向左。
//						/*箱子的位置向哪个方向移动*/
//						this.changeImgAndData(i, j - 1, i, j); //交换
//					} else if(index == 2) {
//						this.changeImgAndData(i - 1, j, i, j); //交换
//					} else if(index == 3) {
//						this.changeImgAndData(i + 1, j, i, j); //交换
//					} else if(index == 4) {
//						this.changeImgAndData(i, j + 1, i, j); //交换
//					}
					/*人物位置数据与当前点击的位置数据进行交换。*/
					console.log("人物位置数据与当前点击的位置数据进行交换。this.people-->"+(this.people_x)+","+this.people_y);
					this.changeImgAndData(i, j, this.people_x, this.people_y);
					/*设置人的当前位置*/
					this.people_x = i;
					this.people_y = j;
					console.log("设置人的当前位置。this.people-->"+this.people_x+","+this.people_y);
				}
			},

			//箱子可移动的 方法   
			//0表示不能移动，1左，2上，3下，4右。
			getMoveBox: function(i, j) {
				//9：黑图，0：占位透明图，1：墙，2：可移动的箱子，3：可移动的小人 
				
				//如果左边是透明的 图  右边是小人  表示箱子 可以往左移动  返回1
				if(this.tArray[i][j - 1] == 0 && this.tArray[i][j + 1] == 3) {
					// i  不变；j-1     根据这个 坐标 取到的数= 0 表示  左边是 透明的 墙  
					return 1;
				} 
				//如果上面是 透明的 图   下面是小人 表示箱子可以往上移动  返回2
				else if(this.tArray[i - 1][j] == 0 && this.tArray[i + 1][j] == 3) {
					//向上移动    i-1  j不变
					return 2;

				} else if(this.tArray[i][j + 1] == 0 && this.tArray[i][j - 1] == 3) {
					//向右移动    i不变  不变；j+1
					return 4;

				} else if(this.tArray[i + 1][j] == 0 && this.tArray[i - 1][j] == 3) {
					//向下移动    i+1  不变；j
					return 3;
				} else {
					return 0;
				}

			},
			getMovePeople: function(i, j) {
				//9：黑图，0：占位透明图，1：墙，2：可移动的箱子，3：可移动的小人 
				
				//如果左边是透明的 图  右边是小人  表示箱子 可以往左移动  返回1
				if(this.tArray[i][j - 1] == 3 ) {
					// i  不变；j-1     根据这个 坐标 取到的数= 0 表示  左边是 透明的 墙  
					return 1;
				} 
				//如果上面是 透明的 图   下面是小人 表示箱子可以往上移动  返回2
				else if(this.tArray[i - 1][j] == 3 ) {
					//向上移动    i-1  j不变
					return 2;

				} else if(this.tArray[i][j + 1] == 3 ) {
					//向右移动    i不变  不变；j+1
					return 4;

				} else if(this.tArray[i + 1][j] == 3 ) {
					//向下移动    i+1  不变；j
					return 3;
				} else {
					return 0;
				}

			},
			//根据下标交换图片与数据
			changeImgAndData: function(i1, j1, i2, j2) {
				/*1、交换图片，其中数据为0的图片是秀明的*/
				//图片的交换
				var imgId1 = i1 * 8 + j1;
				var imgId2 = i2 * 8 + j2;
				var imgori;

				//图片的位置
				console.log("==changeImgAndData,imgId1-->"+imgId1+",this.tag)-->"+this.tag);
				var $blank = $(this.content).find(this.tag).eq(imgId1);
				console.log("==changeImgAndData,$blank-->"+$blank);
				//图片2位置
				console.log("==changeImgAndData,imgId1-->"+imgId2+",this.tag)-->"+this.tag);
				var $nBlank = $(this.content).find(this.tag).eq(imgId2);
				console.log("==changeImgAndData,$blank-->"+$nBlank);
				//  获取 黑块中的 内容  clone(false)  此方法表示只复制 内容  不复制 方法
				var $blankA = $blank.children().clone(false);
				var $nBlankA = $nBlank.children().clone(false);

				$nBlank.html($blankA);
				$blank.html($nBlankA);

				/*2、交换数据*/
				//alert(i2+","+j2);
				var t = this.tArray[i1][j1];
				this.tArray[i1][j1] = this.tArray[i2][j2];
				this.tArray[i2][j2] = t;
			},

			isGameOver: function() {
				for(var i = 0; i < this.mArray.length; i++) {
					if(this.tArray[this.mArray[i][0]][this.mArray[i][1]] != 2) {
						return;
					}
				}
//				alert('游戏结束');
				$(".less_1").remove();
				$(".less_2").show();
				games(2);
			}

		}

		speller.init();
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
	clickBoo = false;
	$("#playAgain").on("click", function(e) {
		if(!clickBoo) {
			clickBoo = true;
			$(".gameFailWrap").fadeOut();
//			$(".less_1").show();
//			$(".less_2").hide();
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
	
})