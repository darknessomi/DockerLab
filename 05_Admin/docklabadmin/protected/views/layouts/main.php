<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh_cn" lang="zh_cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="language" content="zh_cn" />

    <!-- blueprint CSS framework -->
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/screen.css" media="screen, projection" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/print.css" media="print" />
    <!--[if lt IE 8]>
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/ie.css" media="screen, projection" />
    <![endif]-->

    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/main.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/form.css" />

    <title><?php echo CHtml::encode($this->pageTitle); ?></title>

</head>

<body>

<div class="container" id="page">

    <div id="header">
        <div id="logo"><?php echo CHtml::encode(Yii::app()->name); ?></div>
    </div><!-- header -->

   <div id="mainmenu">
        <?php
        if (Yii::app()->user->isGuest) {
            $this->widget('zii.widgets.CMenu',array(
                'encodeLabel' => false,
                'items'=>array(
                    array('label'=>'首页', 'url'=>array('/site/index'))
                ),
            ));
        } else {
            switch (Yii::app()->user->title) {
                case Role::TYPE_SYSTEM_ADMIN:
                    $this->widget('zii.widgets.CMenu',array(
                        'encodeLabel' => false,
                        'items'=>array(
                            array('label'=>'系统用户管理', 'url'=>array('/user/index/0'), 'active'=>(Yii::app()->controller->id=='user')),
                            array('label'=>'用户管理', 'url'=>array('/labuser/index/0'), 'active'=>(Yii::app()->controller->id=='labuser')),
                            array('label'=>'登出', 'url'=>array('/site/logout'))
                        ),
                    ));
                    break;
                case Role::TYPE_ADMIN:
                    $this->widget('zii.widgets.CMenu',array(
                        'encodeLabel' => false,
                        'items'=>array(
                            array('label'=>'用户管理', 'url'=>array('/labuser/index/0'), 'active'=>(Yii::app()->controller->id=='angususer')),
                            array('label'=>'登出', 'url'=>array('/site/logout'))
                        ),
                    ));
                    break;
                case Role::TYPE_PRODUCT:
                    $this->widget('zii.widgets.CMenu',array(
                        'encodeLabel' => false,
                        'items'=>array(
                            array('label'=>'用户管理', 'url'=>array('/labuser/index/0'), 'active'=>(Yii::app()->controller->id=='angususer')),
                            array('label'=>'登出', 'url'=>array('/site/logout'))
                        ),
                    ));
                    break;
                case Role::TYPE_OPERATOR:
                    $this->widget('zii.widgets.CMenu',array(
                        'encodeLabel' => false,
                        'items'=>array(
                            array('label'=>'用户管理', 'url'=>array('/labuser/index/0'), 'active'=>(Yii::app()->controller->id=='angususer')),
                            array('label'=>'登出', 'url'=>array('/site/logout'))
                        ),
                    ));
                    break;
            }
        }
        ?>
    </div><!-- mainmenu -->

    <?php echo $content; ?>

    <div id="footer">
        版权所有 &copy; 2015-<?php echo date('Y'); ?> DockerLab<br/>
    </div><!-- footer -->

</div><!-- page -->

</body>
</html>
