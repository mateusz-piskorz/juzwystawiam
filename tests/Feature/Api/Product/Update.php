<?php

use App\Models\Product;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\putJson;

test('unauthenticated user cannot update product', function () {
    $product = Product::factory()->create(['name' => 'Original Name']);
    putJson(route('api.products.update', $product), ['name' => 'New Name'])->assertUnauthorized();
    expect($product->fresh()->name)->toBe('Original Name');
});

test("user cannot update another user's product", function () {
    $product = Product::factory()->create(['name' => 'Original Name']);
    actingAs(User::factory()->create())
        ->putJson(route('api.products.update', $product), ['name' => 'New Name'])
        ->assertForbidden();
    expect($product->fresh()->name)->toBe('Original Name');
});

test('user can update product', function () {
    $product = Product::factory()->create();
    actingAs($product->user)
        ->putJson(route('api.products.update', $product), ['name' => 'Updated Name'])
        ->assertOk();
    expect($product->fresh()->name)->toBe('Updated Name');
});
