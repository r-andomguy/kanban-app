<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Models\Board;
use App\Services\BoardService;
use App\Resources\BoardResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BoardController extends ApiController {
    
    protected BoardService $boardService;

    public function __construct(BoardService $boardService){
        $this->middleware('auth:sanctum');
        $this->boardService = $boardService;
    }

    public function index(): JsonResponse {
        $boards = $this->boardService->getAll(Auth::user());
        
        if ($boards->isEmpty()) {
            return response()->json(['message' => 'Board not found.']);
        }

        return response()->json(BoardResource::collection($boards));
    }

    public function show(int $id): JsonResponse {
        $board = $this->boardService->getById($id, Auth::user());
        
        if (!$board) {
            return response()->json(['message' => 'Board not found']);
        }

        return response()->json(new BoardResource($board));
    }

    public function store(Request $request): JsonResponse{
        $data = $request->validate([
           'title' => 'required|string|max:255',
        ]);

        
        $board = $this->boardService->create($data, Auth::user());
        return response()->json(new BoardResource($board), 201);
    }
    
    public function update(Request $request, Board $board){
        $this->authorize($board);
       
        $data = $request->validate([
           'title' => 'required|string|max:255',
        ]);

        $board = $this->boardService->update($board, $data);
        
        return response()->json(new BoardResource($board));
    }

    public function destroy(Board $board): JsonResponse {
        $this->authorize($board);
        $this->boardService->delete($board);
        
        return response()->json(null, 204);
    }

    private function authorize(Board $board)
    {
        if ($board->user_id !== Auth::id()) {
             return response()->json(['message' => 'Unathorized']);
        }
    }
}
