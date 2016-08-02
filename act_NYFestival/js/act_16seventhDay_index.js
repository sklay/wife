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
		games();
		if(playMusic) {
			$('.gameMusic_wrap').show().find('img').removeClass('musicPause').addClass('musicPlay');
			audio_music.play();
		}

	};

	function games() {
		speller = {
			init: function(n) {
//				this.maxRow = 3;
//				this.maxCol = 3;
				this.imageName = 'images/act_16seventhDay_game_pt-{index}.png';
				//  九个各=格子的位置
				this.positions = [];
				//默认难易度    如果  n 没有传 则是5 （黑块 移动on个次数）
				this.hard = n || 5;
				
//				this.step = 0;  记录 移动的步 数
				this.blank = 8;
				this.useTime = 180;
				this.tag = 'li';
				this.content = 'ul.box';
				//初始化 布局
				this.createGrid();
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
			// 调用模版  构建 初始化数据 
			createGrid: function() {
				for(var i = 0; i < 9; i++) {
					var posData = {};
					posData.pos = i;
					posData.image = this.imageName.replace("{index}", (i + 1));
					posData.css = ((i + 1) == 9) ? 'freak' : "normal";
					this.positions.push(posData);
				}

				
				var randomDone = false ;

				while(!randomDone){
					this.random();
					console.debug("random") ;
					$.each(this.positions, function(i ,n) {
						if(i != n.pos){
							randomDone = true ;
							return ;
						}
						console.debug(i , "  = > " , n.pos) ;
					});
				}
				
				var gridRows = template('game-tpl', {
					'rows': this.positions || []
				});
				$(this.content).html(gridRows);
				$(this.content + ' li').on('tap',function(){
					speller.move(this);					
				}) ;
				
				$(this.content + ' li a img').eq(this.blank).hide();
				console.debug(this.blank);
			},
			//打乱顺序随机算法     算出 当前黑块位置的 邻居   并且随机其中一个  与黑块交换
			random: function() {
				var ps = this.positions;
				l = ps.length;
				me = this;
				//					ps[this.blank].style.display = "none";
				$('#' + me.blank).hide();
				var en = function(n) {
					var arr = [];
					/** 计算右边的邻居*/
					if(n < 8 && n % 3 != 2) {
						arr.push(n + 1);
					}
					/** 计算左边的邻居*/
					if(n > 0 && n % 3 != 0) {
						arr.push(n - 1);
					}
					/** 计算上边的邻居*/
					if(n > 2) {
						arr.push(n - 3);
					}
					/** 计算下边的邻居*/
					if(n < 6) {
						arr.push(n + 3);
					}
					console.debug(" arrar ", n, ' , array ', arr.join(','));
					/**在邻居中随机一个惊醒交换*/
					return arr[parseInt(Math.random() * arr.length)] * 1;
				}
//				var getp = function(n) {
//					for(var i = 0; i < l; i++) {
//						var posData = ps[i];
//						if(i == n) {
//							return i;
//						}
//					}
//				}
				for(var i = 0; i < me.hard; i++) {
					this.move2(en(this.blank * 1));
				}

				console.debug("blank pos done ", this.blank);
			},
			
			//交换    当前位置 和  随机出来的  邻居  交换
			move2: function(index) {

				var target = this.positions[index];
				var source = this.positions[this.blank];

				this.positions[index] = source;
				this.positions[this.blank] = target;

				console.debug('攻略 ', this.blank + ' ---> ' + index);

				this.blank = index * 1;
			},
			
			
			
			//点击  时  交换的方法
			move: function(node) {
				//当前点击的  位置
				var pos = $(node).attr('data-pos') * 1,
				//当期 黑块的 位置     *1  是保证 整数
					POS = this.blank * 1,
					abs = Math.abs(pos - POS),
					max = pos > POS ? pos : POS;
//				console.debug('pos is ', pos, ' nBlank POS is  ', POS, ' abs is  ', abs, ' max is ', max);

				/** abs == 3 在上边或者下边; abs == 1 &&  max % 3 != 0 控制在左边或右边 */
				if(abs == 3 || (abs == 1 && max % 3 != 0)) {
					//当前黑块所在区域
					var $blank = $(this.content).find(this.tag).eq(POS);
					//当前黑块相邻的 区域
					var $nBlank = $(this.content).find(this.tag).eq(pos);
					// 黑块区域保存的 原始位置值
					var $blankId = $blank.attr('id');
					//当前黑块相邻区域保存的 原始值
					var $nBlankId = $nBlank.attr('id');
					//  获取 黑块中的 内容  clone(false)  此方法表示只复制 内容  不复制 方法
					var $blankA = $blank.children().clone(false);
					var $nBlankA = $nBlank.children().clone(false);

					$nBlank.html($blankA);
					$blank.html($nBlankA);
					
					
					//重新设置属性  改变 所在区域内部的值
					$nBlank.attr({
						"id": $blankId
					});
					$blank.attr({
						'id': $nBlankId
					});
					this.blank = pos;
				}
				/**否则不是邻居*/
				else {
					return;
				}
				if(this.check()) {
					$(this.content + ' li a img').eq(this.blank).show();
					//挑战成功显示
					$(".gameSuccWrap").fadeIn(500);
//					clearInterval(timeCountDown);
					clearInterval(this.timer);
					
					if(playMusic) {
						$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause');
						audio_music.pause();
					}
				};
			},
			check: function() {
				var lis = $(this.content).find(this.tag);
				for(var i = 0; i < lis.length; i++) {
					console.debug($(lis[i]).attr('data-pos'), "  ", $(lis[i]).attr('id'));
					if(i != $(lis[i]).attr('id')) {
						return false;
					}
				}
				return true;
			}
		}

		speller.init(10);
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