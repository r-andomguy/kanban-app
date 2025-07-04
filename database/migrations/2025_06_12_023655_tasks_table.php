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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->timestamp('updated_at');
            $table->timestamp('created_at');
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('status')->comment('To Do / In Progress / Done')->default(1);
             $table->integer('category_id')->unsigned();    
            
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('tasks');
    }
};
