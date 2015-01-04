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
  * @param int $id
  * @return Response
  */
  public function update($id)
  {
    $thing = User::find(Authorizer::getResourceOwnerId())->things()->findOrFail($id);
    $user = User::find(Authorizer::getResourceOwnerId());

    $tagsBeforeUpdate = $thing->tags()->get();
    $tagIdsBeforeUpdate = array();

    foreach ($tagsBeforeUpdate as $aTag) {
      array_push($tagIdsBeforeUpdate, $aTag->id);
    }

    //return var_dump($tagIdsBeforeUpdate);


    $validator = Validator::make($data = Input::all(), Thing::$rules);

    if ($validator->fails())
    {
      return Redirect::back()->withErrors($validator)->withInput();
    }

    // Update the thing-parameters
    $thing->update($data);

    /**
    * Get tag-ids for DB-Insert
    * Generate new tag if there is no id
    *
    * @param object $n
    * @return array(int ids)
    */
    /*function getTagsIdAndCreateNew($n)
    {
      global $thing;

      if (isset($n['id'])) {
        return($n['id']);
      } else {
        $tag = Tag::create([
          'name' => $n['name'],
          'counter' => '0'
        ]);
        $user = User::find(Authorizer::getResourceOwnerId());
        $user->tags()->save($tag);
        $thing->tags()->attach($tag);
        return $tag->id;
      }
    }*/

    $tags = array();

    //$tagIdsBeforeUpdate = $thing->tags()->get();

    foreach ($data['tags'] as $dataTag) {
      if (isset($dataTag['id'])) {
        array_push($tags, $dataTag['id']);
      } else {
        $tag = Tag::create([
          'name' => $dataTag['name'],
          'counter' => '0'
        ]);
        $user->tags()->save($tag);
        //$thing->tags()->attach($tag);
        array_push($tags, $tag->id);
      }
    }

    // update the tags
    // array_map calls getTagsIdAndCreateNew($data['tags']) and returns an array of just the ids of the tags
    //$tags = array_map("getTagsIdAndCreateNew", $data['tags']);


   // return var_dump($tagIdsBeforeUpdate);

    // update the counter of the tags

    $tagIdsWhichAreRemoved = array();

    $tagIdsWhichAreRemoved = array_diff($tagIdsBeforeUpdate, $tags);
    //return $tagIdsWhichAreRemoved;

    // compare which tags have been added and which continue existing
    foreach ($tags as $newTagId) {
      $existed = 0;
      $tagToRemoveId = "";

      foreach ($tagIdsBeforeUpdate as $oldTag) {
        unset($tagToRemoveId);
        if ($oldTag == $newTagId) {
          $existed = 1;
          break;
        }
      }

      if ($existed == 0) {
        // attach tag and increase counter of the tag
        $tag = Tag::find($newTagId);
        $tag->counter = ($tag->counter + 1);
        $thing->tags()->attach($tag);
        $tag->save();
      } 
   /*   } elseif (isset($tagToRemoveId)) {
        return "we remove this: ".$tagToRemoveId;
        //put tag-id to array
          array_push($tagIdsWhichAreRemoved, $tagToRemoveId);
      }*/
    }

    $thing->tags()->sync($tags); //-------------------------------------------------------------- remove -> that will be done ganz unten

    // check for tags to delete
    foreach ($tagIdsWhichAreRemoved as $oldTag) {

        $tag = Tag::find($oldTag);
        //return $oldTag;
        if ($tag->counter == 1) { // this was the last link to this tag -> destroy the tag
          $tag->delete();
          //return "should be destroyed now";
        } else { // other links exist to this tag -> just decrease the counter
          $oldTagCounter = $tag->counter;
          $tag->counter = ($tag->counter - 1);
          $newTagCounter = $tag->counter;
          $tag->save();
          //return "old: ".$oldTagCounter." -new: ".$newTagCounter; 
        }
     }
    

    // decrease counter or delete tag if counter = 0
    /*foreach ($tagIdsWhichAreRemoved as $removeTagId) {
      $tag = $thing->tags()->find($removeTagId);
      if ($tag->counter == 1) { // this was the last link to this tag -> destroy the tag
        $tag->destroy();
        return "should be destroyed now";
      } else { // other links exist to this tag -> just decrease the counter

        $oldTagCounter = $tag->counter;
        $tag->counter = ($tag->counter - 1);
        $newTagCounter = $tag->counter;
        $tag->save();
        return "old: ".$oldTagCounter." -new: ".$newTagCounter; 
      }
    }*/

   // $thing->tags()->sync($tags);

    // update the thingable-parameters
    $thingable = $thing->thingable;
    $thingable->uri = $data['thingable']['uri'];
    $thingable->save();

    return Response::json("Saved", 200);
  }




  /**
   * Return matching things
   *
   * @return Response
   */
  public function search()
  {
    $q = Input::get('keywords');

    $searchTerms = $q; //explode(' ', $q);

    // $query = DB::table('things');
    // $user = User::find(Authorizer::getResourceOwnerId());
    // $query = Thing::leftJoin('tags', function($q) use ($user)
    // {
    //  $q->on('things.tag_id', '=', 'tags.id')
    //    ->where('things.user_id', '=', $user->id);
    // });

    // $query = User::find(Authorizer::getResourceOwnerId())->things()->with('tags', 'thingable');

    $query = User::find(Authorizer::getResourceOwnerId())->things()->where(function($query) use($searchTerms){
      foreach($searchTerms as $term)
      {
        $query->orWhere('things.name', 'LIKE', '%'. $term .'%')
              ->orWhere('things.description', 'LIKE', '%'. $term .'%');
      }
    })->orWhere(function($query) use($searchTerms)
    {
      $query->with(array('tags' => function($query) use($searchTerms)
      {
        foreach($searchTerms as $term)
        {
          $query->orWhere('tags.name', 'LIKE', '%'. $term .'%');
        }
      }));
    })->orWhere(function($query) use($searchTerms)
    {
      $query->with(array('thingable' => function($query) use($searchTerms)
      {
        foreach($searchTerms as $term)
        {
          $query->orWhere('thingable.uri', 'LIKE', '%'. $term .'%');
        }
      }));
    });

    // $queries = DB::getQueryLog();
    // $last_query = end($queries);

    $things = $query->with('tags', 'thingable')->get();
    return Response::json($things, 200);
  }

}