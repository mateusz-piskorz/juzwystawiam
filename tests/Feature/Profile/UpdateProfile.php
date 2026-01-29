<?php

use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\putJson;

test('unauthenticated user cannot update profile', function () {
    $user = User::factory()->create(['name' => 'Original Name']);
    putJson(route('api.profile.update-profile'), ['name' => 'Updated Name'])->assertUnauthorized();
    expect($user->fresh()->name)->toBe('Original Name');
});

test('user can update his profile', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->putJson(route('api.profile.update-profile'), ['name' => 'Updated Name'])
        ->assertOk();

    expect($user->fresh()->name)->toBe('Updated Name');
});
