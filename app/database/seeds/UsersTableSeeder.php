<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		User::create(array(

			'username'      => 'utag',
			'email'         => 'utag@app.ch',
			'password'      => Hash::make('secret') // hashes our password nicely for us

		));

		foreach(range(1, 10) as $index)
		{
			User::create(array(
 
				'username'      => $faker->userName,
				'email'         => $faker->email,
				'password'      => Hash::make('secret') // hashes our password nicely for us
 
			));
		}
	}

}