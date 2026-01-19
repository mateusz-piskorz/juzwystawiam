<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StripePaymentIntentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            /** @var int */
            'amount' => $this->amount,
            'status' => $this->status,
            /** @var string|null */
            'description' => $this->description,
            /** @var int */
            'created' => $this->created,
        ];
    }
}
