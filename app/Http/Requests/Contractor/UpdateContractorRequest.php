<?php

namespace App\Http\Requests\Contractor;

use App\Enums\TypeOfBusiness;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateContractorRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'type_of_business' => ['nullable', Rule::enum(TypeOfBusiness::class)],
            'is_own_company' => ['nullable', 'boolean'],
            'nip' => [
                'nullable',
                'exclude_unless:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS,null',
                'string',
                'size:10',
                Rule::unique('contractors')->where(fn (Builder $query) => $query
                    ->where('user_id', $this->user()->id)
                    ->when($this->contractor, function (Builder $query, $contractor) {
                        return $query->whereNot('nip', $contractor->nip);
                    })),
            ],
            'postal_code' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'country' => ['nullable', 'string'],
            'company_name' => [
                'nullable',
                'exclude_unless:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS,null',
                'string',
            ],
            'street_name' => ['nullable', 'string'],
            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'string'],
            'bank_account' => ['nullable', 'string', 'digits_between:5,17'],
            'first_name' => [
                'nullable',
                'exclude_unless:type_of_business,PRIVATE_PERSON,SELF_EMPLOYED,null',
                'string',
            ],
            'surname' => [
                'nullable',
                'exclude_unless:type_of_business,PRIVATE_PERSON,SELF_EMPLOYED,null',
                'string',
            ],
        ];
    }
}
