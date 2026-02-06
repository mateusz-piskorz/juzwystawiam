<?php

namespace App\Http\Requests\Expense;

use App\Rules\StringOrArray;
use Illuminate\Foundation\Http\FormRequest;

class IndexExpenseRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'q' => ['string', 'nullable'],
            'expense_type_id' => [new StringOrArray, 'nullable'],
            'sort' => ['in:expense_type_id', 'nullable'],
            'sort_direction' => ['in:asc,desc', 'nullable'],
            'limit' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ];
    }
}
