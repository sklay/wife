jQuery.validator.addMethod("distName", function(value, element) {
	var distName = /^[\u4e00-\u9fa5]*$/;
    return this.optional(element) || (distName.test(value));
}, "必须为中文汉字"); 

jQuery.validator.addMethod("distPhone", function(value, element) {
	var distPhone = /^\d$/;
    return this.optional(element) || (distPhone.test(value));
}, "必须为数字"); 