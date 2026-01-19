<?php

namespace App\Http\Resources;

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'name' => $this->name,
            'description' => $this->description,
            /** @var float */
            'price' => $this->price,
            /** @var MeasureUnit */
            'measure_unit' => $this->measure_unit,
            /** @var VatRate */
            'vat_rate' => $this->vat_rate,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
