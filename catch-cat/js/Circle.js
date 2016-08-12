
function Circle(){
//	var B = 0.56;
//	/* 设置画布的 高度和宽度 */
//	var canvasW = window.innerWidth;
//	var canvasH = window.innerHeight;
//	if (canvasH > window.innerHeight)
//		canvasH = window.innerHeight;
//	
//	var canvasObj = $('#gameView');
//	canvasObj.css('margin-top', (window.innerHeight - canvasH) / 2);
//	canvasObj.attr('width', canvasW);
//	canvasObj.attr('height', canvasH);
//	var ca = document.getElementById("gameView");
//
//	var ctx = ca.getContext("2d");
//	var bj1 = new Image();
//
//	var player = new Image();
////	player.src = "images/rabbit.jpg";
//var playerWidth = 100 * B;
//	var playerHeight = 100 * B;
//function object() {
//		this.x = 0;
//		this.y = 0;
//		this.l = 11;
//		this.image = new Image();
//	}
//	var sprite = new object();
//	sprite.x = 0;
//	sprite.y = canvasH - playerHeight;
//
//	sprite.image = player;
//	sprite.onload = function () //确保图片已经加载完毕  
//	{  
//		ctx.drawImage(sprite.image, sprite.x, sprite.y, playerWidth, playerHeight);
//	}  
	
	
    createjs.Shape.call(this);
    this.setCircleType = function(type){
        this._circleType = type;
        switch (type){
            case Circle.TYPE_UNSELECTED:
                this.setColor("#cccccc");
                break;
            case Circle.TYPE_SELECTED:
                this.setColor("#ff6600");
                break;
            case Circle.TYPE_CAT:
                this.setColor("#0000ff");

//              var cryPlayer = new Image();
//				cryPlayer.src = "images/rabbit.jpg";
//				sprite.image = cryPlayer;
//				ctx.drawImage(sprite.image, sprite.x, sprite.y, playerWidth, playerHeight);
				
                break;
        }
    }

    this.setColor = function (colorString){
        this.graphics.beginFill(colorString);
        //每个圈的 大小
        this.graphics.drawCircle(0,0,16);
        this.graphics.endFill();
    }
    this.getCircleType = function(){
        return this._circleType;
    }
    this.setCircleType(1);
}
Circle.prototype = new createjs.Shape();
Circle.TYPE_UNSELECTED = 1;
Circle.TYPE_SELECTED = 2;
Circle.TYPE_CAT = 3;
