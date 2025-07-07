<?php

namespace App\Mail;

use App\Enums\ContractorRole;
use App\Enums\EmailStatus;
use App\Models\Invoice;
use App\Models\InvoiceEmail;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class IssueAnInvoice extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $buyer;
    public $seller;

    public function __construct(public Invoice $invoice, public InvoiceEmail $invoice_email)
    {
        $invoice->load("invoice_products", "invoice_contractors");
        $this->invoice['sale_date'] = date_format(date_create($this->invoice['sale_date']), "Y-m-d");
        $this->buyer = collect($this->invoice['invoice_contractors'])->firstWhere('role', ContractorRole::BUYER) ?? null;
        $this->seller = collect($this->invoice['invoice_contractors'])->firstWhere('role', ContractorRole::SELLER) ?? null;
    }

    public function failed(): void
    {
        $this->invoice_email->update([
            'status' => EmailStatus::FAILED->value
        ]);

    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Issue An Invoice',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.invoice.issue',
            with: ['seller' => $this->seller, 'buyer' => $this->buyer],
        );
    }

    public function attachments(): array
    {
        $pdf = Pdf::loadView('invoice-pdf', ['invoice' => $this->invoice, 'seller' => $this->seller, 'buyer' => $this->buyer]);

        return [
            Attachment::fromData(fn() => $pdf->output(), 'invoice.pdf')
                ->withMime('application/pdf')
        ];
    }
}
