<?php

namespace App\Http\Requests;

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

class UpsertInvoiceRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'type'                                => ['required', Rule::enum(InvoiceType::class)],
            'number'                              => 'required|string',
            'issue_date'                          => 'required|date',
            'payment_method'                      => ['required', Rule::enum(PaymentMethod::class)],
            'currency'                            => ['required', Rule::enum(Currency::class)],
            'is_already_paid'                     => 'required|boolean',
            'sale_date'                           => 'required|date',
            'due_date'                            => 'required|date',
            'secret_note'                         => $this->user()->can('use-secret-note') ? 'nullable|string' : 'nullable|prohibited',

            'invoice_contractors.*.contractor_id' => ['required', 'integer', new ContractorBelongsToUser($this->user()->id)],
            'invoice_contractors.*.role'          => ['required', Rule::enum(ContractorRole::class)],

            'invoice_products'                    => 'required|array|min:1',
            'invoice_products.*.product_id'       => ['nullable', 'integer', new ProductBelongsToUser($this->user()->id)],
            'invoice_products.*.name'             => 'required|string',
            'invoice_products.*.quantity'         => 'required|integer',
            'invoice_products.*.price'            => 'required|decimal:0,2',
            'invoice_products.*.measure_unit'     => ['required', Rule::enum(MeasureUnit::class)],
            'invoice_products.*.discount'         => 'nullable|integer',

            'invoice_products.*.vat_rate'         => ['required_if:type,VAT', 'exclude_unless:type,VAT', Rule::enum(VatRate::class)]
        ];
    }
}
