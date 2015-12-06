$(function(){
	var path 			= "../images/" ;
	var colorList 		= ["#017fe2","#fff103","#ffcc1b","#acff0b","#00fff6","#fc397e","#c000f0"] ;
	var normalImgPrefix = "act_game_" ;
	var badImgPrefix 	= "act_game_bad_" ;
	var imgSuffix 		= ".png" ;
	var color			= "" ;
	var img 			= '<img class="image" src="{imgName}" />' ;
	var maxImgList		= ["77_1.png","77_2.png","77_3.png","77_4.png","77_5.png","77_6.png","77_7.png","77_8.png","77_9.png","77_10.png","77_11.png","77_12.png","77_13.png","77_14.png","77_15.png"] ;
	var imgName			= "" ;
	var imgBadName		= "" ;
	var imgMaxLength	= 0 ;

	var questions = ["1、请找出已过期的食品标签","2、请找出工业酒精勾兑的假酒","3、请找出含有三聚氰胺的毒奶粉","4、请找出含有苏丹红的毒辣椒酱", "5、请找出含有苏丹红的红心鸭蛋",
		"6、请找出打过催红素的西红柿","7、请找出染过色的黄瓜","8、请找出打过工业蜡的苹果","9、请找出用地沟油炸出来的油条","10、请找出用双氧水漂白过的椰果",
		"11、请找出注过水的猪肉","12、请找出用化学药品人工合成的鸡蛋","13、请找出使用碱性橙染料浸染过的小黄鱼","14、请找出用硫磺熏蒸过的馒头",
		"15、请找出用玫瑰精染色过的虾","16、请找出加入工业染料的豆腐干","17、请找出使用过工业用油喷洒的大米","18、请找出使用工业硫酸铜炮制皮蛋",
		"19、请找出使用福尔马林浸泡过的鱿鱼","20、请找出注射过瘦肉精的猪肉"] ;

	/**
	 * 获取
	 * @param colorList
	 * @returns {*}
	 */
	function getNodeByRandom(nodeList){
		var index = Math.floor(Math.random()*nodeList.length);
		var node = nodeList[index];
		nodeList.splice(index,1);
		return node;
	}
	/*点击生成主函数*/
	function creatFunction(){
		$(".cavwrap").empty();
		if(!maxImgList || maxImgList.length == 0){
			alert("Game Over") ;
			return ;
		}
		if(boxNum >= 7){
			boxNum=7;
			colorList = ["#017fe2","#fff103","#ffcc1b","#acff0b","#00fff6","#fc397e","#c000f0"] ;
			var name = getNodeByRandom(maxImgList) ;
			imgName = path + normalImgPrefix + name ;
			imgBadName = path + badImgPrefix + name ;
		}else{
			imgName = path + normalImgPrefix + boxNum + "" + boxNum + imgSuffix;
			imgBadName =  path + badImgPrefix + boxNum + "" + boxNum + imgSuffix;
		}
		color = getNodeByRandom(colorList) ;
		console.debug(color) ;
		creatbox();
		/*specialSty();*/
		norStyleCount();
		specialClick();

		boxNum++;

	}
	/*生成内容*/
	function creatbox(){
		var _html="<div>";
		var cImg = img.replace("{imgName}",imgName) ;
		for(var i=0,j=boxNum;i<j;i++){
			_html+='<span class="normalStyle">'+cImg+'</span>';
			for (var m=0,k=boxNum-1;m<k;m++) {
				_html+='<span class="normalStyle">'+cImg+'</span>';
			}
		};
		_html+="</div>" ;
	//	console.debug(" cavwrap  is " + _html) ;
		$(".cavwrap").append(_html);
	}
	/*设置box宽高*/
	function norStyleCount(){
		/*
		var r=Math.floor(Math.random()*255);
		var g=Math.floor(Math.random()*255);
		var b=Math.floor(Math.random()*255);
		$(".normalStyle").css({backgroundColor:"rgb("+r+","+g+","+b+")"});
		*/
		$(".normalStyle").css({backgroundColor:color});
		$(".normalStyle").width((cavwrap.offsetWidth-10-2*boxNum)/boxNum);
		$(".normalStyle").height((cavwrap.offsetHeight-10-2*boxNum)/boxNum);
		$(".normalStyle .image").width((cavwrap.offsetWidth-10-2*boxNum)/boxNum);
		$(".normalStyle .image").height((cavwrap.offsetHeight-10-2*boxNum)/boxNum);
		//specialSty(r,g,b);
		specialImg() ;
	}

	/*随机特殊图片*/
	function specialImg(){
		var num1=Math.floor(Math.random()*(boxNum*boxNum));
		for(var i=0,j=$(".normalStyle").length;i<j;i++){
			if(i==num1){
				$this = $(".normalStyle").eq(i).addClass("specialStyle");
				$(".specialStyle").css({backgroundColor:color});
				$(".specialStyle .image").attr('src' ,imgBadName);;
			}
		}
	}
	/*随机特殊样式*/
	function specialSty(r,g,b){
		var num1=Math.floor(Math.random()*(boxNum*boxNum));
		if(r>=225){
			var d=r-35
		}else{
			var d=r+35
		}
		if(g>=255){
			var e=g-15
		}else{
			var e=g+15
		}
		if(b>=255){
			var f=b-15
		}else{
			var f=b+15
		}
		for(var i=0,j=$(".normalStyle").length;i<j;i++){
			if(i==num1){
				$(".normalStyle").eq(i).addClass("specialStyle");
				$(".specialStyle").css({backgroundColor:"rgb("+d+","+g+","+b+")"});
			}
		}
	}
	var cavwrap=document.querySelectorAll(".cavwrap")[0];
	cavwrap.style.width=document.documentElement.clientWidth+"px";
	cavwrap.style.height=document.documentElement.clientHeight/2+"px";
	cavwrap.style.marginTop="2.8rem";
	//cavwrap.style.backgroundColor="#eee"
	var btn=document.querySelectorAll("button")[0];
	var boxNum=2;
	var norStyle=document.querySelector(".normalStyle");
	$("button").on("click",creatFunction);
	function specialClick(){
		$(".specialStyle").on("click",function(){
			creatFunction();
		});
	}
	
})
