<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceContractor extends Model
{

    protected $fillable = [
        'invoice_id',
        'contractor_id',
        'role',
        'type_of_business',
        'is_own_company',
        'postal_code',
        'city',
        'country',
        'bank_account',
        'nip',
        'company_name',
        'email',
        'street_name',
        'phone',
        'first_name',
        'surname'

    ];

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

}
