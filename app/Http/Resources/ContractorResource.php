<?php

namespace App\Http\Resources;

use App\Enums\TypeOfBusiness;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContractorResource extends JsonResource
{
    public function toArray(Request $request): array
    {

        return [
            'id'               => $this->id,
            'user_id'          => $this->user_id,
            /** @var TypeOfBusiness */
            'type_of_business' => $this->type_of_business,
            /** @var boolean */
            'is_own_company'   => $this->is_own_company,
            'postal_code'      => $this->postal_code,
            'city'             => $this->city,
            'country'          => $this->country,
            'company_name'     => $this->company_name,
            'street_name'      => $this->street_name,
            /** @var string|null */
            'bank_account'     => $this->bank_account,
            /** @var string|null */
            'nip'              => $this->nip,
            /** @var string|null */
            'email'            => $this->email,
            /** @var string|null */
            'phone'            => $this->phone,
            /** @var string|null */
            'first_name'       => $this->first_name,
            /** @var string|null */
            'surname'          => $this->surname,
            'created_at'       => $this->created_at,
            'updated_at'       => $this->updated_at
        ];
    }

};
