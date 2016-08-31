$(function() {

//	var audio_music = document.getElementById('audioBackMusic');
//
//	/**音乐图标*/
//	$('.gameMusic_wrap').on('tap', function() {
//
//		if(audio_music.paused) {
//			$(this).show().find('img').removeClass('musicPause').addClass('musicPlay');
//			audio_music.play();
//		} else {
//			$(this).find('img').removeClass('musicPlay').addClass('musicPause');
//			audio_music.pause();
//		}
//	});

	/* 开始 */
	$("#goToGamePage").on("tap", function() {
		$(".startGameBtnWrap").hide();
		console.debug("game start");
		gameStart();

	});

	/* 游戏主函数 */
	function gameStart() {
		//	timeCountDownFun();
		//调用游戏开始前 ，先把游戏设置为开始状态
		this.isOver = 0;
		games();
		
//		if(playMusic) {
//			$('.gameMusic_wrap').show().find('img').removeClass('musicPause').addClass('musicPlay');
//			audio_music.play();
//		}

	};

	function games() {
		speller = {
			init: function() {
				//兔子初始时的左坐标点
				this.people_x = 4;
				this.people_y = 5;
				//全局变量 ，游戏是否开始， 0表示未开始
				this.isOver = 0;
				//二维数组，存储所有的 圆的位置有三个值 ，0表示 普通的 圆   1表示障碍物区    2表示 兔子
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
				//  81个圈的位置
				this.positions = [];

				this.step = 0; //记录 移动的步 数
				this.blank = 8;
				//	this.useTime = 180;
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
					//二维数组中的 值为0，0表示普通的 圆
					this.tArray[si][sj] = 0;
					//this.tArray[4][5] 这个位置的值设为2， 2表示兔子
					this.tArray[4][5] = 2;
				}

				//循环其次从dot_num这个数组随机出 7个数的位置作为 障碍区
				for(var i = 0; i < 7; i++) { //这种算法叫做“洗牌算法”
					//找到某个随机数 作为下标，每找一次数组 的长度 减去一次
					var index = Math.floor(Math.random() * (dot_num.length - i));
					//如果下标是 41 表示该位置   是  兔子的 位置   不参与 交换
					if(index == 41) {
						i--;
						continue;
					}
					//console.log('index-->' + index);
					//交换  根据上面找到的下标 ，把随机出来的7个位置 中的数和原数组中的 最后一个中的数交换    
					var t = dot_num[index];
					//dot_num.length - 1 - i 表示新数组中最后一个位置上的数  把最后一个数给随机出来的那个位置上
					dot_num[index] = dot_num[dot_num.length - 1 - i];
					//随机出来的数给最后一个位置上
					dot_num[dot_num.length - 1 - i] = t;

					//t/9 表示行   9  表示列    t%9 表示列  最后找到的  7的  数    ，把这七个 坐标中的 值 改为1，1表示障碍物
					this.tArray[parseInt(t / 9)][t % 9] = 1;
				}

				//按9* 9  排列  并出示所有的 布局
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

					//	console.log("二维数组的值" + this.tArray[i][j]);
						//将特定的  样式放置到 对应的位置里
						this.positions.push(posData);
					}
				}
				
				//调用模板，让64个圈一次排列
				var gridRows = template('game-tpl', {
					'rows': this.positions || []
				});
				$(this.content).html(gridRows);
				//点击  开始
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
					$(this).find("a").addClass('freak').css("background", "#ffc222");
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

			//兔子行走的 路线
			onClickByIndex: function() {
				// -1:游戏胜利，-2：游戏失败，其他数：交换
				//index 即是返回的  兔子  能走或者不能走的 数
				var index = this.getMoveCat(this.people_x, this.people_y);

				console.log("要移动到index是    " + index);
				if(index == -2) { 
					//猫跑了，游戏失败
					this.isFail();

				} else if(index == -1) {
					//赢了
					this.isSuccess();
				} else {
					//根据返回的能交换的数 算出坐标   和兔子的 位置交换
					this.changeImgAndData(parseInt(index / 9), index % 9, this.people_x, this.people_y); //交换
				}

				/*重新设置兔子的当前位置*/
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
			//兔子可以移动的 方向   把兔子的 坐标传进来
			getMoveCat: function(i, j) {
				console.debug("a") ;
				/*、判断奇数偶数决定两个可不可以走*/
				var shu_arr_9 = []; //存放 所有能走的位置
				//这边的 循环是否是   兔子 能走的 八个点的 区域 （去掉 因为排列后位置 错开的 不能走的两个点  其中的   六个区域的循环）
				//从这八个区域里   筛选  能走的点
				for(var k_1 = i - 1; k_1 <= i + 1; k_1++) {
					for(var k_2 = j - 1; k_2 <= j + 1; k_2++) {
						if(k_1 == i && k_2 == j) { //中间位置不要
							continue;
						}
						//位置超出边界不要  输了
						if(k_1 < 0 || k_1 > 8 || k_2 < 0 || k_2 > 8) {
							return -2;
						}
						//有两个不可能  表示兔子在偶数行
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
						//把能走的坐标算出 一个数 放到 数组中
						shu_arr_9.push(k_1 * 9 + k_2);
					}
				}
				/*3、得到一个可以走的数组，如果这个数组长度为0  没有可以走 的就 胜利了*/
				if(shu_arr_9.length == 0) {
					return -1;
				}
				
				console.debug("brothers , " ,shu_arr_9.join(',')) ;
				/**寻找最短路径*/
				shu_arr_9 = this.getCatMoveStep(shu_arr_9) ;
				//从能走的  数里  随机出一个数 返回
				var index_shu_arr = parseInt(shu_arr_9.length * Math.random());
				return shu_arr_9[index_shu_arr];
			},
			getCatMoveStep :function(array){
				
				var $this = this ;
				var cat = $('ul.box a.styleCat').parent().attr('data-pos') *1;
				/**算出当前猫所在的行*/
				var rows = (cat%9 == 0) ? parseInt(cat/9): Math.ceil(cat/9) ;
				var rightMax = rows*9 - 1 ;
				var leftMin = (rows-1) * 9 ;
				/**判断猫是否已经逃出*/
				if(cat == rightMax || cat == leftMin || 0 >= rows || 9 <= rows){
					return -2 ;
				}
				
				var freakPos = [] ;
				$('ul.box a.freak').each(function(i , n){
					var pos = $(n).parent().attr('data-pos') *1 ;
					freakPos.push(pos) ;
				}) ;
				
				console.debug("障碍物位置 -----> " , freakPos.join(',')) ;
				
				var rsts = [] ;
				/**判断当前行是奇数还是偶数行*/
				var rowEven = (cat%9 == 0) ? ((rows + 1)%2 == 0) :((rows%2)== 0) ;
				/**左上*/
				var lt_offset = rowEven ? -9 :-10 ;
				/**右上*/
				var rt_offset = rowEven ? -8 :-9 ;
				/**左*/
				var l_offset = -1 ;
				/**右*/
				var r_offset = 1 ;
				/**左下*/
				var lb_offset = rowEven ? 9 : 8 ;
				/**右下*/
				var rb_offset = rowEven ? 10 :9 ;
				console.debug(cat  , "    rowEven   " ,rowEven) ;
				
				/**获取右上线路节点*/
				var rtpos = cat*1 + rt_offset*1 ;
				/**存在右上节点*/
				if($.inArray(rtpos, array) != -1){
					var positions = $this.rightTop(cat) ;
					var bool = true ;
					/**判断改线路上是否有障碍物*/
					if(positions && positions.length > 0){
						$.each(positions, function(i , n) {
							if($.inArray(n*1, freakPos) != -1){
								bool = false ;
							} ;
						});
					}
					/**没有障碍物时获取该线路的节点个数*/
					if(bool){
						var l = positions.length ;
						rsts.push(rtpos+"-"+ l) ;
					}
				}
				/**获取左上线路节点*/
				var ltpos = cat*1 + lt_offset*1 ;
				/**存在右上节点*/
				if($.inArray(ltpos, array) != -1){
					var positions = $this.leftTop(cat) ;
					var bool = true ;
					/**判断改线路上是否有障碍物*/
					if(positions && positions.length > 0){
						$.each(positions, function(i , n) {
							if($.inArray(n*1, freakPos) != -1){
								bool = false ;
							} ;
						});
					}
					/**没有障碍物时获取该线路的节点个数*/
					if(bool){
						var l = positions.length ;
						rsts.push(ltpos+"-"+ l) ;
					}
				}
				
				/**获取左边线路节点*/
				var lpos = cat*1 + l_offset*1 ;
				/**存在左边节点*/
				if($.inArray(lpos, array) != -1){
					var positions = $this.left(cat) ;
					var bool = true ;
					/**判断改线路上是否有障碍物*/
					if(positions && positions.length > 0){
						$.each(positions, function(i , n) {
							if($.inArray(n*1, freakPos) != -1){
								bool = false ;
							} ;
						});
					}
					/**没有障碍物时获取该线路的节点个数*/
					if(bool){
						var l = positions.length ;
						rsts.push(lpos+"-"+ l) ;
					}
				}
				
				/**获取右边线路节点*/
				var rpos = cat*1 + r_offset*1 ;
				/**存在左边节点*/
				if($.inArray(rpos, array) != -1){
					var positions = $this.right(cat) ;
					var bool = true ;
					/**判断改线路上是否有障碍物*/
					if(positions && positions.length > 0){
						$.each(positions, function(i , n) {
							if($.inArray(n*1, freakPos) != -1){
								bool = false ;
							} ;
						});
					}
					/**没有障碍物时获取该线路的节点个数*/
					if(bool){
						var l = positions.length ;
						rsts.push(rpos+"-"+ l) ;
					}
				}
				
				/**获取右下线路节点*/
				var rbpos = cat*1 + rb_offset*1 ;
				/**存在左边节点*/
				if($.inArray(rbpos, array) != -1){
					var positions = $this.rightButtom(cat) ;
					var bool = true ;
					/**判断改线路上是否有障碍物*/
					if(positions && positions.length > 0){
						$.each(positions, function(i , n) {
							if($.inArray(n*1, freakPos) != -1){
								bool = false ;
							} ;
						});
					}
					/**没有障碍物时获取该线路的节点个数*/
					if(bool){
						var l = positions.length ;
						rsts.push(rbpos+"-"+ l) ;
					}
				}
				
				/**获取左下线路节点*/
				var lbpos = cat*1 + lb_offset*1 ;
				/**存在左边节点*/
				if($.inArray(lbpos, array) != -1){
					var positions = $this.leftButtom(cat) ;
					var bool = true ;
					/**判断改线路上是否有障碍物*/
					if(positions && positions.length > 0){
						$.each(positions, function(i , n) {
							if($.inArray(n*1, freakPos) != -1){
								bool = false ;
							} ;
						});
					}
					/**没有障碍物时获取该线路的节点个数*/
					if(bool){
						var l = positions.length ;
						rsts.push(lbpos+"-"+ l) ;
					}
				}
				
				console.debug(" rsts --- > " , rsts.join(",")) ;
				
				if(rsts && rsts.length > 0){
					var shortLine = [] ;
					var p = rsts[0].split('-')[0];
					var s = rsts[0].split('-')[1];
					$.each(rsts ,function(i ,n){
						var _p = n.split('-')[0];
						var _s = n.split('-')[1];
						if( 0 < (s*1 - _s*1)){
							p = _p ;
							s = _s ;
						}
//						console.debug("_p ->  " , _p , "  ,  _s -> " ,_s) ;
					});
					console.debug("p ->  " , p , "  ,  s -> " ,s) ;
					
					shortLine.push(p) ;
					return shortLine ;
				}else{
					return array ;
				}
			
			},
			/**右上路线*/
			rightTop :function (cat){
				
				var rows = (cat%9 == 0) ? Math.ceil(cat/9) + 1 : Math.ceil(cat/9) ;
				var rightTopArray = [] ;
				if(rows < 2 ){
					return rightTopArray ;
				}
				console.debug("rows --- > " ,rows) ;
				/**判断猫是否在当前行的中心**/
				var rowMiddle = (rows -1)*9 + 4 ;
				var nodes = 0 ; 
				var step = 0 ;
				/**中间或中间偏右*/
				if(rowMiddle >= cat){
					nodes = rows ;
					step = (nodes%2 == 0) ?8 :9;
				}
				/**中间偏左*/
				else{
					var rowMax = rows*9 - 1 ;
					nodes = 2*(rowMax-cat) + 1 ;
					nodes = (rows%2 == 0) ? nodes :nodes + 1 ;
					step = (nodes%2 != 0) ?8 :9;
				}
			//console.debug("nodes --- > " ,nodes) ; 
				
				var pos = cat ;
				for(var i = 0 ; i< nodes-1 ;i++){
					pos = pos - step;
					if(pos<0){
						return rightTopArray ;
					}
					rightTopArray.push(pos) ;
					step = (step==8) ? 9 :8 ;
				}
				return rightTopArray;
			},


			/**左上路线*/
			leftTop :function (cat){
				var rows = (cat%9 == 0) ? Math.ceil(cat/9) + 1 : Math.ceil(cat/9) ;
				console.debug("rows --- > " ,rows) ;
				var leftTopArray = [] ;
				if(rows < 2 ){
					return leftTopArray ;
				}
				/**判断猫是否在当前行的中心**/
				var rowMiddle = (rows -1)*9 + 4 ;
				var nodes = 0 ; 
				/**中间或中间偏左*/
				if(rowMiddle <= cat){
					nodes = rows ;
				}
				/**中间偏右*/
				else{
					var rowMin = (rows-1)*9;
					nodes = 2*(cat-rowMin) ;
					nodes = (rows%2 == 0) ? nodes+2 :nodes + 1 ;
				}
			//console.debug("nodes --- > " ,nodes) ; 
				var step = (nodes%2 == 0) ? 9 :10;
				var pos = cat ;
				for(var i = 0 ; i< nodes-1 ;i++){
					pos = pos - step;
					leftTopArray.push(pos) ;
					step = (step == 9 ) ? 10 : 9 ;
				}
				return leftTopArray;
			},
			
			
			/**左下路线*/
			leftButtom :function (cat){
				var rows = (cat%9 == 0) ? Math.ceil(cat/9) + 1 : Math.ceil(cat/9) ;
				console.debug("rows --- > " ,rows) ;
				var leftButtomArray = [] ;
				if(rows >= 9 ){
					return leftButtomArray ;
				}
				/**判断猫是否在当前行的中心**/
				var rowMiddle = (rows -1)*9 + 4 ;
				var nodes = 0 ; 
				/**中间或中间偏左*/
				if(rowMiddle <= cat){
					nodes = 9 - rows+1 ;
				}
				/**中间偏右*/
				else{
					var rowMin = (rows-1)*9;
					nodes = 2*(cat-rowMin) ;
					nodes = (rows%2 == 0) ? nodes+2 :nodes + 1 ;
				}
			//console.debug("nodes --- > " ,nodes) ; 
				var step = (nodes%2 == 0) ? 9 :8;
				var pos = cat ;
				for(var i = 0 ; i< nodes-1 ;i++){
					pos = pos + step;
					leftButtomArray.push(pos) ;
					step = (step == 9 ) ? 8 : 9 ;
				}
				return leftButtomArray;
			},

			/**右下路线*/
			rightButtom:function (cat){
				var rows = (cat%9 == 0) ? Math.ceil(cat/9) + 1 : Math.ceil(cat/9) ;
			//	console.debug("rows --- > " ,rows) ;
				var rightButtomArray = [] ;
				if(rows >= 9 ){
					return rightButtomArray ;
				}
				/**判断猫是否在当前行的中心**/
				var rowMiddle = (rows -1)*9 + 4 ;
				var nodes = 0 ; 
				var step = 0 ;
				/**中间或中间偏右*/
				if(rowMiddle >= cat){
					nodes = 9 - rows + 1 ;
					step = (nodes%2 != 0) ?9 :10;
				}
				/**中间偏左*/
				else{
					var rowMax = rows*9 - 1 ;
					nodes = 2*(rowMax-cat);
					nodes = (rows%2 == 0) ? nodes :nodes + 1 ;
					step = (nodes%2 != 0) ?9 :10;
				}
			//console.debug("nodes --- > " ,nodes) ; 
				
				var pos = cat ;
				for(var i = 0 ; i< nodes-1 ;i++){
					pos = pos + step;
					if(pos> 80){
						return rightButtomArray ;
					}
					rightButtomArray.push(pos) ;
					step = (step==9) ? 10 :9 ;
				}
				return rightButtomArray;
			},


			/**左边路线*/
			left:function (cat){
				var rows = (cat%9 == 0) ? Math.ceil(cat/9) + 1 : Math.ceil(cat/9) ;
			//	console.debug("rows --- > " ,rows) ;
				var leftArray = [] ;
				var rowMin = (rows -1)*9;
				
				if(rowMin < cat){
					var nodes = cat - rowMin;
					for(var i = 1 ; i <= nodes ;i++){
						var pos = cat - i ;
						leftArray.push(pos) ;
					}
				}
				return leftArray;
			},

			/**右边路线*/
			 right:function(cat){
				var rows = (cat%9 == 0) ? Math.ceil(cat/9) + 1 : Math.ceil(cat/9) ;
			//	console.debug("rows --- > " ,rows) ;
				var rightArray = [] ;
				var rowMax = rows*9 - 1 ;
				
				if(rowMax > cat){
					var nodes = rowMax - cat ;
					for(var i = 1 ; i <= nodes ;i++){
						var pos = cat + i ;
						rightArray.push(pos) ;
					}
				}
				return rightArray;
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
				//两个兔子的 图片来回交换
				setTimeout(function(){
						var dataNum = $(".styleCat #imgSty").attr('data-s');
						if(dataNum == 1){
							$(".styleCat #imgSty").attr('src','images/act_16roundRabbit_index_rabbit2.png');
						}else{
							$(".styleCat #imgSty").attr('src','images/act_16roundRabbit_index_rabbit1.png');
						}
						dataNum = dataNum * (-1);
						 $(".styleCat #imgSty").attr('data-s',dataNum);
					//	 console.log("dataNum    ",dataNum);
						 //如果开始调用定时器
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
	$("#playAgain").on("tap", function(e) {
		if(speller.isOver == 1) {
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
//			$("#shareFriSha").css("height", $(".content").height());
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