<?php

namespace App\Http\Requests\Invoice;

use App\Enums\ContractorRole;
use App\Enums\Currency;
use App\Enums\InvoiceType;
use App\Enums\MeasureUnit;
use App\Enums\PaymentMethod;
use App\Enums\VatRate;
use App\Rules\ContractorBelongsToUser;
use App\Rules\ProductBelongsToUser;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateInvoiceRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'type' => ['nullable', Rule::enum(InvoiceType::class)],
            'number' => 'nullable|string',
            'issue_date' => 'nullable|date',
            'payment_method' => ['nullable', Rule::enum(PaymentMethod::class)],
            'currency' => ['nullable', Rule::enum(Currency::class)],
            'is_already_paid' => 'nullable|boolean',
            'sale_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'secret_note' => $this->user()->can('use-secret-note') ? 'nullable|string' : 'nullable|prohibited',

            'invoice_contractors.*.contractor_id' => ['required', 'integer', new ContractorBelongsToUser($this->user()->id)],
            'invoice_contractors.*.role' => ['required', Rule::enum(ContractorRole::class)],

            'invoice_products' => 'nullable|array|min:1',
            'invoice_products.*.product_id' => ['nullable', 'integer', new ProductBelongsToUser($this->user()->id)],
            'invoice_products.*.name' => 'nullable|string',
            'invoice_products.*.quantity' => 'nullable|integer',
            'invoice_products.*.price' => 'nullable|decimal:0,2',
            'invoice_products.*.measure_unit' => ['nullable', Rule::enum(MeasureUnit::class)],
            'invoice_products.*.discount' => 'nullable|integer',

            'invoice_products.*.vat_rate' => ['nullable', 'exclude_unless:type,VAT,null', Rule::enum(VatRate::class)],
        ];
    }
}
