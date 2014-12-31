<?php

class Thing extends \Eloquent {

	// Add your validation rules here
	public static $rules = [
		// 'title' => 'required'
	];

	// Don't forget to fill this array
	protected $fillable = ['name','description'];

	public function tags() {
		return $this->belongsToMany('tag', 'thing_tag');
	}

	public function thingable() {
		return $this->morphTo();
	}

	public function user() {
		return $this->belongsTo('User', 'thing_user');
	}
}