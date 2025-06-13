<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\BoardResource;
use App\Models\Board;
use App\Services\Board\BoardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class BoardController extends Controller {
    
    protected BoardService $boardService;

    public function __construct(BoardService $boardService){
        $this->middleware('auth:sanctum');
        $this->boardService = $boardService;
    }

    public function index(): JsonResponse {
        $boards = $this->boardService->getAll(auth()->user());
        return response()->json(BoardResource::collection($boards));
    }

    public function store(Request $request){
        $board = $this->boardService->create($request->validated(), auth()->user());
        return response()->json(new BoardResource($board), 201);
    }
    
    public function update(Request $request, Board $board){
        $this->authorize('update', $board);
        $board = $this->boardService->update($board, $request->validated());
        
        return response()->json(new BoardResource($board));
    }

    public function destroy(Board $board): JsonResponse {
        $this->authorize('delete', $board);
        $this->boardService->delete($board);
        
        return response()->json(null, 204);
    }
}
