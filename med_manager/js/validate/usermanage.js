jQuery.validator.addMethod("phoneNum", function(value, element) {
	var phoneNum = /^[1][358]\d{9}$/;
    return this.optional(element) || (phoneNum.test(value));
}, "必须为合法的电话号码"); 