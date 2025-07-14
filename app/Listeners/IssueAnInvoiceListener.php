<?php

namespace App\Listeners;

use App\Enums\EmailStatus;
use Illuminate\Mail\Events\MessageSent;

class IssueAnInvoiceListener
{

    public function handle(MessageSent $event): void
    {
        $event->data['invoice_email']->update(['status' => EmailStatus::SENT->value]);
    }
}
