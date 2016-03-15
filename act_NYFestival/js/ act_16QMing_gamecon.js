/**
 * Created by gonglei.bian on 2016/2/19.
 */
$(function(){
	
	
	$.getJSON("./js/act_16QMing_questions.json", function(data){
		  var questionsData = data.questions ;
		  $.each(questionsData , function(item_index ,item){
		  	$question = item ;
	  		var ops = '' ;
	  		$options = $question.options ;
	  		$.each($options,function(opt_index,option){
	  			$option = option ;
	  			//ops += $option.option + ' ,';
	  		}) ;
//	  		alert('第'+(item_index+1)+'题 问题是 ，' + $question.question + '\n选项是： '+ ops + "\n答案是： " + $question.answer) ;
		  	$(".question_numb").html('第'+(item_index+1)+'题 ');
		  	$(".ques_remind").html($question.question);
		  	$(".ques_userCop").html($question.question);
		  	$(".quest_verse").html($option);//
		  	//$(".quest_verse").html($question.answer);//此处是答案
		  	
		  	
		  }) ;
		});
	
	
	
    /*开始*/
    $(".question_queNum").on("tap",function(){
        
    });

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
 
    
    
//分享按钮
    $(".shareFri").on("tap",function(e){
    	var event=e ||window.event;
    	event.stopPropagation();
    	if(is_weixin()){
    		$("#shareFriSha").show();
    	}else{
    		if(appShareFun()){
    			$(".butWrap").hide();
        		$(".shareAppPage").show();
    		}
    	}
    });
  
    $("#shareFriSha").on("tap",function(e){
    	event.stopPropagation();
    	e.preventDefault();
    	 $("#shareFriSha").hide();
    });
	
    //app分享点击
    $("#shareAppPage_shareFir").on("tap",function(){
    	if(appShareFun()){
    		s(0);
    	}
    	$(".butWrap").show();
		$(".shareAppPage").hide();
    });
    $("#shareAppPage_friRound").on("tap",function(){
    	if(appShareFun()){
    		s(1)
    	}
    	$(".butWrap").show();
		$(".shareAppPage").hide();
    });
  

});
