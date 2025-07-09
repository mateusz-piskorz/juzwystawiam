<?php

use App\Http\Controllers\ContractorController;
use App\Http\Controllers\Invoice\InvoiceController;
use App\Http\Controllers\Invoice\InvoicePdfController;
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
    Route::resource('/dashboard/contractors', ContractorController::class);
    Route::resource('/dashboard/products', ProductController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
