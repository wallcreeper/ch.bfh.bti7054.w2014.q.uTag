<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class ThingTagTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 10) as $index)
		{
			$tagCount = DB::table('tags')->count();
			$thingCount = DB::table('things')->count();

	        DB::table('thing_tag')->insert([
	            'tag_id' => rand(1,$tagCount),
	            'thing_id' => $faker->unique()->numberBetween(1, $thingCount),
	            'created_at' => date('Y-m-d H:i:s',time()),
	            'updated_at' => date('Y-m-d H:i:s',time())
	        ]);
		}
	}

}