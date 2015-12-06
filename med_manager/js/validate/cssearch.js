jQuery.validator.addMethod("custPhone", function(value, element) {
	var custPhone = /^[1][358]\d{9}$/;
    return this.optional(element) || (custPhone.test(value));
}, "请输入合法的手机号码");   

jQuery.validator.addMethod("agentName", function(value, element) {   
    var agentName = /^[\u4e00-\u9fa5]*$/;
    return this.optional(element) || (agentName.test(value));
}, "请输入汉字");

