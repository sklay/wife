$(function() {
// 解决的是   找兔子行走的点中  这些点的邻居 包括邻居的 邻居  是不是可以到达边缘   如果没有到达边缘的  则表示  兔子已经被围住了
//障碍物  随机出现的 问题    上下左右 四个 边上 都有障碍区   降低游戏难度
//游戏成功的   方法 改动
	var stepNum = 0;
	/* 开始 */
	$("#goToGamePage").on("tap", function() {
		$(".startGameBtnWrap").hide();
		console.debug("game start");
		gameStart();

	});

	/* 游戏主函数 */
	function gameStart() {
		stepNum = 0;
		// 调用游戏开始前 ，先把游戏设置为开始状态
		this.isOver = 0;
		games();

	};

	function games() {
		speller = {
			init : function() {
				// 兔子初始时的左坐标点
				this.people_x = 4;
				this.people_y = 5;
				// 全局变量 ，游戏是否开始， 0表示未开始
				this.isOver = 0;
				// 二维数组，存储所有的 圆的位置有三个值 ，0表示 普通的 圆 1表示障碍物区 2表示 兔子
				this.tArray = [ [], [], [], [], [], [], [], [], [] ];
				// 81个圈的位置
				this.positions = [];

				this.blank = 8;
				this.tag = 'li';
				this.content = 'ul.box';
				this.lastIndex = this.blank;
				// 初始化 布局
				this.creatMax();
			},

			// 调用模版 构建 初始化数据
			creatMax : function() {
				var dot_num = [];
				for (var i = 0; i < 81; i++) {
					dot_num.push(i);
					// 获取横坐标 i/9 和  纵坐标 i%9   
					var si = parseInt(i / 9);
					var sj = i % 9;
					// 设置 没给坐标上的  数据   0 表示 圆  
					this.tArray[si][sj] = 0;
					// this.tArray[4][5] 这个位置的值设为2， 2表示兔子
					this.tArray[4][5] = 2;
				}
				var allFreak = [] ;
				
				//top Rand
				var randTop = Math.floor( Math.random()*3) + 3 ;
				var tp = [] ;
				for(var i = 0 ; i < randTop ;i++ ){
					var c = true ;
					while(c){
						var p = Math.floor( Math.random()*18) ;
						var x = parseInt(p/9);
						var y = (p%9) ;
						var _pos = x + "-" + y ;
						if($.inArray(_pos , allFreak) == -1){
							this.tArray[x][y] = 1 ;
							c = false ;
							tp.push(_pos) ;
						}
					}
				}
				allFreak = allFreak.concat(tp) ;
				
				//bottom Rand
				var randBottom = Math.floor( Math.random()*3) + 3 ;
				tp = [] ;
				for(var i = 0 ; i < randBottom ;i++ ){
					var c = true ;
					while(c){
						var p = Math.floor( Math.random()*18) ;
						var x = parseInt(p/9) + 7 ;
						var y = (p%9) ;
						var _pos = x + "-" + y ;
						if($.inArray(_pos , allFreak) == -1){
							this.tArray[x][y] = 1 ;
							c = false ;
							tp.push(_pos) ;
						}
					}
				}	
				allFreak = allFreak.concat(tp) ;
				
				
				//left Rand
				var randLeft = Math.floor( Math.random()*3) + 3 ;
				tp = [] ;
				for(var i = 0 ; i < randLeft ;i++ ){
					var c = true ;
					while(c){
						var p = Math.floor( Math.random()*18) ;
						var x = (p%9) ;
						var y = parseInt(p/9) ;
						var _pos = x + "-" + y ;
						if($.inArray(_pos , allFreak) == -1){
							this.tArray[x][y] = 1 ;
							c = false ;
							tp.push(_pos) ;
						}
					}
					allFreak = allFreak.concat(tp) ;
					
				}
				
				//right Rand
				var randRight = Math.floor( Math.random()*3) + 3 ;
				for(var i = 0 ; i < randRight ;i++ ){
					var c = true ;
					while(c){
						var p = Math.floor( Math.random()*18) ;
						var x = (p%9) ;
						var y = parseInt(p/9)+7;
						var _pos = x + "-" + y ;
						if($.inArray(_pos , allFreak) == -1){
							this.tArray[x][y] = 1 ;
							c = false ;
							tp.push(_pos) ;
						}
					}
				}
				
				
				
				/**其他位置随机*/
				var zaw = Math.floor( Math.random() * 5);
				for (var i = 0; i < zaw; i++) { 
					// 找到某个随机数 作为下标，每找一次数组 的长度 减去一次
					var index = Math.floor(Math.random() * (dot_num.length - i));
					// 如果下标是 41 表示该位置 是 兔子的 位置 不参与 交换
					if (index == 41) {
						i--;
						continue;
					}
					// 交换 根据上面找到的下标 ，把随机出来的7个位置 中的数和原数组中的 最后一个中的数交换
					var t = dot_num[index];
					// dot_num.length - 1 - i 表示新数组中最后一个位置上的数 把最后一个数给随机出来的那个位置上
					dot_num[index] = dot_num[dot_num.length - 1 - i];
					// 随机出来的数给最后一个位置上
					dot_num[dot_num.length - 1 - i] = t;

					// 最后找到的 7的 数    设置 横坐标t/9 和纵坐标 t%9   ，把这七个 坐标中的 值 改为1，1表示障碍物
					this.tArray[parseInt(t / 9)][t % 9] = 1;
				}


				// 随机从dot_num这个数组随机出 7个数的位置作为 障碍区   这种算法叫做“洗牌算法”
//				var zaw = Math.floor( Math.random() * 5) + 8;
//				for (var i = 0; i < zaw; i++) { 
//					// 找到某个随机数 作为下标，每找一次数组 的长度 减去一次
//					var index = Math.floor(Math.random() * (dot_num.length - i));
//					// 如果下标是 41 表示该位置 是 兔子的 位置 不参与 交换
//					if (index == 41) {
//						i--;
//						continue;
//					}
//					// console.log('index-->' + index);
//					// 交换 根据上面找到的下标 ，把随机出来的7个位置 中的数和原数组中的 最后一个中的数交换
//					var t = dot_num[index];
//					// dot_num.length - 1 - i 表示新数组中最后一个位置上的数 把最后一个数给随机出来的那个位置上
//					dot_num[index] = dot_num[dot_num.length - 1 - i];
//					// 随机出来的数给最后一个位置上
//					dot_num[dot_num.length - 1 - i] = t;
//
//					// 最后找到的 7的 数    设置 横坐标t/9 和纵坐标 t%9   ，把这七个 坐标中的 值 改为1，1表示障碍物
//					this.tArray[parseInt(t / 9)][t % 9] = 1;
//				}

				// 按9* 9 排列 并出示所有的 布局
				for (var i = 0; i < 9; i++) {
					for (var j = 0; j < 9; j++) {
						var posData = {};
						posData.pos = "img" + (i * 9 + j);
						if (this.tArray[i][j] == 0) {
							posData.css = "normal";
						} else if (this.tArray[i][j] == 2) {
							posData.css = "styleCat";
						} else {
							console.debug('this.tArray[i][j] ----> ' , this.tArray[i][j]);
							posData.css = "freak";
						}
						/***定死某行有障碍物 人工干预降低难度*/
						
//						if(i==1 || i == 7){
//							if(3<=j && j <6){
//								posData.css = "freak";
//							}
//						}
						// console.log("二维数组的值" + this.tArray[i][j]);
						// 将特定的 样式放置到 对应的位置里
						this.positions.push(posData);
					}
				}

				// 调用模板，让81个圈一次排列
				var gridRows = template('game-tpl', {
					'rows' : this.positions || []
				});
				$(this.content).html(gridRows);
				// 点击 开始
				$(this.content + ' li').on('tap', function() {
					// 获取点击的当前的 li 的  data-pos 属性 ，这个属性存储了 0-81 的 数字
					var pos = $(this).attr('data-pos') * 1;
					// 根据当前点击的点 获取横坐标 pos / 9 和纵坐标  pos % 9
					var curi = parseInt(pos / 9);
					var curj = pos % 9;
					// 只有当前点击的位置  上的数据是0   表示是普通的圆  才是可以走
					if (speller.tArray[curi][curj] != 0) {
						return;
					}
					// 把当前点击的 位置变成障碍物
					$(this).find("a").addClass('freak').css("background", "#ffc222");
					// 并且改变里面的数据
					speller.tArray[curi][curj] = 2;
					// speller.onClickByIndex(curi,curi);
					speller.onClickByIndex();
				});
				// 所有偶数行 向左偏移半个 圈
				for (var i = 0; i < 9; i++) {
					for (var j = 0; j < 9; j++) {
						// 表示偶数行
						if (j % 2 == 0) {
							$("#img" + (((i * 2) + 1) * 9)).css({
								marginLeft : ".32rem"
							});
						}
					}
				}
			},

			// 兔子行走的 路线
			onClickByIndex : function() {
				// -1:游戏胜利，-2：游戏失败，其他数：交换
				// index 即是返回的 兔子 能走或者不能走的 数
				var index = this.getMoveCat(this.people_x, this.people_y);

			//	console.log("要移动到index是    " + index);
//				if (index == -2) {
//					// 猫跑了，游戏失败
//					this.isFail();
//
//				} else if (index == -1) {
//					// 赢了
//					this.isSuccess();
//				} else {
//					// 根据返回的能交换的数 算出坐标 和兔子的 位置交换
//					this.changeImgAndData(parseInt(index / 9), index % 9, this.people_x, this.people_y); // 交换
//				}

				/**围住后无路可走直接成功*/
				if(index == -1){
					++stepNum;
					this.isSuccess();
					return;
				}
				var ci = parseInt(index / 9);
				var cj = index % 9;
				if(ci == 0 || ci == 8 || cj == 0 || cj == 8){
					//如果移动的 位置在边界处 就是失败
					this.isFail();
				}
				this.changeImgAndData(ci, cj, this.people_x, this.people_y); // 交换
				/* 重新设置兔子的当前位置 */
				this.people_x = parseInt(index / 9);
				this.people_y = index % 9;
				// 统计步数
				++stepNum;
			},

			// 根据下标交换图片与数据
			changeImgAndData : function(i1, j1, i2, j2) {
				/* 1、交换图片，其中数据为0的图片是秀明的 */
				// 图片的交换
				var imgId1 = i1 * 9 + j1;
				var imgId2 = i2 * 9 + j2;
				// var imgori;

				// 图片的位置
				var $blank = $(this.content).find(this.tag).eq(imgId1);
				// 图片2位置
				var $nBlank = $(this.content).find(this.tag).eq(imgId2);
				// 获取 黑块中的 内容 clone(false) 此方法表示只复制 内容 不复制 方法
				var $blankA = $blank.children().clone(false);
				var $nBlankA = $nBlank.children().clone(false);

				$nBlank.html($blankA);
				$blank.html($nBlankA);

				/* 2、交换数据 */
				// alert(i1+","+j1);
				var t = this.tArray[i1][j1];
				this.tArray[i1][j1] = this.tArray[i2][j2];
				this.tArray[i2][j2] = t;
			},
			// 兔子可以移动的 方向 把兔子的 坐标传进来
			getMoveCat : function(i, j) {
				/* 、判断奇数偶数决定两个可不可以走 */
				var shu_arr_9 = []; // 存放 所有能走的位置
				// 这边的 循环是否是 兔子 能走的 八个点的 区域 （去掉 因为排列后位置 错开的 不能走的两个点 其中的 六个区域的循环）
				// 从这八个区域里 筛选 能走的点
				for (var k_1 = i - 1; k_1 <= i + 1; k_1++) {
					for (var k_2 = j - 1; k_2 <= j + 1; k_2++) {
						if (k_1 == i && k_2 == j) { //如果相等 ，表示是兔子的位子 即 中间位置不要
							continue;
						}
						// 位置超出边界不要 
						if (k_1 < 0 || k_1 > 8 || k_2 < 0 || k_2 > 8) {
							//return -2;
							continue
						}
						// 有两个不可能 表示兔子在偶数行
						if (i % 2 == 0) {
							if (k_1 == i - 1 && k_2 == j + 1) { // 右上不要
								continue;
							} else if (k_1 == i + 1 && k_2 == j + 1) { // 右下不要
								continue;
							}
						} else {
							if (k_1 == i - 1 && k_2 == j - 1) { // 左上不要
								continue;
							} else if (k_1 == i + 1 && k_2 == j - 1) { // 左下不要
								continue;
							}
						}
						// 如果是障碍物 也不添加到 可能 移动的 随机的数里去
						if (this.tArray[k_1][k_2] != 0) {
							continue;
						}
						// 把能走的坐标算出 一个数 放到 数组中
						shu_arr_9.push(k_1 * 9 + k_2);
					}
				}
				/* 3、得到一个可以走的数组，如果这个数组长度为0 没有可以走 的就 胜利了 */
//				if (shu_arr_9.length == 0) {
//					return -1;
//				}

			//	console.debug("brothers , ", shu_arr_9.join(','));
				/** 寻找最短路径 */
				shu_arr_9 = this.getCatMoveStep(shu_arr_9);
				// 从能走的 数里 随机出一个数 返回
				var index_shu_arr = parseInt(shu_arr_9.length * Math.random());
				return shu_arr_9[index_shu_arr];
			},
			getCatMoveStep : function(array) {

				var $this = this;
				var cat = $('ul.box a.styleCat').parent().attr('data-pos') * 1;
				
				/** 算出当前猫所在的行 */
				var rows = (cat % 9 == 0) ? parseInt(cat / 9) : Math.ceil(cat / 9);
				var rightMax = rows * 9 - 1;
				var leftMin = (rows - 1) * 9;
				/** 判断猫是否已经逃出 */
				if (cat == rightMax || cat == leftMin || 0 >= rows || 9 <= rows) {
					return -2;
				}

				var freakPos = [];
				$('ul.box a.freak').each(function(i, n) {
					var pos = $(n).parent().attr('data-pos') * 1;
					freakPos.push(pos);
				});

			//	console.debug("障碍物位置 -----> ", freakPos.join(','));

				var rsts = [];
				var zawP = [];
				/** 判断当前行是奇数还是偶数行 */
				var rowEven = (cat % 9 == 0) ? ((rows + 1) % 2 == 0) : ((rows % 2) == 0);
				/** 左上 */
				var lt_offset = rowEven ? -9 : -10;
				/** 右上 */
				var rt_offset = rowEven ? -8 : -9;
				/** 左 */
				var l_offset = -1;
				/** 右 */
				var r_offset = 1;
				/** 左下 */
				var lb_offset = rowEven ? 9 : 8;
				/** 右下 */
				var rb_offset = rowEven ? 10 : 9;
			//	console.debug(cat, "    rowEven   ", rowEven);

				/** 获取右上线路节点 */
				var rtpos = cat * 1 + rt_offset * 1;
				/** 存在右上节点 */
				if ($.inArray(rtpos, array) != -1) {
					var positions = $this.rightTop(cat);
					var bool = true;
					/** 判断改线路上是否有障碍物 */
					if (positions && positions.length > 0) {
						$.each(positions, function(i, n) {
							if ($.inArray(n * 1, freakPos) != -1) {
								bool = false;
							}
							;
						});
					}
					/** 没有障碍物时获取该线路的节点个数 */
					if (bool) {
						var l = positions.length;
						rsts.push(rtpos + "-" + l);
					}
				}
				/** 获取左上线路节点 */
				var ltpos = cat * 1 + lt_offset * 1;
				/** 存在右上节点 */
				if ($.inArray(ltpos, array) != -1) {
					var positions = $this.leftTop(cat);
					var bool = true;
					/** 判断改线路上是否有障碍物 */
					if (positions && positions.length > 0) {
						$.each(positions, function(i, n) {
							if ($.inArray(n * 1, freakPos) != -1) {
								bool = false;
							}
							;
						});
					}
					/** 没有障碍物时获取该线路的节点个数 */
					if (bool) {
						var l = positions.length;
						rsts.push(ltpos + "-" + l);
					}
//					else{
//						zawP.push(-1);
//					}
				}

				/** 获取左边线路节点 */
				var lpos = cat * 1 + l_offset * 1;
				/** 存在左边节点 */
				if ($.inArray(lpos, array) != -1) {
					var positions = $this.left(cat);
					var bool = true;
					/** 判断改线路上是否有障碍物 */
					if (positions && positions.length > 0) {
						$.each(positions, function(i, n) {
							if ($.inArray(n * 1, freakPos) != -1) {
								bool = false;
							}
							;
						});
					}
					/** 没有障碍物时获取该线路的节点个数 */
					if (bool) {
						var l = positions.length;
						rsts.push(lpos + "-" + l);
					}
//					else{
//						zawP.push(-1);
//					}
				}

				/** 获取右边线路节点 */
				var rpos = cat * 1 + r_offset * 1;
				/** 存在左边节点 */
				if ($.inArray(rpos, array) != -1) {
					var positions = $this.right(cat);
					var bool = true;
					/** 判断改线路上是否有障碍物 */
					if (positions && positions.length > 0) {
						$.each(positions, function(i, n) {
							if ($.inArray(n * 1, freakPos) != -1) {
								bool = false;
							}
							;
						});
					}
					/** 没有障碍物时获取该线路的节点个数 */
					if (bool) {
						var l = positions.length;
						rsts.push(rpos + "-" + l);
					}
//					else{
//						zawP.push(-1);
//					}
				}

				/** 获取右下线路节点 */
				var rbpos = cat * 1 + rb_offset * 1;
				/** 存在左边节点 */
				if ($.inArray(rbpos, array) != -1) {
					var positions = $this.rightButtom(cat);
					var bool = true;
					/** 判断改线路上是否有障碍物 */
					if (positions && positions.length > 0) {
						$.each(positions, function(i, n) {
							//有障碍物的  点除外
							if ($.inArray(n * 1, freakPos) != -1) {
								bool = false;
							}else{
								//这边再加上判断这条线上点的 邻居是不是有在边缘的   要是这些点  的邻居有在边缘的   就表示猫还没有被围住
								//判断这些邻居  时  所有的可通行的点中 存在  重复的 邻居   需要记录这些邻居  如果这个邻居之前存在过就不用
								
							};
						});
					}
					/** 没有障碍物时获取该线路的节点个数 */
					if (bool) {
						var l = positions.length;
						rsts.push(rbpos + "-" + l);
					}
				}

				/** 获取左下线路节点 */
				var lbpos = cat * 1 + lb_offset * 1;
				/** 存在左边节点 */
				if ($.inArray(lbpos, array) != -1) {
					var positions = $this.leftButtom(cat);
					var bool = true;
					/** 判断改线路上是否有障碍物 */
					if (positions && positions.length > 0) {
						$.each(positions, function(i, n) {
							if ($.inArray(n * 1, freakPos) != -1) {
								//有障碍物
								bool = false;
							};
						});
					}
					/** 没有障碍物时获取该线路的节点个数 */
					if (bool) {
						var l = positions.length;
						rsts.push(lbpos + "-" + l);
					}
				}

			//	console.debug(" rsts --- > ", rsts.join(","));

				if (rsts && rsts.length > 0) {
					var shortLine = [];
					var p = rsts[0].split('-')[0];
					var s = rsts[0].split('-')[1];
					$.each(rsts, function(i, n) {
						var _p = n.split('-')[0];
						var _s = n.split('-')[1];
						if (0 < (s * 1 - _s * 1)) {
							p = _p;
							s = _s;
						}
						// console.debug("_p -> " , _p , " , _s -> " ,_s) ;
					});
				//	console.debug("p ->  ", p, "  ,  s -> ", s);

					shortLine.push(p);
					return shortLine;
				} else {
					console.debug('.canGo(cat)' , this.canGo(cat)) ;
					return this.canGo(cat) ;
				}

			},
			/** 右上路线 */
			rightTop : function(cat) {

				var rows = (cat % 9 == 0) ? Math.ceil(cat / 9) + 1 : Math.ceil(cat / 9);
				var rightTopArray = [];
				if (rows < 2) {
					return rightTopArray;
				}
			//	console.debug("rows --- > ", rows);
				/** 判断猫是否在当前行的中心* */
				var rowMiddle = (rows - 1) * 9 + 4;
				var nodes = 0;
				var step = 0;
				/** 中间或中间偏右 */
				if (rowMiddle >= cat) {
					nodes = rows;
					step = (nodes % 2 == 0) ? 8 : 9;
				}
				/** 中间偏左 */
				else {
					var rowMax = rows * 9 - 1;
					nodes = 2 * (rowMax - cat) + 1;
					nodes = (rows % 2 == 0) ? nodes : nodes + 1;
					step = (nodes % 2 != 0) ? 8 : 9;
				}
				// console.debug("nodes --- > " ,nodes) ;

				var pos = cat;
				for (var i = 0; i < nodes - 1; i++) {
					pos = pos - step;
					if (pos < 0) {
						return rightTopArray;
					}
					rightTopArray.push(pos);
					step = (step == 8) ? 9 : 8;
				}
				return rightTopArray;
			},

			/** 左上路线 */
			leftTop : function(cat) {
				var rows = (cat % 9 == 0) ? Math.ceil(cat / 9) + 1 : Math.ceil(cat / 9);
			//	console.debug("rows --- > ", rows);
				var leftTopArray = [];
				if (rows < 2) {
					return leftTopArray;
				}
				/** 判断猫是否在当前行的中心* */
				var rowMiddle = (rows - 1) * 9 + 4;
				var nodes = 0;
				/** 中间或中间偏左 */
				if (rowMiddle <= cat) {
					nodes = rows;
				}
				/** 中间偏右 */
				else {
					var rowMin = (rows - 1) * 9;
					nodes = 2 * (cat - rowMin);
					nodes = (rows % 2 == 0) ? nodes + 2 : nodes + 1;
				}
				// console.debug("nodes --- > " ,nodes) ;
				var step = (nodes % 2 == 0) ? 9 : 10;
				var pos = cat;
				for (var i = 0; i < nodes - 1; i++) {
					pos = pos - step;
					leftTopArray.push(pos);
					step = (step == 9) ? 10 : 9;
				}
				return leftTopArray;
			},

			/** 左下路线 */
			leftButtom : function(cat) {
				var rows = (cat % 9 == 0) ? Math.ceil(cat / 9) + 1 : Math.ceil(cat / 9);
			//	console.debug("rows --- > ", rows);
				var leftButtomArray = [];
				if (rows >= 9) {
					return leftButtomArray;
				}
				/** 判断猫是否在当前行的中心* */
				var rowMiddle = (rows - 1) * 9 + 4;
				var nodes = 0;
				/** 中间或中间偏左 */
				if (rowMiddle <= cat) {
					nodes = 9 - rows + 1;
				}
				/** 中间偏右 */
				else {
					var rowMin = (rows - 1) * 9;
					nodes = 2 * (cat - rowMin);
					nodes = (rows % 2 == 0) ? nodes + 2 : nodes + 1;
				}
				// console.debug("nodes --- > " ,nodes) ;
				var step = (nodes % 2 == 0) ? 9 : 8;
				var pos = cat;
				for (var i = 0; i < nodes - 1; i++) {
					pos = pos + step;
					leftButtomArray.push(pos);
					step = (step == 9) ? 8 : 9;
				}
				return leftButtomArray;
			},

			/** 右下路线 */
			rightButtom : function(cat) {
				var rows = (cat % 9 == 0) ? Math.ceil(cat / 9) + 1 : Math.ceil(cat / 9);
				// console.debug("rows --- > " ,rows) ;
				var rightButtomArray = [];
				if (rows >= 9) {
					return rightButtomArray;
				}
				/** 判断猫是否在当前行的中心* */
				var rowMiddle = (rows - 1) * 9 + 4;
				var nodes = 0;
				var step = 0;
				/** 中间或中间偏右 */
				if (rowMiddle >= cat) {
					nodes = 9 - rows + 1;
					step = (nodes % 2 != 0) ? 9 : 10;
				}
				/** 中间偏左 */
				else {
					var rowMax = rows * 9 - 1;
					nodes = 2 * (rowMax - cat);
					nodes = (rows % 2 == 0) ? nodes : nodes + 1;
					step = (nodes % 2 != 0) ? 9 : 10;
				}
				// console.debug("nodes --- > " ,nodes) ;

				var pos = cat;
				for (var i = 0; i < nodes - 1; i++) {
					pos = pos + step;
					if (pos > 80) {
						return rightButtomArray;
					}
					rightButtomArray.push(pos);
					step = (step == 9) ? 10 : 9;
				}
				return rightButtomArray;
			},

			/** 左边路线 */
			left : function(cat) {
				var rows = (cat % 9 == 0) ? Math.ceil(cat / 9) + 1 : Math.ceil(cat / 9);
				// console.debug("rows --- > " ,rows) ;
				var leftArray = [];
				var rowMin = (rows - 1) * 9;

				if (rowMin < cat) {
					var nodes = cat - rowMin;
					for (var i = 1; i <= nodes; i++) {
						var pos = cat - i;
						leftArray.push(pos);
					}
				}
				return leftArray;
			},

			/** 右边路线 */
			right : function(cat) {
				var rows = (cat % 9 == 0) ? Math.ceil(cat / 9) + 1 : Math.ceil(cat / 9);
				// console.debug("rows --- > " ,rows) ;
				var rightArray = [];
				var rowMax = rows * 9 - 1;

				if (rowMax > cat) {
					var nodes = rowMax - cat;
					for (var i = 1; i <= nodes; i++) {
						var pos = cat + i;
						rightArray.push(pos);
					}
				}
				return rightArray;
			},
			/*
			判断传入的circle是否在边界上
			 */
			isCircleAtEdge :function(cat){
				var rows = (cat % 9 == 0) ? Math.ceil(cat / 9) + 1 : Math.ceil(cat / 9);
				console.debug('row is  ' , rows) ;
				/**第一行 或 最后一行*/
				if(1 == rows || 10 == rows){
					return true ;
				}
				/**中间行*/
				var min = (rows-1)*9 ;
				var max = rows*9 - 1 ;
				if(min == cat || max == cat){
					return true ;
				}
				/**不在边缘*/
				return false ;
			},
			//兔子周围某方向的邻居
			getCircleNeighbor :function(cat ,direction ){
				
				var rows = (cat % 9 == 0) ? Math.ceil(cat / 9) + 1 : Math.ceil(cat / 9);
				rows = (rows%2) == 0 ;
		        switch (direction){
		        	case 0: //Direction.LEFT:
		             return   pos = cat - 1;
		            case 1: //Direction.RIGHT:
		             return   pos = cat + 1;
		            case 2: //Direction.TOP_LEFT:
		              return  pos = rows ? cat-9 :cat-10;
		            case 3://Direction.TOP_RIGHT:
		              return  pos = rows ? cat-8 :cat-9;
		            case 4://Direction.BOTTOM_LEFT:
		              return  rpos = rows ? cat+9 :cat+8;
		            case 5://Direction.BOTTOM_RIGHT:
		              return  pos = rows ? cat+10 :cat+9;
		            default:
		            return '-1' ;
		        }
		    },
			/** 右边路线 */
			canGo : function(cat) {
//				console.debug("cat" , cat)
				
				var rst = [] ;
				var freakPos = [];
				var allPos = [] ;
				$('ul.box a.freak').each(function(i, n) {
					var pos = $(n).parent().attr('data-pos') * 1;
					freakPos.push(pos);
				});

//				console.debug("障碍物位置 ++++++++ ", freakPos.join(','));
				
				var ignoreArr=[]; 
    			var toDealWithArr=[cat]; 
				while(true){
//					console.debug(toDealWithArr.join(",")) ;
			        if(toDealWithArr.length<1){
			        	console.debug("成功"+toDealWithArr.length) ;
			        	rst.push(-1) ;
			            return rst;
			        }else{
			            var _first=toDealWithArr.shift();
			            ignoreArr.push(_first);
			            if($.inArray(_first ,freakPos) == -1 && this.isCircleAtEdge(_first)){
			            	
			            	var key = _first +"" ;
			            	var search = true ;
			            	//到达边缘的 步数   返回所有到边缘的 点
			            	var steps = [] ;
			            	while(search){
			            		$.each(allPos, function(i, n) {
			            			var pos = n.split('|')[0] ;
			            			var neighbors = n.split('|')[1].split(',') ;
			            			if($.inArray(key , neighbors) > -1){
			            				steps.push(key) ;
			            				key = pos ;
			            				if(pos == cat){
			            					search = false ;
			            					console.debug('steps is ' ,steps , "  ,  "+ key) ;
				            			}
			            			}
			            		});
			            	}
			            	
			            	console.debug("继续走" ,_first) ;
			            	//TODO 返回的 这些步数 中 可能还存在 有到边缘的  邻居的 点  需要修改
			            	rst.push(steps[steps.length-1] * 1) ;
			            	return rst;
			            }else{
			            	var temp = [] ;
			            	//周围的  六个点依次判断是不是存在到边缘的  点
			                for(var i=0;i<=5;i++){
			                	//这个方法  传进的是 兔子的位置 和 要到目标的点
			                	//这边的调用  只是 告诉 兔子要往哪个邻居移动
			                    var nbr=this.getCircleNeighbor(_first,i);
			                    if(nbr< 0){
			                    	continue ;
			                    }
			                    if(nbr > 80){
			                    	continue ;
			                    }
			                    if(!( $.inArray(nbr,ignoreArr) > -1 || $.inArray(nbr,toDealWithArr) > -1 )){
				                    if($.inArray(nbr ,freakPos) != -1){
				                        ignoreArr.push(nbr);
				                    }else{
				                        toDealWithArr.push(nbr);
				                        /**没有障碍物*/
				                    	temp.push(nbr) ;
				                    }
			                    }
			                }
			                allPos.push(_first +"|"+temp.join(',')) ;
			            }
			        }
			    }
			},

			isSuccess : function() {
				$(speller.content + ' li').unbind("tap");
				// 挑战成功显示
				$(".gameSuccWrap").fadeIn(500);
				$(".gameSuccWrap .pText").html("花了" + stepNum + "步");
				speller.isOver = 1;
			},
			isFail : function() {
				$(speller.content + ' li').unbind("tap");
				$(".gameFailWrap").fadeIn(500);
				speller.isOver = 1;
			},
			timeFun : function() {
				// 两个兔子的 图片来回交换
				setTimeout(function() {
					var dataNum = $(".styleCat #imgSty").attr('data-s');
					if (dataNum == 1) {
						$(".styleCat #imgSty").attr('src', 'images/act_16roundRabbit_index_rabbit_ri.png');
					} else {
						$(".styleCat #imgSty").attr('src', 'images/act_16roundRabbit_index_rabbit_le.png');
					}
					dataNum = dataNum * (-1);
					$(".styleCat #imgSty").attr('data-s', dataNum);
					// console.log("dataNum ",dataNum);
					// 如果开始调用定时器
					if (speller.isOver == 0) {
						speller.timeFun();
					}

				}, 500)
			}
		}
		speller.init();
		speller.timeFun();
	}

	/* 再次游戏 */
	$("#playAgain").on("tap", function(e) {
		if (speller.isOver == 1) {
			$(".gameFailWrap").fadeOut();
			gameStart();
		}
	});
	// 去使用跳转页面
	$(".goForUse").on("click", function() {
		var target_href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.camore.yaodian.activity&g_f=991653';
		window.location.href = target_href;
	});
	// 分享按钮
	$(".shareFri").on("tap", function(e) {
		var event = e || window.event;
		event.stopPropagation();
		if (is_weixin()) {
			// $("#shareFriSha").css("height", $(".content").height());
			$("#shareFriSha").show();
		} else {
			if (isLogin()) {
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
		if (isLogin()) {
			s(0);
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});
	$("#shareAppPage_friRound").on("tap", function() {
		if (isLogin()) {
			s(1)
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});

})