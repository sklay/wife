jQuery.validator.addMethod("adminName", function(value, element) {
	var adminName = /^[\u4e00-\u9fa5]{2,5}$/;
    return this.optional(element) || (adminName.test(value));
}, "必须为2~5中文汉字"); 

jQuery.validator.addMethod("phone", function(value, element) {
	var phone = /^[1][358]\d{9}$/;
    return this.optional(element) || (phone.test(value));
}, "必须为合法的电话号码"); 

jQuery.validator.addMethod("passWord", function(value, element) {
	var passWord = /^[a-zA-Z0-9_]{3,12}$/;
    return this.optional(element) || (passWord.test(value));
}, "字母数字下划线3~12位"); 
