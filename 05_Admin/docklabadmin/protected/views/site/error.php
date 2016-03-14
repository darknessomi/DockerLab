<?php
/* @var $this SiteController */
/* @var $error array */

$this->pageTitle=Yii::app()->name . ' - 出错了';
$this->breadcrumbs=array(
	'错误',
);
?>

<h2><?php echo $code; ?>错误</h2>

<div class="error">
<?php echo CHtml::encode($message); ?>
</div>