<?php

namespace App\Services\Board;

use App\Models\Board;
use App\Models\User;
use Illuminate\Support\Collection;

class BoardService {
    public function getAll(User $user): Collection {
        return $user->boards()->with('categories.tasks')->get();
    }

    public function create(array $data, User $user): Board {
        return $user->boards()->create($data);
    }

    public function update(Board $board, array $data): Board {
        $board->update($data);
        return $board;
    }

    public function delete(Board $board): void {
        $board->delete();
    }
}
