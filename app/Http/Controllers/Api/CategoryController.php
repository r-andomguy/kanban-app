<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Resources\CategoryResource;
use App\Services\CategoryService;
use App\Models\Board;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends ApiController
{
  protected CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->middleware('auth:sanctum');
        $this->categoryService = $categoryService;
    }

    public function index(Board $board): JsonResponse
    {
        if(!$this->authorize($board)){
            response()->json(['message' => 'Unathorized']);
        } 
        
        $categories = $this->categoryService->getAll($board);
        
        return response()->json(CategoryResource::collection($categories));
    }

    public function show(Board $board, int $id): JsonResponse
    {
        if(!$this->authorize($board)){
            return response()->json(['message' => 'Unathorized']);
        }
        $category = $this->categoryService->getById($board, $id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json(new CategoryResource($category));
    }

    public function store(Request $request, Board $board)
    {
        if(!$this->authorize($board)){
            return response()->json(['message' => 'Unathorized']);
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $category = $this->categoryService->create($board, $data);

        return response()->json(new CategoryResource($category), 201);
    }

    public function update(Request $request, Board $board, int $id): JsonResponse
    {
       if(!$this->authorize($board)){
            return response()->json(['message' => 'Unathorized']);
        }

        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $category = $this->categoryService->update($board, $data, $id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json(new CategoryResource($category));
    }

    public function destroy(Board $board, int $id): JsonResponse
    {
        if(!$this->authorize($board)){
            return response()->json(['message' => 'Unathorized']);
        }

        $category = Category::where('id', $id)
        ->where('board_id', $board->toArray()['id'])
        ->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }

    private function authorize(Board $board)
    {
        if ($board->toArray()['user_id'] !== Auth::id()) {
             return false;
        }

        return true;
    }
}
