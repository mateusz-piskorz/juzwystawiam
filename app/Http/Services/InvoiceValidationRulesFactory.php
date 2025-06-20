<?php

namespace App\Http\Services;

use App\Enums\ContractorRole;
use App\Rules\ContractorBelongsToUser;
use Illuminate\Validation\Rule;

class InvoiceValidationRulesFactory
{
    public static function getRules(string $type, string $userId): array
    {
        // Common rules for all invoices
        $common = [
            'type'                                => 'required|string|in:VAT,Proforma',
            'number'                              => 'required|string',
            'issue_date'                          => 'required|date',
            'invoice_contractors.*.contractor_id' => ['required', new ContractorBelongsToUser($userId)],
            'invoice_contractors.*.role'          => ['required', Rule::enum(ContractorRole::class)]

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
            'VAT'      => [
                // 'items.*.vat_rate'  => 'required|numeric',
                // 'invoice_contractors.*.email'       => 'required|email', // this is an example, it's gonna override email rule from commons
            ],
            'Proforma' => [
            ]
        ];

        return array_merge($common, $types[$type] ?? []);
    }
}
