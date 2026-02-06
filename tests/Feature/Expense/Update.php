<?php

use App\Models\Expense;
use App\Models\ExpenseType;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\putJson;

test('unauthenticated user cannot update expense', function () {
    $expense = Expense::factory()->create(['title' => 'Old Title']);

    putJson(route('api.expenses.update', $expense), ['title' => 'New Title'])
        ->assertUnauthorized();

    expect($expense->fresh()->title)->toBe('Old Title');
});

test("user cannot update another user's expense", function () {
    $expense = Expense::factory()->create(['title' => 'Old Title']);

    actingAs(User::factory()->create())
        ->putJson(route('api.expenses.update', $expense), ['title' => 'New Title'])
        ->assertForbidden();

    expect($expense->fresh()->title)->toBe('Old Title');
});

test('user can update his own expense', function () {
    $expense = Expense::factory()->create(['title' => 'Old Title']);

    actingAs($expense->user)
        ->putJson(route('api.expenses.update', $expense), [
            'title' => 'New Title',
            'total' => 150.00,
        ])
        ->assertOk();

    expect($expense->fresh())
        ->title->toBe('New Title')
        ->total->toBe('150.00');
});

test('user cannot update expense with another user expense type', function () {
    $user = User::factory()->create();
    $expense = Expense::factory()->create(['user_id' => $user->id]);
    $anotherUser = User::factory()->create();
    $foreignExpenseType = ExpenseType::factory()->create(['user_id' => $anotherUser->id]);

    actingAs($user)
        ->putJson(route('api.expenses.update', $expense), [
            'expense_type_id' => $foreignExpenseType->id,
        ])
        ->assertJsonValidationErrors(['expense_type_id']);

    expect($expense->fresh()->expense_type_id)->not->toBe($foreignExpenseType->id);
});
