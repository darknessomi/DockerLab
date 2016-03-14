<?php
/* @var $this UserController */
/* @var $model User */
$this->breadcrumbs=array(
    '用户'=>array('index'),
    $model->name,
);
if (0 == $model->delete_flag) {
    $this->menu=array(
        array('label'=>'用户一览', 'url'=>array('index')),
        array('label'=>'添加用户', 'url'=>array('create')),
        array('label'=>'修改用户', 'url'=>array('update', 'id'=>$model->id)),
        array('label'=>'删除用户', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'你确认要删除这个用户么?')),
    );
} else {
    $this->menu=array(
        array('label'=>'用户一览', 'url'=>array('index')),
        array('label'=>'添加用户', 'url'=>array('create')),
    );
}
?>

<h1>查看用户编号是<?php echo $model->id; ?>的用户</h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'name',
		'password',
		'salt',
		'role_id'=> array(
			'name' => 'role.description',
			'value' => $model->role->description,
		),
		'updated',
	),
)); ?>
<?php if(1 == $model->delete_flag) {?>
<b>该账号已经被删除</b>
<?php }?>
