jQuery.validator.addMethod("phoneNum", function(value, element) {
	var phoneNum = /^\d*$/;
    return this.optional(element) || (phoneNum.test(value));
}, "请输入数字");   

jQuery.validator.addMethod("queryName", function(value, element) {   
    var queryName = /^[\u4e00-\u9fa5]*$/;
    return this.optional(element) || (queryName.test(value));
}, "请输入汉字");