jQuery.validator.addMethod("prodPrice", function(value, element) {
	var prodPrice = /^[0-9.]*$/;
    return this.optional(element) || (prodPrice.test(value));
}, "必须为数字");   

jQuery.validator.addMethod("prodCode", function(value, element) {   
    var prodCode = /^[0-9a-zA-Z\s]*$/;
    return this.optional(element) || (prodCode.test(value));
}, "必须为数字或英文字母");

jQuery.validator.addMethod("prodName", function(value, element) {   
    var prodName = /\S/;
    return this.optional(element) || (prodName.test(value));
}, "不能为空");

jQuery.validator.addMethod("prodSn", function(value, element) {   
    var prodSn = /^[0-9a-zA-Z()\-\u4e00-\u9fa5\s]*$/;
    return this.optional(element) || (prodSn.test(value));
}, "必须为合法的批准文号格式");
