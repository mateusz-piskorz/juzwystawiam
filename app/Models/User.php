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
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
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
            get: fn(mixed $value, array $attributes) => PremiumDays::daysLeft($attributes['premium_access_expires_at']),
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

    public function invoicesChartData(array $filters = [])
    {
        $period = $filters['period'] ?? 'this_year';
        $productIds = $filters['product'] ?? null;

        $year = now()->year;
        if ($period === 'prev_year') {
            $year--;
        }

        $months = collect(range(1, 12))->map(function ($month) {
            return [
                'month'  => Carbon::create()->month($month)->format('F'),
                'paid'   => 0,
                'unpaid' => 0
            ];
        });

        $query = $this->invoices()
            ->select(
                DB::raw("EXTRACT(MONTH FROM invoices.created_at) as month"),
                DB::raw("SUM(CASE WHEN invoices.is_already_paid = true THEN 1 ELSE 0 END) as paid"),
                DB::raw("SUM(CASE WHEN invoices.is_already_paid = false THEN 1 ELSE 0 END) as unpaid")
            )
            ->whereYear('invoices.created_at', $year)
            ->groupBy(DB::raw("EXTRACT(MONTH FROM invoices.created_at)"));

        if ($productIds && is_array($productIds) && count($productIds)) {
            $query->join('invoice_products', 'invoices.id', '=', 'invoice_products.invoice_id')
                ->whereIn('invoice_products.product_id', $productIds);
        }

        $invoices = $query->get();

        $months = $months->map(function ($item, $key) use ($invoices) {
            $invoice = $invoices->firstWhere('month', $key + 1);
            if ($invoice) {
                $item['paid'] = (int) $invoice->paid;
                $item['unpaid'] = (int) $invoice->unpaid;
            }
            return $item;
        });

        return $months->values()->toArray();
    }

}
