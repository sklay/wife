$(function() {
	var target = 0;
	var audio_music = document.getElementById('audioBackMusic');
	var blackStore = [ 1, 2, 11, 12, 24, 29, 31, 34 ];
	var succFlag = [ 1, 2, 9, 22 ];
	/** 音乐图标 */
	$('.gameMusic_wrap').on('tap', function() {

		if (audio_music.paused) {
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
		this.isOver = 0;
		games();
		// if(playMusic) {
		// $('.gameMusic_wrap').show().find('img').removeClass('musicPause').addClass('musicPlay');
		// audio_music.play();
		// }

	}
	;
	function games() {

		speller = {
			init : function() {
				this.people_x = 4;
				this.people_y = 4;
				// 0：占位透明图，1：墙，2：可移动的箱子，3：可移动的小人
				this.tArray = [ 
				                [ "1", "0", "0", "1", "1", "1" ], 
				                [ "1", "0", "0", "0", "0", "0" ],
				                [ "0", "0", "0", "1", "2", "1" ], 
				                [ "0", "2", "0", "0", "0", "1" ], 
				                [ "0", "0", "2", "2", "3", "0" ], 
				                [ "1", "0", "0", "0", "0", "1" ], 
				              ];
				this.mArray = [ 
				                [ 0, 1 ], 
				                [ 0, 2 ], 
				                [ 1, 3 ], 
				                [ 3, 4 ], 
				               ];

				// 九个格子的位置
				this.positions = [];
				// 全局变量 ，游戏是否开始， 0表示未开始
				this.isOver = 0;
				this.blank = 6;
				this.useTime = 30;
				this.tag = 'li';
				this.content = 'ul.box';
				// 初始化 布局
				this.createGrid();
				// 倒计时
				this.clearShu();
			},

			clearShu : function() {
				if (this.timer)
					clearInterval(this.timer);
				this.timer = setInterval(function() {
					speller.useTime--; /* 累加时间并格式化显示 */

					if (speller.useTime < 1) {
						console.debug("clear")
						clearInterval(speller.timer);

						$(".gameFailWrap").fadeIn(500);
						speller.isOver = 1;
						if (playMusic) {
							$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause');
							audio_music.pause();
						}
					}
					;
					var countDownShowW = Math.ceil(speller.useTime / 30 * 100);
					$("#gameCountDownTime").html(speller.useTime);
					$("#gameCountDownColor").css({
						"width" : countDownShowW + "%"
					});

				}, 1000);
			},

			// 调用模版 构建 初始化数据
			createGrid : function() {

				var _speller = this;

				for (var i = 0; i < 6; i++) {
					for (var j = 0; j < 6; j++) {
						var m = this.tArray[i][j];
						var posData = {};
						posData.pos = i;
						posData.flag = m;
						// 0：占位透明图，1：墙，2：可移动的箱子，3：可移动的小人
						if (m == 1) {
							// 白色墙面区域
							posData.image = 'images/act_16pushBox_1.png';
							posData.css = 'imgHide';
						} else if (m == 2) {
							// 箱子的 位置
							posData.image = 'images/act_16pushBox_2.png';
						} else if (m == 3) {
							// 小人的位置
							posData.image = 'images/act_16pushBox_3.png';
						} else {
							// 占位透明图
							posData.image = 'images/act_16pushBox_0.png';
						}

						this.positions.push(posData);
					}

				}
				var gridRows = template('game-tpl', {
					'rows' : this.positions || []
				});
				$(this.content).html(gridRows);

				// 点击开始
				$(this.content + ' li').on('tap', function() {
					var boxPos = $(this).attr('data-pos') * 1;
					var rowLine = (boxPos % 6 == 0) ? Math.ceil(boxPos / 6) + 1 : Math.ceil(boxPos / 6);
					var rowMin = (rowLine - 1) * 6;
					var rowMax = rowLine * 6 - 1;
					target = boxPos;
					var $this = $(this);
					// console.log(this.people_x+"，"+this.people_y);

					var personPos = $('a[data-flag=3]').parent().attr('data-pos') * 1;

					var differ = personPos - boxPos;

					/** 点击的是四周邻居 */
					if (Math.abs(differ) == 6 || Math.abs(differ) == 1) {
						/** 点击的是 道路 或者 旗子 */
						if ($this.find('a[data-flag=0]').length > 0) {
							console.debug("道路 或 旗帜");
							_speller.exChange(boxPos, personPos);
						}
						/** 木箱子 就要判断该线路下一个 */
						else if ($this.find('a[data-flag=2]').length > 0) {
							switch (differ) {
							/** 往上走* */
							case 6: {
								/** 箱子要移动的新位置 */
								var boxNextPos = boxPos - 6;

								console.debug("往上走    boxNextPos ---->" + boxNextPos);
								/** 判断箱子的下一个位子是否能移动 */
								if ($('li[data-pos=' + boxNextPos + '] a[data-flag=0]').length > 0) {
									console.debug("往上走    可以走 ");
									/** 箱子跟人都往上跑一格 */
									_speller.exChange(boxPos, boxNextPos);
									_speller.exChange(boxPos, personPos);
								}
							}
								break;
							/** 往右走* */
							case -1: {
								var boxNextPos = boxPos + 1;
								/** 溢出右边界 */
								if (boxNextPos > rowMax) {
									return;
								}
								/** 判断箱子的下一个位子是否能移动 */
								if ($('li[data-pos=' + boxNextPos + '] a[data-flag=0]').length > 0) {
									/** 箱子跟人都往上跑一格 */
									_speller.exChange(boxPos, boxNextPos);
									_speller.exChange(boxPos, personPos);
								}
							}
								break;
							/** 往下走* */
							case -6: {
								var boxNextPos = boxPos + 6;
								/** 判断箱子的下一个位子是否能移动 */
								if ($('li[data-pos=' + boxNextPos + '] a[data-flag=0]').length > 0) {
									/** 箱子跟人都往上跑一格 */
									_speller.exChange(boxPos, boxNextPos);
									_speller.exChange(boxPos, personPos);
								}
							}
								break;
							/** 往左走* */
							case 1: {
								var boxNextPos = boxPos - 1;
								if (boxNextPos < rowMin) {
									return;
								}
								/** 判断箱子的下一个位子是否能移动 */
								if ($('li[data-pos=' + boxNextPos + '] a[data-flag=0]').length > 0) {
									/** 箱子跟人都往上跑一格 */
									_speller.exChange(boxPos, boxNextPos);
									_speller.exChange(boxPos, personPos);
								}
							}
								break;
							default:
								break;
							}
						}

					}
					/** 跳走 */
					else {
						var canGo = _speller.canGo(personPos);
						console.debug(" canGo is " + canGo);
						if (canGo) {
							_speller.exChange(boxPos, personPos);
						}
					}
					_speller.isSucc(); // 游戏成功
					
				});

			},

			exChange : function(source, target) {
				var $blank = $(this.content).find(this.tag).eq(source);
				var $nBlank = $(this.content).find(this.tag).eq(target);
				var $blankA = $blank.children().clone(false);
				var $nBlankA = $nBlank.children().clone(false);

				$nBlank.html($blankA);
				$blank.html($nBlankA);

				this.checkDown();
			},

			checkDown : function() {
				var temp = 0;
				var boxs = $('li a[data-flag=2]');
				var boxLength = boxs.length;
				/***/
				$.each(boxs, function(i, box) {
					var pos = $(box).parent().attr('data-pos') * 1;
					if ($.inArray(pos, blackStore) != -1) {
						temp++;
					}
				})
				// 如果没有箱子移动 表示失败
				//if (speller.useTime > 1) {
				if (temp == boxLength) {
					console.debug("无路可走");
					console.debug("clear");
					if (speller.useTime > 1) {
						clearInterval(speller.timer);
					}
					speller.isFail();
				}
				//}
			},
			isFail:function(){
				$(".gameFailWrap").fadeIn(500);
				speller.isOver = 1;
				if (playMusic) {
					$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause');
					audio_music.pause();
				}
			},
			isSucc : function() {
				var temp = 0;
				var boxs = $('li a[data-flag=2]');
				/***/
				$.each(boxs, function(i, box) {
					var pos = $(box).parent().attr('data-pos') * 1;
					if ($.inArray(pos, succFlag) != -1) {
						temp++;
					}
				})
				/** 长度相等时说明 箱子已经把旗帜盖住了* */
				if (temp != succFlag.length) {
					return;
				}
				
				if (speller.useTime > 1) {
					clearInterval(speller.timer);
				}

				$(".gameSuccWrap").fadeIn(500);
				speller.isOver = 1;
				if (playMusic) {
					$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause');
					audio_music.pause();
				}
			},

			canGo : function(cat) {
				var rst = [];
				var freakPos = [];
				var allPos = [];
				$('li a[data-flag=2]').each(function(i, n) {
					var pos = $(n).parent().attr('data-pos') * 1;
					freakPos.push(pos);
				});
				$('li a[data-flag=1]').each(function(i, n) {
					var pos = $(n).parent().attr('data-pos') * 1;
					freakPos.push(pos);
				});
				console.debug("障碍物位置 ++++++++ ", freakPos.join(','));

				var ignoreArr = [];
				var toDealWithArr = [ cat ];
				while (true) {
					if (toDealWithArr.length < 1) {
						return false;
					} else {
						var _first = toDealWithArr.shift() * 1;
						ignoreArr.push(_first);
						if ($.inArray(_first, freakPos) == -1 && this.isCircleAtEdge(_first) * 1) {
							console.debug("allPos s->" + allPos);
							return true;
						} else {
							var temp = [];
							for (var i = 0; i <= 3; i++) {
								var nbr = this.getCircleNeighbor(_first, i);
								if (nbr < 0) {
									continue;
								}
								if (nbr > 35) {
									continue;
								}
								if (!($.inArray(nbr, ignoreArr) > -1 || $.inArray(nbr, toDealWithArr) > -1)) {
									if ($.inArray(nbr, freakPos) != -1) {
										ignoreArr.push(nbr);
									} else {
										toDealWithArr.push(nbr);
										/** 没有障碍物 */
										temp.push(nbr + "");
									}
								}
							}
							allPos.push(_first + "|" + temp.join(','));
						}
					}
				}
			},
			/*
			 * 判断传入的circle是否在边界上
			 */
			isCircleAtEdge : function(cat) {

				if (target * 1 == cat * 1) {
					return true;
				}

				return false;
				var rows = (cat % 6 == 0) ? Math.ceil(cat / 6) + 1 : Math.ceil(cat / 6);
				console.debug('row is  ', rows);
				/** 第一行 或 最后一行 */
				if (1 == rows || 7 == rows) {
					return true;
				}
				/** 中间行 */
				var min = (rows - 1) * 6;
				var max = rows * 6 - 1;
				if (min == cat || max == cat) {
					return true;
				}
				/** 不在边缘 */
				return false;
			},

			getCircleNeighbor : function(cat, direction) {
				cat = cat * 1;
				var rows = (cat % 6 == 0) ? Math.ceil(cat / 6) + 1 : Math.ceil(cat / 6);

				console.debug("math  row -->  " + Math.ceil(cat / 6));
				/** 中间行 */
				var min = (rows - 1) * 6;
				var max = rows * 6 - 1;

				switch (direction) {
				case 0: // 左
					return pos = cat - 1 < min ? -1 : cat - 1;
				case 1: // 右
					return pos = cat + 1 > max ? -1 : cat + 1;
				case 2: // 上
					return pos = cat - 6 < 0 ? -1 : cat - 6;
				case 3: // 下
					return pos = cat + 6 > 35 ? -1 : cat + 6;
					// 左上
				case 4: {
					if (rows == 1 || rows == 7 || min == cat || max == cat) {
						return -1;
					}
					return cat - 7;
				}
					// 左下
				case 5: {
					if (rows == 1 || rows == 7 || min == cat || max == cat) {
						return -1;
					}
					return cat + 5;
				}
					// 右上
				case 6: {
					if (rows == 1 || rows == 7 || min == cat || max == cat) {
						return -1;
					}
					return cat - 5;
				}
					// 右下
				case 7: {
					if (rows == 1 || rows == 7 || min == cat || max == cat) {
						return -1;
					}
					return cat + 7;
				}

				default:
					return -1;
				}
			}

		}

		speller.init();
	}

	/* 再次游戏 */
	$("#playAgain").on("click", function(e) {
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