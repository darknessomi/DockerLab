<?php
/* @var $this UserController */
/* @var $data User */
?>
<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('name')); ?>:</b>
	<?php echo CHtml::encode($data->name); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('password')); ?>:</b>
	<?php echo CHtml::encode($data->password); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('salt')); ?>:</b>
	<?php echo CHtml::encode($data->salt); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('role.description')); ?>:</b>
	<?php echo CHtml::encode($data->role->description); ?>
	<br />

	<!--<b><?php echo CHtml::encode($data->getAttributeLabel('delete_flag')); ?>:</b>
	<?php echo CHtml::encode($data->delete_flag); ?>
	<br />-->

	<b><?php echo CHtml::encode($data->getAttributeLabel('updated')); ?>:</b>
	<?php echo CHtml::encode($data->updated); ?>
	<br />

    <?php if (1 == $data->delete_flag) {?>
    <b>此账号已经被删除</b>
    <?php }?>
</div>