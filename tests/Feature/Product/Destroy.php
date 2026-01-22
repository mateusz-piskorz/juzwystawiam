<?php

use App\Models\Product;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\deleteJson;

test('unauthenticated user cannot delete product', function () {
    $product = Product::factory()->create();
    deleteJson(route('api.products.destroy', $product))->assertUnauthorized();
    assertDatabaseHas($product);
});

test("user cannot delete another user's product", function () {
    $product = Product::factory()->create();

    actingAs(User::factory()->create())
        ->deleteJson(route('api.products.destroy', $product))
        ->assertForbidden();

    assertDatabaseHas($product);
});

test('user can delete his own product', function () {
    $product = Product::factory()->create();

    actingAs($product->user)
        ->deleteJson(route('api.products.destroy', $product))
        ->assertOk();

    assertDatabaseMissing($product);
});
