<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            /** @var int */
            'id' => $this->id,
            /** @var int */
            'user_id' => $this->user_id,
            'expense_type_id' => $this->expense_type_id,
            'title' => $this->title,
            'description' => $this->description,
            /** @var float */
            'total' => $this->total,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'expense_type' => new ExpenseTypeResource($this->whenLoaded('expenseType')),
        ];
    }
}
