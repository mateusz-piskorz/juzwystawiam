<?php

namespace App\Http\Controllers\Api\Invoice;

use Illuminate\Http\Request;

class InvoiceChartDataController
{
    public function chartDataThisYear(Request $request)
    {
        $validated = $request->validate([
            'period'    => 'nullable|in:this_year,prev_year',
            'product'   => 'nullable|array',
            'product.*' => 'integer'
        ]);

        return $request->user()->invoicesChartData($validated);
    }
}
