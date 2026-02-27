<?php

namespace App\Http\Requests\Invoice;

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
            'type' => [new StringOrArray, 'nullable'],
            /*
             * @var string | array<string> | null
             */
            'is_already_paid' => [new StringOrArray, 'nullable'],
            'sort' => ['in:is_already_paid,total,sale_date,number,created_at', 'nullable'],
            'sort_direction' => ['in:asc,desc', 'nullable'],
            'limit' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ];
    }
}
