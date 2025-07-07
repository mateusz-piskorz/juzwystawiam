<?php

namespace App\Models;

use App\Enums\EmailStatus;
use App\Mail\IssueAnInvoice;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Mail;

class Invoice extends Model
{

    protected $fillable = [
        'user_id',
        'type',
        'number',
        'total',
        'issue_date',
        'payment_method',
        'currency',
        'is_already_paid',
        'sale_date',
        'due_date',
        'secret_note',
        'total',
        'total_vat_amount',
        'total_discount_amount',
        'grand_total'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function invoice_products(): HasMany
    {
        return $this->hasMany(InvoiceProduct::class);
    }

    public function invoice_contractors(): HasMany
    {
        return $this->hasMany(InvoiceContractor::class);
    }

    public function invoice_emails(): HasMany
    {
        return $this->hasMany(InvoiceEmail::class);
    }

    public function latest_invoice_email()
    {
        return $this->hasOne(InvoiceEmail::class)->latestOfMany();
    }

    public function sendEmailIssuingInvoice(string $recipient): void
    {
        $this->load(['invoice_products', 'invoice_contractors']);

        $invoice_email = InvoiceEmail::create([
            'invoice_id' => $this->id,
            'status'     => EmailStatus::PENDING->value
        ]);

        dispatch(fn() => Mail::to($recipient)->send(new IssueAnInvoice($this, $invoice_email)))->afterResponse();
    }

}
