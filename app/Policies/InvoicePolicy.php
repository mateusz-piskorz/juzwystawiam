<?php

namespace App\Policies;

use App\Enums\EmailStatus;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class InvoicePolicy
{

    public function create(User $user): Response
    {
        $limit = 10;
        if ((!$user->premium_days > 0) && $user->invoicesCreatedThisMonth() >= $limit) {
            return Response::deny('Monthly limit of ' . $limit . ' invoices reached. Please upgrade to premium to create more invoices.');
        }

        return Response::allow();
    }

    public function view(User $user, Invoice $invoice): bool
    {
        return $user->id === $invoice->user_id;
    }

    public function update(User $user, Invoice $invoice): bool
    {
        return $user->id === $invoice->user_id;
    }

    public function delete(User $user, Invoice $invoice): bool
    {
        return $user->id === $invoice->user_id;
    }

    public function sendEmailIssuingInvoice(User $user, Invoice $invoice): Response
    {
        if ($user->id !== $invoice->user_id) {
            return Response::deny('You do not own this invoice.');
        }

        $invoice->loadMissing(["invoice_emails"]);

        if (collect($invoice->invoice_emails)->firstWhere('status', EmailStatus::PENDING->value)) {
            return Response::deny('Another email is still in status pending...');
        };

        $limit = 3;
        if ((!$user->premium_days > 0) && $user->emailsSentThisMonth() >= $limit) {
            return Response::deny('Monthly limit of ' . $limit . ' emails reached. Please upgrade to premium to send more emails.');
        }
        return Response::allow();
    }

}
