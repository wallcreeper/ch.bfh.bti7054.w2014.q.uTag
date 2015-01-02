<?php

class Tag extends \Eloquent {

	// Add your validation rules here
	public static $rules = [
		// 'title' => 'required'
	];

	// Don't forget to fill this array
	protected $fillable = ['name','counter'];

	protected $hidden = ['counter', 'created_at', 'updated_at', 'user', 'pivot'];


	public function things() {
		return $this->belongsToMany('thing', 'thing_tag');
	}

	public function user() {
		return $this->belongsToMany('User', 'tag_user');
	}

}