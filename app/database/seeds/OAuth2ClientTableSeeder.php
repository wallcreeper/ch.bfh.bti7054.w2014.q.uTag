<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;
use LucaDegasperi\OAuth2Server\Storage\FluentClient;

class OAuth2ClientTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		try {
			Authorizer::getIssuer()->getClientStorage()->create(
				$_ENV['CLIENT_NAME'],
				$_ENV['CLIENT_ID'],
				$_ENV['CLIENT_SECRET']
			);
		}
		catch (\Illuminate\Database\QueryException $e) {
			$this->command->error("SQL Error: " . $e->getMessage() . "\n");
		}
	}

}
