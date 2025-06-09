<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'number',
        'issue_date',
        'sale_date',
        'due_date',
        'currency',
        'status',
        'notes',
        'template',
        'payment_method',
        'total_paid',
        'language',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function invoice_contractors(): HasMany
    {
        return $this->hasMany(InvoiceContractor::class);
    }
}
