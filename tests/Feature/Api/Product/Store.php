<?php

use App\Models\Product;
use App\Models\User;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseEmpty;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\postJson;

test('unauthenticated user cannot create a product', function () {
    postJson(route('api.products.store'), Product::factory()->raw())->assertUnauthorized();
    assertDatabaseEmpty('products');
});

test('authenticated user can create a product', function () {
    $user = User::factory()->create();
    $data = Product::factory()->raw(['user_id' => $user->id]);

    actingAs($user)
        ->postJson(route('api.products.store'), $data)
        ->assertCreated();

    expect($user->products)->toHaveCount(1);

    assertDatabaseHas('products', $data);
});
