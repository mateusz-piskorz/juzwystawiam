<?php

namespace App\Http\Requests\Product;

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'price' => 'required|decimal:0,2',
            'measure_unit' => ['required', Rule::enum(MeasureUnit::class)],
            'vat_rate' => ['required', Rule::enum(VatRate::class)],
            'description' => 'string|nullable',
        ];
    }
}
