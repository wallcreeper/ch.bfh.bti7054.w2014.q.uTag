<?php

class ThingsController extends \BaseController {

  /**
   * Display a listing of things
   *
   * @return Response
   */
  public function index()
  {

    //$things = Thing::with('tags', 'thingable')->get();
    $things = User::find(Authorizer::getResourceOwnerId())->things()->with('tags', 'thingable')->get();
    

    // return View::make('things.index', compact('things'));
    // return Response::json(array(
    //  'error' => false,
    //  'things' => $things->toArray()),
    //  200
    // );
    return Response::json($things->toArray(), 200);
  }

  /**
   * Display the specified thing.
   *
   * @param  int  $id
   * @return Response
   */
  public function show($id)
  {
    $thing = Thing::with('tags', 'thingable')->findOrFail($id);

    // return View::make('things.show', compact('thing'));
    return Response::json($thing, 200);
  }

}
