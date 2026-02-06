<?php

use App\Models\Expense;
use App\Models\ExpenseType;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\getJson;

test('unauthenticated user cannot get his expenses', function () {
    getJson(route('api.expenses.index'))->assertUnauthorized();
});

test('user can get only his expenses', function () {
    $expense = Expense::factory(['title' => 'My Expense'])->create();
    Expense::factory(['title' => 'Other User Expense'])->create();

    actingAs($expense->user)
        ->getJson(route('api.expenses.index'))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.title', 'My Expense');
});

test('filters expenses by title - q param', function () {
    $user = User::factory()
        ->has(Expense::factory()->count(2)->sequence(
            ['title' => 'Office Rent'],
            ['title' => 'Electricity Bill']
        ))
        ->create();

    actingAs($user)
        ->getJson(route('api.expenses.index', ['q' => 'Rent']))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.title', 'Office Rent');
});

test('filters expenses by expense type', function () {
    $user = User::factory()->create();
    $typeA = ExpenseType::factory()->create(['user_id' => $user->id]);
    $typeB = ExpenseType::factory()->create(['user_id' => $user->id]);

    Expense::factory()->create(['user_id' => $user->id, 'expense_type_id' => $typeA->id]);
    Expense::factory()->create(['user_id' => $user->id, 'expense_type_id' => $typeB->id]);

    actingAs($user)
        ->getJson(route('api.expenses.index', ['expense_type_id' => $typeA->id]))
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.expense_type_id', $typeA->id);
});

test('paginates expenses results', function () {
    $user = User::factory()
        ->has(Expense::factory()->count(15))
        ->create();

    actingAs($user)
        ->getJson(route('api.expenses.index', ['limit' => 10]))
        ->assertOk()
        ->assertJsonCount(10, 'data')
        ->assertJsonStructure(['data', 'links', 'meta']);
});
