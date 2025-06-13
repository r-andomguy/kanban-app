<?php

namespace App\Http\Controllers\Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Throwable;

class ApiController extends Controller 
{
    public function missing(Throwable $exception): JsonResponse
    {
        if ($exception instanceof ModelNotFoundException) {
            $modelName = class_basename($exception->getModel());

            return response()->json([
                'message' => "{$modelName} not found."
            ], 404);
        }

        throw $exception;
    }
}
