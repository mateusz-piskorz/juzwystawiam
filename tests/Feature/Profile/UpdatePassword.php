<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\putJson;

test('unauthenticated user cannot update password', function () {
    $user = User::factory()->create(['password' => 'Original Password']);
    putJson(route('api.profile.update-password'), ['password' => 'Updated Password'])->assertUnauthorized();
    expect(Hash::check('Original Password', $user->fresh()->password))->toBeTrue();
});

test('user can update his profile', function () {
    $user = User::factory()->create(['password' => Hash::make('current password')]);

    actingAs($user)
        ->putJson(route('api.profile.update-password'), [
            'current_password' => 'current password',
            'password' => 'Updated Password',
            'password_confirmation' => 'Updated Password',
        ])
        ->assertOk();

    expect(Hash::check('Updated Password', $user->fresh()->password))->toBeTrue();
});
