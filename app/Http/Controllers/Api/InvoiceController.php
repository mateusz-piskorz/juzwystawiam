<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceContractor;
use App\Rules\ContractorBelongsToUser;
use App\Services\InvoiceValidationRulesFactory;
use Illuminate\Http\Request;
use App\Models\Contractor;

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
        $rules = InvoiceValidationRulesFactory::getRules($type);
        $rules['contractors.*.contractor_id'] = ['nullable', new ContractorBelongsToUser($request->input('user_id'))];
        $validated = $request->validate($rules);


        $invoice = Invoice::create($validated);

        // handle items
        // foreach ($validated['items'] as $itemData) {
        //     $invoice->items()->create($itemData);
        // }

        // create contractors
        foreach ($validated['contractors'] as $contractorData) {
            $invoice = InvoiceContractor::create($contractorData);
        }

        return response()->json($invoice->load(['invoice_contractors']), 201);
    }

    // Update an invoice
    public function update(Request $request, $id)
    {
        $type = $request->input('type');
        $rules = InvoiceValidationRulesFactory::getRules($type);
        $invoice = Invoice::findOrFail($id);

        $rules['contractors.*.contractor_id'] = ['nullable', new ContractorBelongsToUser($request->input('user_id'))];
        $validated = $request->validate($rules);

        $invoice->update($validated);

        return response()->json($invoice);
    }

    // Delete an invoice
    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted']);
    }
}
