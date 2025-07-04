<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{

    protected $fillable = [
        'user_id',
        'type',
        'number',
        'total',
        'issue_date',
        'payment_method',
        'currency',
        'is_already_paid',
        'sale_date',
        'due_date',
        'secret_note'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function invoice_products(): HasMany
    {
        return $this->hasMany(InvoiceProducts::class);
    }

    public function invoice_contractors(): HasMany
    {
        return $this->hasMany(InvoiceContractor::class);
    }
}
