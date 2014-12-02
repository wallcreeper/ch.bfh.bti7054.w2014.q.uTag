<?php

class ThingsController extends \BaseController {

	/**
	 * Display a listing of things
	 *
	 * @return Response
	 */
	public function index()
	{
		$things = Thing::all();

		// return View::make('things.index', compact('things'));
		// return Response::json(array(
		// 	'error' => false,
		// 	'things' => $things->toArray()),
		// 	200
		// );
		return Response::json($things->toArray(), 200);
	}
}

?>