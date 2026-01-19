<?php

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use App\Models\Product;
use App\Models\User;
use function Pest\Laravel\actingAs;

test('api.products.index endpoint is working', function () {

    $user = User::factory()->create();

    $response = actingAs($user)->getJson(route('api.products.index'));
    $response->assertStatus(200);
});

test('api.products.store endpoint is working', function () {
    $user = User::factory()->create();

    $response = actingAs($user)->postJson(route('api.products.store'),
        [
            'name'         => 'Test Product',
            'price'        => 99.99,
            'measure_unit' => MeasureUnit::HOUR,
            'vat_rate'     => VatRate::CASE5,
            'description'  => 'Sample product description'
        ]
    );
    $response->assertStatus(201);
});

test('api.products.update endpoint is working', function () {
    $user = User::factory()->has(Product::factory())->create();

    $productId = $user->products()->first()->id;

    $response = actingAs($user)->putJson(route('api.products.update', $productId),
        [
            'name'         => 'Test Product',
            'price'        => 99.99,
            'measure_unit' => MeasureUnit::HOUR,
            'vat_rate'     => VatRate::CASE5,
            'description'  => 'Sample product description'
        ]
    );
    $response->assertStatus(201);
});

test('api.products.destroy endpoint is working', function () {
    $user = User::factory()->has(Product::factory())->create();

    $productId = $user->products()->first()->id;

    $response = actingAs($user)->deleteJson(route('api.products.destroy', $productId));
    $response->assertStatus(200);
});
