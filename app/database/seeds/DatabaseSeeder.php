<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('UsersTableSeeder');
		$this->call('OAuth2ClientTableSeeder');
		$this->call('TagsTableSeeder');
		$this->call('ThingsTableSeeder');
		$this->call('ThingTagTableSeeder');
		$this->call('ThingUrisTableSeeder');
	}

}
