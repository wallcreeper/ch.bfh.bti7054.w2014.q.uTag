<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class TagsTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();
		
		Tag::create([
			'name' 		=> 'Rainbow',
			'counter' 	=> '0'		
		]);

		foreach(range(1, 10) as $index)
		{
			Tag::create([
				'name' 		=> $faker->word,
				'counter' 	=> '0'
			]);
		}
	}

}