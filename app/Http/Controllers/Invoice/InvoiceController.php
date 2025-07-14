<?php

namespace App\Http\Controllers\Invoice;

use App\Models\Invoice;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController
{
    public function index(): Response
    {
        return Inertia::render('dashboard/invoices/page');
    }

    public function create()
    {
        return Inertia::render('dashboard/invoices/create/page');
    }

    public function edit(Invoice $invoice)
    {
        Gate::authorize('view', $invoice);
        $invoice->load(['invoice_products', 'invoice_contractors']);
        return Inertia::render('dashboard/invoices/[id]/edit/page', [
            'invoice' => $invoice
        ]);
    }

    public function show(Invoice $invoice)
    {
        Gate::authorize('view', $invoice);
        $invoice->load(['invoice_products', 'invoice_contractors', 'invoice_emails']);
        return Inertia::render('dashboard/invoices/[id]/page', [
            'invoice' => $invoice
        ]);
    }
}
