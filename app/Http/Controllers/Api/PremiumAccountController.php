<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class PremiumAccountController
{

    public function getAllPremiumAccountPayments(Request $request)
    {
        Stripe::setApiKey(config('cashier.secret'));

        $stripeId = $request->user()->stripe_id;
        if (!$stripeId) {
            return response()->json([]);
        }

        $allIntents = [];
        $params = [
            'customer' => $stripeId,
            'limit'    => 100
        ];

        do {
            $response = PaymentIntent::all($params);
            $allIntents = array_merge($allIntents, $response->data);
            if ($response->has_more) {
                $params['starting_after'] = end($response->data)->id;
            }
        } while ($response->has_more);

        return response()->json($allIntents);
    }

}
