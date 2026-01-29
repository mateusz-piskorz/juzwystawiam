<?php

use App\Enums\PaymentMethod;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\putJson;

test('unauthenticated user cannot update defaults', function () {
    $user = User::factory()->create(['default_payment_method' => PaymentMethod::CASH]);
    putJson(route('api.profile.update-defaults'), ['default_payment_method' => PaymentMethod::CARD])->assertUnauthorized();
    expect($user->fresh()->default_payment_method)->toBe(PaymentMethod::CASH->value);
});

test('user can update his defaults', function () {
    $user = User::factory()->create();
    actingAs($user)->putJson(route('api.profile.update-defaults'), ['default_payment_method' => PaymentMethod::CARD])->assertOk();
    expect($user->fresh()->default_payment_method)->toBe(PaymentMethod::CARD->value);
});
