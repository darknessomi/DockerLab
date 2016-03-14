<?php
/* @var $this  */


$this->menu=array(
	array("label"=>"添加用户", "url"=>array("create")),
);

Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/underscore-min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/backbone-min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/av-mini.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/lib/jquery-dateformat.min.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/util/CONST.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/util/init.js");
Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl."/js/util/Util.js");

Yii::app()->clientScript->registerScript("load", '
	var User = AV.Object.extend("User");
	var LIMIT = 100;
	var SKIP = ' . $skip . ';
	var query = new AV.Query(User);
	var flag = true;
	query.limit(LIMIT);
	query.skip(SKIP);
	query.descending("updatedAt");
	query.find({
		success: function(results) {
			var template = " \
				<div class=\"grid-view\"> \
					<table class=\"items\"> \
						<tr> \
							<th>头像</th> \
							<th>用户名</th> \
							<th>昵称</th> \
							<th>状态</th> \
							<th id=\"createdAt\">注册时间</th> \
							<th id=\"updatedAt\">最后登录时间</th> \
						</tr> \
						<%for(var i = 0; i < list.length; i++) {var user = list[i]; var location = user.get(\"location\");%> \
						<tr> \
							<td><%var avatar = user.get(\"avatar\");if(avatar){%><img width=\"50px\" src=\"<%=avatar._url%>\" /><%}%></td> \
							<td><a href=\"' . Yii::app()->baseUrl . '/labuser/view/<%=user.id%>\"><%=user.get(\"username\")%></a></td> \
							<td><%=user.get(\"nickName\")%></td> \
							<td><%if (user.get(\"active\") == 1) {%>正常<%} else if (user.get(\"active\") == 0){%>禁用<%} else {%>未注册<%}%></td> \
							<td><%if(user.createdAt){%><%=UTIL.DATEANDTIME(user.createdAt, \"yyyy-MM-dd\")%><%}%></td> \
							<td><%if(user.updatedAt){%><%=UTIL.DATEANDTIME(user.updatedAt, \"yyyy-MM-dd\")%><%}%></td> \
							</tr> \
						<%}%> \
					</table> \
					<%if(SKIP >= LIMIT){%> \
						<a href=\"' . Yii::app()->baseUrl . '/labuser/index/<%=SKIP - 100%>\">查看上一页</a> \
					<%}%> \
					<%if(list.length == LIMIT){%> \
						<a href=\"' . Yii::app()->baseUrl . '/labuser/index/<%=100 + SKIP%>\">查看下一页</a> \
					<%}%> \
				</div> \
			";
			var data = {};
			data.list = results;
			data.LIMIT = LIMIT;
			data.SKIP = SKIP;
			data.UTIL = UTIL;
			var compiledTemplate = _.template(template);
			$("#page-user-index").html(compiledTemplate(data));
		    $("#search").on("click", function(event) {
		    	var text = $("#searchText").val(),
		    		type = parseInt($("#searchType").val());
				if (type) {
					query.equalTo("username", text);
					query.descending("createdAt");
					query.find({
						success: function(results) {
							data.list = results;
							$("#page-user-index").html(compiledTemplate(data));
						},
						error: function(error) {
							alert("Error: " + error.code + " " + error.message);
						}
					});
					flag = true;
				} else {
					var squery = new AV.SearchQuery(User);
					squery.queryString(text);
					squery.limit(LIMIT);
					squery.skip(SKIP);
					squery.descending("updatedAt");
					squery.find({
						success: function(results) {
							data.list = results;
							var ids = [];
			                _.each(results, function (result) {
			                    ids.push(result.id);
			                });
							query.equalTo();
							query.containedIn("objectId", ids);
							query.descending("createdAt");
							query.find({
								success: function(results) {
									data.list = results;
									$("#page-user-index").html(compiledTemplate(data));
								},
								error: function(error) {
									alert("Error: " + error.code + " " + error.message);
								}
							});
						},
						error: function(error) {
							alert("Error: " + error.code + " " + error.message);
						}
					});
					flag = true;
				}
			});
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
'
);

?>

<h1>用户管理&nbsp;&nbsp;<span><input id="searchText" type="text"/>&nbsp;<select id="searchType" name="sex"><option value="1">用户名</option><option value="0">昵称</option></select>&nbsp;<input id="search" type="submit" value="搜索"></span></h1>

<div id="page-user-index"></div>
