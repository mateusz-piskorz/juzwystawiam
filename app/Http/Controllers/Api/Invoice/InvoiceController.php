<?php

namespace App\Http\Controllers\Api\Invoice;

use App\Http\Requests\UpsertInvoiceRequest;
use App\Models\Contractor;
use App\Models\Invoice;
use App\Traits\AppliesQueryFilters;
use App\Traits\CalculatesProductTotals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class InvoiceController
{
    use AppliesQueryFilters;
    use CalculatesProductTotals;

    public function index(Request $request)
    {
        $query = $request->user()->invoices()->with(['invoice_products', 'invoice_contractors', 'latest_invoice_email']);
        $query = $this->applyQueryFilters(
            $request,
            $query,
            'number',
            sortable: ['number', 'type', 'sale_date', 'total', 'is_already_paid'],
            filterable: ['type', 'is_already_paid']
        );

        return response()->json($query);
    }

    public function show(Invoice $invoice)
    {
        Gate::authorize('view', $invoice);
        return $invoice->toJson();
    }

    public function store(UpsertInvoiceRequest $request)
    {
        Gate::authorize('create', Invoice::class);
        $invoice = null;

        DB::transaction(function () use ($request, &$invoice) {
            $validated = $request->validated();
            $totals = $this->CalculateProductTotals($validated['invoice_products']);
            $invoice = Invoice::create([ ...$validated, ...$totals, 'user_id' => $request->user()->id]);

            foreach ($validated['invoice_products'] as $productData) {
                $productTotals = $this->CalculateSingleProductTotals($productData);
                $invoice->invoice_products()->create([ ...$productData, ...$productTotals]);
            }

            foreach ($validated['invoice_contractors'] as $contractorData) {
                $contractor = Contractor::query()->findOrFail($contractorData['contractor_id']);
                $invoice->createContractor($contractor, $contractorData['role']);
            }
        });

        return response()->json($invoice, 201);
    }

    public function update(UpsertInvoiceRequest $request, Invoice $invoice)
    {
        Gate::authorize('update', $invoice);

        DB::transaction(function () use ($request, &$invoice) {
            $validated = $request->validated();
            $totals = $this->CalculateProductTotals($validated['invoice_products']);
            $invoice->update([ ...$validated, ...$totals, 'user_id' => $request->user()->id]);

            $invoice->invoice_products()->delete();
            foreach ($validated['invoice_products'] as $productData) {
                $productTotals = $this->CalculateSingleProductTotals($productData);
                $invoice->invoice_products()->create([ ...$productData, ...$productTotals]);
            }

            $invoice->invoice_contractors()->delete();
            foreach ($validated['invoice_contractors'] as $contractorData) {
                $contractor = Contractor::query()->findOrFail($contractorData['contractor_id']);
                $invoice->createContractor($contractor, $contractorData['role']);
            }
        });

        return response()->json($invoice, 201);
    }

    public function destroy(Invoice $invoice)
    {
        Gate::authorize('update', $invoice);
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted']);
    }
}
