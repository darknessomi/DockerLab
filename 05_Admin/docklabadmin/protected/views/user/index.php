<?php
/* @var $this UserController */
/* @var $model User */

$this->breadcrumbs=array(
	'用户'=>array('index'),
	'管理',
);

$this->menu=array(
	array('label'=>'添加用户', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#user-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1>用户管理</h1>

<?php echo CHtml::link('高级搜索','#',array('class'=>'search-button')); ?>
<div class="search-form" style="display:none">
<?php $this->renderPartial('_search',array(
    'model'=>$model,
    'role'=>$role
)); ?>
</div><!-- search-form -->


<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'user-grid',
    'emptyText' => '没有符合条件的用户',
    'summaryText' => '显示总共{count}条记录中的{start}-{end}',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'id',
		'name',
		'role_id'=> array(
			'name' => 'role_id',
			'value' => '$data->role->description',
            'filter'=> CHtml::listData(Role::model()->findAll(), 'id', 'description')
		),
		'updated',
		array(
			'class'=>'CButtonColumn',
            'viewButtonLabel'=>'查看',
            'updateButtonLabel'=>'修改',
            'deleteButtonLabel'=>'删除',
		),
	),
)); ?>
