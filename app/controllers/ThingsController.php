<?php

class ThingsController extends \BaseController {

  /**
   * Display a listing of things
   *
   * @return Response
   */
  public function index()
  {
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
    $thing = User::find(Authorizer::getResourceOwnerId())->things()->with('tags', 'thingable')->findOrFail($id);

    // return View::make('things.show', compact('thing'));
    return Response::json($thing, 200);
  }

    /**
   * Update the specified thing in storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function update($id)
  {
    $thing = User::find(Authorizer::getResourceOwnerId())->things()->findOrFail($id);

    $validator = Validator::make($data = Input::all(), Thing::$rules);

    if ($validator->fails())
    {
      return Redirect::back()->withErrors($validator)->withInput();
    }

    $thing->update($data);
    $thingable = $thing->thingable;
    $thingable->uri = $data['thingable']['uri'];
    $thingable->save();

    return Response::json("Saved", 200);
    //return Redirect::route('index');
  }


}
