$(function() {

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
				this.tArray = [];
				// 81个圈的位置
				this.positions = [];

				this.blank = 8;
				this.tag = 'li';
				this.content = 'ul.box';
				/**正常普通的圆*/
				this.circles = "normal" ;
				/**障碍物*/
				this.obstacle = "freak" ;
				/**兔子*/
				this.people = "styleCat" ;
				
				this.lastIndex = this.blank;
				// 初始化 布局
				this.x = 9 ;
				this.y = 9 ;
				this.creatMax();
			},

			// 调用模版 构建 初始化数据
			creatMax : function() {
				
				var allPoints = [];
				
				for (var _i = 0; _i < this.x; _i++) {
					
					for (var _j = 0;  _j < this.y; _j++) {
						var point = {} ;
						var index = _i * 9  + _j ;
						var x_y = _i +'-'+ _j ;
						point.coordinate = x_y ;
						point.index = index ;
						point.css = this.circles ;
						
						if(this.people_x == _i && this.people_y== _j ){
							point.css = this.people ;
						}
						
						point.left = (_j % 2 == 0 && _i % 2 != 0 && _j == 0) ? 'm-l-3' :'' ;
						allPoints.push(point) ;
					}
				}
				
				/**随机生成障碍物*/
				allPoints = this.randomObstacle(allPoints) ;
				
				/**生成画布*/
				this.drawing(allPoints) ;
				
			},	
			randomObstacle :function(allPoints){
				
				var _people = this.people ;
				var _circles = this.circles ;
				var _obstacle = this.obstacle ;
				
				var tp = [] ;
				var freaks = [] ;
				/**上两行障碍物*/
				var count = Math.floor( Math.random()*3) + 3 ;
				for(var i = 0 ; i < count ;i++ ){
					var c = true ;
					while(c){
						var _pos = Math.floor( Math.random()*18) ;
						var point = allPoints[_pos] ;
						if($.inArray(point.coordinate , freaks) == -1){
							c = false ;
							tp.push(point.coordinate) ;
							point.css = _obstacle ;
							allPoints[_pos] = point ;
							
//							console.debug("pos -> 上    " ,_pos) ;
						}
					}
				}
				
				freaks = freaks.concat(tp) ;
				tp = [] ;
				
				/**下两行障碍物*/
				count = Math.floor( Math.random()*3) + 3 ;
				for(var i = 0 ; i < count ;i++ ){
					var c = true ;
					while(c){
						var _pos = Math.floor( Math.random()*18) ;
						var x = parseInt(_pos/9) + 7 ;
						var y = (_pos%9) ;
						_pos = 9*x + y*1 ;
						
						var point = allPoints[_pos] ;
						if($.inArray(point.coordinate , freaks) == -1){
							c = false ;
							tp.push(point.coordinate) ;
							point.css = _obstacle ;
							allPoints[_pos] = point ;
							
//							console.debug("pos -> 下    " ,_pos) ;
						}
					}
				}
				freaks = freaks.concat(tp) ;
				tp = [] ;
				
				/**左两行障碍物*/
				count = Math.floor( Math.random()*3) + 3 ;
				for(var i = 0 ; i < count ;i++ ){
					var c = true ;
					while(c){
						var _pos = Math.floor( Math.random()*18) ;
						var x = (_pos%9) ;
						var y = parseInt(_pos/9) ;
						_pos = 9*x + y*1 ;
						
						var point = allPoints[_pos] ;
						if($.inArray(point.coordinate , freaks) == -1){
							c = false ;
							tp.push(point.coordinate) ;
							point.css = _obstacle ;
							allPoints[_pos] = point ;
							
//							console.debug("pos -> 左   " ,_pos) ;
						}
					}
				}
				freaks = freaks.concat(tp) ;
				tp = [] ;
				
				/**右两行障碍物*/
				count = Math.floor( Math.random()*3) + 3 ;
				for(var i = 0 ; i < count ;i++ ){
					var c = true ;
					while(c){
						var _pos = Math.floor( Math.random()*18) ;
						var x = (_pos%9) ;
						var y = parseInt(_pos/9)+7;
						_pos = 9*x + y*1 ;
						
						var point = allPoints[_pos] ;
						if($.inArray(point.coordinate , freaks) == -1){
							c = false ;
							tp.push(point.coordinate) ;
							point.css = _obstacle ;
							allPoints[_pos] = point ;
							
//							console.debug("pos -> 右   " ,_pos) ;
						}
					}
				}
				
				return allPoints ;
			} ,
			
			/**生成画布*/
			drawing :function(points){
				var gridRows = template('game-tpl', {
					'rows' : points|| []
				});
				$(this.content).html(gridRows);
				
				/**点击事件声明*/
				this.circleClick() ;
			},
			
			/**点击事件*/
			circleClick :function(){
				var _this = this ;
				var _content = _this.content ;
				var _obstacle = _this.obstacle ;
				var _circles = _this.circles ;
				var _people = _this.people ;
				$(_content).find('li a').unbind('tap') ;
				/**声明事件*/
				$(_content).find('li a.' + _circles).each(function(){
					$(this).on('tap' ,function(){
						
						++stepNum ;
						$(this).addClass(_obstacle).removeClass(_circles) ;
						console.debug("s") ;
						var pos = $(_content).find('li a.' + _people).parent().attr('data-index') ;
						console.debug("pos - >>  " , pos) ;
						var to = _this.getCatMoveStep(pos) *1;
						console.debug("newPos - >>  " , to) ;
						
						/**被围住了*/
						if(to == -1){
							_this.isSuccess() ;
						}
						/**顶部 --- 右边 --- 底部边 --- 底部边**/
						else if((0 < to && to < 9) || to % 9 == 8 || (  72 < to && to < 80 ) || to % 9 == 0){
							_this.isFail() ;
							_this.changeImgAndData(pos ,to) ;
						} else {
							_this.changeImgAndData(pos ,to) ;
						}
						
						/**点击事件声明*/
						_this.circleClick() ;
					})
				});
			},

			// 根据下标交换图片与数据
			changeImgAndData : function(from ,to) {
				/* 1、交换图片，其中数据为0的图片是秀明的 */
				// 图片的交换
				// var imgori;

				// 图片的位置
				var $blank = $(this.content).find('li').eq(from);
				// 图片2位置
				var $nBlank = $(this.content).find('li').eq(to);
				// 获取 黑块中的 内容 clone(false) 此方法表示只复制 内容 不复制 方法
				var $blankA = $blank.children().clone(false);
				var $nBlankA = $nBlank.children().clone(false);

				$nBlank.html($blankA);
				$blank.html($nBlankA);

				
			},
			getCatMoveStep : function(cat) {

				var $this = this;
				
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
					var pos = $(n).parent().attr('data-index') * 1;
					freakPos.push(pos);
				});


				var rsts = [];
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
				if ($.inArray(rtpos, freakPos) == -1 ) {
					var positions = $this.rightTop(cat);
					var bool = true;
					/** 判断改线路上是否有障碍物 */
					if (positions && positions.length > 0) {
						$.each(positions, function(i, n) {
							if ($.inArray(n * 1, freakPos) != -1) {
								bool = false;
							}
						});
					}
					/** 没有障碍物时获取该线路的节点个数 */
					if (bool) {
						var l = positions.length;
						console.debug(rtpos +" -------右上----- > " , positions.join(','))
						rsts.push(rtpos + "-" + l);
					}
				}
				
				/** 获取左上线路节点 */
				var ltpos = cat * 1 + lt_offset * 1;
				/** 存在右上节点 */
				if ($.inArray(ltpos, freakPos) == -1  ) {
					var positions = $this.leftTop(cat);
					var bool = true;
					/** 判断改线路上是否有障碍物 */
					if (positions && positions.length > 0) {
						$.each(positions, function(i, n) {
							if ($.inArray(n * 1, freakPos) != -1) {
								bool = false;
							}
						});
					}
					/** 没有障碍物时获取该线路的节点个数 */
					if (bool) {
						var l = positions.length;
						console.debug(ltpos +" -----左上------ > " , positions.join(','))
						rsts.push(ltpos + "-" + l);
					}
				}

				/** 获取左边线路节点 */
				var lpos = cat * 1 + l_offset * 1;
				/** 存在左边节点 */
				if ($.inArray(lpos, freakPos) == -1 ) {
					var positions = $this.left(cat);
					var bool = true;
					/** 判断改线路上是否有障碍物 */
					if (positions && positions.length > 0) {
						$.each(positions, function(i, n) {
							if ($.inArray(n * 1, freakPos) != -1) {
								bool = false;
							}
						});
					}
					/** 没有障碍物时获取该线路的节点个数 */
					if (bool) {
						var l = positions.length;
						console.debug(lpos +" ------左边------ > " , positions.join(','))
						rsts.push(lpos + "-" + l);
					}
				}

				/** 获取右边线路节点 */
				var rpos = cat * 1 + r_offset * 1;
				/** 存在右边节点 */
				if ($.inArray(rpos, freakPos) == -1 ) {
					var positions = $this.right(cat);
					var bool = true;
					/** 判断改线路上是否有障碍物 */
					if (positions && positions.length > 0) {
						$.each(positions, function(i, n) {
							if ($.inArray(n * 1, freakPos) != -1) {
								bool = false;
							}
						});
					}
					/** 没有障碍物时获取该线路的节点个数 */
					if (bool) {
						var l = positions.length;
						console.debug(rpos +" ------右边------ > " , positions.join(','))
						rsts.push(rpos + "-" + l);
					}
				}

				/** 获取右下线路节点 */
				var rbpos = cat * 1 + rb_offset * 1;
				/** 存在左边节点 */
				if ($.inArray(rbpos, freakPos) == -1 ) {
					var positions = $this.rightButtom(cat);
					var bool = true;
					/** 判断改线路上是否有障碍物 */
					if (positions && positions.length > 0) {
						$.each(positions, function(i, n) {
							//有障碍物的  点除外
							if ($.inArray(n * 1, freakPos) != -1) {
								bool = false;
							}
						});
					}
					/** 没有障碍物时获取该线路的节点个数 */
					if (bool) {
						var l = positions.length;
						console.debug(rbpos +" ------右下------ > " , positions.join(','))
						rsts.push(rbpos + "-" + l);
					}
				}

				/** 获取左下线路节点 */
				var lbpos = cat * 1 + lb_offset * 1;
				/** 存在左边节点 */
				if ($.inArray(lbpos, freakPos) == -1 ) {
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
						console.debug(lbpos +" ------左下------ > " , positions.join(','))
						rsts.push(lbpos + "-" + l);
					}
				}

				console.debug(" rsts --- > ", rsts.join(","));	

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
						 console.debug("_p -> " , _p , " , _s -> " ,_s) ;
					});

					return p *1;
				} else {
				//	console.debug('.canGo(cat)' , this.canGo(cat)) ;
					return this.canGo(cat) ;
				}

			},
			/** 右上路线 */
			rightTop : function(cat) {
				cat = cat*1 ;
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
				cat = cat*1 ;
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
				cat = cat*1 ;
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
				cat = cat *1 ;
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
				cat = cat*1 ;
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
				cat = cat*1 ;
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
			
			isCircleAtEdge :function(cat){
				
				var to = cat * 1 ;
				
				/**顶部 --- 右边 --- 底部边 --- 底部边**/
				 return ((0 < to && to < 9) || to % 9 == 8 || (  72 < to && to < 80 ) || to % 9 == 0) ;
				
			},
			/*
			判断传入的circle是否在边界上
			 */
			isCircleAtEdge2 :function(cat){
				cat = cat*1 ;
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
			
			getCircleNeighbor :function(cat ,direction ){
				cat = cat*1 ;
				
				var rows = (cat % 9 == 0) ? Math.ceil(cat / 9) + 1 : Math.ceil(cat / 9);
				rows = (rows%2) == 0 ;
		        switch (direction){
		        	case 0: //Direction.LEFT:{}
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

				cat = cat*1 ;
				var freakPos = [];
				var allPos = [] ;
				$('ul.box a.freak').each(function(i, n) {
					var pos = $(n).parent().attr('data-index') * 1;
					freakPos.push(pos);
				});

//				console.debug("障碍物位置 ++++++++ ", freakPos.join(','));
				
				var ignoreArr=[]; 
    			var toDealWithArr=[cat]; 
				while(true){
					console.debug(toDealWithArr.join(",")) ;
			        if(toDealWithArr.length<1){
			        	console.debug("成功") ;
			            return -1;
			        }else{
			            var _first=toDealWithArr.shift();
			            ignoreArr.push(_first);
			            if($.inArray(_first ,freakPos) == -1 && this.isCircleAtEdge(_first)){
			            	
			            	var key = _first +"" ;
			            	var search = true ;
			            	var steps = [] ;
			            	while(search){
			            		$.each(allPos, function(i, n) {
			            			var pos = n.split('|')[0] ;
			            			var neighbors = n.split('|')[1].split(',') ;
			            			if($.inArray(key , neighbors) > -1){
			            				steps.push(key) ;
			            				key = pos ;
			            				if(pos*1 == cat*1){
			            					search = false ;
			            					console.debug('steps is ' ,steps , "  , 原位置    "+ key) ;
				            			}
			            			}
			            		});
			            	}
			            	
//			            	for(var i = (steps.length - 1) ; i<= 0 ;i--){
//			            		if(key*1 != steps[i]*1){
//			            			return steps[i]*1 ;
//			            			console.debug('steps is ' ,steps , "下一步  ---->>>>>>   " ,steps[i]*1) ;
//			            		}
//			            	}
			            	
			            	
			            	var nextStep = $.inArray(cat+"", steps ) != -1 ? steps[steps.length-2] * 1 : steps[steps.length-1] ;
			            	console.debug('steps is ' ,steps , "下一步  ---->>>>>>   " ,nextStep) ;
			            	return nextStep;
			            }else{
			            	var temp = [] ;
			                for(var i=0;i<=5;i++){
			                    var nbr=this.getCircleNeighbor(_first,i);
			                    if(nbr < 0 ){
			                    	continue ;
			                    }
			                    if( nbr > 80){
			                    	continue ;
			                    }
			                    // if(!( ignoreArr.indexOf(nbr) > -1 || toDealWithArr.indexOf(nbr)>-1  ))
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
	$(".shareAppPage_shareFir").on("tap", function() {
		if (isLogin()) {
			s(0);
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});
	$(".shareAppPage_friRound").on("tap", function() {
		if (isLogin()) {
			s(1)
		}
		$(".butWrap").show();
		$(".shareAppPage").hide();
	});

})