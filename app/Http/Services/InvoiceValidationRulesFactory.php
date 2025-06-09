<?php

namespace App\Http\Services;

class InvoiceValidationRulesFactory
{
    public static function getRules(string $type): array
    {
        // Common rules for all invoices
        $common = [
            'type'         => 'required|string|in:VAT,Proforma',
            'number'       => 'required|string',
            'issue_date'   => 'required|date',
            // 'total_paid'   => 'required',

            'invoice_contractors'  => 'required|array|min:2',
            // 'invoice_contractors.*.contractor_id' => 'nullable|exists:contractors,id',
            'invoice_contractors.*.role'          => 'required|in:buyer,seller',
            'invoice_contractors.*.name'          => 'required|nullable',
            'invoice_contractors.*.nip'           => 'required|nullable',
            'invoice_contractors.*.email'         => 'required|email',
            'invoice_contractors.*.phone'         => 'nullable|string',
            // 'contractors.*.address'       => 'nullable|string',
            // 'contractors.*.city'          => 'nullable|string',
            // 'contractors.*.postal_code'   => 'nullable|string',
            // 'contractors.*.country'       => 'nullable|string',

            // 'items'        => 'required|array|min:1',
            // 'items.*.name'      => 'required|string',
            // 'items.*.quantity'  => 'required|numeric|min:1',
            // 'items.*.unit'      => 'nullable|string',
            // 'items.*.net_price' => 'required|numeric',
            // 'items.*.gross_price' => 'required|numeric',
            // 'items.*.pkwiu'     => 'nullable|string',
            // 'items.*.gtu'       => 'nullable|string',
            // 'items.*.discount'  => 'nullable|numeric'
        ];

        // Type-specific rules
        $types = [
            'VAT' => [
                // 'items.*.vat_rate'  => 'required|numeric',
                // 'invoice_contractors.*.email'       => 'required|email', // this is an example, it's gonna override email rule from commons
            ],
            'Proforma' => [
            ],
        ];

        return array_merge($common, $types[$type] ?? []);
    }
}
