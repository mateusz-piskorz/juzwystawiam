<?php

namespace App\Http\Requests\Contractor;

use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContractorRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'is_own_company' => ['required', 'boolean'],
            'company_name' => ['required', 'string'],
            'nip' => [
                'nullable',
                'string',
                'size:10',
                Rule::unique('contractors')->where(fn (Builder $query) => $query
                    ->where('user_id', $this->user()->id)
                    ->when($this->contractor, function (Builder $query, $contractor) {
                        return $query->whereNot('nip', $contractor->nip);
                    })),
            ],
            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'string'],
            'bank_account' => ['nullable', 'string', 'digits_between:5,17'],
            'country' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'postal_code' => ['nullable', 'string'],
            'street_name' => ['nullable', 'string'],
        ];
    }
}
