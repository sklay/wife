function Rect(n,color,rectColor){
	//n 代表个数，color是基本色  ，rectColor表示 特殊的颜色
	createjs.Shape.call(this);
	
	//指定哪一个颜色
	this.setRectType = function(type){
		this.RectType = type;
		switch (type){
			case 1:
			this.setColor(color);
			break;
			case 2:
			this.setColor(rectColor);
			break;
		}
	};
	
	this.setColor = function(colorString){
		//开始绘制
		this.graphics.beginFill(colorString);
		//设置
		this.graphics.drawRect(0,0,getSize()/n-2,getSize()/n-2);
		//结束绘制
		this.graphics.endFill();
	}
	
	//获取状态
	this.getRectType = function(){
		return this.RectType;
	}
	
	//设置状态
	this.setRectType(1);
}

//设置公共的  
Rect.prototype = new createjs.Shape();
