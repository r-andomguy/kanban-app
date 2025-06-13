<?php

namespace App\Services;

use App\Models\User;
use App\Models\Board;
use App\Models\Category;
use Illuminate\Support\Collection;

class CategoryService {
    public function getById(Board $board, int $id): ?Category
    {
        return Category::with('tasks')
            ->where('id', $id)
            ->where('board_id', $board->id)
            ->first();
    }

    public function getAll(Board $board): Collection
    {
        return $board->categories()->with('tasks')->get();
    }

    public function create(Board $board, array $data): Category
    {

        $category = Category::create([
            'title' => $data['title'],
            'order' => $data['order'],
            'board_id' => $board->attributesToArray()['id']
        ]);
        
        return $category;
    }


   public function update(Board $board, array $data, int $id): ?Category
    {
        $category = Category::where('id', $id)
            ->where('board_id', $board->id)
            ->first();

        if (!$category) {
            return null;
        }

        $category->update([
            'title' => $data['title'] ?? $category->title,
            'order' => $data['order'] ?? $category->order,
        ]);

        return $category->fresh(); 
    }

    public function delete(Category $category): void
    {
        $category->delete();
    }
    
}
