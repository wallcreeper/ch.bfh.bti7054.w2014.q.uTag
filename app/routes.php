<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('index');
});

// Route group for API versioning, not authenticated
Route::group(array('prefix' => 'api/v1'), function()
{
	Route::post('auth/login', 'AuthController@login');
	Route::post('auth/register', 'AuthController@register');
});

// Route group for API versioning, authenticated
Route::group(array('prefix' => 'api/v1', 'before' => 'oauth'), function()
{
	Route::resource('tags', 'TagsController');
	Route::resource('things', 'ThingsController');

	Route::post('tags/search', 'TagsController@search');
	Route::get('user/tags', 'TagsController@userTagsDistinct');
	Route::post('things/search', 'ThingsController@search');
	Route::get('auth/user', 'AuthController@getUserId');
});

// Display all SQL executed in Eloquent
// Event::listen('illuminate.query', function($query)
// {
// 	var_dump($query);
// });
