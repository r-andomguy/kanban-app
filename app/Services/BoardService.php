<?php

namespace App\Services;

use App\Models\Board;
use App\Models\User;
use Illuminate\Support\Collection;

class BoardService {

    public function getById(int $id, User $user): ?Board
    {
        return Board::with('categories.tasks')
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->first();
    }

    public function getAll(User $user): Collection {
        return $user->boards()->with('categories.tasks')->get();
    }

    public function create(array $data, User $user): Board {
        $board = Board::create([
            'title' => $data['title'],
            'user_id' => $user->attributesToArray()['id']
        ]);
        
        return $board;
    }

    public function update(Board $board, array $data): Board {
        Board::where('id', $board->id)->update([
            'title' => $data['title'] ?? $board->title
        ]);
        
        return $board->fresh();
    }

    public function delete(Board $board): void {
        $board->delete();
    }
}
