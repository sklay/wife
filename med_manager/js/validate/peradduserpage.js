jQuery.validator.addMethod("realName", function(value, element) {
	var realName = /^[\u4e00-\u9fa5]{2,5}$/;
    return this.optional(element) || (realName.test(value));
}, "必须为2~5位中文汉字");   

jQuery.validator.addMethod("phoneNum", function(value, element) {   
    var phoneNum = /^[1][358]\d{9}$/;
    return this.optional(element) || (phoneNum.test(value));
}, "请输入合法的手机号码");

jQuery.validator.addMethod("passWord", function(value, element) {   
    var passWord = /^[A-Za-z0-9_]{3,12}$/;
    return this.optional(element) || (passWord.test(value));
}, "字母、数字或下划线且3~12位");

jQuery.validator.addMethod("rePassWord", function(value, element) {   
    var rePassWord = /^[A-Za-z0-9_]{3,12}$/;
    return this.optional(element) || (rePassWord.test(value));
}, "字母、数字或下划线且3~12位");