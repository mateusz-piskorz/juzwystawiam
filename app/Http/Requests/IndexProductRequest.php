<?php

namespace App\Http\Requests;

use App\Rules\StringOrArray;
use Illuminate\Foundation\Http\FormRequest;

class IndexProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'q' => ['string', 'nullable'],
            /*
             * @var string | array<string> | null
             */
            'measure_unit' => [new StringOrArray, 'nullable'],
            /*
             * @var string | array<string> | null
             */
            'vat_rate' => [new StringOrArray, 'nullable'],
            'sort' => ['in:price,measure_unit,vat_rate', 'nullable'],
            'sort_direction' => ['in:asc,desc', 'nullable'],
            'limit' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ];
    }
}
