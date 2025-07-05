<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceProduct extends Model
{
    protected $fillable = [
        'invoice_id',
        'name',
        'quantity',
        'price',
        'measure_unit',
        'vat_rate',
        'discount',
        'total',
        'total_vat_amount',
        'total_discount_amount',
        'grand_total'
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    // public function product(): BelongsTo
    // {
    //     return $this->belongsTo(Contractor::class);
    // }
}
