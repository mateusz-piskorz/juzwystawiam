<?php

namespace App\Models;

use App\Enums\ContractorRole;
use App\Enums\EmailStatus;
use App\Mail\IssueAnInvoice;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Mail;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'number',
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
        'grand_total',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function invoiceProducts(): HasMany
    {
        return $this->hasMany(InvoiceProduct::class);
    }

    public function invoiceContractors(): HasMany
    {
        return $this->hasMany(InvoiceContractor::class);
    }

    public function invoiceEmails(): HasMany
    {
        return $this->hasMany(InvoiceEmail::class);
    }

    public function latestInvoiceEmail()
    {
        return $this->hasOne(InvoiceEmail::class)->latestOfMany();
    }

    public function sendEmailIssuingInvoice(string $recipient): void
    {
        $this->load(['invoiceProducts', 'invoiceContractors']);

        $invoice_email = InvoiceEmail::create([
            'invoice_id' => $this->id,
            'status' => EmailStatus::PENDING->value,
            'recipient' => $recipient,
        ]);

        dispatch(fn () => Mail::to($recipient)->send(new IssueAnInvoice($this, $invoice_email)))->afterResponse();
    }

    public function createContractor(Contractor $contractor, string $role): void
    {
        $this->invoiceContractors()->create([
            'contractor_id' => $contractor->id,
            'role' => $role,
            'is_own_company' => $contractor->is_own_company,
            'company_name' => $contractor->company_name,
            'nip' => $contractor->nip,
            'email' => $contractor->email,
            'phone' => $contractor->phone,
            'bank_account' => $contractor->bank_account,
            'country' => $contractor->country,
            'city' => $contractor->city,
            'postal_code' => $contractor->postal_code,
            'street_name' => $contractor->street_name,
        ]);
    }

    public function generatePdf()
    {
        $this->load(['invoiceProducts', 'invoiceContractors']);
        $this['sale_date'] = date_format(date_create($this['sale_date']), 'Y-m-d');
        [$buyer, $seller] = $this->getContractors();

        return Pdf::loadView('invoice-pdf', ['invoice' => $this, 'seller' => $seller, 'buyer' => $buyer]);
    }

    public function getContractors()
    {
        $this->loadMissing(['invoiceProducts', 'invoiceContractors']);
        $emptyContractor = ['company_name' => '', 'street_name' => '', 'postal_code' => '', 'bank_account' => '', 'city' => ''];

        return [

            collect($this['invoiceContractors'])->firstWhere('role', ContractorRole::BUYER) ?? $emptyContractor,
            collect($this['invoiceContractors'])->firstWhere('role', ContractorRole::SELLER) ?? $emptyContractor,
        ];
    }
}
