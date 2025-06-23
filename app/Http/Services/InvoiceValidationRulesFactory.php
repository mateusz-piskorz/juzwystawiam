<?php

namespace App\Http\Services;

use App\Enums\ContractorRole;
use App\Enums\Currency;
use App\Enums\InvoiceType;
use App\Enums\MeasureUnit;
use App\Enums\PaymentMethod;
use App\Enums\VatRate;
use App\Rules\ContractorBelongsToUser;
use App\Rules\ProductBelongsToUser;
use Illuminate\Validation\Rule;

class InvoiceValidationRulesFactory
{
    public static function getRules(string $type, string $userId): array
    {
        // Common rules for all invoices
        $common = [
            'type'                            => ['required', Rule::enum(InvoiceType::class)],
            'number'                          => 'required|string',
            'issue_date'                      => 'required|date',
            'payment_method'                  => ['required', Rule::enum(PaymentMethod::class)],
            'currency'                        => ['required', Rule::enum(Currency::class)],
            'is_already_paid'                 => 'required|boolean',
            'sale_date'                       => 'required|date',
            'due_date'                        => 'required|date',
            'secret_note'                     => 'nullable|string',

            'invoice_contractors.*.id'        => ['required', new ContractorBelongsToUser($userId)],
            'invoice_contractors.*.role'      => ['required', Rule::enum(ContractorRole::class)],

            'invoice_products'                => 'required|array|min:1',
            'invoice_products.*.id'           => ['nullable', new ProductBelongsToUser($userId)],
            'invoice_products.*.name'         => 'required|string',
            'invoice_products.*.quantity'     => 'required|integer',
            'invoice_products.*.price'        => 'required|decimal:0,2',
            'invoice_products.*.measure_unit' => ['required', Rule::enum(MeasureUnit::class)],
            'invoice_products.*.discount'     => 'nullable|integer'
        ];

        // Type-specific rules
        $types = [
            'VAT' => [
                'type'                        => ['required', Rule::in(InvoiceType::VAT->value)],
                'invoice_products.*.vat_rate' => ['required', Rule::enum(VatRate::class)]
            ]
            // 'NO_VAT' => [
            // ]
        ];

        return array_merge($common, $types[$type] ?? []);
    }
}
