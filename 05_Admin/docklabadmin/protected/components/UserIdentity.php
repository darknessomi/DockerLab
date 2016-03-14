<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	const ERROR_USER_DELETE = 99;
	/**
	 * Authenticates a user.
	 * The example implementation makes sure if the username and password
	 * are both 'demo'.
	 * In practical applications, this should be changed to authenticate
	 * against some persistent user identity storage (e.g. database).
	 * @return boolean whether authentication succeeds.
	 */
	private $_id;

	public function authenticate()
	{
		$record=User::model()->findByAttributes(array('name'=>$this->username));
		if($record===null) {
			$this->errorCode=self::ERROR_USERNAME_INVALID;
			$this->errorMessage='用户名或密码错误';
		} else if ($record->password!==md5(md5($this->password) . $record->salt)) {
			$this->errorCode=self::ERROR_PASSWORD_INVALID;
			$this->errorMessage='用户名或密码错误';
		} else if (1 == $record->delete_flag) {
			$this->errorCode=self::ERROR_USER_DELETE;
			$this->errorMessage='用户已被删除，请联系管理员';
		} else {
			$this->_id=$record->id;
			$this->setState('title', $record->role_id);
			$this->errorCode=self::ERROR_NONE;
		}
		return !$this->errorCode;
	}

	public function getId()
	{
		return $this->_id;
	}
}
