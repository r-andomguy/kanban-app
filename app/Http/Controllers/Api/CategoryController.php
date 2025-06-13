<?php

namespace App\Http\Controllers\Api;

use App\Resources\CategoryResource;
use App\Services\CategoryService;
use App\Models\Board;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;

class CategoryController extends Controller
{
  protected CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index(Board $board): JsonResponse
    {
        $this->authorize($board); 
        $categories = $this->categoryService->getAll($board);
        
        return response()->json(CategoryResource::collection($categories));
    }

    public function show(Board $board, int $id): JsonResponse
    {
        $this->authorize($board);
        $category = $this->categoryService->getById($board, $id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json(new CategoryResource($category));
    }

    public function store(Request $request, Board $board)
    {
        $this->authorize($board);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $category = $this->categoryService->create($board, $data);

        return response()->json(new CategoryResource($category), 201);
    }

    public function update(Request $request, Board $board, int $id): JsonResponse
    {
        $this->authorize($board);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $category = $this->categoryService->update($board, $data, $id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json(new CategoryResource($category));
    }

    public function destroy(Board $board, int $id): JsonResponse
    {
        $category = Category::where('id', $id)
        ->where('board_id', $board->id)
        ->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }

    private function authorize(Board $board)
    {
        if ($board->user_id !== Auth::id()) {
             return response()->json(['message' => 'Unathorized']);
        }
    }
}
