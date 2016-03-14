<?php
/* @var $this UserController */
/* @var $model User */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'user-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>
	<p class="note">有<span class="required">*</span>是必填项目。</p>

	<?php echo $form->errorSummary($model, ''); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'name'); ?>
        <?php if ($model->isNewRecord) {?>
		<?php echo $form->textField($model,'name',array('size'=>16,'maxlength'=>16)); ?>
		<?php echo $form->error($model,'name'); ?>
        <?php } else {?>
        <?php echo $model->name;?>
        <?php echo $form->hiddenField($model,'name');?>
        <?php }?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'password'); ?>
		<?php echo $form->passwordField($model,'password',array('size'=>32,'maxlength'=>32,'value'=>'')); ?>
		<?php echo $form->error($model,'password'); ?>
	</div>
    
	<div class="row">
		<?php echo $form->labelEx($role,'description'); ?>
        <?php $selectRoleIndex = ($model->role_id) ? $model->role_id : "1";?>
        <?php echo $form->dropDownList($model,'role_id',CHtml::listData(Role::model()->findAll(), 'id', 'description'), array('options' => array($selectRoleIndex=>array('selected'=>true)))); ?>
	</div>
    
	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? '添加' : '保存'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->