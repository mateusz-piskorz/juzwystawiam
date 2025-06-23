<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\HTTP\Services\InvoiceValidationRulesFactory;
use App\Models\Contractor;
use App\Models\Invoice;
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

        // use here a reversable query actions, PDO has it, just need to call save() at the end
        $invoice = Invoice::create([ ...$validated, 'user_id' => $request->user()->id]);

        // handle products
        foreach ($validated['invoice_products'] as $productData) {
            $invoice->invoice_products()->create($productData);
        }

        // handle contractors
        foreach ($validated['invoice_contractors'] as $contractorData) {
            $contractor = Contractor::query()->findOrFail($contractorData['id']);
            $invoice->invoice_contractors()->create([
                'contractor_id'    => $contractor->id,
                'role'             => $contractorData['role'],
                'type_of_business' => $contractor->type_of_business,
                'is_own_company'   => $contractor->is_own_company,
                'postal_code'      => $contractor->postal_code,
                'building_number'  => $contractor->building_number,
                'city'             => $contractor->city,
                'country'          => $contractor->country,
                'bank_account'     => $contractor->bank_account,
                'nip'              => $contractor->nip,
                'company_name'     => $contractor->company_name,
                'email'            => $contractor->email,
                'street_name'      => $contractor->street_name,
                'phone'            => $contractor->phone,
                'first_name'       => $contractor->first_name,
                'surname'          => $contractor->surname
            ]);
        }

        return response()->json($invoice->load(['invoice_contractors', 'invoice_products']), 201);
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
