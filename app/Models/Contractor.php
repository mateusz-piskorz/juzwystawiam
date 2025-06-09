<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contractor extends Model
{
    protected $fillable = [
        'user_id',
        'is_own_company',
        'name',
        'nip',
        'postal_code',
        'building_number',
        'city',
        'email',
        'street_name',
        'country',
        'email',
        'phone'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // public function invoices(): BelongsToMany
    // {
    //     return $this->belongsToMany(Invoice::class, 'invoice_contractor')
    //         ->withPivot('role');
    // }
}
