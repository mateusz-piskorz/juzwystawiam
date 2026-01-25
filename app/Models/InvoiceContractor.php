<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceContractor extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'contractor_id',
        'role',
        'is_own_company',
        'company_name',
        'nip',
        'email',
        'phone',
        'bank_account',
        'country',
        'city',
        'postal_code',
        'street_name',
    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }
}
