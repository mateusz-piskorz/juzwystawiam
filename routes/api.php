<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContractorController;
use App\Http\Controllers\Api\TodoController;
use App\Http\Controllers\Api\InvoiceController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('todos', TodoController::class)->middleware('auth:sanctum');
Route::apiResource('invoices', InvoiceController::class)->middleware('auth:sanctum');
Route::apiResource('contractors', ContractorController::class)->middleware('auth:sanctum');
