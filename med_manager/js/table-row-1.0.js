$(document).ready(function(){ 
///////datagrid选中行变色与鼠标经过行变色/////////////// 
var dtSelector = ".list"; 
var tbList = $(dtSelector); 

tbList.each(function() { 
var self = this; 
$("tr:even:not(:first)", $(self)).addClass("normalEvenTD"); // 从标头行下一行开始的奇数行，行数：（1，3，5...） 
$("tr:odd", $(self)).addClass("normalOddTD"); // 从标头行下一行开始的偶数行，行数：（2，4，6...） 

// 鼠标经过的行变色 
$("tr:not(:first)", $(self)).hover( 
function () { $(this).addClass('hoverTD');$(this).removeClass('table-td-content'); }, 
function () { $(this).removeClass('hoverTD');$(this).addClass('table-td-content'); } 
); 

// 选择行变色 
$("tr", $(self)).click(function (){ 
var trThis = this; 
$(self).find(".trSelected").removeClass('trSelected'); 
if ($(trThis).get(0) == $("tr:first", $(self)).get(0)){ 
return; 
} 
$(trThis).addClass('trSelected'); 
}); 
}); 
}); 