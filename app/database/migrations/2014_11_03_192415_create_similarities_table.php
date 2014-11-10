<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSimilaritiesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('similarities', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('hash');
			$table->integer('counter')->unsigned();
			$table->integer('tag1_id')->unsigned()->index();
			$table->foreign('tag1_id')->references('id')->on('tags')->onDelete('cascade');
			$table->integer('tag2_id')->unsigned()->index();
			$table->foreign('tag2_id')->references('id')->on('tags')->onDelete('cascade');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('similarities');
	}

}
