<?php

use App\Http\Controllers\Api\ContractorController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// todo: wrap it inside middleware group auth:sanctum

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('invoices', InvoiceController::class)->middleware('auth:sanctum');
Route::apiResource('contractors', ContractorController::class)->middleware('auth:sanctum');
Route::apiResource('products', ProductController::class)->middleware('auth:sanctum');
Route::post('/invoices/{invoice}/send-email-issuing-invoice', [InvoiceController::class, 'sendEmailIssuingInvoice'])->middleware('auth:sanctum');
