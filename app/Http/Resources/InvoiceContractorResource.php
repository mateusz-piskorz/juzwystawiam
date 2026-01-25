<?php

namespace App\Http\Resources;

use App\Enums\ContractorRole;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceContractorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            /** @var int */
            'id' => $this->id,
            /** @var int */
            'invoice_id' => $this->invoice_id,
            /** @var int */
            'contractor_id' => $this->contractor_id,

            /** @var ContractorRole */
            'role' => $this->role,

            /** @var bool */
            'is_own_company' => $this->is_own_company,

            'company_name' => $this->company_name,

            /** @var string|null */
            'nip' => $this->nip,

            /** @var string|null */
            'email' => $this->email,

            /** @var string|null */
            'phone' => $this->phone,

            /** @var string|null */
            'bank_account' => $this->bank_account,

            /** @var string|null */
            'country' => $this->country,

            /** @var string|null */
            'city' => $this->city,

            /** @var string|null */
            'postal_code' => $this->postal_code,

            /** @var string|null */
            'street_name' => $this->street_name,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
