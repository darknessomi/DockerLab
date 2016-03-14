<?php
/* @var $this SiteController */

$this->pageTitle=Yii::app()->name;
?>

<h1><?php echo CHtml::encode(Yii::app()->name); ?></h1>

<p>用户<?php echo (Yii::app()->user->name); ?>，欢迎您进入<?php echo CHtml::encode(Yii::app()->name); ?>。</p>
