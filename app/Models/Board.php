<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Board extends Model {

    protected $fillable = [
        'title',
        'user'
    ];

    public function categories() {
        return $this->hasMany(Category::class);
    }
}
