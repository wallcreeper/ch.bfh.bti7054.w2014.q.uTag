<?php

class Tag extends \Eloquent {

	// Add your validation rules here
	public static $rules = [
		// 'title' => 'required'
	];

	// Don't forget to fill this array
	protected $fillable = ['name','counter'];


	public function things() {
		return $this->belongsToMany('thing', 'thing_tag');
	}

}