<?php

namespace App\Http\Controllers;

use App\Enums\ContractorRole;
use App\Models\Invoice;
use App\Traits\CalculatesProductTotals;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{

    use CalculatesProductTotals;
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
        Gate::authorize('view', $invoice);
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
        Gate::authorize('view', $invoice);
        $invoice->load(['invoice_products', 'invoice_contractors']);
        return Inertia::render('dashboard/invoices/[id]/page', [
            'invoice' => $invoice
        ]);
    }

    public function pdfPreview(Invoice $invoice)
    {
        Gate::authorize('view', $invoice);

        $invoice->load("invoice_products", "invoice_contractors");

        $invoice['sale_date'] = date_format(date_create($invoice['sale_date']), "Y-m-d");
        [$buyer, $seller] = [
            collect($invoice['invoice_contractors'])->firstWhere('role', ContractorRole::BUYER) ?? null,
            collect($invoice['invoice_contractors'])->firstWhere('role', ContractorRole::SELLER) ?? null
        ];

        $pdf = Pdf::loadView('invoice-pdf', ['invoice' => $invoice, 'seller' => $seller, 'buyer' => $buyer]);
        return $pdf->stream();
    }

    public function pdfDownload(Invoice $invoice)
    {
        Gate::authorize('view', $invoice);

        $invoice->load("invoice_products", "invoice_contractors");

        $invoice['sale_date'] = date_format(date_create($invoice['sale_date']), "Y-m-d");
        [$buyer, $seller] = [
            collect($invoice['invoice_contractors'])->firstWhere('role', ContractorRole::BUYER) ?? null,
            collect($invoice['invoice_contractors'])->firstWhere('role', ContractorRole::SELLER) ?? null
        ];

        $pdf = Pdf::loadView('invoice-pdf', ['invoice' => $invoice, 'seller' => $seller, 'buyer' => $buyer]);
        return $pdf->download();
    }

}
