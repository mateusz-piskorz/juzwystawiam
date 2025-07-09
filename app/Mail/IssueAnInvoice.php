<?php

namespace App\Mail;

use App\Enums\EmailStatus;
use App\Models\Invoice;
use App\Models\InvoiceEmail;
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

    public function __construct(public Invoice $invoice, public InvoiceEmail $invoice_email)
    {

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
        [$buyer, $seller] = $this->invoice->getContractors();
        return new Content(
            markdown: 'mail.invoice.issue',
            with: ['seller' => $seller, 'buyer' => $buyer],
        );
    }

    public function attachments(): array
    {
        $pdf = $this->invoice->generatePdf();

        return [
            Attachment::fromData(fn() => $pdf->output(), 'invoice.pdf')
                ->withMime('application/pdf')
        ];
    }
}
