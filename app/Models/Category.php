<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {

    protected $fillable = [
        'title',
        'board_id'
    ];

    public function board(){
        return $this->belongsTo(Board::class, 'board_id');
    }

    public function tasks() {
        return $this->hasMany(Task::class);
    }
}
