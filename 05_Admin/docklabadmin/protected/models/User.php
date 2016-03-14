<?php

/**
 * This is the model class for table "user".
 *
 * The followings are the available columns in table 'user':
 * @property integer $id
 * @property string $name
 * @property string $password
 * @property string $salt
 * @property integer $role_id
 * @property integer $delete_flag
 * @property string $updated
 *
 * The followings are the available model relations:
 * @property CompanyLoanLog[] $companyLoanLogs
 * @property PersonalLoanLog[] $personalLoanLogs
 * @property Role $role
 */
class User extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'user';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('name, password, salt, role_id', 'required', 'message'=>'请输入{attribute}。'),
            array('name','unique', 'className' => 'User', 'message'=>'{attribute}"{value}"已经被使用了。'),
			array('role_id, delete_flag', 'numerical', 'integerOnly'=>true),
			array('name', 'length', 'max'=>16),
			array('password', 'length', 'max'=>32),
			array('salt', 'length', 'max'=>6),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, name, role_id, delete_flag, updated', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'companyLoanLogs' => array(self::HAS_MANY, 'CompanyLoanLog', 'user_id'),
			'personalLoanLogs' => array(self::HAS_MANY, 'PersonalLoanLog', 'user_id'),
			'role' => array(self::BELONGS_TO, 'Role', 'role_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => '编号',
			'name' => '用户名',
			'password' => '密码',
			'salt' => '随机密钥',
			'role_id' => '权限',
			'delete_flag' => '删除',
			'updated' => '修改时间',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('role_id',$this->role_id);
		$criteria->compare('delete_flag',0,true);
		$criteria->compare('updated',$this->updated,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return User the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
