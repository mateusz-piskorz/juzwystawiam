<?php

use App\Models\User;

test('settings page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route("settings"));

    $response->assertOk();
});
