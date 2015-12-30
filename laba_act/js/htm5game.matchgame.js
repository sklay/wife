/**
 * Created by mengdi on 2015/10/29.
 */

var neusoft={};
neusoft.matchingGame={};
neusoft.matchingGame.cardWidth=1.4;//牌宽
neusoft.matchingGame.cardHeight=2;
neusoft.matchingGame.deck=
    [
        "cardA","cardA",
        "cardB","cardB",
        "cardC","cardC",
        "cardD","cardD",
        "cardE","cardE",
        "cardF","cardF",
		"cardG","cardG",
		"cardH","cardH"
    ]
//随机排序函数，返回-1或1
function shuffle()
{
    //Math.random能返回0~1之间的数
    return Math.random()>0.5 ? -1 : 1
}
//  翻牌功能的实现
function selectCard() {
    var $fcard=$(".card-flipped");
    //翻了两张牌后退出翻牌
    if($fcard.length>1)
    {
        return;
    }
    
    //alert($(this).data("pattern"));
    $(this).addClass("card-flipped");
//    若翻动了两张牌，检测一致性
    var $fcards=$(".card-flipped");
    if($fcards.length==2)
    {
       // checkPattern($fcards);
        setTimeout(function(){
        checkPattern($fcards);},700);
    }
}
//检测2张牌是否一致
function checkPattern(cards)
{
    var pattern1 = $(cards[0]).data("pattern");
    var pattern2 = $(cards[1]).data("pattern");
	
	console.debug('checkPattren before ' ,pattern1 , pattern2 ) ;
    $(cards).removeClass("card-flipped");
    
    if(pattern1==pattern2)
    {
	    $(cards).addClass("card-correct") ;
	    $('img.light-'+pattern1).addClass("card-active") ;
    	console.debug('checkPattren ' ,pattern1 , pattern2 ) ;
//        $(cards).addClass("card-removed")
//          .bind("webkitTransitionEnd",function(){
//              $(this).remove();
//  		});
    }
}