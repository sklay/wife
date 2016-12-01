	
setSize();

$(function(){
	
$(window).resize(setSize);
	
})


		function setSize() {
			
			var pixelRatio=1/window.devicePixelRatio;
//		console.debug($("#device").attr("content"));

$("#device").attr("content","width=device-width,initial-scale="+pixelRatio+",maximum-scale="+pixelRatio+"");

			var html = document.getElementsByTagName("html")[0];
			var pageWidth = html.getBoundingClientRect().width;
			console.debug(pageWidth);
//			console.debug("屏幕宽度"+clientWidth);
//		    clientWidth=clientWidth>=768?768:clientWidth;
//		    pageWidth=pageWidth>=1600?1600:pageWidth;
			html.style.fontSize = pageWidth / 10 + "px";

		}