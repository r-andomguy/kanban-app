<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Board extends Model {

    protected $fillable = [
        'title',
        'user_id'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function categories() {
        return $this->hasMany(Category::class);
    }
}
