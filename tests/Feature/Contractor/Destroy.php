<?php

use App\Models\Contractor;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\deleteJson;

test('unauthenticated user cannot delete contractor', function () {
    $contractor = Contractor::factory()->create();
    deleteJson(route('api.contractors.destroy', $contractor))->assertUnauthorized();
    assertDatabaseHas($contractor);
});

test("user cannot delete another user's contractor", function () {
    $contractor = Contractor::factory()->create();

    actingAs(User::factory()->create())
        ->deleteJson(route('api.contractors.destroy', $contractor))
        ->assertForbidden();

    assertDatabaseHas($contractor);
});

test('user can delete their own contractor', function () {
    $contractor = Contractor::factory()->create();

    actingAs($contractor->user)
        ->deleteJson(route('api.contractors.destroy', $contractor))
        ->assertOk();

    assertDatabaseMissing($contractor);
});
