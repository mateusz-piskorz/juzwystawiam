<?php

use App\Http\Controllers\Api\ContractorController;
use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\ExpenseTypeController;
use App\Http\Controllers\Api\Invoice\InvoiceChartDataController;
use App\Http\Controllers\Api\Invoice\InvoiceController;
use App\Http\Controllers\Api\Invoice\InvoiceEmailController;
use App\Http\Controllers\Api\PremiumAccountController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->name('api.')->prefix('v1')->group(function () {

    Route::name('profile.')->group(function () {
        Route::put('/profile', [ProfileController::class, 'updateProfile'])->name('update-profile');
        Route::put('/defaults', [ProfileController::class, 'updateDefaults'])->name('update-defaults');
        Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('update-password');
        Route::delete('/profile', [ProfileController::class, 'deleteAccount'])->name('delete-account');
    });

    Route::name('invoices.')->group(function () {
        Route::get('/invoices', [InvoiceController::class, 'index'])->name('index');
        Route::post('/invoices', [InvoiceController::class, 'store'])->name('store');
        Route::put('/invoices/{invoice}', [InvoiceController::class, 'update'])->name('update');
        Route::delete('/invoices/{invoice}', [InvoiceController::class, 'destroy'])->name('destroy');
        Route::get('/invoices/charts/status-yearly-distribution', [InvoiceChartDataController::class, 'statusYearlyDistribution'])->name('status-yearly-distribution');
        Route::get('/invoices/charts/status-monthly-distribution', [InvoiceChartDataController::class, 'statusMonthlyDistribution'])->name('status-monthly-distribution');
        Route::post('/invoices/{invoice}/send-email-issuing-invoice', [InvoiceEmailController::class, 'sendEmailIssuingInvoice'])->name('send-email');
    });

    Route::name('expense-types.')->group(function () {
        Route::get('/expense-types', [ExpenseTypeController::class, 'index'])->name('index');
        Route::post('/expense-types', [ExpenseTypeController::class, 'store'])->name('store');
        Route::put('/expense-types/{expenseType}', [ExpenseTypeController::class, 'update'])->name('update');
        Route::delete('/expense-types/{expenseType}', [ExpenseTypeController::class, 'destroy'])->name('destroy');
    });

    Route::name('expenses.')->group(function () {
        Route::get('/expenses', [ExpenseController::class, 'index'])->name('index');
        Route::post('/expenses', [ExpenseController::class, 'store'])->name('store');
        Route::put('/expenses/{expense}', [ExpenseController::class, 'update'])->name('update');
        Route::delete('/expenses/{expense}', [ExpenseController::class, 'destroy'])->name('destroy');
    });

    Route::name('contractors.')->group(function () {
        Route::get('/contractors', [ContractorController::class, 'index'])->name('index');
        Route::post('/contractors', [ContractorController::class, 'store'])->name('store');
        Route::put('/contractors/{contractor}', [ContractorController::class, 'update'])->name('update');
        Route::delete('/contractors/{contractor}', [ContractorController::class, 'destroy'])->name('destroy');
    });

    Route::name('products.')->group(function () {
        Route::get('/products', [ProductController::class, 'index'])->name('index');
        Route::post('/products', [ProductController::class, 'store'])->name('store');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('destroy');
    });

    Route::get('premium-account/payments', [PremiumAccountController::class, 'getAllPremiumAccountPayments'])->name('premium-account.payments');

});
