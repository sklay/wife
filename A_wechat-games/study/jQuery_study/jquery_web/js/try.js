$(function() {

	//showEdit();
	$("#subbutton").click(function() {

		showEdit();

	})

})

function showEdit() {

	var editcont = $("#TestCode").val();
	$("#result .editContent").html(editcont);
/*	window.frames[0].document.body.innerHTML = "";
	window.frames[0].document.write(editcont);*/

}