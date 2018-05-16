// 生成无限分类树
function recursion(categoryJSON, pid) {
    var rtn = [];
    for (var i in categoryJSON) {
        if ((categoryJSON[i].pid == pid)) {
            var children = recursion(categoryJSON, categoryJSON[i].objectId);
            if (children.length > 0) {
                categoryJSON[i].children = children;
            }
            rtn.push(categoryJSON[i]);
        }
    }
    return rtn;
}

// 生成父节点单线路径
function parentWay(arr, objectId, treeValue) {
    arr.forEach(item => {
        if (item.objectId == objectId) {
            // find target obj
            if (item.pid != null) {
                parentWay(arr, item.pid, treeValue);
            }
            treeValue.push(objectId);
        }
    });
};

// 获取get参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" +
        name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}