  /**
   * 展开通知和收起通知<br>
  * 1.点击某一个id的展开功能时候，首先所有的关闭，再展开id通知，展开id时候，class='fl w500'  class="ex_arrow ex_arrowUp mr5"  收起
   * 2.点击收起某一个id时候，class='fl symbleDot w500' class="ex_arrow ex_arrowDown mr5" 展开
   * @date 2013-3-5
  * @author xhw
   *
   * @param id
   */
 function infoContent(id) {
     var a_name = $("#a_" + id).attr("name");
     var record = $("#record").val();
     
    if(id == null || id == ""){
         alert("请求出错！");
    }else if(id == record){
         //本身对象(现在点击的和上一步操作的对象是同一个)
        if(a_name == "0"){
             $("#span_content_" + id).attr("class","fl w500");
            $("#a_" + id).html("<span class='ex_arrow ex_arrowUp mr5'></span>收起");
            $("#a_" + id).attr("name", "1");
        }else if(a_name == "1"){
           $("#span_content_" + id).attr("class","fl symbleDot w500");
             $("#a_" + id).html("<span class='ex_arrow ex_arrowDown mr5'></span>展开");
             $("#a_" + id).attr("name", "0");
             //$("#record").attr("value",id);
       }
    }else if(id != record){
        //新对象id，上一次点击对象record
       var older_name = $("#a_"+record).attr("name");
    //上一次点击的对象
        if(older_name == "0"){
           $("#span_content_" + record).attr("class","fl w500");
           $("#a_" + record).html("<span class='ex_arrow ex_arrowUp mr5'></span>收起");
            $("#a_" + record).attr("name", "1");
        }else if(older_name == "1"){
            $("#span_content_" + record).attr("class","fl symbleDot w500");
             $("#a_" + record).html("<span class='ex_arrow ex_arrowDown mr5'></span>展开");
           $("#a_" + record).attr("name", "0");
        }
         //新对象
         if(a_name == "0"){
            $("#span_content_" + id).attr("class","fl w500");
            $("#a_" + id).html("<span class='ex_arrow ex_arrowUp mr5'></span>收起");
            $("#a_" + id).attr("name", "1");
        }else if(a_name == "1"){
            $("#span_content_" + id).attr("class","fl symbleDot w500");
            $("#a_" + id).html("<span class='ex_arrow ex_arrowDown mr5'></span>展开");
            $("#a_" + id).attr("name", "0");
         }
         $("#record").attr("value",id);
   }
};