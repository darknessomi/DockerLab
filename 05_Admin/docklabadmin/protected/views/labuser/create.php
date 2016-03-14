<?php
/* @var $this */

$this->menu=array(
	array('label'=>'用户一览', 'url'=>array('/labuser/index/0')),
);

Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/underscore-min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/backbone-min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/av-mini.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/jquery-dateformat.min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/util/CONST.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/util/init.js");

Yii::app()->clientScript->registerScript("load", '
	$("#submit").on("click", function(event) {
		var User = AV.Object.extend("User");
		var Users = new User;
		var nickName = $("#nickname").val().trim(),
            avatar = $("#avatar")[0].files[0],
            username = $("#username").val().trim(),
            mail = $("#mail").val().trim(),
			number = $("#number").val().trim(),
            password = $("#password").val().trim();
        if (avatar) {
            var avatarFile = new AV.File("avatar-" + Users.id, avatar);
            avatarFile.save().then(function () {
                Users.set("nickName", nickName);
                Users.set("avatar", avatarFile);
                Users.set("mobilePhoneNumber", number);
                Users.set("email", mail);
                Users.set("username", username);
                Users.set("active", 1);
                Users.set("password", password);
                Users.save().then(function (user) {
                    alert("添加成功");
                    window.location.href = "' . Yii::app()->baseUrl . '/labuser/index/0";
                }, function (error) {
                    alert("Error: " + error.code + " " + error.message);
                });
            }, function (error) {
                alert("Error: " + error.code + " " + error.message);
            });
        } else {
			alert("没脑袋");
        }
	});
'
);
?>

<h1>添加用户</h1>
	<div class="form">
		<form id="user-form" onsubmit="return false;">
			<p class="note">有<span class="required">*</span>是必填项目。</p>
			<div class="row">
				<label for="username" class="required">用户名&nbsp;<span class="required">*</span></label>
				<input size="16" maxlength="16" id="username" name="username" type="text" />
			</div>
			<div class="row">
				<label for="number" class="required">手机号&nbsp;<span class="required">*</span></label>
				<input size="16" maxlength="16" id="number" name="number" type="text" />
			</div>
			<div class="row">
				<label for="mail" class="required">邮箱&nbsp;<span class="required">*</span></label>
				<input size="16" id="mail" name="mail" type="text" />
			</div>
			<div class="row">
				<label for="password" class="required">密码&nbsp;<span class="required">*</span></label>
				<input size="16" maxlength="16" id="password" name="password" type="text" />
			</div>
			<div class="row">
				<label for="avatar" class="required">头像&nbsp;<span class="required">*</span></label>
				<input id="avatar" name="avatar" type="file" />
			</div>
			<div class="row">
				<label for="nickname" class="required">昵称&nbsp;<span class="required">*</span></label>
				<input id="nickname" size="16" maxlength="16" name="nickname" type="text" />
			</div>
			<div class="row buttons">
				<input type="submit" id="submit" name="submit" value="添加">
			</div>
		</form>
	</div>
