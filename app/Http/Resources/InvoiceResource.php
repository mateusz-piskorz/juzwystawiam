<?php

namespace App\Http\Resources;

use App\Enums\InvoiceType;
use App\Enums\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {

        return [
            /** @var int */
            'id'                    => $this->id,
            /** @var int */
            'user_id'               => $this->user_id,
            /** @var InvoiceType */
            'type'                  => $this->type,
            'number'                => $this->number,
            'issue_date'            => $this->issue_date,
            /** @var PaymentMethod */
            'payment_method'        => $this->payment_method,
            'currency'              => $this->currency,
            /** @var boolean */
            'is_already_paid'       => $this->is_already_paid,
            'sale_date'             => $this->sale_date,
            'due_date'              => $this->due_date,
            'total'                 => $this->total,
            'total_vat_amount'      => $this->total_vat_amount,
            'total_discount_amount' => $this->total_discount_amount,
            'grand_total'           => $this->grand_total,
            /** @var string|null */
            'secret_note'           => $this->secret_note,
            'created_at'            => $this->created_at,
            'updated_at'            => $this->updated_at,
            'invoice_products'      => InvoiceProductResource::collection($this->invoice_products),
            'invoice_contractors'   => InvoiceContractorResource::collection($this->invoice_contractors),
            'invoice_emails'        => InvoiceEmailResource::collection($this->invoice_emails)
        ];
    }

};
