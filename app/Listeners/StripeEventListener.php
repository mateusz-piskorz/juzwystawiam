<?php

namespace App\Listeners;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Events\WebhookReceived;

// todo: refactor StripeEventListener
class StripeEventListener
{

    public function handle(WebhookReceived $event): void
    {
        if (
            $event->payload['type'] === 'checkout.session.completed' &&
            (($event->payload['data']['object']['payment_status'] ?? null) === 'paid')
        ) {

            $charge = $event->payload['data']['object'] ?? [];
            $customerId = $charge['customer'] ?? null;

            $daysToAdd = 0;
            if (isset($charge['metadata']['premium_days'])) {
                $daysToAdd = (int) $charge['metadata']['premium_days'];
            } else {
                Log::warning('premium_days missing from Stripe charge metadata.', [
                    'customer_id'     => $customerId,
                    'charge_metadata' => $charge['metadata'] ?? []
                ]);
            }

            if ($customerId && $daysToAdd > 0) {
                $user = User::where('stripe_id', $customerId)->first();
                if ($user) {
                    $now = Carbon::now();
                    $currentExpiry = $user->hasPremium() ? Carbon::parse($user->premium_access_expires_at) : $now;
                    $newExpiry = $currentExpiry->addDays($daysToAdd);
                    $user->premium_access_expires_at = $newExpiry;
                    $user->save();
                    Log::info('Premium access extended for user.', [
                        'user_id'    => $user->id,
                        'new_expiry' => $user->premium_access_expires_at,
                        'days_added' => $daysToAdd
                    ]);
                } else {
                    Log::warning('User not found for Stripe customer.', [
                        'customer_id' => $customerId
                    ]);
                }
            } else {
                Log::warning('Could not determine premium days to add.', [
                    'customer_id'     => $customerId,
                    'charge_metadata' => $charge['metadata'] ?? []
                ]);
            }
        } elseif ($event->payload['type'] === 'checkout.session.completed') {
            $charge = $event->payload['data']['object'] ?? [];
            $customerId = $charge['customer'] ?? null;
            Log::warning('Stripe checkout session not paid.', [
                'customer_id'    => $customerId,
                'payment_status' => $charge['payment_status'] ?? null
            ]);
        }
    }
}
