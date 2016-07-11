$(function() {
	
	/*音乐播放器*/
	var bgAudio2 = $("#gameMusic_wrap2") ;
	bgAudio2.jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				mp3:"http://imgstore.camore.cn/medhtml/common/images/act_16womenday_backmusic.mp3"
			});
		},
		play: function() {
			$(this).jPlayer("pauseOthers");
		},
		swfPath: "/js/jplayer",
		supplied: "mp3",
		wmode: "window"
	});
	


	$('#aa').click(function(){
		bgAudio2.jPlayer('play') ;
	}) ;
})