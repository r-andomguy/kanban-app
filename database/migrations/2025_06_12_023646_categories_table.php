<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void{
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->timestamp('updated_at');
            $table->timestamp('created_at');
            $table->string('title');
            $table->integer('order');
            $table->integer('board_id')->unsigned();    

            $table->foreign('board_id')->references('id')->on('boards')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('categories');
    }
};
