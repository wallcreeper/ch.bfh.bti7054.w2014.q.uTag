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

		return Response::json($things->toArray(), 200);
	}

	/**
	 * Create a new thing with all its relations.
	 *
	 * @return Response
	 */
		public function store()
	{
		$validator = Validator::make($data = Input::all(), Thing::$rules);

		if ($validator->fails())
		{
			return Response::json([
					'error' => 'validation',
					'error_description' => 'Validation error',
					'errors' => $validator->messages()->all(),
				 ], 400);
		}

		$thing = Thing::create($data);
		$user = User::find(Authorizer::getResourceOwnerId());
		$user->things()->attach($thing);

		// update the thingable-parameters
		$thingUri = new ThingUri();
		$thingUri->uri = $data['thingable']['uri'];;
		$thingUri->save();
		$thingUri->thing()->save($thing);

		$tags = array();
		foreach ($data['tags'] as $dataTag) {
			if (isset($dataTag['id'])) {
				$tag = Tag::find($dataTag['id']);
				$tag->counter = $tag->counter + 1;
				$tag->save();
				array_push($tags, $dataTag['id']);
			} else {
				$tag = Tag::create([
					'name' => $dataTag['name'],
					'counter' => '1'
				]);
				$user->tags()->save($tag);
				//$thing->tags()->attach($tag); -> Don't do this here this is done by $thing->tags()->sync($tags);
				array_push($tags, $tag->id);
			}
		}
		$thing->tags()->sync($tags);

		return Response::json("Saved", 200);
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
		$validator = Validator::make($data = Input::all(), Thing::$rules);

		if ($validator->fails())
		{
			return Response::json([
					'error' => 'validation',
					'error_description' => 'Validation error',
					'errors' => $validator->messages()->all(),
				 ], 400);
		}


		$user = User::find(Authorizer::getResourceOwnerId());
		$thing = $user->things()->findOrFail($id);


		$tagsBeforeUpdate = $thing->tags()->get();
		$tagIdsBeforeUpdate = array();

		foreach ($tagsBeforeUpdate as $aTag) {
			array_push($tagIdsBeforeUpdate, $aTag->id);
		}

		// Update the thing-parameters
		$thing->update($data);

		$tags = array();
		foreach ($data['tags'] as $dataTag) {
			if (isset($dataTag['id'])) {
				array_push($tags, $dataTag['id']);
			} else {
				$tag = Tag::create([
					'name' => $dataTag['name'],
					'counter' => '0'
				]);
				$user->tags()->save($tag);
				//$thing->tags()->attach($tag); //-> Don't do this here this is done by $thing->tags()->sync($tags);
				array_push($tags, $tag->id);
			}
		}


		// generate array of thats which were in Thing before update and now not anymore
		$tagIdsWhichAreRemoved = array();
		$tagIdsWhichAreRemoved = array_diff($tagIdsBeforeUpdate, $tags);

		// compare which tags have been added and which continue existing
		foreach ($tags as $newTagId) {
			$existed = 0;

			foreach ($tagIdsBeforeUpdate as $oldTag) {
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
		}

		$thing->tags()->sync($tags); // must happen before tag counter is decreased?

		// check for tags to delete
		foreach ($tagIdsWhichAreRemoved as $oldTag) {

				$tag = Tag::find($oldTag);
				//return $oldTag;
				if ($tag->counter <= 1) { // this was the last link to this tag -> destroy the tag
					$tag->delete();
				} else { // other links exist to this tag -> just decrease the counter
					$oldTagCounter = $tag->counter;
					$tag->counter = ($tag->counter - 1);
					$newTagCounter = $tag->counter;
					$tag->save();
				}
		 }

		// update the thingable-parameters
		$thingable = $thing->thingable;
		$thingable->uri = $data['thingable']['uri'];
		$thingable->save();

		return Response::json("Saved", 200);
	}

	/**
	 * Remove the specified thing from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$user = User::find(Authorizer::getResourceOwnerId());
		$thing = $user->things()->findOrFail($id);

		if (!isset($thing)) {
			return Response::json([
				'errors' => 'Thing does not exist',
			], 200);
		}

		$tagsBeforeDelete = $thing->tags()->get();
		$tagIdsBeforeDelete = array();

		foreach ($tagsBeforeDelete as $aTag) {
			array_push($tagIdsBeforeDelete, $aTag->id);
		}

		foreach ($tagIdsBeforeDelete as $oldTag) {

				$tag = Tag::find($oldTag);
				if ($tag->counter <= 1) { // this was the last link to this tag -> destroy the tag
					$tag->delete();
				} else { // other links exist to this tag -> just decrease the counter
					$oldTagCounter = $tag->counter;
					$tag->counter = ($tag->counter - 1);
					$newTagCounter = $tag->counter;
					$tag->save();
				}
		 }

		// delete the thingable
		$thingable = $thing->thingable;
		$thingable->delete();

		$thing->delete();

		return Response::json("Deleted", 200);
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
