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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
