<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\EmailStatus;
use App\Support\PremiumDays;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use Billable, HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'premium_access_expires_at'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $appends = ['premium_days'];

    protected function casts(): array
    {
        return [
            'email_verified_at'         => 'datetime',
            'premium_access_expires_at' => 'datetime',
            'password'                  => 'hashed'
        ];
    }

    protected function premiumDays(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => PremiumDays::daysLeft($attributes['premium_access_expires_at'] ?? null),
        );
    }

    public function contractors(): HasMany
    {
        return $this->hasMany(Contractor::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function invoicesCreatedThisMonth(): int
    {
        return $this->invoices()
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
    }

    public function emailsSentThisMonth(): int
    {
        return $this->invoices()
            ->join('invoice_emails', 'invoices.id', '=', 'invoice_emails.invoice_id')
            ->whereMonth('invoice_emails.created_at', now()->month)
            ->whereYear('invoice_emails.created_at', now()->year)
            ->where('invoice_emails.status', EmailStatus::SENT->value)
            ->count();
    }
}
