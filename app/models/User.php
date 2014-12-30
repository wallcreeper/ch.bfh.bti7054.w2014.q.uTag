<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password', 'remember_token');

	// Add your validation rules here
	public static $rules = array(
		'username' => 'required|unique:users',
		'email' => 'required|email|unique:users',
		'password' => 'required|min:8'
	);

	public function tags() {
		return $this->belongsToMany('Tag', 'tag_user');
	}

	public function things() {
		return $this->belongsToMany('Thing', 'thing_user');
	}
}
