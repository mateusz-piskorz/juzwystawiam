<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Contractor extends Model
{
    protected $fillable = [
        'user_id',
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
