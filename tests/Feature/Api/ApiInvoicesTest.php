<?php

use App\Enums\Currency;
use App\Enums\MeasureUnit;
use App\Enums\PaymentMethod;
use App\Enums\VatRate;
use App\Models\Contractor;
use App\Models\Invoice;
use App\Models\User;

test('api.invoices.index endpoint is working', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson(route('api.invoices.index'));
    $response->assertStatus(200);
});

test('api.invoices.store endpoint is working', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson(route('api.invoices.store'),
        [
            'type' => 'VAT',
            'number' => 'FR '.date('d/m/Y'),
            'issue_date' => now(),
            'payment_method' => PaymentMethod::CASH,
            'currency' => Currency::PLN,
            'is_already_paid' => false,
            'sale_date' => now()->subDay(),
            'due_date' => now()->addDays(14),
            'invoice_contractors' => [
                [
                    'contractor_id' => Contractor::factory()->create(['user_id' => $user->id])->id,
                    'role' => 'SELLER',
                ],
                [
                    'contractor_id' => Contractor::factory()->create(['user_id' => $user->id])->id,
                    'role' => 'BUYER',
                ],
            ],
            'invoice_products' => [
                [
                    'name' => 'Test Product',
                    'quantity' => 2,
                    'price' => 100.00,
                    'measure_unit' => MeasureUnit::HOUR,
                    'discount' => 10,
                    'vat_rate' => VatRate::CASE0,
                ],
            ],
        ]
    );
    $response->assertStatus(201);
});

test('api.invoices.update endpoint is working', function () {
    $user = User::factory()
        ->has(Invoice::factory()->count(3))
        ->create();

    $invoiceId = $user->invoices()->first()->id;

    $response = $this->actingAs($user)->putJson(route('api.invoices.update', $invoiceId),
        [
            'type' => 'VAT',
            'number' => 'FR '.date('d/m/Y'),
            'issue_date' => now(),
            'payment_method' => PaymentMethod::CASH,
            'currency' => Currency::PLN,
            'is_already_paid' => false,
            'sale_date' => now()->subDay(),
            'due_date' => now()->addDays(14),
            'invoice_contractors' => [
                [
                    'contractor_id' => Contractor::factory()->create(['user_id' => $user->id])->id,
                    'role' => 'SELLER',
                ],
                [
                    'contractor_id' => Contractor::factory()->create(['user_id' => $user->id])->id,
                    'role' => 'BUYER',
                ],
            ],
            'invoice_products' => [
                [
                    'name' => 'Test Product',
                    'quantity' => 2,
                    'price' => 100.00,
                    'measure_unit' => MeasureUnit::HOUR,
                    'discount' => 10,
                    'vat_rate' => VatRate::CASE0,
                ],
            ],
        ]
    );
    $response->assertStatus(201);
});

test('api.invoices.destroy endpoint is working', function () {
    $user = User::factory()
        ->has(Invoice::factory()->count(3))
        ->create();

    $invoiceId = $user->invoices()->first()->id;

    $response = $this->actingAs($user)->deleteJson(route('api.invoices.destroy', $invoiceId));
    $response->assertStatus(200);
});

test('api.invoices.status-distribution-by-year endpoint is working', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->getJson(route('api.invoices.status-distribution-by-year'));
    $response->assertStatus(200);
});

// test('api.invoices.status-monthly-series endpoint is working', function () {
//     $user = User::factory()->create();

//     $response = $this->actingAs($user)->getJson(route("api.invoices.status-monthly-series"));
//     $response->assertStatus(200);
// });
