jQuery.validator.addMethod("roleName", function(value, element) {
	var roleName = /^[\u4e00-\u9fa5]*$/;
    return this.optional(element) || (roleName.test(value));
}, "必须为中文汉字"); 