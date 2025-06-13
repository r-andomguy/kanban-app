<?php

use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('boards', BoardController::class);

    Route::get('/boards/{board}/categories', [CategoryController::class, 'index']);
    Route::get('/boards/{board}/categories/{category}', [CategoryController::class, 'show']);
    Route::post('/boards/{board}/categories', [CategoryController::class, 'store']);
    Route::put('/boards/{board}/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/boards/{board}/categories/{category}', [CategoryController::class, 'destroy']);

    Route::post('logout', [AuthController::class, 'logout']);
});