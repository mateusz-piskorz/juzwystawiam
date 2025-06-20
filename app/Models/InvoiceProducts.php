<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceProducts extends Model
{
    protected $fillable = [
        'invoice_id',
        'name',
        'quantity',
        'price',
        'measure_unit',
        'vat_rate',
        'discount'
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }
}
