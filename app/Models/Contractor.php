<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contractor extends Model
{

    protected $fillable = [
        'user_id',
        'type_of_business',
        'is_own_company',
        'postal_code',
        'building_number',
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

    protected $appends = ['full_name'];

    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => ($attributes['first_name'] || $attributes['surname']) ? $attributes['first_name'] . ' ' . $attributes['surname'] : null
        );
    }

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
