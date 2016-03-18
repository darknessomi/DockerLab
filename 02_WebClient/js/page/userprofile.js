$(function() {
    User = AV.Object.extend("User");
    this.user = User.current();
    this.user.fetch().then(function (user) {
        this.user = user;
        $(".form-group img").attr("src", this.user.get("avatar")?this.user.get("avatar")._url:"");
        $("#nickname").val(this.user.get("nickName"));
        $("#mail").val(this.user.get("email"));
        $("#phone").val(this.user.get("mobilePhoneNumber"));
        var Users = this.user;
        $("#basicsubmit").click(function(event) {
            var nickName = $("#nickname").val().trim(),
            avatar = $("#avatar")[0].files[0],
            mail = $("#mail").val().trim(),
            phone = $("#phone").val().trim();
            if (avatar) {
                if (Users.get("avatar")) {
                    var oldAvatarId = Users.get("avatar").id;
                }
                var avatarFile = new AV.File("avatar-" + Users.id, avatar);
                avatarFile.save().then(function () {
                    Users.set("nickName", nickName);
                    Users.set("avatar", avatarFile);
                    Users.set("email", mail);
                    Users.set("mobilePhoneNumber", phone);
                    Users.save().then(function (user) {
                        if (oldAvatarId) {
                            var oldAvatar = new AV.File();
                            oldAvatar.id = oldAvatarId;
                            oldAvatar.destroy().then(function () {}, function (error) {});
                        }
                        alert("success");
                        location.reload();
                    }, function (error) {
                        alert("Error: " + error.code + " " + error.message);
                    });
                }, function (error) {
                    alert("Error: " + error.code + " " + error.message);
                });
            } else {
                Users.set("nickName", nickName);
                Users.set("email", mail);
                Users.set("mobilePhoneNumber", phone);
                Users.save().then(function (user) {
                    alert("success");
                    location.reload();
                }, function (error) {
                    alert("Error: " + error.code + " " + error.message);
                });
            }
        });
        $("#passwordsubmit").click(function(event) {
            var oldpasswd = $("#oldpasswd").val().trim(),
            newpasswd = $("#newpasswd").val().trim(),
            repeatpasswd = $("#repeatpasswd").val().trim();
            if (newpasswd == repeatpasswd) {
                Users.updatePassword(oldpasswd, newpasswd).then(function() {
                    alert("success");
                    AV.User.logOut();
                    window.location.href = "login.html";
                }, function(error) {
                    alert("Error: " + error.code + " " + error.message);
                });
            } else {
                alert("newpasswd != repeatpasswd");
            }
        });
    }, function (error) {
        alert(error.message)
    });
});