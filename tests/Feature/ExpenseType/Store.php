<?php

use App\Models\ExpenseType;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseEmpty;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\postJson;

test('unauthenticated user cannot create expense type', function () {
    postJson(route('api.expense-types.store'), ExpenseType::factory()->raw())->assertUnauthorized();
    assertDatabaseEmpty('expense_types');
});

test('authenticated user can create a expense type', function () {
    $user = User::factory()->create();
    $data = ExpenseType::factory()->raw(['user_id' => $user->id]);

    actingAs($user)
        ->postJson(route('api.expense-types.store'), $data)
        ->assertCreated();

    expect($user->expenseTypes)->toHaveCount(1);
    assertDatabaseHas('expense_types', $data);
});
