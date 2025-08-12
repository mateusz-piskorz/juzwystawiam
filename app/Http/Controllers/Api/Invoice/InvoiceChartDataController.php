<?php

namespace App\Http\Controllers\Api\Invoice;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;

class InvoiceChartDataController
{

    public function statusDistributionByYear(Request $request)
    {
        $user = $request->user();

        $years = [
            'this_year' => now()->year,
            'prev_year' => now()->year - 1
        ];

        $result = [];

        foreach ($years as $key => $year) {
            $counts = $user->invoices()
                ->selectRaw("
                    SUM(CASE WHEN is_already_paid = true THEN 1 ELSE 0 END) as paid,
                    SUM(CASE WHEN is_already_paid = false THEN 1 ELSE 0 END) as unpaid
                ")
                ->whereYear('created_at', $year)
                ->first();

            $result[$key] = [
                'paid'   => (int) ($counts->paid ?? 0),
                'unpaid' => (int) ($counts->unpaid ?? 0)
            ];
        }

        return $result;
    }

    public function statusMonthlySeries(Request $request)
    {
        $validated = $request->validate([
            'period'    => 'nullable|in:this_year,prev_year',
            'product'   => 'nullable|array',
            'product.*' => 'integer'
        ]);

        $period = $validated['period'] ?? 'this_year';
        $productIds = $validated['product'] ?? null;

        $year = now()->year;
        if ($period === 'prev_year') {
            $year--;
        }
        Carbon::setLocale(App::currentLocale());

        $months = collect(range(1, 12))->map(function ($month) {
            return [
                'month'  => Carbon::create()->month($month)->translatedFormat("M"),
                'paid'   => 0,
                'unpaid' => 0,
                'total'  => 0
            ];
        });

        $query = $request->user()->invoices()
            ->select(
                DB::raw("EXTRACT(MONTH FROM invoices.created_at) as month"),
                DB::raw("SUM(CASE WHEN invoices.is_already_paid = true THEN 1 ELSE 0 END) as paid"),
                DB::raw("SUM(CASE WHEN invoices.is_already_paid = false THEN 1 ELSE 0 END) as unpaid"),
                DB::raw("COUNT(*) as total")
            )
            ->whereYear('invoices.created_at', $year)
            ->groupBy(DB::raw("EXTRACT(MONTH FROM invoices.created_at)"));

        if ($productIds && is_array($productIds) && count($productIds)) {
            $query->join('invoice_products', 'invoices.id', '=', 'invoice_products.invoice_id')
                ->whereIn('invoice_products.product_id', $productIds);
        }

        $invoices = $query->get();

        $months = $months->map(function ($item, $key) use ($invoices) {
            $invoice = $invoices->firstWhere('month', $key + 1);
            if ($invoice) {
                $item['paid'] = (int) $invoice->paid;
                $item['unpaid'] = (int) $invoice->unpaid;
                $item['total'] = (int) $invoice->total;
            }
            return $item;
        });

        // Add overall totals
        $overall = [
            'paid'   => $months->sum('paid'),
            'unpaid' => $months->sum('unpaid'),
            'total'  => $months->sum('total')
        ];

        return [
            'months'  => $months->values()->toArray(),
            'overall' => $overall
        ];
    }
}
