<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contractor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
