<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertModelExists;
use function Pest\Laravel\assertModelMissing;
use function Pest\Laravel\deleteJson;

test('unauthenticated user cannot delete account', function () {
    $user = User::factory()->create(['password' => 'Original Password']);
    deleteJson(route('api.profile.delete-account'), ['password' => 'Updated Password'])->assertUnauthorized();
    assertModelExists($user);
});

test('user can delete his account', function () {
    $user = User::factory()->create(['password' => Hash::make('original password')]);

    actingAs($user)
        ->deleteJson(route('api.profile.delete-account'), [
            'password' => 'original password',
            'password_confirmation' => 'original password',
        ])
        ->assertOk();

    assertModelMissing($user);
});
