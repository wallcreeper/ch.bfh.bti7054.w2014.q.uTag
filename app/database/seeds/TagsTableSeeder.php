<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class TagsTableSeeder extends Seeder {

	public function run()
	{
		echo 'TagsTableSeeder:
';
		$faker = Faker::create();

		$userCount =  DB::table('users')->count();

		//loop through all users
		foreach(range(1, $userCount) as $userIndex) {
			$user = User::find($userIndex);

			$tagsCount = rand(10,50);

			echo 'seeding: '.$user->username.' with '.$tagsCount.' tags
';

			$tag = Tag::create([
				'name' 		=> 'Rainbow',
				'counter' 	=> '0'		
			]);

			$user->tags()->save($tag);

			// for each user add tags
			foreach(range(1, $tagsCount) as $index)
			{
				$name =  $faker->word;

				$tagDoesNotExist = 0;

				// check if tag is alreay available
				foreach ($user->tags()->get() as $oneTag) {
					if (strcmp($oneTag->name,$name)==0) {
						$tagDoesNotExist = 1;
						break;
					}
				}

				// create the tag because not yet available
				if ($tagDoesNotExist == 0) {
					$tag = Tag::create([
						'name' 		=> $name,
						'counter' 	=> '0'
					]);

					$user->tags()->save($tag);
			   }
			}
		}
	}
}