$(function() {
	var User = AV.Object.extend("User");
	if (!User.current()) {
		$(".btn-lg").click(function(event) {
			var username = $("#username").val().trim(),
		    password = $("#password").val().trim();
		    User.logIn(username, password).then(function (user) {
	            window.location.href = "index.html";
	        }, function (error) {
	            alert(error.message);
	            if (error.code == 211) {
	            	$(".form-group:first").addClass("has-error");
	            } else {
	            	$(".form-group").addClass("has-error");
	            }
	        });
		});
	} else {}
});