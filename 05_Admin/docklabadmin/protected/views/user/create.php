<?php
/* @var $this UserController */
/* @var $model User */

$this->breadcrumbs=array(
	'用户'=>array('index'),
	'添加',
);

$this->menu=array(
	array('label'=>'用户一览', 'url'=>array('index')),
);
?>

<h1>添加用户</h1>

<?php $this->renderPartial('_form', array('model'=>$model, 'role'=>$role)); ?>
