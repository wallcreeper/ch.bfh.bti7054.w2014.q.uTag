<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class ThingTagTableSeeder extends Seeder {

	public function run()
	{

		$tagCount = DB::table('tags')->count();
		$thingCount = DB::table('things')->count();

		foreach(range(1, $thingCount) as $index)
		{

			$faker = Faker::create();


			foreach(range(1, rand(1,8)) as $j)
			{

		        DB::table('thing_tag')->insert([
		        	'tag_id' => $faker->unique()->numberBetween(1, $tagCount),
		            'thing_id' => $index,
		            'created_at' => date('Y-m-d H:i:s',time()),
		            'updated_at' => date('Y-m-d H:i:s',time())
		        ]);
	    	}

		}
	}

}