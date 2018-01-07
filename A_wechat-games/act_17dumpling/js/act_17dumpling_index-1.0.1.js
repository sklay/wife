(function ($) {
    var defaults = {
    	/**开始按钮*/
    	startBtn:'#startGame',
		/**是否已经点击*/
		isClick:false,
		/**游戏时间*/
		time:90,
		/**游戏倒计时*/
		timeCountdown:null,
		/**游戏得分*/
		score:0,
		/**成功回调**/
		success:null,
		/**失败回调**/
		failed:null,
		/**音乐*/
		music:{
			bar:'audioBackMusic',
			ctrl:'.gameMusic_wrap',
			paly:'musicPlay',
			pause:'musicPause',
			icon:'img'
		},
		/**游戏参数**/
		pastime:{
			hook:'.top-jia',
			step:5,
			distanceWidth:$('#top').width(),
			availabeWidth:$('.top-line').width(),
			isRight:true,/**是否是右滑动*/
			gameMotion:null
			
		},
		debug:true
    };
     catchToyGame = function () {
        init:function(options){
        	var $this = this ;
        	var options = $.extend(defaults, options);
        	$this.options = options ;
        	/**音乐*/
        	if(options.music){
        		$this.music() ;
        	}
        	
        	/**开始游戏*/
        	$this.start() ;
        },
        
        start:function(){
        	var $this = this ;
        	var $options = $this.options ;
        	$($options.startBtn).off('tap').on("tap", function() {
				$(".startGameBtnWrap").hide();
				
				if($options.pastime.gameMotion)
					clearInterval($options.pastime.gameMotion) ;
			
				$options.pastime.gameMotion = setInterval(function() {
					$this.motion();
				}, 100);
				
		
			});

        	
        },
        music:function(){
        	var $this = this ;
        	var musicOption = $this.options.music ;
        	
        	if($this.debug)
        		console.debug(JSON.stringify(musicOption));
        		
        	if(!musicOption.bar){
        		console.error('music option bar is empty');
        	}
        	var audio_music = document.getElementById(musicOption.bar);
        	
        	if(!musicOption.ctrl){
        		console.error('music option ctrl is empty');
        	}
        	
        	$(musicOption.ctrl).off('tap').on('tap', function() {
				var $ctrl = $(musicOption.ctrl);
				if(audio_music.paused) {
					$ctrl.show().find(musicOption.icon).removeClass(musicOption.pause).addClass(musicOption.play);
					audio_music.play();
				} else {
					$ctrl.find(musicOption.icon).removeClass(musicOption.play).addClass(musicOption.pause);
					audio_music.pause();
				}
			});
        },
        motion:function() {
        	
        	var $this = this ;
        	var $options = $this.options ;
        	if($this.debug)
        		console.debug(JSON.stringify($options.pastime));
        	
			var $left = $options.pastime.distanceWidth - $options.pastime.availabeWidth;
			var left = $($options.pastime.hook).offset().left;
			var offset = $options.pastime.availabeWidth + ($left / 2) - $($options.pastime.hook).width();
			var _step = $options.pastime.step;
				  		
			if($options.pastime.isRight) {
			
				var _offset = _step + left;
				
				if(_offset >= offset) {
					_offset = offset ;
					$options.pastime.isRight = false;
				}
				$($options.pastime.hook).css("left", _offset);
			} else {
				var _offset = left - _step;
				if(_offset <= $left / 2) {
					_offset = $left / 2;
					$options.pastime.isRight = true;
				}
				$($options.pastime.hook).css("left", _offset);
			}
		}
    }
})(jQuery);
