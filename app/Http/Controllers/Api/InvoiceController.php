<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\HTTP\Services\InvoiceValidationRulesFactory;
use App\Models\Invoice;
use App\Models\InvoiceContractor;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    // List all invoices
    public function index(Request $request)
    {
        $limit = $request->limit ? $request->limit : 7;
        return $request->user()->invoices()->with(['items', 'contractors'])->latest()->paginate($limit)->toJson();
    }

    // Show a single invoice
    public function show(Request $request, Invoice $invoice)
    {
        if ($invoice->user_id !== $request->user()->id) {
            abort(403);
        };
        return $invoice->toJson();
    }

    // Store a new invoice
    public function store(Request $request)
    {
        $type = $request->input('type');
        $rules = InvoiceValidationRulesFactory::getRules($type, $request->user()->id);
        $validated = $request->validate($rules);
        $invoice = Invoice::create([ ...$validated, 'user_id' => $request->user()->id]);

        // handle items
        // foreach ($validated['items'] as $itemData) {
        //     $invoice->items()->create($itemData);
        // }

        foreach ($validated['invoice_contractors'] as $contractorData) {
            $invoiceContractor = InvoiceContractor::create([ ...$contractorData, 'invoice_id' => $invoice->id]);
        }

        return response()->json($invoice->load(['invoice_contractors']), 201);
    }

    // Update an invoice
    public function update(Request $request, $id)
    {
        // $type = $request->input('type');
        // $rules = InvoiceValidationRulesFactory::getRules($type, );
        // $invoice = Invoice::findOrFail($id);

        // // $rules['contractors.*.contractor_id'] = ['nullable', new ContractorBelongsToUser($request->input('user_id'))];
        // $validated = $request->validate($rules);

        // $invoice->update($validated);

        return response()->json(['message' => 'update test']);
    }

    // Delete an invoice
    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted']);
    }
}
