<?php

namespace App\Listeners;

use App\Models\User;
use Carbon\Carbon;
use Laravel\Cashier\Events\WebhookReceived;

class StripeEventListener
{

    public function handle(WebhookReceived $event): void
    {
        if ($event->payload['type'] === 'checkout.session.completed') {

            $charge = $event->payload['data']['object'];

            if ($charge['payment_status'] === 'paid') {
                $user = User::where('stripe_id', $charge['customer'])->first();
                if ($user) {
                    $now = Carbon::now();
                    $currentExpiry = $user->premium_days > 0 ? Carbon::parse($user->premium_access_expires_at) : $now;
                    $newExpiry = $currentExpiry->addDays((int) $charge['metadata']['premium_days']);
                    $user->premium_access_expires_at = $newExpiry;
                    $user->save();
                }
            }
        }
    }
}
