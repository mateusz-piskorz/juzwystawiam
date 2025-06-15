<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/page');
    })->name('dashboard');

    Route::get('dashboard/dev', function () {
        return Inertia::render('dashboard/dev/page');
    })->name('dashboard.dev');

    Route::get('/dashboard/todos', [\App\Http\Controllers\TodoController::class, 'index'])->name('todos.index');
    Route::resource('/dashboard/invoices', \App\Http\Controllers\InvoiceController::class);
    Route::resource('/dashboard/contractors', \App\Http\Controllers\ContractorController::class);
    Route::resource('/dashboard/products', \App\Http\Controllers\ProductController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
