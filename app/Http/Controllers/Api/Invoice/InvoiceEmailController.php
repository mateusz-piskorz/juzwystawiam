<?php

namespace App\Http\Controllers\Api\Invoice;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class InvoiceEmailController
{
    public function sendEmailIssuingInvoice(Request $request, Invoice $invoice)
    {
        Gate::authorize('sendEmailIssuingInvoice', $invoice);
        $recipient = $request->validate(['recipient' => 'email'])['recipient'];
        $invoice->sendEmailIssuingInvoice($recipient);

        return response()->json(['message' => 'Invoice sent']);
    }
}
