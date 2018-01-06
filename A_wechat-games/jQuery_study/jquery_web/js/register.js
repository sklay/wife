$(function() {
	var Email;
	var password;
	var confirmPss;

	$("#Submit").click(function() {

		// 验证邮箱项

		Email = $("#email").val();
		var regemail = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
		var femail = regemail.test(Email);
		// 验证密码
		password = $("#setPassword").val();
		var regPass = /^[a-zA-Z0-9]{6,10}$/;
		var fePass = regPass.test($("#setPassword").val());

		// 验证确认密码

		confirmPss = $("#confirmPassword").val();
		var feConfirm = regPass.test(confirmPss);

		$(".error").hide();

		if (femail == false) {

			$("<label class='error' for='email'>请输入合法的邮箱地址</label>").appendTo($("#email").parent("div"));
		} else if (fePass == false) {

			$("<label class='error' for='setPassword'>密码为:必须且只含有数字和字母，6-10位</label>").appendTo($("#setPassword").parent("div"));

		} else if (confirmPss == false) {

			$("<label class='error' for='confirmPassword'>密码为:必须且只含有数字和字母，6-10位</label>").appendTo($("#confirmPassword").parent("div"));

		} else if (password != confirmPss) {

			$("<label class='error' for='confirmPassword'>您输入的密码不一致</label>").appendTo($("#confirmPassword").parent("div"));
		} else {

			$.ajax({
				type : "post",
				url : "/jQuery360/register.do",
				data : {
					email : Email,
					password : password
				},
				success : function(res) {

					if (res.result == "注册成功") {
					    alert("注册成功，请前往邮箱激活");
						window.location.href = "login.html";
					}
					;

				},

				error : function(msg) {

					alert(msg.result);
				}
			});

		}

	})

})
