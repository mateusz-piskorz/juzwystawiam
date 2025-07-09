<?php

namespace App\Listeners;

use App\Enums\EmailStatus;
use Illuminate\Mail\Events\MessageSent;

class IssueAnInvoice
{

    public function __construct()
    {
        //
    }

    public function handle(MessageSent $event): void
    {
        $event->data['invoice_email']->update(['status' => EmailStatus::SENT->value]);
    }
}
