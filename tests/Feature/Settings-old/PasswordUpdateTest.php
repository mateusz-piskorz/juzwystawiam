<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// moved to api
test('password can be updated', function () {

    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from('/dashboard/settings/password')
        ->put('/dashboard/settings/password', [
            'current_password'      => 'password',
            'password'              => 'new-password',
            'password_confirmation' => 'new-password'
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/dashboard/settings/password');

    expect(Hash::check('new-password', $user->refresh()->password))->toBeTrue();
})->skip();

// moved to api
test('correct password must be provided to update password', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from('/dashboard/settings/password')
        ->put('/dashboard/settings/password', [
            'current_password'      => 'wrong-password',
            'password'              => 'new-password',
            'password_confirmation' => 'new-password'
        ]);

    $response
        ->assertSessionHasErrors('current_password')
        ->assertRedirect('/dashboard/settings/password');
})->skip();
