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
		// 	$q->on('things.tag_id', '=', 'tags.id')
		// 		->where('things.user_id', '=', $user->id);
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
