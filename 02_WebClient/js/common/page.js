$(function() {
	var User = AV.Object.extend("User");
	if (User.current()) {
		this.currentUser = User.current();
		$(".navbar .navbar-brand").html(this.currentUser.get("nickName")?"Welcome " 
			+ this.currentUser.get("nickName"):"Welcome " + this.currentUser.get("username"));
		$("#logout").click(function(event) {
			AV.User.logOut();
			alert("Logout Success");
			window.location.href = "login.html";
		});
	} else {
		alert("Login failed. Please Login again.");
		window.location.href = "login.html";
	}
});