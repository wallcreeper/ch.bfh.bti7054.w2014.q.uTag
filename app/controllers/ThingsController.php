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

		$validator = Validator::make($data = Input::all(), Thing::$rules);

		if ($validator->fails())
		{
			return Redirect::back()->withErrors($validator)->withInput();
		}

		/**
		* Get tag-ids for DB-Insert
		*
		* @param object $n
		* @return array(int ids)
		*/
		function getTagsId($n)
		{
			if (isset($n['id'])) {
				return($n['id']);
			} else {
				$tag = Tag::create([
					'name' => $n['name'],
					'counter' => '1'
				]);
				$user = User::find(Authorizer::getResourceOwnerId());
				$user->tags()->save($tag);
				return $tag->id;
			}
		}

		$tags = array_map("getTagsId", $data['tags']);
		$thing->update($data);
		$thing->tags()->sync($tags);

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

		$query = User::find(Authorizer::getResourceOwnerId())->things()->where(function($query) use($searchTerms){
			foreach($searchTerms as $term)
			{
				$query->orWhere('things.name', 'LIKE', '%'. $term .'%')
							->orWhere('things.description', 'LIKE', '%'. $term .'%');
			}
		});

		$things = $query->with('tags', 'thingable')->get();
		return Response::json($things, 200);
	}

}
