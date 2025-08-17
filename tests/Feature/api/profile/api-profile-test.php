<?php

use App\Models\User;

// todo: make tests
test('update-profile endpoint is working', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/dashboard/settings');

    $response->assertOk();
});
