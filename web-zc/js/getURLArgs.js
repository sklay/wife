/**
 * Created by Administrator on 2016/7/14.
 */

(function(){
    function getQueryStringArgs() {
        var qs = location.search.length > 0 ? location.search.substring(1) : "";
        var args = {};
        var item = [];
        var name = null;
        var value = null;
        var items = qs.length ? qs.split("&") : [];
        for (var i = 0; i < items.length; i++) {
            item = items[i].split("=");
            name = item[0];
            value = item[1];

            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    }

    window.getQueryStringArgs = getQueryStringArgs;
})();