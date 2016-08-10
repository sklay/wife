$(function() {
	games();

	function games() {
		pushIcon = {
			init: function() {
				//当前人物的位置
				this.people_x = 4;
				this.people_y = 4;
				this.positions = [];

				this.tag = 'li';
				this.content = 'ul.game';
				//9：黑图，0：占位透明图，1：墙，2：可移动的箱子，3：可移动的小人 4:点；
				this.tArray = [
					["9", "9", "1", "1", "1", "9", "9", "9"],
					["9", "9", "1", "4", "1", "9", "9", "9"],
					["9", "9", "1", "0", "1", "1", "1", "1"],
					["1", "1", "1", "2", "0", "2", "4", "1"],
					["1", "4", "0", "2", "3", "1", "1", "1"],
					["1", "1", "1", "1", "2", "1", "9", "9"],
					["9", "9", "9", "1", "4", "1", "9", "9"],
					["9", "9", "9", "1", "1", "1", "9", "9"],
				];
				//判断是否胜利点的坐标数组
				this.mArray = [
					[4, 1],
					[1, 3],
					[3, 6],
					[6, 4],
				];

				this.createGrid();
			},

			// 调用模版  构建 初始化数据 
			createGrid: function() {
				for(var i = 0; i < 8; i++) {
					for(var j = 0; j < 8; j++) {
						console.log(i+"    "+j);
						var m = this.tArray[i][j];
						console.log(m);
//						i = m;
						var posData = {};
						posData.pos = i;
						if(m == 1) {
							posData.image = 'images/box-6.png';
						} else if(m == 2) {
							posData.image = 'images/box-2.png';
						} else if(m == 3) {
							posData.image = 'images/box-3.png';
						} else if(m == 4) {
							posData.image = 'images/box-8.png';
						} else if(m == 9) {
							posData.image = 'images/box-4.png';
						} else {
							posData.image = 'images/box-5.png';
						}
						this.positions.push(posData);
					}

				}
				var gridRows = template('game-tpl', {
					'rows': this.positions || []
				});
				$(this.content).html(gridRows);
			},





		//点击游戏小图片时，传入相应位置。例，4，5
			onClickByIndex: function(i,j) {
//		onClickByIndex:function(i,j){
				if(tArray[i][j] == 1 || tArray[i][j] == 3 || tArray[i][j] == 9) {
					//点的是墙 或自己人物，或黑色区域
					return; //什么也不操作
				}
				if(tArray[i][j] == 2) { //点击的是箱子
					var index = getMoveBox(i, j); //0表示不能移动，1左，2上，3下，4右。
					if(index == 0) { //不能移动
						return; //什么也不操作
					}
					/*（注意，顺序不能错，先交换物，再交换箱子）*/
					if(index == 1) { //箱子向左。
						/*箱子的位置向哪个方向移动*/
						changeImgAndData(i, j - 1, i, j); //交换
					} else if(index == 2) {
						changeImgAndData(i - 1, j, i, j); //交换
					} else if(index == 3) {
						changeImgAndData(i + 1, j, i, j); //交换
					} else if(index == 4) {
						changeImgAndData(i, j + 1, i, j); //交换
					}
					/*人向哪个方向移动*/
					changeImgAndData(i, j, people_x, people_y); //人的交换
					/*设置人的当前位置*/
					people_x = i;
					people_y = j;
					isGameOver(); //游戏是否结束
				} else if(tArray[i][j] == 0) { //点击的是人物
					/*if() {
						//判断点击 空位置的时  人物 是否可以和空位子交换
					}*/

					/*人物位置数据与当前点击的位置数据进行交换。*/
					changeImgAndData(i, j, people_x, people_y);
					/*设置人的当前位置*/
					people_x = i;
					people_y = j;
				}
			},

			//箱子移动的 方法
			getMoveBox: function(i, j) {
				//箱子的目标位置
				var target = this.positions[index];
				//箱子的原来位置
				var boxSource = this.positions[this.blank];
				//人原来的位置
				var peoSource = this.positions[this.blank];

				//把目标的 位置给原来的 位置
				this.positions[index] = target;
				//把箱子原来的位置给人的位置
				this.positions[this.blank] = boxSource;

			},
			//根据下标交换图片与数据
			changeImgAndData: function(i1, j1, i2, j2) {
				/*1、交换图片，其中数据为0的图片是秀明的*/
				/*2、交换数据*/
				var t = tArray[i1][j1];
				tArray[i1][j1] = tArray[i2][j2];
				tArray[i2][j2] = t;
			},

			isGameOver: function() {
				for(var i = 0; i < mArray.length; i++) {
					if(tArray[mArray[i][0]][mArray[i][1]] != 2) {
						return;
					}
				}
				alert('游戏结束');
			}


		}

		pushIcon.init();
	}

})