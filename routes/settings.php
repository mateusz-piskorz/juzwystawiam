<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    // Route::get('dashboard/settings', function () {
    //     return Inertia::render('dashboard/settings/page');
    // });
    Route::get('dashboard/settings', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::redirect('dashboard/settings', 'settings/profile');

    // Route::get('dashboard/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('dashboard/settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('dashboard/settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::get('dashboard/settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('dashboard/settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('dashboard/settings/appearance', function () {
        return Inertia::render('dashboard/settings/appearance');
    })->name('appearance');
});
