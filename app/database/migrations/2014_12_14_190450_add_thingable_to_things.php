<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddThingableToThings extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
	Schema::table('things', function($table)
		{	
    			$table->integer('thingable_id')->unsigned()->index();
			$table->string('thingable_type');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
	Schema::table('things', function($table)
                {
			$table->dropColumn('thingable_type');
			$table->dropColumn('thingable_id');
		});
	}

}
