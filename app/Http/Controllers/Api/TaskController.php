<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\Board;
use App\Models\Category;
use App\Models\Task;
use App\Services\TaskService;
use App\Resources\TaskResource;

class TaskController extends ApiController
{
    protected TaskService $taskService;

   public function __construct(TaskService $taskService) {
        $this->middleware('auth:sanctum');
        $this->taskService = $taskService;
   }

    public function index(Board $board, Category $category): JsonResponse
    {
        if(!$this->authorize($board)){
            return response()->json(['message' => 'Unathorized']);
        }

        $tasks = $this->taskService->getAll($category);

        return response()->json(TaskResource::collection($tasks));
    }

    public function show(Board $board, Category $category, Task $task): JsonResponse
    {
        if(!$this->authorize($board)){
            return response()->json(['message' => 'Unathorized']);
        }

        $task = $this->taskService->getById($task->id,  $category);
        
        if (!$task) {
            return response()->json(['message' => 'Task not found.'], 404);
        }
        
        return response()->json(new TaskResource($task));
    }

    public function store(Request $request, Board $board, Category $category): JsonResponse
    {
        if(!$this->authorize($board)){
            return response()->json(['message' => 'Unathorized']);
        }


        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|integer|in:1,2,3',
        ]);

        $task = $this->taskService->create($category, $data);

        return response()->json(new TaskResource($task), 201);
    }

    public function update(Request $request, Board $board, Category $category, Task $task): JsonResponse
    {
        if(!$this->authorize($board)){
            return response()->json(['message' => 'Unathorized']);
        }


        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:1,2,3',
        ]);

        $updatedTask = $this->taskService->update($task,$category, $data);

        return response()->json(new TaskResource($updatedTask));
    }

    public function destroy(Board $board, Category $category, Task $task): JsonResponse
    {
        if(!$this->authorize($board)){
            return response()->json(['message' => 'Unathorized']);
        }
            
        if ($task->category_id !== $category->id) {
            return response()->json(['message' => 'Task not found in this category.'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully.']);
    }

    private function authorize(Board $board)
    {
        if ($board->toArray()['user_id'] !== Auth::id()) {
             return false;
        }

        return true;
    }
}
