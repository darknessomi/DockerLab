<?php
/* @var $this */

$this->menu=array(
    array('label'=>'用户一览', 'url'=>array('/labuser/index/0')),
    array('label'=>'添加用户', 'url'=>array('create')),
    array('label'=>'修改用户', 'url'=>array('/labuser/update/'. $id)),
);

Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/underscore-min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/backbone-min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/av-mini.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/jquery-dateformat.min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/util/CONST.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/util/init.js");

Yii::app()->clientScript->registerScript("load", '
    var User = AV.Object.extend("User");
    var query = new AV.Query(User);
    // query.include("location");
    // query.include("location.province");
    query.equalTo("objectId", "' . $id . '");
    query.find({
        success: function(results) {
            var template = " \
                <div class=\"grid-view\"> \
                    <table class=\"items\"> \
                    <%for(var i = 0; i < list.length; i++) { var user = list[i]; var location = user.get(\"location\"); %> \
                        <tr> \
                            <th style=\"width:20%\">头像</th> \
                            <td style=\"width:80%\"><%var avatar = user.get(\"avatar\");if(avatar){%><img width=\"50px\" src=\"<%=avatar._url%>\" /><%}%></td> \
                        </tr> \
                        <tr> \
                            <th>用户名</th> \
                            <td><%=user.get(\"username\")%></td> \
                        </tr> \
                        <tr> \
                            <th>昵称</th> \
                            <td><%=user.get(\"nickName\")%></td> \
                        </tr> \
                        <tr> \
                            <th>状态</th> \
                            <td><%if (user.get(\"active\") == 1) {%>正常<%} else {%>禁用<%}%></td> \
                        </tr> \
                        <tr> \
                            <th>注册日期</th> \
                            <td><%if(user.createdAt){%><%=$.format.date(user.createdAt, \"yyyy-MM-dd\")%><%}%></td> \
                        </tr> \
                        <tr> \
                            <th>最后登录日期</th> \
                            <td><%if(user.updatedAt){%><%=$.format.date(user.updatedAt, \"yyyy-MM-dd\")%><%}%></td> \
                        </tr>\
                        <tr> \
                            <th>真实姓名</th> \
                            <td><%=user.get(\"realName\")%></td> \
                        </tr> \
                        <tr> \
                            <th>手机号码</th> \
                            <td><%=user.get(\"mobilePhoneNumber\")%></td> \
                        </tr> \
                        <tr> \
                            <th>地址</th> \
                            <td><%=user.get(\"address\")%></td> \
                        </tr> \
                    <%}%>\
                    </table> \
                </div> \
            ";
            var data = {};
            data.list = results;
            data.SEX = ["男", "女"];
            var compiledTemplate = _.template(template);
            $("#target").html(compiledTemplate(data));
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
'
);

?>

<h1>查看用户编号#<?php echo $id;?></h1>

<div id="target"></div>
