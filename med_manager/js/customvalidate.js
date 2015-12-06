	$.validator.addMethod("custom", function(value, element, params) { 
		
		if (!params.required && (value == null || value.length == 0))  {
			return true;
		}
		
		if (params.required && (value == null || value.length == 0)) {
			return false;
		}
		
		if (params.regex && (!new RegExp(params.regex).test(value))) {
			return false;
		}
		return true;
	}, function(params) {
		return (params.title||"") + params.message;
	});