<?php

class ThingTag extends \Eloquent {

	// Add your validation rules here
	public static $rules = [
		// 'title' => 'required'
	];

	// Don't forget to fill this array
	protected $fillable = [];
	
	//this seems to be needed if the Seeder would use the object. Since the seeder accesses the DB directly. Keep this commented out.
	public function things() {
		return $this->belongsToMany('thing');
	}
	
	public function tags() {
		return $this->belongsToMany('tag');
	}
	
}