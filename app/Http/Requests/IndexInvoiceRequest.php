<?php

namespace App\Http\Requests;

use App\Rules\StringOrArray;
use Illuminate\Foundation\Http\FormRequest;

class IndexInvoiceRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'q' => ['string', 'nullable'],
            /*
             * @var string | array<string> | null
             */
            'is_already_paid' => [new StringOrArray, 'nullable'],
            'sort' => ['in:number,type,sale_date,total,is_already_paid', 'nullable'],
            'sort_direction' => ['in:asc,desc', 'nullable'],
            'limit' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ];
    }
}
