<?php

namespace App\Http\Requests\Product;

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'         => 'nullable|string|max:255',
            'price'        => 'nullable|decimal:0,2',
            'measure_unit' => ['nullable', Rule::enum(MeasureUnit::class)],
            'vat_rate'     => ['nullable', Rule::enum(VatRate::class)],
            'description'  => 'nullable|string'
        ];
    }
}
