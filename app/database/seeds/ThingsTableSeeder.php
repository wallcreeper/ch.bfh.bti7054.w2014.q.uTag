<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class ThingsTableSeeder extends Seeder {

	public function run()
	{
		echo 'ThingsTableSeeder:
';

		
		$userCount =  DB::table('users')->count();

		//loop through all the users
		foreach(range(1, $userCount) as $userIndex) {
			$user = User::find($userIndex);

			$tags = $user->tags;
			$tagCount = $tags->count();
			$thingCount = rand(6,15);
			// chance to associate tag to thing
			$associateChance = 40;

			echo 'seeding user: '.$user->username.' with '.$thingCount.' things';

			//for each user add things
			foreach(range(1, $thingCount) as $index)
			{

				$faker = Faker::create();

				$thing = Thing::create([
					'name'			=> $faker->word,
					'description'	=> $faker->sentence(rand(1,20))
				]);

				$user->things()->save($thing);

				$tags = $user->tags()->get();
				$tagsAr = array();

				// generate array of random tag IDs
				foreach ($tags as $tag) {
					if($tag->counter == 0) {
						array_push($tagsAr, $tag->id);
					} else {
						if (rand(1,100)<$associateChance) {
							array_push($tagsAr, $tag->id);
						}
					}
				}

				// avoid redundant entries
				$tagsAr = array_unique($tagsAr);

				// increase counter of tags
				foreach ($tagsAr as $tagId) {
					$tagToIncrease = Tag::find($tagId);
					$tagToIncrease->counter = $tagToIncrease->counter + 1;
					$tagToIncrease->save();
				}

				// link tags to things				
				$thing->tags()->sync($tagsAr);
			}

		}
	}

}
