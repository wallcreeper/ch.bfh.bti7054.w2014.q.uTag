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
	Route::get('auth/user', 'AuthController@getUserId');
});

// Route group for API versioning, authenticated
Route::group(array('prefix' => 'api/v1', 'before' => 'oauth'), function()
{
	Route::resource('tags', 'TagsController');
	Route::resource('things', 'ThingsController');
});
