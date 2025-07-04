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
        Schema::create('boards', function (Blueprint $table) {
            $table->id();
            $table->timestamp('updated_at');
            $table->timestamp('created_at');
            $table->string('title');
            $table->integer('user_id')->unsigned();    

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('boards');
    }
};
