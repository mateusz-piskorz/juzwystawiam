<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\ContractorController;
use App\Http\Controllers\Invoice\InvoiceController;
use App\Http\Controllers\Invoice\InvoicePdfController;
use App\Http\Controllers\PremiumAccountController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/page');
    })->name('dashboard');

    Route::resource('/dashboard/invoices', InvoiceController::class);
    Route::get('/dashboard/invoices/{invoice}/pdf-preview', [InvoicePdfController::class, 'pdfPreview']);
    Route::get('/dashboard/invoices/{invoice}/pdf-download', [InvoicePdfController::class, 'pdfDownload']);
    Route::get('/dashboard/contractors', [ContractorController::class, 'index']);
    Route::get('/dashboard/products', [ProductController::class, 'index']);
    Route::get('/dashboard/analytics', [AnalyticsController::class, 'index']);
    Route::get('/dashboard/premium-account', [PremiumAccountController::class, 'index'])->name("premium-account");
    Route::get('/dashboard/premium-account/buy', [PremiumAccountController::class, 'buy']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
