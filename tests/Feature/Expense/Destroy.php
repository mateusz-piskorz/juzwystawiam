<?php

use App\Models\Expense;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\deleteJson;

test('unauthenticated user cannot delete expense', function () {
    $expense = Expense::factory()->create();

    deleteJson(route('api.expenses.destroy', $expense))
        ->assertUnauthorized();

    assertDatabaseHas('expenses', ['id' => $expense->id]);
});

test("user cannot delete another user's expense", function () {
    $expense = Expense::factory()->create();
    $anotherUser = User::factory()->create();

    actingAs($anotherUser)
        ->deleteJson(route('api.expenses.destroy', $expense))
        ->assertForbidden();

    assertDatabaseHas('expenses', ['id' => $expense->id]);
});

test('user can delete his own expense', function () {
    $expense = Expense::factory()->create();

    actingAs($expense->user)
        ->deleteJson(route('api.expenses.destroy', $expense))
        ->assertOk();

    assertDatabaseMissing('expenses', ['id' => $expense->id]);
});
