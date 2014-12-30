<?php

class TagsController extends \BaseController {

  /**
   * Display a listing of tags
   *
   * @return Response
   */
  public function index()
  {
    $tags = User::find(Authorizer::getResourceOwnerId())->tags;

    // return View::make('tags.index', compact('tags'));
    // return Response::json(array(
    //  'error' => false,
    //  'tags' => $tags->toArray()),
    //  200
    // );
    return Response::json($tags->toArray(), 200);
  }

  /**
   * Show the form for creating a new tag
   *
   * @return Response
   */
  public function create()
  {
    return View::make('tags.create');
  }

  /**
   * Store a newly created tag in storage.
   *
   * @return Response
   */
  public function store()
  {
    $validator = Validator::make($data = Input::all(), Tag::$rules);

    if ($validator->fails())
    {
      return Redirect::back()->withErrors($validator)->withInput();
    }

    Tag::create($data);

    return Redirect::route('tags.index');
  }

  /**
   * Display the specified tag.
   *
   * @param  int  $id
   * @return Response
   */
  public function show($id)
  {
    $tag = User::find(Authorizer::getResourceOwnerId())->tags()->findOrFail($id);


    return Response::json($tag, 200);
    // return View::make('tags.show', compact('tag'));
  }

  /**
   * Show the form for editing the specified tag.
   *
   * @param  int  $id
   * @return Response
   */
  public function edit($id)
  {
    $tag = User::find(Authorizer::getResourceOwnerId())->tags()->findOrFail($id);

    return View::make('tags.edit', compact('tag'));
  }

  /**
   * Update the specified tag in storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function update($id)
  {
    $tag = User::find(Authorizer::getResourceOwnerId())->tags()->findOrFail($id);

    $validator = Validator::make($data = Input::all(), Tag::$rules);

    if ($validator->fails())
    {
      return Redirect::back()->withErrors($validator)->withInput();
    }

    $tag->update($data);

    return Redirect::route('tags.index');
  }

  /**
   * Remove the specified tag from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy($id)
  {
    //HERE THE USER AUTH needs to bee implemented like User::find(Authorizer::getResourceOwnerId())->tags()->findOrFail($id)->destroy();?
    Tag::destroy($id);

    return Redirect::route('tags.index');
  }

}
