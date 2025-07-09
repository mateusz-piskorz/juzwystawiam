<?php

namespace App\Http\Controllers\Invoice;

use App\Models\Invoice;
use App\Traits\CalculatesProductTotals;
use Illuminate\Support\Facades\Gate;

class InvoicePdfController
{
    use CalculatesProductTotals;

    public function pdfPreview(Invoice $invoice)
    {
        Gate::authorize('view', $invoice);

        $pdf = $invoice->generatePdf();
        return $pdf->stream();
    }

    public function pdfDownload(Invoice $invoice)
    {
        Gate::authorize('view', $invoice);

        $pdf = $invoice->generatePdf();
        return $pdf->download();
    }

}
