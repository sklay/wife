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
				this.maxRow = 3;
				this.maxCol = 3;
				this.imageName = 'images/act_16seventhDay_game_pt-{index}.png';
				this.positions = [];
				this.hard = n || 5;
				this.step = 0;
				this.blank = 8;
				this.useTime = 180;
				this.tag = 'li';
				this.content = 'ul.box'
				this.createGrid();
				if(this.timer)
					clearInterval(this.timer);
				this.timer = setInterval(function() {
					speller.useTime--; /* 累加时间并格式化显示 */

					if(speller.useTime < 1) {
						console.debug("clear")
						clearInterval(speller.timer);

						clickBoo = false;
						$(".gameFailWrap").show();

						if(playMusic) {
							$(".gameMusic_wrap").find('img').removeClass('musicPlay').addClass('musicPause');
							audio_music.pause();
						}
					};
					$("#gameCountDownTime").html(speller.useTime);

				}, 1000);
			},

			createGrid: function() {
				for(var i = 0; i < 9; i++) {
					var posData = {};
					posData.pos = i;
					posData.image = this.imageName.replace("{index}", (i + 1));
					posData.css = ((i + 1) == 9) ? 'freak' : "normal";
					this.positions.push(posData);
				}

				this.random();

				var gridRows = template('game-tpl', {
					'rows': this.positions || []
				});
				$(this.content).html(gridRows);
				$(this.content + ' li a img').eq(this.blank).hide();
				console.debug(this.blank);
			},
			random: function() {
				var ps = this.positions;
				l = ps.length;
				me = this;
				var lastIndex = 8;
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
					arr.remove(lastIndex);
					console.debug(" arrar ", n, ' , array ', arr.join(','));
					/**在邻居中随机一个惊醒交换*/ 
					return arr[parseInt(Math.random() * arr.length)] * 1;
				}
				var getp = function(n) {
					for(var i = 0; i < l; i++) {
						var posData = ps[i];
						if(i == n) {
							return i;
						}
					}
				}
				for(var i = 0; i < me.hard; i++) {
					lastIndex = en(this.blank * 1);
					this.move2(lastIndex);

					// this.move2(getp(en(this.blank * 1)));
				}

				console.debug("blank pos done ", this.blank);
			},
			move2: function(index) {

				var target = this.positions[index];
				var source = this.positions[this.blank];

				this.positions[index] = source;
				this.positions[this.blank] = target;

				console.debug('攻略 ', this.blank + ' ---> ' + index);

				this.blank = index * 1;
			},
			move: function(node) {
				var pos = $(node).attr('data-pos') * 1,
					POS = this.blank * 1,
					abs = Math.abs(pos - POS),
					max = pos > POS ? pos : POS;
//				console.debug('pos is ', pos, ' nBlank POS is  ', POS, ' abs is  ', abs, ' max is ', max);

				/** abs == 3 在上边或者下边; abs == 1 &&  max % 3 != 0 控制在左边或右边 */
				if(abs == 3 || (abs == 1 && max % 3 != 0)) {
					var $blank = $(this.content).find(this.tag).eq(POS);
					var $nBlank = $(this.content).find(this.tag).eq(pos);
					var $blankId = $blank.attr('id');
					var $nBlankId = $nBlank.attr('id');

					var $blankA = $blank.children().clone(false);
					var $nBlankA = $nBlank.children().clone(false);

					$nBlank.html($blankA);
					$blank.html($nBlankA);

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
					$(".gameSuccWrap").show();
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