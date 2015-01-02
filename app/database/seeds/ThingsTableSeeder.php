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

			echo 'seeding user: '.$user->username.'
';

			//for each user add 6-12 things
			foreach(range(1, rand(6,12)) as $index)
			{

				$faker = Faker::create();

				$thing = Thing::create([
					'name'			=> $faker->word,
					'description'	=> $faker->sentence(rand(1,20))
				]);

				$user->things()->save($thing);

				$tagsAr = array();
				foreach(range(1,rand(1,$tagCount)) as $tagIndex) {

					array_push($tagsAr, rand(1,$tagCount)); 

					//$thing->tags()->attach($tags->random(1));
				}
				$tagsAr = array_unique($tagsAr);
				$thing->tags()->sync($tagsAr);
			}

		}
	}

}
