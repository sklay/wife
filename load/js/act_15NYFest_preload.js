
imgLoad = function () {
    var aImg = $('img[src]'),
        loadPor = $('#loadPor');
    var _length = aImg.length;
    var progress = 0;
//for (var i = 0; i < _length; i++) {
//    aImg[i].src = aImg.eq(i).attr('src');
//}
    aImg.on('load', function () {
        progress++;
        loadPor.html(Math.ceil(progress / _length * 100));
        if (progress == _length) {
            setTimeout(function () {
               $('#page_loading').hide() ;
               // main() ;
            }, 500);
        }
    });
}

main = function(){
	
}
