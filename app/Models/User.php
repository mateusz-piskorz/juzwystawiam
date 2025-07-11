<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\EmailStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{

    use HasFactory, Notifiable, HasApiTokens, Billable;

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

    protected function casts(): array
    {
        return [
            'email_verified_at'         => 'datetime',
            'premium_access_expires_at' => 'datetime',
            'password'                  => 'hashed'
        ];
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

    public function hasPremium(): bool
    {
        return $this->premium_access_expires_at && $this->premium_access_expires_at > now();
    }

    public function premiumDays(): int
    {
        if (!$this->premium_access_expires_at || $this->premium_access_expires_at <= now()) {
            return 0;
        }
        $minutes = now()->diffInMinutes($this->premium_access_expires_at, false);
        return (int) ceil($minutes / 1440);
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
            ->withCount(['invoice_emails as emails_sent_count' => function ($query) {
                $query->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->where('status', EmailStatus::SENT->value);
            }])
            ->get()
            ->sum('emails_sent_count');
    }
}
