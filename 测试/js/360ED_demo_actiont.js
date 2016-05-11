var wx_config = {};
var loading_progress_percent = 15; 
var loading_progress_timer;

function compute_loadding_progress(){

    if (loading_progress_percent < 70)
        loading_progress_percent = loading_progress_percent + 5;
    else if (loading_progress_percent > 70 && loading_progress_percent < 100)
        loading_progress_percent = loading_progress_percent + 10;
    else{
        clear_loading_progress();  
    }
}
function set_loading_progress(i){
    if ( document.getElementById('loading-progress') != null  ){
        document.getElementById('loading-progress').style.width= loading_progress_percent + '%';
    }
}

function clear_loading_progress(){
    clearInterval(loading_progress_timer);
    if (typeof loading_progress_timer1 != 'undefined'){
        clearInterval(loading_progress_timer1);

        workEnd('-------- 5. cbvview start clear loading 2 --------')
        if(typeof jQuery!="undefined"){
            interaction_view.containment.children('.prejsloading').fadeOut(1500,function(){
                interaction_view.containment.children('.prejsloading').remove();
                interaction_view.play(interaction_view.currentPage);
                workEnd('-------- 5. cbvview end clear loading 2 --------')
                if(window.loadAnalytics) loadAnalytics();
            })
        }
        else{
            window.setTimeout(function(){
                interaction_view.containment.children('.prejsloading').remove();
                interaction_view.play(interaction_view.currentPage);
                if(window.loadAnalytics) loadAnalytics();
            },500)
        }
    }
}

function initEpub360Player(){

    // if(request_server.readyState != 4 || request_server.status != 200) return;
    var b = request_server.responseText;  
    eval(b);
    weixin_config_ready = 1; // 获取到微信config信息

    // initial the loading screen
    if(wx_config['nonceStr']&&wx_config['nonceStr'].length % 2){
        var elogo1 = document.getElementsByClassName('epub360-logo1')[0];
        elogo1.setAttribute('class','prejsloading');
        var elogo3 = document.getElementsByClassName('epub360-logo3')[0];
        elogo3.parentNode.removeChild(elogo3);

    }else{
        var elogo1 = document.getElementsByClassName('epub360-logo1')[0];
        elogo1.parentNode.removeChild(elogo1);
        var elogo2 = document.getElementsByClassName('epub360-logo2')[0];
        elogo2.parentNode.removeChild(elogo2);
        var elogo3 = document.getElementsByClassName('epub360-logo3')[0];
        elogo3.setAttribute('class','prejsloading');
    }

    /* 进度图 */
    if(if_show_cover){
        loading_progress_timer = null;
    }else{
        loading_progress_timer = setInterval(function(){
            compute_loadding_progress();
            set_loading_progress();
        }, 200)
    }

    if(typeof epub360InitEvent == 'function'){ 
        epub360InitEvent(); 
    }

    if(typeof load_wx != 'undefined' && weixin_initial == 0 ){
        load_wx();
    }
};

var request_server = new window.XMLHttpRequest();
var request_url = "config.js?url=" + encodeURIComponent(window.location.origin + window.location.pathname + window.location.search);
//request_server.open('GET', request_url, false);
//request_server.send(null);
//initEpub360Player();

var isMobilePlayer = 0;
// 判断是否为移动端运行环境
if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
    if(window.location.href.indexOf("?mobile")<0){
        try{
            if(/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)){
                // 判断访问环境是 Android|webOS|iPhone|iPod|BlackBerry 则加载以下样式
                isMobilePlayer = 1;
            }
            else{
                // 判断访问环境是 其他移动设备 则加载以下样式
            }
        }
        catch(e){}
    }
}
else{
    // 如果以上都不是，则加载以下样式
} 