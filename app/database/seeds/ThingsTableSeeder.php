<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class ThingsTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 10) as $index)
		{
			Thing::create([
				'name'			=> $faker->word,
				'description'	=> $faker->sentence(rand(1,20))
			]);
		}
	}

}
