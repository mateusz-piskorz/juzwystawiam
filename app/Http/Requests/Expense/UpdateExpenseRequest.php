<?php

namespace App\Http\Requests\Expense;

use App\Rules\BelongsToUser;
use Illuminate\Foundation\Http\FormRequest;

class UpdateExpenseRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string'],
            'total' => ['nullable', 'decimal:0,2'],
            'expense_type_id' => ['nullable', 'integer', new BelongsToUser('expense_types', $this->user()->id)],
            'description' => ['nullable', 'string'],
        ];
    }
}
