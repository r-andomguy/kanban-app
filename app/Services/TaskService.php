<?php

namespace App\Services;

use App\Models\Task;
use App\Models\Category;
use Illuminate\Support\Collection;

class TaskService
{
    public function getAll(Category $category): Collection
    {
        return $category->tasks()->get();
    }

    public function getById(int $id, Category $category): ?Task
    {
        return Task::with('category')
            ->where('id', $id)
            ->where('category_id', $category->id)
            ->first();
    }

    public function create(Category $category, array $data): Task
    {
        return Task::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'] ?? 'To Do',
            'category_id' => $category->id,
        ]);
    }

    public function update(Task $task, Category $category, array $data): Task
    {
        $task->update([
            'title' => $data['title'] ?? $task->title,
            'description' => $data['description'] ?? $task->description,
            'status' => $data['status'] ?? $task->status,
            'category_id' => $category->id, 
        ]);

        return $task->fresh();
    }

    public function delete(Task $task): void
    {
        $task->delete();
    }
}
