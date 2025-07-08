<?php

namespace App\Http\Requests;

use App\Enums\TypeOfBusiness;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpsertContractorRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'type_of_business' => ['required', Rule::enum(TypeOfBusiness::class)],
            'is_own_company'   => ['required', 'boolean'],
            'nip'              => [
                'nullable',
                'string',
                'size:10',
                'required_if:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS',
                Rule::unique('contractors')->where(fn(Builder $query) => $query->where('user_id', $this->user()->id)->whereNot('nip', $this->contractor->nip))
            ],
            'postal_code'      => ['required', 'string', 'max:255'],

            'city'             => ['required', 'string', 'max:255'],
            'country'          => ['required', 'string', 'max:255'],
            'company_name'     => [
                'nullable',
                'string',
                'max:255',
                'required_if:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS'
            ],
            'street_name'      => ['required', 'string', 'max:255'],
            'email'            => ['nullable', 'email'],
            'phone'            => ['nullable', 'string'],
            'bank_account'     => ['nullable', 'integer', 'digits_between:5,17'],
            'first_name'       => [
                'nullable',
                'string',
                'max:255',
                'required_if:type_of_business,PRIVATE_PERSON,SELF_EMPLOYED'
            ],
            'surname'          => [
                'nullable',
                'string',
                'max:255',
                'required_if:type_of_business,PRIVATE_PERSON,SELF_EMPLOYED'
            ]
        ];
    }
}
