<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class TagsTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		$userCount =  DB::table('users')->count();

		//loop through all users
		foreach(range(1, $userCount) as $userIndex) {
			$user = User::find($userIndex);

			$tag = Tag::create([
				'name' 		=> 'Rainbow',
				'counter' 	=> '0'		
			]);

			$user->tags()->save($tag);

			// for each user add 10 - 41 tags
			foreach(range(1, rand(10,41)) as $index)
			{
				$tag = Tag::create([
					'name' 		=> $faker->word,
					'counter' 	=> '0'
				]);

				$user->tags()->save($tag);
			}
		}
	}
}