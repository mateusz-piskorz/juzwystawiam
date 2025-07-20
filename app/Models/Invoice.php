<?php

namespace App\Models;

use App\Enums\ContractorRole;
use App\Enums\EmailStatus;
use App\Mail\IssueAnInvoice;
use Barryvdh\DomPDF\Facade\Pdf;
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
            'status'     => EmailStatus::PENDING->value,
            'recipient'  => $recipient
        ]);

        dispatch(fn() => Mail::to($recipient)->send(new IssueAnInvoice($this, $invoice_email)))->afterResponse();
    }

    public function createContractor(Contractor $contractor, string $role): void
    {
        $this->invoice_contractors()->create([
            'contractor_id'    => $contractor->id,
            'role'             => $role,
            'type_of_business' => $contractor->type_of_business,
            'is_own_company'   => $contractor->is_own_company,
            'postal_code'      => $contractor->postal_code,
            'city'             => $contractor->city,
            'country'          => $contractor->country,
            'bank_account'     => $contractor->bank_account,
            'nip'              => $contractor->nip,
            'company_name'     => $contractor->company_name,
            'email'            => $contractor->email,
            'street_name'      => $contractor->street_name,
            'phone'            => $contractor->phone,
            'first_name'       => $contractor->first_name,
            'surname'          => $contractor->surname
        ]);
    }

    public function generatePdf()
    {
        $this->load(["invoice_products", "invoice_contractors"]);
        $this['sale_date'] = date_format(date_create($this['sale_date']), "Y-m-d");
        [$buyer, $seller] = $this->getContractors();

        return Pdf::loadView('invoice-pdf', ['invoice' => $this, 'seller' => $seller, 'buyer' => $buyer]);
    }

    public function getContractors()
    {
        $this->loadMissing(["invoice_products", "invoice_contractors"]);

        return [
            collect($this['invoice_contractors'])->firstWhere('role', ContractorRole::BUYER) ?? null,
            collect($this['invoice_contractors'])->firstWhere('role', ContractorRole::SELLER) ?? null
        ];
    }

}
