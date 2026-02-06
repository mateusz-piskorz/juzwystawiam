<?php

namespace App\Http\Requests\ExpenseType;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExpenseTypeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => [
                'nullable',
                'string',
            ],
        ];
    }
}
