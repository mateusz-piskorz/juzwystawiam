<?php

namespace App\Http\Requests\Contractor;

use App\Rules\StringOrArray;
use Illuminate\Foundation\Http\FormRequest;

class IndexContractorRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'q' => ['string', 'nullable'],
            /*
             * @var string | array<string> | null
             */
            'is_own_company' => [new StringOrArray, 'nullable'],
            'sort' => ['in:company_name,is_own_company', 'nullable'],
            'sort_direction' => ['in:asc,desc', 'nullable'],
            'limit' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ];
    }
}
