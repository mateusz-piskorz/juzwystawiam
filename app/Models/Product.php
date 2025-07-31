<?php

namespace App\Models;

use App\Traits\Locale;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use Locale;

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
