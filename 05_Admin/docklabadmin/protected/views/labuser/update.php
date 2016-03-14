<?php
/* @var $this */

$this->menu=array(
	array('label'=>'用户一览', 'url'=>array('/labuser/index/0')),
	array('label'=>'查看用户', 'url'=>array('/labuser/view/'. $id)),
);

Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/underscore-min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/backbone-min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/av-mini.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/jquery-dateformat.min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/util/CONST.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/util/init.js");

Yii::app()->clientScript->registerScript("load", '
    AV._initialize(CONST.APPID, CONST.APPKEY, CONST.MASTERKEY);
    AV._useMasterKey = true;
    var User = AV.Object.extend("User");
    var query = new AV.Query(User);
    var Users;
    query.equalTo("objectId", "' . $id . '");
    query.find({
        success: function(results) {
            var template = " \
                <div class=\"grid-view\"> \
                    <table class=\"items\"> \
                    <%for(var i = 0; i < list.length; i++) { var user = list[i];%> \
                        <tr> \
                            <th style=\"width:20%\">头像</th> \
                            <td style=\"width:80%\"><%var avatar = user.get(\"avatar\");if(avatar){%><img width=\"50px\" src=\"<%=avatar._url%>\" /><%}%><input id=\"avatar\" name=\"avatar\" type=\"file\" /></td> \
                        </tr> \
                        <tr> \
                            <th>用户名</th> \
                            <td><%=user.get(\"username\")%></td> \
                        </tr> \
                        <tr> \
                            <th>昵称</th> \
                            <td><input id=\"nickname\" size=\"16\" maxlength=\"16\" name=\"nickname\" value=\"<%=user.get(\"nickName\")%>\" type=\"text\"/></td> \
                        </tr> \
                        <tr> \
                            <th>状态</th> \
                            <td><select id=\"active\">\
                            <%if(user.get(\"active\") == 1){%>\
                                    <option value=\"1\">正常</option>\
                                    <option value=\"0\">禁用</option>\
                                <%} else {%>\
                                	<option value=\"0\">禁用</option>\
                                    <option value=\"1\">正常</option>\
                                <%}%>\
                            	</select>\
                            </td> \
                        </tr> \
                        <tr> \
                            <th>真实姓名</th> \
                            <td><input id=\"realname\" size=\"4\" maxlength=\"4\" name=\"realname\" value=\"<%=user.get(\"realName\")%>\" type=\"text\"/></td> \
                        </tr> \
                        <tr> \
                            <th>手机号码</th> \
                            <td><%=user.get(\"mobilePhoneNumber\")%></td> \
                        </tr> \
                        <tr> \
                            <th>地址</th> \
                            <td><input id=\"address\" size=\"40\" maxlength=\"40\" name=\"address\" value=\"<%=user.get(\"address\")%>\" type=\"text\"/></td> \
                        </tr> \
                        <%}%> \
                    </table> \
                </div> \
            ";
            var data = {};
            data.list = results;
            Users = results[0];
            var locations = results[0].get("location");
            var compiledTemplate = _.template(template);
            $("#target").html(compiledTemplate(data));
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
    $("#submit").on("click", function(event) {
        var nickName = $("#nickname").val().trim(),
            avatar = $("#avatar")[0].files[0],
            active = parseInt($("#active").val().trim()),
            realName = $("#realname").val().trim(),
            address = $("#address").val().trim();
        if (avatar) {
            if (Users.get("avatar")) {
                var oldAvatarId = Users.get("avatar").id;
            }
            var avatarFile = new AV.File("avatar-" + Users.id, avatar);
            avatarFile.save().then(function () {
                Users.set("nickName", nickName);
                Users.set("active", active);
                Users.set("avatar", avatarFile);
                Users.set("realName", realName);
                Users.set("address", address);
                Users.save().then(function (user) {
                    if (oldAvatarId) {
                        var oldAvatar = new AV.File();
                        oldAvatar.id = oldAvatarId;
                        oldAvatar.destroy().then(function () {}, function (error) {});
                    }
                    alert("修改成功");
                    location.reload();
                }, function (error) {
                    alert("Error: " + error.code + " " + error.message);
                });
            }, function (error) {
                alert("Error: " + error.code + " " + error.message);
            });
        } else {
            Users.set("nickName", nickName);
            Users.set("active", active);
            Users.set("realName", realName);
            Users.set("address", address);
            Users.save().then(function (user) {
                alert("修改成功");
                location.reload();
            }, function (error) {
                alert("Error: " + error.code + " " + error.message);
            });
        }
    });
'
);

?>

<h1>修改用户编号#<?php echo $id;?></h1>

<div id="target"></div>
<div class="row buttons">
	<input type="submit" id="submit" name="submit" value="修改">
</div>
