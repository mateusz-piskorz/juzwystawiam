<?php

use App\Models\ExpenseType;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\deleteJson;
use function Pest\Laravel\withoutExceptionHandling;

test('unauthenticated user cannot delete expense type', function () {
    $expenseType = ExpenseType::factory()->create();
    deleteJson(route('api.expense-types.destroy', $expenseType))->assertUnauthorized();
    assertDatabaseHas($expenseType);
});

test("user cannot delete another user's expense type", function () {
    $expenseType = ExpenseType::factory()->create();

    actingAs(User::factory()->create())
        ->deleteJson(route('api.expense-types.destroy', $expenseType))
        ->assertForbidden();

    assertDatabaseHas($expenseType);
});

test('user can delete his own expense type', function () {
    withoutExceptionHandling();
    $expenseType = ExpenseType::factory()->create();

    actingAs($expenseType->user)
        ->deleteJson(route('api.expense-types.destroy', $expenseType))
        ->assertOk();

    assertDatabaseMissing($expenseType);
});
