<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'price',
        'measure_unit',
        'vat_rate'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
