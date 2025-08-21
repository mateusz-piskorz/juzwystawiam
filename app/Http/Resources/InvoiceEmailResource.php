<?php

namespace App\Http\Resources;

use App\Enums\EmailStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceEmailResource extends JsonResource
{
    public function toArray(Request $request): array
    {

        return [
            /** @var int */
            'id'         => $this->id,
            /** @var int */
            'invoice_id' => $this->invoice_id,
            /** @var EmailStatus */
            'status'     => $this->status,
            'recipient'  => $this->recipient,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }

};
