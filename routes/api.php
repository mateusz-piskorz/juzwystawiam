<?php

use App\Http\Controllers\Api\ContractorController;
use App\Http\Controllers\Api\Invoice\InvoiceChartDataController;
use App\Http\Controllers\Api\Invoice\InvoiceController;
use App\Http\Controllers\Api\Invoice\InvoiceEmailController;
use App\Http\Controllers\Api\PremiumAccountController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/invoices/charts/status-yearly-distribution', [InvoiceChartDataController::class, 'statusDistributionByYear']);
    Route::get('/invoices/charts/status-monthly-distribution', [InvoiceChartDataController::class, 'statusMonthlySeries']);
    Route::apiResource('invoices', InvoiceController::class);
    Route::post('/invoices/{invoice}/send-email-issuing-invoice', [InvoiceEmailController::class, 'sendEmailIssuingInvoice']);
    Route::apiResource('contractors', ContractorController::class);
    Route::apiResource('products', ProductController::class);
    Route::get('premium-account/payments', [PremiumAccountController::class, 'getAllPremiumAccountPayments']);

});
