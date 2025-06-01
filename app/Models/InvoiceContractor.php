<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class InvoiceContractor extends Model
{
    protected $fillable = [
        'invoice_id',
        'contractor_id',
        'is_own_company',
        'name',
        'nip',
        'address',
        'city',
        'postal_code',
        'country',
        'email',
        'phone'
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function contractor(): BelongsTo
    {
        return $this->belongsTo(Contractor::class);
    }

    // public function invoices(): BelongsToMany
    // {
    //     return $this->belongsToMany(Invoice::class, 'invoice_contractor')
    //         ->withPivot('role');
    // }
}
