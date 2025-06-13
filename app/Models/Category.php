<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {

    protected $fillable = [
        'title',
        'board'
    ];

    public function tasks() {
        return $this->hasMany(Task::class);
    }
}
