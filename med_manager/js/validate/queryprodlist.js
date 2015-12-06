jQuery.validator.addMethod("prodId", function(value, element) {   
    var prodId = /^[0-9]*$/;
    console.log(element);
    return this.optional(element) || (prodId.test(value));
}, "必须为数字");

jQuery.validator.addMethod("prodName", function(value, element) {   
    var prodName = /^[0-9a-zA-Z\-\u4e00-\u9fa5]*$/;
    return this.optional(element) || (prodName.test(value));
}, "必须合法的药品名称");

jQuery.validator.addMethod("prodFirm", function(value, element) {   
    var prodFirm = /^[()\u4e00-\u9fa5]*$/;
    return this.optional(element) || (prodFirm.test(value));
}, "必须合法的生产厂家名称");