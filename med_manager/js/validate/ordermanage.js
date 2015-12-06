jQuery.validator.addMethod("orderId", function(value, element) {
	var orderId = /^\d{1,8}$/;
    return this.optional(element) || (orderId.test(value));
}, "必须为1到8位数字");   

jQuery.validator.addMethod("addrPhoneNo", function(value, element) {   
    var addrPhoneNo = /^[1][358]\d{9}$/;
    return this.optional(element) || (addrPhoneNo.test(value));
}, "请输入合法的手机号码");

jQuery.validator.addMethod("minOrderFee", function(value, element) {   
    var minOrderFee = /^[0-9.]*$/;
    return this.optional(element) || (minOrderFee.test(value));
}, "必须为数字");

jQuery.validator.addMethod("maxOrderFee", function(value, element) {   
    var maxOrderFee = /^[0-9.]*$/;
    return this.optional(element) || (maxOrderFee.test(value));
}, "必须为数字");