<?php

namespace App\Http\Requests\Contractor;

use App\Enums\TypeOfBusiness;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContractorRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'type_of_business' => ['required', Rule::enum(TypeOfBusiness::class)],
            'is_own_company' => ['required', 'boolean'],
            'nip' => [
                'nullable',
                'required_if:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS',
                'exclude_unless:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS',
                'string',
                'size:10',
                Rule::unique('contractors')->where(fn (Builder $query) => $query
                    ->where('user_id', $this->user()->id)
                    ->when($this->contractor, function (Builder $query, $contractor) {
                        return $query->whereNot('nip', $contractor->nip);
                    })),
            ],
            'postal_code' => ['required', 'string'],
            'city' => ['required', 'string'],
            'country' => ['required', 'string'],
            'company_name' => [
                'nullable',
                'required_if:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS',
                'exclude_unless:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS',
                'string',
            ],
            'street_name' => ['required', 'string'],
            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'string'],
            'bank_account' => ['nullable', 'string', 'digits_between:5,17'],
            'first_name' => [
                'nullable',
                'required_if:type_of_business,PRIVATE_PERSON,SELF_EMPLOYED',
                'exclude_unless:type_of_business,PRIVATE_PERSON,SELF_EMPLOYED',
                'string',
            ],
            'surname' => [
                'nullable',
                'required_if:type_of_business,PRIVATE_PERSON,SELF_EMPLOYED',
                'exclude_unless:type_of_business,PRIVATE_PERSON,SELF_EMPLOYED',
                'string',
            ],
        ];
    }
}
