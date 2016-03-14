<?php
/* @var $this UserController */
/* @var $model User */

$this->breadcrumbs=array(
	'用户'=>array('index'),
	$model->name=>array('view','id'=>$model->id),
	'修改',
);

$this->menu=array(
	array('label'=>'用户一览', 'url'=>array('index')),
	array('label'=>'添加用户', 'url'=>array('create')),
	array('label'=>'查看用户', 'url'=>array('view', 'id'=>$model->id)),
);
?>

<h1>修改用户<?php echo $model->id; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model, 'role'=>$role)); ?>
