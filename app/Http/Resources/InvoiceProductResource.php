<?php

namespace App\Http\Resources;

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {

        return [
            /** @var int */
            'id'           => $this->id,
            /** @var int */
            'invoice_id'   => $this->invoice_id,
            /** @var int|null */
            'product_id'   => $this->product_id,
            'name'         => $this->name,
            /** @var string|null */
            'description'  => $this->description,
            /** @var float */
            'price'        => $this->price,
            /** @var MeasureUnit */
            'measure_unit' => $this->measure_unit,
            /** @var VatRate */
            'vat_rate'     => $this->vat_rate,
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at
        ];
    }

};
