$(function() {
	var Email;
	var password;
	var confirmPss;

	$("#Submit").click(function() {

		$(".error").hide();

		if ($("#email").val() == "") {

			$("<label class='error' for='email'>用户名不能为空</label>").appendTo($("#email").parent("div"));
		} else if ($("#Password").val() == "") {

			$("<label class='error' for='Password'>密码不能为空</label>").appendTo($("#Password").parent("div"));

		} else {

			$.ajax({
				type : "post",
				url : "/jQuery360/login.do",
				data : {
					email : $("#email").val(),
					password : $("#Password").val()
				},
				success : function(res) {

				if(res.code==1){
					
					var user=res.email;
					
					window.location.href="index.html?user="+user+"";
				}

				},

				error : function(msg) {

					alert(msg);
				}
			});

		}

	})

})
