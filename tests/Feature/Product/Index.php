<?php

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use App\Models\Product;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\getJson;

test('unauthenticated user cannot get his products', function () {
    getJson(route('api.products.index'))->assertUnauthorized();
});

test('user can get his products', function () {
    $product = Product::factory(['name' => 'product1'])->create();
    Product::factory()->create();

    actingAs($product->user)
        ->getJson(route('api.products.index'))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.name', 'product1');
});

test('filters products by name - q param', function () {
    $user = User::factory()
        ->has(Product::factory()->count(2)->sequence(
            ['name' => 'Apple iPhone'],
            ['name' => 'Samsung Galaxy']
        ))
        ->create();

    actingAs($user)
        ->getJson(route('api.products.index', ['q' => 'iPhone']))
        ->assertStatus(200)
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.name', 'Apple iPhone');
});

test('filters products by measure unit and vat rate', function () {
    $user = User::factory()
        ->has(Product::factory()->count(2)->sequence(
            ['measure_unit' => MeasureUnit::HOUR, 'vat_rate' => VatRate::CASE23],
            ['measure_unit' => MeasureUnit::PCS, 'vat_rate' => VatRate::CASE5]
        ))
        ->create();

    actingAs($user)
        ->getJson(route('api.products.index', ['measure_unit' => MeasureUnit::HOUR]))
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.measure_unit', MeasureUnit::HOUR);

    actingAs($user)
        ->getJson(route('api.products.index', ['vat_rate' => VatRate::CASE5]))
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.vat_rate', VatRate::CASE5);
});

test('sorts results - products', function () {
    $user = User::factory()
        ->has(Product::factory()->count(3)->sequence(
            ['price' => 100],
            ['price' => 200],
            ['price' => 50]
        ))
        ->create();

    actingAs($user)
        ->getJson(route('api.products.index', [
            'sort' => 'price',
            'sort_direction' => 'desc',
        ]))
        ->assertOk()
        ->assertJsonCount(3, 'data')
        ->assertJsonPath('data.0.price', 200);
});
