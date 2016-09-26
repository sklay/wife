$(function() {
	var target = 0 ;
	var audio_music = document.getElementById('audioBackMusic');
	var blackStore = [1,2,11,12,24,29,31,34] ;
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
	$("#startGame").on("tap", function() {
		$(".startGameBtnWrap").hide();
		console.debug("game start");
		gameStart();

	});

	/* 游戏主函数 */
	function gameStart() {
		//	timeCountDownFun();
			games();
			//TODO 先注释音乐 调试的时候太吵了
//		if(playMusic) {
//			$('.gameMusic_wrap').show().find('img').removeClass('musicPause').addClass('musicPlay');
//			audio_music.play();
//		}

	};
//	var people_x = 5;
//	var people_y = 5;
	//n表示 关数
	function games() {

		speller = {
			init: function() {
					this.people_x = 4;
					this.people_y = 4;
					//0：占位透明图，1：墙，2：可移动的箱子，3：可移动的小人
					this.tArray = [
						["1", "0", "0", "1", "1", "1"],
						["1", "0", "0", "0", "0", "0"],
						["0", "0", "0", "1", "2", "1"],
						["0", "2", "0", "0", "0", "1"],
						["0", "0", "2", "2", "3", "0"],
						["1", "0", "0", "0", "0", "1"],
					];
					//判断是否胜利点的坐标      二维数组mArray[0][0] 横坐标   mArray[0][1] 纵坐标
					//比如：this.tArray[mArray[0][0]][mArray[0][1]] = 0;
					this.mArray = [
						[0, 1],
						[0, 2],
						[1, 3],
						[3, 4],
					];

				//this.imageName = 'images/act_16seventhDay_game_pt-{index}.png';
				//  九个格子的位置
				this.positions = [];
				this.positions2 = [];
				//默认难易度    如果  n 没有传 则是5 （黑块 移动on个次数）
				//this.hard = n || 5;

				//this.step = 0;  记录 移动的步 数
				this.blank = 6;
				this.useTime = 15;
				this.tag = 'li';
				this.content = 'ul.box';
				this.content2 = 'ul.box2';
				this.lastIndex = this.blank;
				//初始化 布局
//				this.creatBJ();
				this.createGrid();
				//倒计时
			//	this.clearShu();
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
					var countDownShowW = Math.ceil(speller.useTime / 15 * 100);
					$("#gameCountDownTime").html(speller.useTime);
					$("#gameCountDownColor").css({
						"width" : countDownShowW + "%"
					});

				}, 1000);
			},
			
			// 调用模版  构建 初始化数据 
			createGrid: function() {
				
				var _speller = this ;
				
				for(var i = 0; i < 6; i++) {
					for(var j = 0; j < 6; j++) {
//						console.log(i + "    " + j);
						var m = this.tArray[i][j];
						//console.log(m);
						var posData = {};
						posData.pos = i;
						posData.flag = m ;
						//9：黑图，0：占位透明图，1：白墙，2：可移动的箱子，3：可移动的小人
						if(m == 1) {
							//白色墙面区域
							posData.image = 'images/act_16pushBox_1.png';
							posData.css = 'imgHide';
						}
						else if(m == 2) {
							//箱子的 位置
							posData.image = 'images/act_16pushBox_2.png';
						} else if(m == 3) {
							//小人的位置
							posData.image = 'images/act_16pushBox_3.png';
						} 
						else {
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
					var boxPos = $(this).attr('data-pos') * 1;
					var rowLine = (boxPos % 6 == 0) ? Math.ceil(boxPos / 6) + 1 : Math.ceil(boxPos / 6);
					var rowMin = (rowLine-1)*6 ;
					var rowMax = rowLine*6-1 ;
					target = boxPos ;
					var $this = $(this);
//					console.log(this.people_x+"，"+this.people_y);
					
					var personPos = $('a[data-flag=3]').parent().attr('data-pos') *1;
					
					
					var differ = personPos - boxPos ;
					
					/**点击的是四周邻居*/
					if(Math.abs(differ) == 6 || Math.abs(differ) == 1){
						/**点击的是 道路 或者 旗子*/
						if($this.find('a[data-flag=0]').length > 0){
							console.debug("道路 或 旗帜") ;
							_speller.exChange(boxPos,personPos) ;
						}
						/**木箱子 就要判断该线路下一个 */
						else if($this.find('a[data-flag=2]').length > 0){
							
							switch (differ){
								/**往上走**/
								case 6:{
									/**箱子要移动的新位置*/
									var boxNextPos = boxPos  - 6 ;
									
									console.debug("往上走    boxNextPos ---->" + boxNextPos) ;
									/**判断箱子的下一个位子是否能移动*/
									if($('li[data-pos='+boxNextPos+'] a[data-flag=0]').length > 0){
										console.debug("往上走    可以走 ") ;
										/**箱子跟人都往上跑一格*/
										_speller.exChange(boxPos,boxNextPos) ;
										_speller.exChange(boxPos,personPos) ;
									}
								}
									break;
									/**往右走**/
								case -1:{
									var boxNextPos = boxPos  + 1 ;
									/**溢出右边界*/
									if(boxNextPos > rowMax){
										return ;
									}
									/**判断箱子的下一个位子是否能移动*/
									if($('li[data-pos='+boxNextPos+'] a[data-flag=0]').length > 0){
										/**箱子跟人都往上跑一格*/
										_speller.exChange(boxPos,boxNextPos) ;
										_speller.exChange(boxPos,personPos) ;
									}
								}
									break;
									/**往下走**/
								case -6:{
									var boxNextPos = boxPos  + 6 ;
									/**判断箱子的下一个位子是否能移动*/
									if($('li[data-pos='+boxNextPos+'] a[data-flag=0]').length > 0){
										/**箱子跟人都往上跑一格*/
										_speller.exChange(boxPos,boxNextPos) ;
										_speller.exChange(boxPos,personPos) ;
									}
								}
									break;
									/**往左走**/
								case 1:{
									var boxNextPos = boxPos  - 1 ;
									if(boxNextPos < rowMin){
										return ;
									}
									/**判断箱子的下一个位子是否能移动*/
									if($('li[data-pos='+boxNextPos+'] a[data-flag=0]').length > 0){
										/**箱子跟人都往上跑一格*/
										_speller.exChange(boxPos,boxNextPos) ;
										_speller.exChange(boxPos,personPos) ;
									}
								}
									break;
								default:
									break;
							}
						}
						
					}
					/**跳走*/
					else {
						var canGo = _speller.canGo(personPos) ;
						console.debug(" canGo is " + canGo) ;
						if(canGo){
							_speller.exChange(boxPos,personPos) ;
						} 
					}
					
				});

			},

			exChange:function(source ,target){
				var $blank = $(this.content).find(this.tag).eq(source);
				var $nBlank = $(this.content).find(this.tag).eq(target);
				var $blankA = $blank.children().clone(false);
				var $nBlankA = $nBlank.children().clone(false);

				$nBlank.html($blankA);
				$blank.html($nBlankA);
				
				this.checkDown() ;
			},
			
			checkDown :function(){
				var temp = 0 ;
				var boxs = $('li a[data-flag=2]') ;
				var boxLength = boxs.length ;
				/***/
				$.each(boxs, function(i ,box){
					var pos = $(box).parent().attr('data-pos')*1;
					if($.inArray(pos ,blackStore) != -1){
						temp ++ ;
					}
				})
				if(temp == boxLength){
					console.debug("无路可走") ;
				}
				
			},
			
			//点击游戏小图片时，传入相应位置。例，4，5
			onClickByIndex: function(i, j) {
//              console.log("onClickByIndex-->"+i+","+j+",this.tArray[i][j]-->"+this.tArray[i][j]);
				//				alert(i+","+j);
				if(this.tArray[i][j] == 1 || this.tArray[i][j] == 3) {
					//点的是墙或自己人物，或黑色区域
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
//					var Pindex = this.getMovePeople(i, j); //0表示不能移动，1左，2上，3下，4右。
					//剩下的任意位置都能交换  所以不用判断和哪个方位交换
//					if(this.tArray[i+1][j] == 1 && this.tArray[i][j-1] == 2 ){
//						//TOBO 这边出现问题   原因是没有判断边界的位置
//						//上下边是墙  左边是箱子
//						console.log("我点击的 是空白位置2")
//						return; 
//					}
//					if(this.tArray[i-1][j] == 1 && this.tArray[i+1][j] == 1 && this.tArray[i][j-1] == 2 ){
//						//TOBO 这边出现问题   原因是没有判断边界的位置
//						//上下边是墙  左边是箱子
//						console.log("我点击的 是空白位置2")
//						return; 
//					}
//					else if(this.tArray[i-1][j] == 2 && this.tArray[i][j-1] == 2 && this.tArray[i][j+1] == 1){
//						//上面是 箱子  左边是 箱子  右面是 墙
//						return; 
//					}
//					else if(this.tArray[i-1][j] == 2 && this.tArray[i][j+1] == 2 && this.tArray[i][j-1] == 1){
//						//上面是箱子  右边是箱子  左边是墙
//						return; 
//					}else if(this.tArray[i-1][j] == 2 && this.tArray[i][j+1] == 2 && this.tArray[i+1][j] == 1){
//						//上面是箱子  右边是箱子  下边是墙
//						return; 
//					}
//					else if(this.tArray[i-1][j] == 1 && this.tArray[i][j+1] == 2 && this.tArray[i+1][j] == 2){
//						//上面是墙    右边是箱子  下边是箱子
//						return; 
//					}else if(this.tArray[i-1][j] == 1 && this.tArray[i+1][j] == 2 && this.tArray[i][j-1] == 2&& this.tArray[i][j+1] == 2){
//						//上面是 墙  其他三面是  箱子
//						return; 
//					}
//					else if(this.tArray[i-1][j] == 1 && this.tArray[i+1][j] == 1 && this.tArray[i][j-1] == 2&& this.tArray[i][j+1] == 2){
//						//上下面是   左右是箱子
//						return; 
//					}
//					else{
						/*（注意，顺序不能错，先交换物，再交换箱子）*/
						/*人物位置数据与当前点击的位置数据进行交换。*/
//						console.log("人物位置数据与当前点击的位置数据进行交换。this.people-->"+(this.people_x)+","+this.people_y);
						this.changeImgAndData(i, j, this.people_x, this.people_y);
						/*设置人的当前位置*/
						this.people_x = i;
						this.people_y = j;
						console.log("设置人的当前位置。this.people-->"+this.people_x+","+this.people_y);
//					}
					//循环寻找邻居，看点击的位置及他的邻居 及邻居的邻居是否有通路，如果有 通路人物就能跟点击的位置进行交换
					//调一个  cango  的方法
					//TODO  未完善
//					var index = cango();
//					if(index == -1){
//						rerurn;
//					}else{
//						console.log("人物位置数据与当前点击的位置数据进行交换。this.people-->"+(this.people_x)+","+this.people_y);
						this.changeImgAndData(i, j, this.people_x, this.people_y);
						/*设置人的当前位置*/
						this.people_x = i;
						this.people_y = j;
//						console.log("设置人的当前位置。this.people-->"+this.people_x+","+this.people_y);
//					}
					
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
			//根据下标交换图片与数据
			changeImgAndData: function(i1, j1, i2, j2) {
				/*1、交换图片，其中数据为0的图片是秀明的*/
				//图片的交换
				var imgId1 = i1 * 6 + j1;
				var imgId2 = i2 * 6 + j2;
				var imgori;

				//图片的位置
//				console.log("==changeImgAndData,imgId1-->"+imgId1+",this.tag)-->"+this.tag);
				var $blank = $(this.content).find(this.tag).eq(imgId1);
//				console.log("==changeImgAndData,$blank-->"+$blank);
				//图片2位置
//				console.log("==changeImgAndData,imgId1-->"+imgId2+",this.tag)-->"+this.tag);
				var $nBlank = $(this.content).find(this.tag).eq(imgId2);
//				console.log("==changeImgAndData,$blank-->"+$nBlank);
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
				//this.mArray[i][0] 取的是 二维数据mArray 的横坐标的值
				//this.mArray[i][1]] 取的是 二维数据mArray 的纵坐标的值
				//根据 上面坐标的值   二维数据找出 tArray 对应的位置上的值   如果不是2  说明 箱子还没有移到国旗的位置，否则游戏胜利
				for(var i = 0; i < this.mArray.length; i++) {
					if(this.tArray[this.mArray[i][0]][this.mArray[i][1]] != 2) {
						//判断箱子是不是可以移动   可以给一个限制的时间   比如 30秒内 没有箱子移动了 
						return;
					}
				}
//				alert("成功了");
				$(".gameSuccWrap").fadeIn(500);
			},
			canGo : function(cat) {
				var rst = [] ;
				var freakPos = [];
				var allPos = [] ;
				$('li a[data-flag=2]').each(function(i, n) {
					var pos = $(n).parent().attr('data-pos') * 1;
					freakPos.push(pos);
				});
				$('li a[data-flag=1]').each(function(i, n) {
					var pos = $(n).parent().attr('data-pos') * 1;
					freakPos.push(pos);
				});
				console.debug("障碍物位置 ++++++++ ", freakPos.join(','));
				
				var ignoreArr=[]; 
    			var toDealWithArr=[cat]; 
				while(true){
			        if(toDealWithArr.length<1){
			            return false;
			        }else{
			            var _first = toDealWithArr.shift() *1;
			            ignoreArr.push(_first);
			            if($.inArray(_first ,freakPos) == -1 && this.isCircleAtEdge(_first)*1){
			            	console.debug("allPos s->" + allPos) ;
			            	return true;
			            }else{
			            	var temp = [] ;
			                for(var i=0;i<=3;i++){
			                    var nbr= this.getCircleNeighbor(_first,i);
			                    if(nbr < 0 ){
			                    	continue ;
			                    }
			                    if( nbr > 35){
			                    	continue ;
			                    }
			                    if(!( $.inArray(nbr,ignoreArr) > -1 || $.inArray(nbr,toDealWithArr) > -1 )){
				                    if($.inArray(nbr ,freakPos) != -1){
				                        ignoreArr.push(nbr);
				                    }else{
				                        toDealWithArr.push(nbr);
				                         /**没有障碍物*/
				                    	temp.push(nbr+"") ;
				                    }
			                    }
			                }
		                    allPos.push(_first +"|"+temp.join(',')) ;
			            }
			        }
			    }
			},
			/*
			判断传入的circle是否在边界上
			 */
			isCircleAtEdge :function(cat){
				
				if(target*1 == cat*1){
					return true ;
				}
				
				return false ;
				var rows = (cat % 6 == 0) ? Math.ceil(cat / 6) + 1 : Math.ceil(cat / 6);
				console.debug('row is  ' , rows) ;
				/**第一行 或 最后一行*/
				if(1 == rows || 7 == rows){
					return true ;
				}
				/**中间行*/
				var min = (rows-1)*6 ;
				var max = rows*6 - 1 ;
				if(min == cat || max == cat){
					return true ;
				}
				/**不在边缘*/
				return false ;
			},
			
			getCircleNeighbor :function(cat ,direction ){
				cat = cat*1 ;
				var rows = (cat % 6 == 0) ? Math.ceil(cat / 6) + 1 : Math.ceil(cat / 6);
			
				console.debug("math  row -->  " +Math.ceil(cat / 6)) ;
				/**中间行*/
				var min = (rows-1)*6 ;
				var max = rows*6 - 1 ;
				
		        switch (direction){
		        	case 0: //左
		             	return   pos = cat - 1 < min ? -1 :cat - 1 ;
		            case 1: //右
		             	return   pos = cat + 1 > max ? -1 :cat + 1 ;
		            case 2: //上
		             	 return  pos = cat - 6 < 0 ? -1 :cat - 6;
		            case 3: //下
		              	return  pos = cat + 6 > 35 ? -1 :cat + 6;
		              	//左上
		            case 4: {
		            	if(rows == 1 || rows == 7 || min == cat || max == cat){
		            		return -1 ;
		            	}
		            	return  cat - 7; 
		            }
		              	 //左下
		            case 5:{
		            	if(rows == 1 || rows == 7 || min == cat || max == cat){
		            		return -1 ;
		            	}
		            	return  cat + 5; 
		            }
		            	//右上
		            case 6: {
		            	if(rows == 1 || rows == 7 || min == cat || max == cat){
		            		return -1 ;
		            	}
		            	return  cat - 5; 
		            }
		              //右下
		            case 7: {
		            	if(rows == 1 || rows == 7 || min == cat || max == cat){
		            		return -1 ;
		            	}
		            	return  cat + 7; 
		            } 
		              	
		            default:
		            return -1 ;
		        }
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
	$(".shareAppPage_shareFir").on("tap", function() {
		if(isLogin()) {
			s(0);
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});
	$(".shareAppPage_friRound").on("tap", function() {
		if(isLogin()) {
			s(1)
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});
	
})