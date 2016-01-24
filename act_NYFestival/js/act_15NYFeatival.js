$(function(){
	
	var cursor_inupt = 1 ;
	var to = '' ;
	var textArray = [] ;
	var input_text_li = '<li class="pull-left"  id="input_text_li"><div class="keyBoard_input" id="input_text_{i}">{text}</div></li>' ;
	var preview_text_li = '<li class="pull-left"><div class="keyBoard_input" id="preview_text_{i}">{text}</div></li>' ;
	/*开始点击进入游戏*/
	$('div.clickToEnter').on('tap',function(){
		$('div.common_div').hide() ;
		$('div.nowWrite_page').show();
	});
	
	/*现在就写*/
	$('div.now_use').on('tap',function(){
		$('div.common_div').hide() ;
		$('div.userInputPage').show();
		initText() ;
	});
	
	/*生成三行*/
	$('div.write_pagebottom').on('tap',function(){
		$('div.common_div').hide() ;
		$('div.previewPage').show();
		$('div.shareEnd_alertBox').show();
		
		to = $('#userType').val() ;
		previewText() ;
	});
	
	/*关闭*/
	$('div.closeAndBack span').on('tap',function(){
		$('div.shareEnd_alertBox').hide();
	});
	
	/*再改改*/
	$('img.againChange').on('tap',function(){
		$('div.common_div').hide() ;
		$('div.userInputPage').show();
	});
	
	/*保存并分享*/
	$('img.saveShare').on('tap',function(){
		$('div.common_div').hide() ;
		$('div.getHbPage_wrap').show();
	});
	
	/*保存并分享*/
	$('img#openRedBox').on('tap',function(){
		$('div.common_div').hide() ;
		$('div.getHbPage_wrap').show();
	});
	
	/*关闭*/
	$('div.closeAndBackClick span').on('tap',function(){
		$('div.have_received_box').hide();
	});
	
	
	/*监听文本输入*/
	$('.userWriteText').on('keydown' ,function(){
		$val = $(this).val() ;
	//	var $nval = splitText($val) ;
	//	$(this).val($nval) ;
		console.debug('keydown values is  ' ,$val) ;
	}) ;
	
	$('.userWriteText').on('keyup' ,function(){
		$val = $(this).val() ;
	//	var $nval = splitText($val) ;
	//	$(this).val($nval) ;
		textArray = [] ;
		for(i=0;i<$val.length;i++){
			var char = $val.charAt(i) ;
			textArray.push(char) ;
			console.debug(char);
		}
		
		initText() ;
		console.debug('keyup values is  ' ,$val) ;
		
	}) ;
	/*初始化文字*/
	initText = function(){
		$("#input_text_ul li").remove() ;
		for(var i = 0;i<24;i++)
		{
			var $text= input_text_li.replace('{i}' ,i);
			$text= $text.replace('{text}' ,textArray[i] || '');
			$($text).appendTo($("#input_text_ul"));
		}
	}
	
	/*预览文字*/
	previewText = function(){
		$("#preview_text_ul li").remove() ;
		$('span.identity_type').text(to) ;
		for(var i = 0;i<24;i++)
		{
			var $text= preview_text_li.replace('{i}' ,i);
			$text= $text.replace('{text}' ,textArray[i] || '');
			$($text).appendTo($("#preview_text_ul"));
		}
	}
	
	splitText = function($val){
		
		var $nval = $val ;
		
		if ($val.length > 16){
			$nval = $val.substring(0, 8);
			$nval += $val.substring(8, 16) +"\n";
			$nval += $val.substring(16);
		}else if ($val.length > 8){
			if($val.indexOf('\n' == 8)){
				return ;
			}
			$nval = $val.substring(0, 8) +"\n";
			$nval += $val.substring(8);
		}
		return $nval ;
	}
})
