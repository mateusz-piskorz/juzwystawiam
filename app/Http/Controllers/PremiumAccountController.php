<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

// todo: refactor PremiumAccountController
// check if we can't just do if($stripePriceId = $stripePriceIds[$key])
class PremiumAccountController
{

    public function index(): Response
    {
        return Inertia::render('dashboard/premium-account/page');
    }

    public function buy(Request $request)
    {
        $validatedDays = $request->validate([
            'days' => 'required|integer'
        ])['days'];

        $stripePriceIds = [
            'day1'  => 'price_1RjHSg4FjKtzGWoFXjZK12bO',
            'day7'  => 'price_1RjgzQ4FjKtzGWoFq9wlpz8y',
            'day30' => 'price_1Rjh044FjKtzGWoFsb5IZhKm'
        ];

        $key = 'day' . $validatedDays;
        if (!isset($stripePriceIds[$key])) {
            abort(422, 'Invalid premium account duration selected.');
        }
        $stripePriceId = $stripePriceIds[$key];

        $quantity = 1;

        $metadata = [
            'premium_days' => $validatedDays
        ];

        $checkoutSession = $request->user()->checkout(
            [$stripePriceId => $quantity],
            [
                'success_url' => route('premium-account') . "?checkout=success",
                'cancel_url'  => route('premium-account'),
                'metadata'    => $metadata
            ]
        );

        return $checkoutSession;
    }

}
