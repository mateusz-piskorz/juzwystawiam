<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    /**
     * Render the invoices page.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('dashboard/invoices/page');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/invoices/create/page');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        $invoice->load(['invoice_products', 'invoice_contractors']);
        return Inertia::render('dashboard/invoices/[id]/edit/page', [
            'invoice' => $invoice
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $invoice->load(['invoice_products', 'invoice_contractors']);
        return Inertia::render('dashboard/invoices/[id]/page', [
            'invoice' => $invoice
        ]);
    }

}
