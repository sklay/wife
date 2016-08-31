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

				//  九个格子的位置
				this.positions = [];
				this.zaw = [];
				//默认难易度    如果  n 没有传 则是5 （黑块 移动on个次数）

				this.step = 0;  //记录 移动的步 数
				this.blank = 8;
				this.tag = 'li';
				this.content = 'ul.box';
				
				if(!this.lastIndex) this.lastIndex = [];
				
				//初始化 布局
				this.creatMax();
				
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
				
				
					for(var i = 0 ;i< 7;i++){//这种算法叫做“洗牌算法”
						//找到某个随机数 作为下标
						var index = Math.floor(Math.random()*(dot_num.length-i));
						//如果下标是 41 表示该位置   是  猫的 位置   不参与 交换
						if(index == 41){
							i--;
							continue;
						}
						console.log('index-->'+index);
						//交换  根据上面找到的下标   和 最后一个数 做交换     
						var t = dot_num[index];
						dot_num[index] = dot_num[dot_num.length-1-i];
						dot_num[dot_num.length-1-i] = t;
						//把所有的 障碍的点存在这个数组中
//						this.zaw.push(t);
						this.zaw.push(t);
						//t/9 表示行   9  表示列    t%9 表示列  最后找到的  7的  数    ，把这七个 坐标中的 值 改为1
						 this.tArray [parseInt(t/9)][t%9] = 1;
					}

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
					var posi = parseInt(pos / 9);
					var posj = pos % 9;
					//如果不是0 的  不可以走
					if(speller.tArray[posi][posj] != 0) {
						return;
					}
					//把当前点击的 位置变成障碍物
					$(this).find("a").css("background", "#4E6F9F");
					//并且改变里面的数据
					speller.tArray[posi][posj] = 2;
					//					speller.onClickByIndex(posi,posi);
					speller.onClickByIndex();
				});
				
				 
				for(var i = 0 ;i < 9; i++){
					for(var j = 0 ;j<9; j++){
            			  //表示偶数行
						if(j%2 == 0){
							$("#img"+(((i*2)+1)*9)).css({marginLeft:".32rem"});
						}
					}
				}
			},

			onClickByIndex: function(){
				//点击时传入兔子的 当前位置
				var curPos = this.people_x*9+this.people_y;
				var curIndex = speller.curRabbit(curPos);
				 console.log("this.people_x    ",this.people_x);
				var curposi = parseInt(curIndex / 9);
				var curposj = curIndex % 9;
				
				this.changeImgAndData(curposi, curposj, this.people_x, this.people_y); //交换
			
				/*重新设置兔子的当前位置*/
				this.people_x = curposi;
				this.people_y = curposj;
				
			},
			curRabbit: function(cur) {
				var next = [];
				var longStep = 8; //走的最长的 步数
	
				//六个点  的递归
				//往左走
				if($.inArray((cur - 1), this.zaw)<0) {
					var s = this.getMoveCat(cur - 1,s,this.lastIndex[cur]);
					if(s == 0) {
						return cur - 1;
					}
					if(longStep > s) {
						next = [];
						next.push(cur - 1);
					} else if(longStep = s) {
						next.push(cur - 1);
					}
				}
				//往右走
				if($.inArray(cur + 1, this.zaw)<0) {
					var s = this.getMoveCat(cur + 1,s,this.lastIndex[cur])
					if(s == 0) {
						return cur + 1;
					}
					if(longStep > s) {
						next = [];
						next.push(cur + 1);
					} else if(longStep = s) {
						next.push(cur + 1);
					}
				}
				//左上
				if((cur%9)%2 == 0){
					if($.inArray(cur - 9, this.zaw)<0) {
						var s = this.getMoveCat(cur - 9,s,this.lastIndex[cur])
						if(s == 0) {
							return cur - 9;
						}
						if(longStep > s) {
							next = [];
							next.push(cur - 9);
						} else if(longStep = s) {
							next.push(cur - 9);
						}
					}
				}else{
					if($.inArray(cur - 10, this.zaw)<0) {
						var s = this.getMoveCat(cur - 10,s,this.lastIndex[cur])
						if(s == 0) {
							return cur - 10;
						}
						if(longStep > s) {
							next = [];
							next.push(cur - 10);
						} else if(longStep = s) {
							next.push(cur - 10);
						}
					}
				}
				//右上
				if((cur%9)%2 == 0){
					if($.inArray(cur - 8, this.zaw)<0) {
						var s = this.getMoveCat(cur - 8,s,this.lastIndex[cur])
						if(s == 0) {
							return cur - 8;
						}
						if(longStep > s) {
							next = [];
							next.push(cur - 8);
						} else if(longStep = s) {
							next.push(cur - 8);
						}
					}
				}else{
					if($.inArray(cur - 9, this.zaw)<0) {
						var s = this.getMoveCat(cur - 9,s,this.lastIndex[cur])
						if(s == 0) {
							return cur - 9;
						}
						if(longStep > s) {
							next = [];
							next.push(cur - 9);
						} else if(longStep = s) {
							next.push(cur - 9);
						}
					}
				}
				//右下
				if((cur%9)%2 == 0){
					if($.inArray(cur + 10, this.zaw)<0) {
						var s = this.getMoveCat(cur +10,s,this.lastIndex[cur])
						if(s == 0) {
							return cur + 10;
						}
						if(longStep > s) {
							next = [];
							next.push(cur + 10);
						} else if(longStep = s) {
							next.push(cur + 10);
						}
					}
				}else{
					if($.inArray(cur + 9, this.zaw)<0) {
						var s = this.getMoveCat(cur + 9,s,this.lastIndex[cur])
						if(s == 0) {
							return cur + 9;
						}
						if(longStep > s) {
							next = [];
							next.push(cur + 9);
						} else if(longStep = s) {
							next.push(cur + 9);
						}
					}
				}
				
				if((cur%9)%2 == 0){
					if($.inArray(cur + 9, this.zaw)<0) {
						var s = this.getMoveCat(cur + 9,s,this.lastIndex[cur])
						if(s == 0) {
							return cur + 9;
						}
						if(longStep > s) {
							next = [];
							next.push(cur + 9);
						} else if(longStep = s) {
							next.push(cur + 9);
						}
					}
				}else{
					if($.inArray(cur + 8, this.zaw)<0) {
						var s = this.getMoveCat(cur + 8,s,this.lastIndex[cur])
						if(s == 0) {
							return cur + 8;
						}
						if(longStep > s) {
							next = [];
							next.push(cur + 8);
						} else if(longStep = s) {
							next.push(cur + 8);
						}
					}
				}
	
				if(next.length > 0) {
					return next[Math.random(next.length - 1)];
				}
			},

		

			//兔子可以移动的  方向  返回每个方向上 移动的最少的步数  
			getMoveCat: function(dotNum,steps,lastIndex) {
				if(!steps) steps = 0;
//				if(!lastIndex) lastIndex = [];
	
				//表示游戏结束 parseInt(dotNum / 9)
				if (parseInt(dotNum / 9) == 0 || parseInt(dotNum / 9) == 8 || dotNum%9 == 0 || dotNum%9 == 8){
					console.log("输了");
					return steps;
				}
				var s = 100;
				this.lastIndex.push(dotNum);
				//共有六个方向  rt -1  左边这个方向 上的点如果不包含在障碍物里    递归 ，找出这个方向要走几步
				if($.inArray(dotNum - 1, this.zaw)<0 && $.inArray(dotNum - 1,this.lastIndex)<0) {
					//向左走是几步
					var b = [];
					$.each(this.lastIndex, function(i, o) {
						b.push(o);
					});
					stepNum = this.getMoveCat(dotNum-1,steps + 1,b)
					if(stepNum>s){
						return stepNum
					}
//					stepNum = min(this.getMoveCat(dotNum-1,steps + 1,b), s);
				}
				if($.inArray(dotNum + 1, this.zaw)<0 && $.inArray(dotNum + 1,this.lastIndex)<0) {
					//向右是几步
					var b = [];
					$.each(this.lastIndex, function(i, o) {
						b.push(o);
					});
					stepNum = this.getMoveCat(dotNum-1,steps + 1,b)
					if(stepNum>s){
						return stepNum
					}
				}
				
				if((dotNum%9)%2 == 0){
					if($.inArray(dotNum - 9, this.zaw)<0 && $.inArray(dotNum - 9,this.lastIndex)<0) {
						//向左上走是几步
						var b = [];
						$.each(this.lastIndex, function(i, o) {
							b.push(o);
						});
						stepNum = this.getMoveCat(dotNum-1,steps + 1,b)
						if(stepNum>s){
							return stepNum
						}
					}
				}else{
					if($.inArray(dotNum - 10, this.zaw)<0 && $.inArray(dotNum - 10,this.lastIndex)<0) {
						//向左上走是几步
						var b = [];
						$.each(this.lastIndex, function(i, o) {
							b.push(o);
						});
						stepNum = this.getMoveCat(dotNum-1,steps + 1,b)
						if(stepNum>s){
							return stepNum
						}
					}
				}
				
				if((dotNum%9)%2 == 0){
					if($.inArray(dotNum - 8, this.zaw)<0 && $.inArray(dotNum - 8,this.lastIndex)<0) {
						//向右上走是几步
						var b = [];
						$.each(this.lastIndex, function(i, o) {
							b.push(o);
						});
						stepNum = this.getMoveCat(dotNum-1,steps + 1,b)
						if(stepNum>s){
							return stepNum
						}
					}
				}else{
					if($.inArray(dotNum - 9, this.zaw)<0 && $.inArray(dotNum - 9,this.lastIndex)<0) {
						//向右上走是几步
						var b = [];
						$.each(this.lastIndex, function(i, o) {
							b.push(o);
						});
						stepNum = this.getMoveCat(dotNum-1,steps + 1,b)
						if(stepNum>s){
							return stepNum
						}
					}
				}
				
				if((dotNum%9)%2 == 0){
					if($.inArray(dotNum + 10, this.zaw)<0 && $.inArray(dotNum + 10,this.lastIndex)<0) {
						//向右下是几步
						var b = [];
						$.each(this.lastIndex, function(i, o) {
							b.push(o);
						});
						stepNum = this.getMoveCat(dotNum-1,steps + 1,b)
						if(stepNum>s){
							return stepNum
						}
					}
				}else{
					if($.inArray(dotNum -+ 9, this.zaw)<0 && $.inArray(dotNum + 9,this.lastIndex)<0) {
						//向右下是几步
						var b = [];
						$.each(this.lastIndex, function(i,o) {
							b.push(o);
						});
						stepNum = this.getMoveCat(dotNum-1,steps + 1,b)
						if(stepNum>s){
							return stepNum
						}
					}
				}
				
				if((dotNum%9)%2 == 0){
					if($.inArray(dotNum + 9, this.zaw)<0 && $.inArray(dotNum + 9,this.lastIndex)<0) {
						//向左下是几步
						var b = [];
						$.each(this.lastIndex, function(i, o) {
							b.push(o);
						});
						stepNum = this.getMoveCat(dotNum-1,steps + 1,b)
						if(stepNum>s){
							return stepNum
						}
					}
				}else{
					if($.inArray(dotNum + 8, this.zaw)<0 && $.inArray(dotNum + 8,this.lastIndex)<0) {
						//向左下是几步
						var b = [];
						$.each(this.lastIndex, function(i, o) {
							b.push(o);
						});
						stepNum = this.getMoveCat(dotNum-1,steps + 1,b)
						if(stepNum>s){
							return stepNum
						}
					}
				}
//				return stepNum;
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
			}

		}

		speller.init();
	}

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

})