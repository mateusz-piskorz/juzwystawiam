<?php

use App\Models\User;

test('update-profile endpoint is working', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->putJson(
        route("api.profile.update-profile"),
        ['name' => fake()->name(), 'email' => fake()->email()]
    );

    $response
        ->assertStatus(200)
        ->assertJson([
            'success' => true
        ]);
});

test('update-password endpoint is working', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->putJson(
        route("api.profile.update-password"),
        ['current_password' => 'password', 'password' => 'new_password', 'password_confirmation' => 'new_password']
    );

    $response
        ->assertStatus(200)
        ->assertJson([
            'success' => true
        ]);
});

test('delete-account endpoint is working', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->deleteJson(
        route("api.profile.delete-account"),
        ['password' => 'password']
    );

    $response
        ->assertStatus(200)
        ->assertJson([
            'success' => true
        ]);
});
