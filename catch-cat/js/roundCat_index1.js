$(function() {

	games();

	function games() {
		speller = {
			init: function() {
				//当前猫的位置
				this.people_x = 4;
				this.people_y = 5;
				//二维数组
				this.tArray = [[],[],[],[],[],[],[],[],[]];

				//判断是否胜利点的坐标数组
				this.mArray = [
					[4, 1],
					[1, 3],
					[3, 6],
					[6, 4],
				];
				
				

				//  九个格子的位置
				this.positions = [];
				//默认难易度    如果  n 没有传 则是5 （黑块 移动on个次数）
//				this.hard = n || 5;

				//				this.step = 0;  记录 移动的步 数
				this.blank = 8;
				this.useTime = 180;
				this.tag = 'li';
				this.content = 'ul.box';
				this.lastIndex = this.blank;
				//初始化 布局
				this.creatMax();
				if(this.timer)
					clearInterval(this.timer);
				this.timer = setInterval(function() {
					speller.useTime--; /* 累加时间并格式化显示 */

					if(speller.useTime < 1) {
						console.debug("clear")
						clearInterval(speller.timer);

						clickBoo = false;
					};
					$("#gameCountDownTime").html(speller.useTime);

				}, 1000);
			},


			// 调用模版  构建 初始化数据 
			creatMax: function() {
				
				var dot_num = [];
				for(var i = 0;i<81;i++){
					
					dot_num.push(i);
					
					//   i/9  和行 取商  表示横坐标
					var si= parseInt(i/9);
					// i%9  和 列 取余  表示纵坐标
					var sj= i%9;
					//二维数组中的 值为0
					this.tArray[si][sj]=0;
					this.tArray[4][5]=2;
				}
				
				
//				var persion_count = 0;//小人弹出的次数
//				persion_count++;//次数
//				if(persion_count%dot_num.length==1||persion_count%dot_num.length==3){//玩了一圈后，随机打乱位置
					for(var i = 0 ;i< 7;i++){//这种算法叫做“洗牌算法”
						//找到某个随机数 作为下标
						var index = Math.floor(Math.random()*(dot_num.length-i));
						//如果下标是 41 表示该位置   是  猫的 位置   不参与 交换
						if(index == 41){
							break;
						}
						console.log('index-->'+index);
						//交换  根据上面找到的下标   和 最后一个数 做交换     
						var t = dot_num[index];
						dot_num[index] = dot_num[dot_num.length-1-i];
						dot_num[dot_num.length-1-i] = t;
						
						//t/9 表示行   9  表示列    t%9 表示列  最后找到的  7的  数    ，把这七个 坐标中的 值 改为1
						 this.tArray [parseInt(t/9)][t%9]=1;
					}
//				}

				//按9* 9  排列  
				for(var i = 0 ;i < 9; i++){
					for(var j = 0 ;j<9; j++){
						var posData = {};
						posData.pos = "img"+(i*9+j);
						if(this.tArray [i][j] == 0){
							posData.css = "normal";
						}else if(this.tArray [i][j] == 2){
							posData.css = "styleCat";
						}
						else {
							posData.css = "freak";
						}
						console.log("二维数组的值"+this.tArray [i][j])
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
					if(speller.tArray[curi][curj] == 0){
						 $(this).find("a").css("background","#4E6F9F");
					}
					speller.onClickByIndex(this.people_x, this.people_y);
				});
				
				
				/*设置li样式   让 基数行 或者偶数 行  向右   偏移 半个元素的宽度      超出  行的部分  隐藏 但是  不改变数组的 元素*/
				for(var i = 0 ;i < 81; i++){
					for(var j = 0 ;j<9; j++){
						if(i%2==0 && j==0){
							$("#img"+(i*9+j)).css({marginLeft:".35rem"});
						}
						else if(i%2==0 && j==8){
							$("#img"+(i*9+j)).css({display:"none"});
						}
					}
				}
			},


				//点击游戏小图片时，传入相应位置。例，4，5
				//  点击不是障碍物 时    把不是障碍物的 圆变成障碍物
			onClickByIndex: function(i, j) {
				//点的障碍物区
//				if(this.tArray[i][j] == 1) {
//					return; //什么也不操作
//				}
				//点击的是空白处 
//				if(this.tArray[i][j] == 0) {
					// 猫移动 的六个  方向  1 left  2 left up   3  right up   4 right  5  right down 6  left  down
					var index = this.getMoveCat(i, j); 
//					if(index == 0) { //不能移动
//						return; //什么也不操作
//					}
					if(index == 1) {
						// left
						this.changeImgAndData(i -1 , j, i, j); //交换
					} else if(index == 2) {
						//left up 
						if(j%2 == 0){
							this.changeImgAndData(i,j-1,i,j); //交换
						}else{
							this.changeImgAndData(i-1,j-1,i,j); //交换
						}
						
					} else if(index == 3) {
						//right up 
						this.changeImgAndData(i, j - 1, i, j); //交换
					} else if(index == 4) {
						//right 
						this.changeImgAndData(i, j + 1, i, j); //交换
					}else if(index == 5) {
						//right down
						this.changeImgAndData(i + 1, j - 1, i, j); //交换
					} else if(index == 6) {
						//left down
						this.changeImgAndData(i + 1, j + 1, i, j); //交换
					}
					/*猫向  哪个方向移动*/
					this.changeImgAndData(i, j, this.people_x, this.people_y); //人的交换
					/*设置人的当前位置*/
					this.people_x = i;
					this.people_y = j;
					this.isGameOver(); //游戏是否结束
//				} 
			},

			//根据下标交换图片与数据
			changeImgAndData: function(i1, j1, i2, j2) {
				/*1、交换图片，其中数据为0的图片是秀明的*/
				//图片的交换
				var imgId1 = i1 * 9 + j1;
				var imgId2 = i2 * 9 + j2;
				//				var imgori;

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
				//alert(i2+","+j2);
				var t = this.tArray[i1][j1];
				this.tArray[i1][j1] = this.tArray[i2][j2];
				this.tArray[i2][j2] = t;
			},

			//箱子可移动的 方法   
			//0表示不能移动，1左，2上，3下，4右。
			getMoveCat: function(i, j) {
				//记录下当前点击的点    最后 围住 时  判断  该条路线上 是否还有可移动的 位置
				var  distanceMap = [];
				//left
				var can = true ;
				for(var i = this.people_x; i > 0 ;i--){
					//如果左边障碍物  就不往左边移动
					if(this.tArray[i][j] == 1){
						can = false; 
						distanceMap [1] = this.people_x - i;
						break;
					}
				}
				if(can){
						return 1;
					}
				//left up
				var can = true ;
				var x = this.people_x , y = this.people_y;
				while(true){
					if(this.tArray[x][y] == 1){
						can = false; 
						distanceMap [2] = this.people_y - y;
						break;
					}
					//当往左上移动的时候    横坐标不变    纵坐标在   -1
					if(y%2 == 0){
						x--;
					}
					y--;
					//判断 当前的  左边的  边界
					if(x < 0 || y < 0){
						break;
					}
				}
				if(can){
						return 2;
					}
				
				//right up 
				var can = true ;
				var x = this.people_x , y = this.people_y;
				while(true){
					if(this.tArray[x][y] == 1){
						can = false; 
						distanceMap [3] = this.people_y - y;
						break;
					}
					//当往左上移动的时候    横坐标不变    纵坐标在   -1
					if(y%2 == 1){
						x++;
					}
					y--;
					//判断 当前的  左边的  边界
					if(x > 8 || y < 0){
						break;
					}
				}
				if(can){
						return 3;
					}
				
				//right
				var can = true ;
				for(var i = this.people_x; i < 9 ;i++){
					//如果左边障碍物  就不往左边移动
					if(this.tArray[i][j] == 1){
						can = false; 
						distanceMap [4] = i - this.people_x;
						break;
					}
				}
				if(can){
						return 4;
					}
				
				//right down 
				var can = true ;
				var x = this.people_x , y = this.people_y;
				while(true){
					if(this.tArray[x][y] == 1){
						can = false; 
						distanceMap [5] = y - this.people_y;
						break;
					}
					//当往左上移动的时候    横坐标不变    纵坐标在   -1
					if(y%2 == 1){
			            x++;
			        }
			        y++;
			        if(y>8 ||x>8){
			            break;
			        }
				}
				if(can){
						return 5;
					}
				//left down 
				var can = true ;
				var x = this.people_x , y = this.people_y;
				while(true){
					if(this.tArray[x][y] == 1){
						can = false; 
						distanceMap [6] = y - this.people_y;
						break;
					}
					//当往左上移动的时候    横坐标不变    纵坐标在   -1
					 if(y%2==0){
			            x--;
			        }
			        y++;
			        if(y>8||x<0){
			            break;
			        }
				}
				if(can){
						return 6;
					}
//				//左上
//				if(this.tArray[i-1][j - 1] == 0 ) {
//					// i  不变；j-1     根据这个 坐标 取到的数= 0 表示  左边是 透明的 墙  
//					return 1;
//				} 
//				//右上
//				else if(this.tArray[i - 1][j+1] == 0 ) {
//					//向上移动    i-1  j不变
//					return 2;
//
//				} 
//				//左边
//				else if(this.tArray[i][j - 1] == 0 ) {
//					//向右移动    i不变  不变；j+1
//					return 3;
//
//				} 
//				//右边
//				else if(this.tArray[i][j + 1] == 0) {
//					//向下移动    i+1  不变；j
//					return 4;
//				} 
//				//左下
//				else if(this.tArray[i + 1][j - 1] == 0 ){
//					return 5;
//				}
//				//右下
//				else if(this.tArray[i + 1][j + 1] == 0 ){
//					return 6;
//				}
//				else{
//					return 0;
//				}
				//左
				
			},

			isGameOver: function() {
				
			}




















//			//点击游戏小图片时，传入相应位置。例，4，5
//			onClickByIndex: function(i, j) {
//				//				alert(i+","+j);
//				if(this.tArray[i][j] == 1 || this.tArray[i][j] == 3 || this.tArray[i][j] == 9) {
//					//点的是强 或自己人物，或黑色区域
//					return; //什么也不操作
//				}
//				if(this.tArray[i][j] == 2) { //点击的是箱子
//					var index = this.getMoveBox(i, j); //0表示不能移动，1左，2上，3下，4右。
////					alert("箱子     "+index);
//					if(index == 0) { //不能移动
//						return; //什么也不操作
//					}
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
//					/*人向哪个方向移动*/
//					this.changeImgAndData(i, j, this.people_x, this.people_y); //人的交换
//					/*设置人的当前位置*/
//					this.people_x = i;
//					this.people_y = j;
//					this.isGameOver(); //游戏是否结束
//				} else if(this.tArray[i][j] == 0) { //点击的是空白处
//					//判断点击 空位置的时  人物 是否可以和空位子交换
//					var Pindex = this.getMovePeople(i, j); //0表示不能移动，1左，2上，3下，4右。
////					alert("人物     "+Pindex);
//					if(Pindex == 0) { //不能移动
//						return; //什么也不操作
//					}
//					/*（注意，顺序不能错，先交换物，再交换箱子）*/
//					if(Pindex == 1) { //箱子向左。
//						//箱子的位置向哪个方向移动*
//						this.changeImgAndData(i, j - 1, i, j); //交换
//					} else if(Pindex == 2) {
//						this.changeImgAndData(i - 1, j, i, j); //交换
//					} else if(Pindex == 3) {
//						this.changeImgAndData(i + 1, j, i, j); //交换
//					} else if(Pindex == 4) {
//						this.changeImgAndData(i, j + 1, i, j); //交换
//					}
//
//					/*人物位置数据与当前点击的位置数据进行交换。*/
//					this.changeImgAndData(i, j, this.people_x, this.people_y);
//					/*设置人的当前位置*/
//					this.people_x = i;
//					this.people_y = j;
//				}
//			},
//
//			//箱子可移动的 方法   
//			//0表示不能移动，1左，2上，3下，4右。
//			getMoveBox: function(i, j) {
//				//9：黑图，0：占位透明图，1：墙，2：可移动的箱子，3：可移动的小人 
//				
//				//如果左边是透明的 图  右边是小人  表示箱子 可以往左移动  返回1
//				if(this.tArray[i][j - 1] == 0 && this.tArray[i][j + 1] == 3) {
//					// i  不变；j-1     根据这个 坐标 取到的数= 0 表示  左边是 透明的 墙  
//					return 1;
//				} 
//				//如果上面是 透明的 图   下面是小人 表示箱子可以往上移动  返回2
//				else if(this.tArray[i - 1][j] == 0 && this.tArray[i + 1][j] == 3) {
//					//向上移动    i-1  j不变
//					return 2;
//
//				} else if(this.tArray[i][j + 1] == 0 && this.tArray[i][j - 1] == 3) {
//					//向右移动    i不变  不变；j+1
//					return 4;
//
//				} else if(this.tArray[i + 1][j] == 0 && this.tArray[i - 1][j] == 3) {
//					//向下移动    i+1  不变；j
//					return 3;
//				} else {
//					return 0;
//				}
//
//			},
//			getMovePeople: function(i, j) {
//				//9：黑图，0：占位透明图，1：墙，2：可移动的箱子，3：可移动的小人 
//				
//				//如果左边是透明的 图  右边是小人  表示箱子 可以往左移动  返回1
//				if(this.tArray[i][j - 1] == 3 ) {
//					// i  不变；j-1     根据这个 坐标 取到的数= 0 表示  左边是 透明的 墙  
//					return 1;
//				} 
//				//如果上面是 透明的 图   下面是小人 表示箱子可以往上移动  返回2
//				else if(this.tArray[i - 1][j] == 3 ) {
//					//向上移动    i-1  j不变
//					return 2;
//
//				} else if(this.tArray[i][j + 1] == 3 ) {
//					//向右移动    i不变  不变；j+1
//					return 4;
//
//				} else if(this.tArray[i + 1][j] == 3 ) {
//					//向下移动    i+1  不变；j
//					return 3;
//				} else {
//					return 0;
//				}
//
//			},
//			//根据下标交换图片与数据
//			changeImgAndData: function(i1, j1, i2, j2) {
//				/*1、交换图片，其中数据为0的图片是秀明的*/
//				//图片的交换
//				var imgId1 = i1 * 8 + j1;
//				var imgId2 = i2 * 8 + j2;
//				var imgori;
//
//				//图片的位置
//				var $blank = $(this.content).find(this.tag).eq(imgId1);
//				//图片2位置
//				var $nBlank = $(this.content).find(this.tag).eq(imgId2);
//				//  获取 黑块中的 内容  clone(false)  此方法表示只复制 内容  不复制 方法
//				var $blankA = $blank.children().clone(false);
//				var $nBlankA = $nBlank.children().clone(false);
//
//				$nBlank.html($blankA);
//				$blank.html($nBlankA);
//
//				/*2、交换数据*/
//				//alert(i2+","+j2);
//				var t = this.tArray[i1][j1];
//				this.tArray[i1][j1] = this.tArray[i2][j2];
//				this.tArray[i2][j2] = t;
//			},
//
//			isGameOver: function() {
//				for(var i = 0; i < this.mArray.length; i++) {
//					if(this.tArray[this.mArray[i][0]][this.mArray[i][1]] != 2) {
//						return;
//					}
//				}
//				alert('游戏结束');
//			}

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