<?php

use App\Http\Controllers\PremiumAccountController;
use App\Models\Invoice;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('root/page/index');
})->name('root');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('dashboard/page'))->name('dashboard');

    Route::get('/dashboard/invoices', fn () => Inertia::render('dashboard/invoices/page'))->name('invoices');

    Route::get('/dashboard/invoices/create', fn () => Inertia::render('dashboard/invoices/create/page'))->name('invoices.create');

    Route::get('/dashboard/invoices/{invoice}', function (Invoice $invoice) {
        Gate::authorize('view', $invoice);
        $invoice->load(['invoice_products', 'invoice_contractors', 'invoice_emails']);

        return Inertia::render('dashboard/invoices/[id]/page/index', ['invoice' => $invoice]);
    })->name('invoices.show');

    Route::get('/dashboard/invoices/{invoice}/edit', function (Invoice $invoice) {
        Gate::authorize('update', $invoice);
        $invoice->load(['invoice_products', 'invoice_contractors']);

        return Inertia::render('dashboard/invoices/[id]/edit/page', ['invoice' => $invoice]);
    })->name('invoices.edit');

    Route::get('/dashboard/invoices/{invoice}/pdf-preview', function (Invoice $invoice) {
        Gate::authorize('view', $invoice);

        return $invoice->generatePdf()->stream();
    })->name('invoices.pdf-preview');

    Route::get('/dashboard/invoices/{invoice}/pdf-download', function (Invoice $invoice) {
        Gate::authorize('view', $invoice);

        return $invoice->generatePdf()->download();
    })->name('invoices.pdf-download');

    Route::get('/dashboard/settings', function (Request $request) {
        return Inertia::render('dashboard/settings/page', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    })->name('settings');

    Route::get('/dashboard/contractors', fn () => Inertia::render('dashboard/contractors/page'))->name('contractors');

    Route::get('/dashboard/products', fn () => Inertia::render('dashboard/products/page'))->name('products');

    Route::get('/dashboard/analytics', fn () => Inertia::render('dashboard/analytics/page'))->name('analytics');

    Route::get('/dashboard/premium-account', fn () => Inertia::render('dashboard/premium-account/page'))->name('premium-account');

    Route::get('/dashboard/premium-account/buy', [PremiumAccountController::class, 'buy'])->name('premium-account.buy');

});

require __DIR__.'/auth.php';
