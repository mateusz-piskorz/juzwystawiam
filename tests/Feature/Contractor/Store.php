<?php

use App\Models\Contractor;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseEmpty;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\postJson;

test('unauthenticated user cannot create a contractor', function () {
    postJson(route('api.contractors.store'), Contractor::factory()->raw())->assertUnauthorized();
    assertDatabaseEmpty('contractors');
});

test('authenticated user can create a contractor', function () {
    $user = User::factory()->create();
    $data = Contractor::factory()->raw(['user_id' => $user->id]);

    actingAs($user)
        ->postJson(route('api.contractors.store'), $data)
        ->assertCreated();

    expect($user->contractors)->toHaveCount(1);
    assertDatabaseHas('contractors', $data);
});
