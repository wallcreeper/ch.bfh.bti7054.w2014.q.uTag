<?php

class ThingUri extends \Eloquent {

	// Add your validation rules here
	public static $rules = [
		'uri' => 'required|url'
	];

	protected $fillable = ['uri'];

	// Don't forget to fill this array
	protected $table = "thing_uris";

	public function thing() {
		return $this->morphOne('Thing', 'thingable');
	}
}