<?php

use App\Models\Expense;
use App\Models\ExpenseType;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseEmpty;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\postJson;

test('unauthenticated user cannot create expense', function () {
    postJson(route('api.expenses.store'), Expense::factory()->raw())
        ->assertUnauthorized();

    assertDatabaseEmpty('expenses');
});

test('authenticated user can create an expense', function () {
    $user = User::factory()->create();
    $expenseType = ExpenseType::factory()->create(['user_id' => $user->id]);

    $data = Expense::factory()->raw([
        'user_id' => $user->id,
        'expense_type_id' => $expenseType->id,
    ]);

    actingAs($user)
        ->postJson(route('api.expenses.store'), $data)
        ->assertCreated();

    expect($user->expenses)->toHaveCount(1);
    assertDatabaseHas('expenses', $data);
});

test('user cannot create expense with another user expense type', function () {
    $user = User::factory()->create();
    $anotherUser = User::factory()->create();
    $foreignExpenseType = ExpenseType::factory()->create(['user_id' => $anotherUser->id]);

    $data = Expense::factory()->raw([
        'expense_type_id' => $foreignExpenseType->id,
    ]);

    actingAs($user)
        ->postJson(route('api.expenses.store'), $data)
        ->assertJsonValidationErrors(['expense_type_id']);

    assertDatabaseEmpty('expenses');
});
