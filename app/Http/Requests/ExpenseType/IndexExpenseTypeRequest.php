<?php

namespace App\Http\Requests\ExpenseType;

use Illuminate\Foundation\Http\FormRequest;

class IndexExpenseTypeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'q' => ['string', 'nullable'],
            'limit' => 'nullable|integer|min:1|max:100',
            'page' => 'nullable|integer|min:1',
        ];
    }
}
