<?php

use App\Models\ExpenseType;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\putJson;

test('unauthenticated user cannot update expense type', function () {
    $expenseType = ExpenseType::factory()->create(['name' => 'entertainment']);
    putJson(route('api.expense-types.update', $expenseType), ['name' => 'advertising'])->assertUnauthorized();
    expect($expenseType->fresh()->name)->toBe('entertainment');
});

test("user cannot update another user's expense type", function () {
    $expenseType = ExpenseType::factory()->create(['name' => 'entertainment']);

    actingAs(User::factory()->create())
        ->putJson(route('api.expense-types.update', $expenseType), ['name' => 'advertising'])
        ->assertForbidden();

    expect($expenseType->fresh()->name)->toBe('entertainment');
});

test('user can update his own expense type', function () {
    $expenseType = ExpenseType::factory()->create();

    actingAs($expenseType->user)
        ->putJson(route('api.expense-types.update', $expenseType), ['name' => 'entertainment'])
        ->assertOk();

    expect($expenseType->fresh()->name)->toBe('entertainment');
});
