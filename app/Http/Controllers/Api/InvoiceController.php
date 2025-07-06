<?php

namespace App\Http\Controllers\Api;

use App\Enums\EmailStatus;
use App\Helpers\InvoiceValidationRulesFactory;
use App\Http\Controllers\Controller;
use App\Mail\IssueAnInvoice;
use App\Models\Contractor;
use App\Models\Invoice;
use App\Models\InvoiceEmail;
use App\Traits\AppliesQueryFilters;
use App\Traits\CalculatesProductTotals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;

//todo: part of refactor is to split this class into smaller classes like generatePDF, sendEmail, etc.
// actually generate pdf is not inside api
class InvoiceController extends Controller
{
    use AppliesQueryFilters;
    use CalculatesProductTotals;

    // List all invoices
    public function index(Request $request)
    {
        $query = $request->user()->invoices()->with(['invoice_products', 'invoice_contractors']);

        $query = $this->applyQueryFilters(
            $request,
            $query,
            'number',
            sortable: ['number', 'type', 'sale_date', 'total', 'is_already_paid'],
            filterable: ['type', 'is_already_paid']
        );

        return response()->json($query);
    }

    // Show a single invoice
    public function show(Request $request, Invoice $invoice)
    {
        Gate::authorize('view', $invoice);
        if ($invoice->user_id !== $request->user()->id) {
            abort(403);
        };
        return $invoice->toJson();
    }

    // Store a new invoice
    public function store(Request $request)
    {
        // todo: sale_date: new Date(''), due_date
        $type = $request->input('type');
        $rules = InvoiceValidationRulesFactory::getRules($type, $request->user()->id);
        $validated = $request->validate($rules);

        $totals = $this->CalculateProductTotals($validated['invoice_products']);

        // use here a reversable query actions, PDO has it, just need to call save() at the end
        $invoice = Invoice::create([ ...$validated, ...$totals, 'user_id' => $request->user()->id]);

        // handle products
        foreach ($validated['invoice_products'] as $productData) {
            $productTotals = $this->CalculateSingleProductTotals($productData);

            $invoice->invoice_products()->create([ ...$productData, ...$productTotals]);
        }

        // handle contractors
        foreach ($validated['invoice_contractors'] as $contractorData) {
            $contractor = Contractor::query()->findOrFail($contractorData['contractor_id']);
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
    public function update(Request $request, Invoice $invoice)
    {
        Gate::authorize('update', $invoice);

        $type = $request->input('type');
        $rules = InvoiceValidationRulesFactory::getRules($type, $request->user()->id);
        $validated = $request->validate($rules);

        $totals = $this->CalculateProductTotals($validated['invoice_products']);

        // use here a reversable query actions, PDO has it, just need to call save() at the end
        $invoice->update([ ...$validated, ...$totals, 'user_id' => $request->user()->id]);

        // handle products
        $invoice->invoice_products()->delete();
        foreach ($validated['invoice_products'] as $productData) {
            $productTotals = $this->CalculateSingleProductTotals($productData);
            $invoice->invoice_products()->create([ ...$productData, ...$productTotals]);
        }

        // handle contractors
        $invoice->invoice_contractors()->delete();
        foreach ($validated['invoice_contractors'] as $contractorData) {
            $contractor = Contractor::query()->findOrFail($contractorData['contractor_id']);
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

    // Delete an invoice
    public function destroy(Invoice $invoice)
    {
        Gate::authorize('update', $invoice);
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted']);
    }

    // send Email Issuing Invoice
    public function sendEmailIssuingInvoice(Request $request, Invoice $invoice)
    {
        Gate::authorize('sendEmailIssuingInvoice', $invoice);
        $recipient = $request->validate(['recipient' => 'email'])['recipient'];

        // we need to pass it to IssueAnInvoice or some how access it in subscribers

        // we should create a method on invoiceModel->sendEmailIssuingInvoice($recipient) use this for $invoice in model class
        $invoice_email = InvoiceEmail::create([
            'invoice_id' => $invoice->id,
            'status'     => EmailStatus::PENDING->value
        ]);

        // Mail::to($recipient)->send(new IssueAnInvoice($invoice, $invoiceEmail));
        dispatch(fn() => Mail::to($recipient)->send(new IssueAnInvoice($invoice, $invoice_email)))->afterResponse();

        return response()->json(['message' => 'Invoice sent']);
    }
}
