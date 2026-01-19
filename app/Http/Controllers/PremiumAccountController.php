<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PremiumAccountController
{
    public function buy(Request $request)
    {
        $validatedDays = $request->validate([
            'days' => 'required|in:1,7,30',
        ])['days'];

        $stripePriceIds = [
            '1' => 'price_1RjHSg4FjKtzGWoFXjZK12bO',
            '7' => 'price_1RjgzQ4FjKtzGWoFq9wlpz8y',
            '30' => 'price_1Rjh044FjKtzGWoFsb5IZhKm',
        ];

        $checkoutSession = $request->user()->checkout(
            [$stripePriceIds[$validatedDays] => 1],
            [
                'success_url' => route('premium-account').'?checkout=success',
                'cancel_url' => route('premium-account'),
                'metadata' => [
                    'premium_days' => $validatedDays,
                ],
            ]
        );

        return $checkoutSession;
    }
}
