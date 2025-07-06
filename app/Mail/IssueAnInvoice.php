<?php

namespace App\Mail;

use App\Enums\EmailStatus;
use App\Models\Invoice;
use App\Models\InvoiceEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class IssueAnInvoice extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public Invoice $invoice, public InvoiceEmail $invoice_email)
    {
        //
    }

    public function failed(): void
    {
        $this->invoice_email->update([
            'status' => EmailStatus::FAILED->value
        ]);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Issue An Invoice',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.invoice.issue',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        //todo: add invoice pdf attachment
        return [];
    }
}
