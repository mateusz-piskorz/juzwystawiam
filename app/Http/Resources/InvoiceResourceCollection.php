<?php

namespace App\Http\Resources;

use App\Enums\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResourceCollection extends JsonResource
{
    public function toArray(Request $request): array
    {

        return [
            /** @var int */
            'id' => $this->id,
            /** @var int */
            'user_id' => $this->user_id,
            'number' => $this->number,
            'issue_date' => $this->issue_date,
            /** @var PaymentMethod */
            'payment_method' => $this->payment_method,
            'currency' => $this->currency,
            /** @var bool */
            'is_already_paid' => $this->is_already_paid,
            'sale_date' => $this->sale_date,
            'due_date' => $this->due_date,
            'total' => $this->total,
            'total_vat_amount' => $this->total_vat_amount,
            'total_discount_amount' => $this->total_discount_amount,
            'grand_total' => $this->grand_total,
            /** @var string|null */
            'secret_note' => $this->secret_note,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            /** @var InvoiceEmailResource|null */
            'latest_invoice_email' => new InvoiceEmailResource($this->latest_invoice_email),
        ];
    }
}
